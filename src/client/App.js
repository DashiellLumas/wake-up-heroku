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
      <div>
        <h1>Enter your heroku link here:</h1>
        <input type="text" name="herokuLink" onChange={this.inputChangeHandler}/>
        <button value="submit" onClick={this.formHandler} />
      </div>
    );
  }
}
