import React, { Component } from "react";
import "./app.css";
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null
    }
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.formHandler = this.formHandler.bind(this);
  }

  componentDidMount() {
  }

  inputChangeHandler(event){
    this.setState({link: event.target.value});
  }

  formHandler() {
    let data = JSON.stringify({
      link: this.state.link
    })
    axios.post(`api/herokuLinks`, data, {headers:{'Content-Type':'application/json'}})
    .then( function(req, response){
    })
    .catch(function(error){
      console.log("this error", error);
    });
  }

  render() {
    return (
      <div className="container">
        <img className="heroku-logo" src="./public/img/heroku.png" />Ping
        <div className="input-container">
          http://<input type="text" placeholder="enter app name" name="herokuLink" onChange={this.inputChangeHandler}/>.herokuapp.com
        </div>
        <button onClick={this.formHandler}>Keep My App Awake </button>
        <p className="description">HerokuPing is a simple application that pings your heroku site every 30 minutes. No more sleepy apps.</p>
      </div>
    );
  }
}
