import React from 'react';
import { Link } from 'react-router-dom'
import store from '../store/store'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { viewLocationlist, viewWeatherHistory, getWeatherHistory } from '../store/actions'

import Day from './Day'
import WeatherIcon from '../svgIcons'

class Week extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         visible: false,
         expandedDay: null
      }
   }

   componentDidMount(){
      this.setState({
         visible: true
      })
   }


   expandDay = (clickedDay) => {
      if (this.state.expandedDay){
         this.setState({expandedDay: null})
      } else {
         this.setState({expandedDay: clickedDay})
      }
   }
   

   render (){

      if (!this.props.dataReady || this.props.weatherSpinnerOpen){
         return null
      }

      let days = [];
      for (var i = 0; i < 7 ; i++) {
         days.push(
            <Day number={i} key={i} units="F" 
               locationData={this.props.locationData}
               weatherData={this.props.weatherData}
               expandDay={this.expandDay}
               expandedDay={this.state.expandedDay} />
         )
      }

      return(
         <CSSTransition 
            in={this.state.visible} 
            appear 
            classNames="forecast" 
            timeout={500} >

            <div id="forecast">
               <h3>Weather for {this.props.locationData[this.props.locationIndex].display_name}</h3>
               {this.props.locationData.length > 1 &&
               <h5>Were you looking for something else?  Your search returned {this.props.locationData.length-1} other result{this.props.locationData.length > 2 ? 's' : ''}. <Link onClick={ this.props.viewLocationlist }>Click here to see {this.props.locationData.length > 2 ? 'them' : 'it'}</Link></h5>
               }
               <h5 className="history-title">
                  <WeatherIcon icon="graph" className="weather-history-icon" />
                  <Link onClick={this.props.getWeatherHistory}>View Weather History and Trends</Link>
               </h5>


               <div className="Week">
                  {days}
               </div>

            </div>
            
         </CSSTransition>

      )

   }
}

const mapStateToProps = state => ({
   weatherSpinnerOpen: state.show.weatherSpinner,
   dataReady: state.data.forecast.ready,
   locationData: state.data.locations.data,
   locationIndex: state.data.locations.index,
   weatherData: state.data.forecast.data
})

const mapDispatchToProps = dispatch => {
   return {
      viewLocationlist: () => { store.dispatch( viewLocationlist() ) },
      viewWeatherHistory: () => { store.dispatch( viewWeatherHistory() ) },
      getWeatherHistory: () => { store.dispatch( getWeatherHistory() ) }
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week);
