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

    /**
     * State for App component which contains
     * 3 arrays for nav links and 1 array for search photos
     *  */ 
    this.state = {
      search: [],
      bikePhotos: [],
      landscapePhotos: [],
      forestPhotos: [],
      isLoading: false
    }
  }


  /**
   * Initialize component and fetch data to navLinks results
   */
  async componentDidMount() {
    this.fetchPhotos('bicycles', 'bikePhotos');
    this.fetchPhotos('forest', 'forestPhotos');
    this.fetchPhotos('landscape', 'landscapePhotos');
  }

  /**
   * Fetch photos from flickr api
   * @param {String} query search terms  
   * @param {*} property Property where to save data results in APP state
   */
  async fetchPhotos(query, property = 'search') {
    this.setState({isLoading: true})
    try {
      // Await the api response and validate if it exists
      const photosJson = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      if (photosJson.data) {
        const { photos } = photosJson.data;
        // Set result into state passed by parameter
        this.setState({
          [property]: photos.photo
        });
      }
    } catch (error) {
      console.log('there has been an error fetching photos');
    } finally {
      // Always set isLoading property to false after success or error
      this.setState({isLoading: false})
    }
  }

  /**
   * Renders all page inside a BrowserRouter and validates each path
   * to render components inside Route components
   */
  render() {
    return (
      <BrowserRouter basename="/react-gallery-app">
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
