import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import SearchForm from './components/SearchForm'
import Navbar from './components/Navbar'
import NotFound from './components/NotFound';
import PhotoList from './components/PhotoList';
import './css/index.css';

import apiKey from './config'

class App extends Component{

  constructor(props){
    super(props)

    this.state = {
      search: [],
      bikePhotos: [],
      landscapePhotos: [],
      forestPhotos: [],
      isLoading: false
    }
  }



  async componentDidMount() {
    this.fetchPhotos('bicycles', 'bikePhotos');
    this.fetchPhotos('forest', 'forestPhotos');
    this.fetchPhotos('landscape', 'landscapePhotos');
  }

  async fetchPhotos(query, property = 'search') {
    this.setState({isLoading: true})
    try {
      const photosJson = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      if (photosJson.data) {
        const { photos } = photosJson.data;
        this.setState({
          [property]: photos.photo
        });
      }
    } catch (error) {
      console.log('there has been an error fetching photos');
    } finally {
      this.setState({isLoading: false})
    }
  }




  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm searchPhotos={this.fetchPhotos.bind(this)} />
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/forest' />} />
            <Route path="/search/:query" render={({match}) => {
              return(
                <PhotoList query={this.state.query} isLoading={this.state.isLoading} data={this.state.search} match={match}/>
              )
            }} />
            <Route path="/bicycles" render={({match}) => {
              return(
                <PhotoList query={this.state.query} isLoading={this.state.isLoading} data={this.state.bikePhotos} match={match}/>
              )
            }} />
            <Route path="/forest" render={({match}) => {
              return(
                <PhotoList query={this.state.query} isLoading={this.state.isLoading} data={this.state.forestPhotos} match={match}/>
              )
            }} />
            <Route path="/landscapes" render={({match}) => {
              return(
                <PhotoList query={this.state.query} isLoading={this.state.isLoading} data={this.state.landscapePhotos} match={match}/>
              )
            }} />
            <Route path="/404" component={NotFound} />
            <Route render={() => <Redirect to='/404' />} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
