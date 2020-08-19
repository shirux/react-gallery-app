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
      firstLoad: true,
      photos: []
    }
  }

  componentDidMount(){
    this.fetchPhotos();
  }

  async fetchPhotos(query = 'forest'){
    try {
      const photosJson = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=40&format=json&nojsoncallback=1`);
      if (photosJson.data) {
        const { photos } = photosJson.data;
        this.setState({
          photos: photos.photo
        })
      }
    } catch (error) {
      this.setState({photos:[]})
      console.log('there has been an error fetching photos');
    }
  }


  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <SearchForm />
          <Navbar />
          <Switch>
            <Route exact path="/" render={() => <Redirect to='/forest' />} />
            <Route path="/search/:query" component={PhotoList} />
            <Route path="/bikes" component={PhotoList} />
            <Route path="/forest" component={PhotoList} />
            <Route path="/landscapes" component={PhotoList} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
