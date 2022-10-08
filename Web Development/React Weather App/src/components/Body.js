import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'

import Empty from './Empty'
import Error from './Error'
import WeatherSpinner from './WeatherSpinner'
import Week from './Week'
import LocationList from './LocationList';
import WeatherHistory from './WeatherHistory'
import WeatherIcon from '../svgIcons'

class Body extends React.Component{

   componentDidMount(){
      window.routerhistory = this.props.history
   }

   componentDidUpdate(prevProps){
      if (prevProps.route !== this.props.route){
         console.log(this.props.route)
         this.props.history.push(this.props.route)
      }
   }

   render(){

      const { dataReady, weatherData, locationData, showMoreLocations, showWeatherHistory, locationIndex, callerError, weatherSpinnerOpen } = this.props   


      return (
         <>
            {/* {weatherSpinnerOpen && <WeatherSpinner />}
            {dataReady && !callerError && !weatherSpinnerOpen && !showMoreLocations && !showWeatherHistory && 
               <Week locationIndex={locationIndex}
               locationData={locationData} weatherData={weatherData} showMoreLocations={showMoreLocations} openLocationList={this.openLocationList}
               />}
            {showWeatherHistory && <WeatherHistory />}
            {callerError && <Error />}
            {showMoreLocations &&  
               <LocationList locationData={locationData} locationIndex={locationIndex} />} */}

            {weatherSpinnerOpen && <WeatherSpinner />}
            
            <Switch>
               <Route exact path="/" component={Empty} />
               <Route path="/forecast" component={Week} />
               <Route path="/locationlist" component={LocationList} />
               <Route path="/weatherhistory" component={WeatherHistory} />
               <Route path="/err" component={Error} />
               <Route render={
                  () => <>
                        <WeatherIcon icon="warning" className="warning-icon" />
                        <h3>Oops!  There's nothing here.  Go back!</h3>
                     </>
               } />
            </Switch>
         </>
      )

   }

}

const mapStateToProps = (state) => {
   return {
      route: state.currentRoute,
      dataReady: state.data.forecast.ready,
      weatherData: state.data.forecast.data,
      locationData: state.data.locations.data,
      locationIndex: state.data.locations.index,
      showMoreLocations: state.show.moreLocations,
      showWeatherHistory: state.show.weatherHistory,
      callerError: state.data.callerError,
      weatherSpinnerOpen: state.show.weatherSpinner
   }
}


export default connect(mapStateToProps)(withRouter(Body))
