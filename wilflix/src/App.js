import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      id: '',
      url: '',
      nome: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const apiUrl = this.state.id
      ? `https://wilflix.onrender.com/filmes/${this.state.id}`
      : 'https://wilflix.onrender.com/filmes';
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // If data is an array, it's a list of movies
          this.setState({ movies: data });
        } else {
          // If data is an object, it's a single movie
          this.setState({ movies: [data] });
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  handleInputChange = (event) => {
    this.setState({ id: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.fetchData();
  };

  render() {
    return (
      <div className="container text-center">
        <h1 style={{ color: 'white' }} className="h1 text-center">
          Filmes
        </h1>
        <form onSubmit={this.handleSubmit}>
        <input
            type="string"
            name="id"
            placeholder="Pesquise por ID do filme ou deixe em branco para listar todos"
            value={this.state.id}
            onChange={this.handleInputChange}
          />
          <br />
          <input className="btn btn-outline-primary" type="submit" value="submit" />
        </form>

        <div className="movie-list">
          {this.state.movies.map((movie) => (
            <div key={movie.id}>
              <h2 style={{color:'white'}}>{movie.nome}</h2>
              <iframe
                max-width="100%"
                max-height="100%"
                frameBorder="0"
                src={movie.url}
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;