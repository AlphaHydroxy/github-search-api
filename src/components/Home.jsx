import React from 'react';
import '../sass/home.scss';

export default class Home extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
          avatar_url: null,
          username: null,
          html_url: null,
          message: null,
          name: null,
          followers: null,
          location: null,
          public_repos: null,
          bio: null
        }
      }
    
      getUser(username) {
        return fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(response => {
          return response;
        })
      }
    
      refineSearch(name, followers){
        return fetch(`https://api.github.com/search/users?q=${name}+followers:>${followers}`)
        .then(response => response.json())
        .then(response => {
          return response;
        })
      }

      getRepo(repo){
        return fetch(`https://api.github.com/search/repositories?q=${repo}+language:assembly&sort=stars&order=desc`)
        .then(response => response.json())
        .then(response => {
          return response;
        })
      }
    
    
      async handleSubmit(e) {
        e.preventDefault();
        let user = await this.getUser(this.refs.username.value);
        this.setState({
          avatar_url: user.avatar_url,
          username: user.login,
          html_url: user.html_url,
          message: user.message,
          name: user.name,
          followers: user.followers,
          location: user.location,
          public_repos: user.public_repos,
          bio: user.bio
        });
      }
    
      //modal
      async handleRefineSearch(e) {
        e.preventDefault();
        let refineSearchList = await this.refineSearch(this.refs.name.value, this.refs.followers.value);
        console.log(refineSearchList);
        const numberOfUsersInSearch = refineSearchList.items.length;
        console.log(numberOfUsersInSearch);
        const mappedUser = refineSearchList.items.map((person, index) => {
          const mappedPerson = person.login;
          console.log(mappedPerson);
        });
      }
    
      render() {
        let user;
        let invalidUser;
        if (this.state.username) {
          user = 
          <div className="user-flex-container">
            <div className="user-sec-one">
              <img className="profile-img" src={this.state.avatar_url} alt="user"/>
              <a href={this.state.html_url} target="_blank">{this.state.name}</a><br/>
            </div>
            <div className="user-sec-two">
              <p>Location: {this.state.location}</p>
              
            </div>
            <div className="user-sec-three">
              <p>Followers: {this.state.followers}</p>
            </div>
            <div className="user-sec-four">
              <p>Public Repositorys: {this.state.public_repos}</p>
            </div>
            <div className="user-sec-five">
              <p>{this.state.bio}</p>
            </div>
          </div>
        };
        if (this.state.message) {
          invalidUser =
          <div className="invalid-msg-flex">
            <div className="invalid-msg-top">
              <p>Sorry...</p>
            </div>
            <div className="invalid-msg-bottom">
              <p>...invalid username!</p>
            </div>
          </div>
        }
        return (
          <div className="flex-container">
            <div className="left-flex">
                <form onSubmit={e => this.handleSubmit(e)}>
                <input className="username-input username-right-align" ref='username' type='text' placeholder='Enter a GitHub username' autoFocus/>
                </form>
                <div className="button-wrapper">
                    <button className="refine-button" data-toggle="modal" data-target="#exampleModalCenter">Launch refine search</button>
                </div>

                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={e => this.handleSubmit(e)} id="refine-input">
                          <input ref='name' type='text' placeholder='Please enter users firstname'>
                          </input>
                          <input ref='followers' type='number' placeholder='Please enter amount of followers'>
                          </input>
                          <input type="submit" value="Submit" onClick={e => this.handleRefineSearch(e)}></input>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
    
            <div className="right-flex">
              {user}
              {invalidUser}
            </div>
          </div>
        );
    }
}