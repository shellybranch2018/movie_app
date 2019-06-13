import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

var imgUrl="http://image.tmdb.org/t/p/w185//";
class App extends Component {
  //Constructor for the state object
  constructor(){
    super()

    this.state={
      movies:[]
    }
//Binding the value from the submit event
    this.onSubmit = this.onSubmit.bind(this);
  }
// onSubmit is called when the use hits enter after entering the movie they are searching for.
  onSubmit(event){
// Prevents the form from reloading the screen
    event.preventDefault();
// Stores the value from the input field.
    var query = this.input.value;
    console.log(query);
// Calls the componentDidMount method and passes the data from the input field
    this.componentDidMount(query);
  }
// componentDidMount opens the request to the API
  componentDidMount(query){
    var api = 'https://api.themoviedb.org/3/search/movie?api_key=98e29b7ce43f0e1d5ee589664b968f3e&query='
// Axios runs the get request concatenating the api string and the query variable with the use input
    axios.get(api + query)
// then it takes the response / data and passes it back to the state.
      .then(response => 
        this.setState ({
          movies:response.data.results
        }))
  }
  render() {
    // The movies variable holds the updated state results
    const {movies} = this.state;
    // the movieList variable stores the map method that loops through the results a renders them to html
    var movieList = movies.map((movie) => 
    <div className="col-4 movie">  
      <img src={imgUrl + movie.poster_path}className="movieImg" />
      <p className="overview">{movie.overview}</p>
      <h3  key={movie.id}className="text-center movieTitle">{movie.title}</h3>
    </div>)
    return (
      <div className="App">
        <div className="jumbotron">  
            <div className="container">
            <div className="row">
            <h2 className="col-12 text-center">Search for a Movie</h2>
              <form onSubmit={this.onSubmit} className="col-12">
                <input className= "col-12 form-control" placeholder="Search Movies..."
                ref = {input => this.input = input}/>
              </form>
              <div>
                <ul className= "col-12 row">{movieList}</ul>
              </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}

export default App;