import React from 'react';
import { Switch, Route } from 'react-router-dom'

import SearchBar from './Search';
import BackButton from './BackButton'
import ThemeChanger from './ThemeChanger';
import LogoHeader from './LogoHeader';
import Body from './Body';
import Footer from './Footer'

import { geolocateUser } from '../store/actions';


class App extends React.Component {

   componentDidMount(){
      geolocateUser()
   }

   render(){
      return (
         <div className="App">

            <h1>React Redux Weather Forecast App</h1>
            <ThemeChanger />
            <LogoHeader />
            <SearchBar />
            <Body />
            <Footer />
            <BackButton />

         </div>


         

      );
   }

} // App


export default App;
