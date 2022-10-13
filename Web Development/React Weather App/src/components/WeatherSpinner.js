// Icons adapted from Dribble by Kylor: 
//https://codemyui.com/animated-weather-icons-in-css/

import React from 'react'
import { connect } from 'react-redux'
import '../css/WeatherSpinner.scss'

export const Spinner1 = () => {
   return(
      <div className="icon sun-shower">
         <div className="cloud"></div>
         <div className="sun">
            <div className="rays"></div>
         </div>
         <div className="rain"></div>
      </div>
   )
}

export const Spinner2 = () => {
   return (
      <div className="icon thunder-storm">
         <div className="cloud"></div>
         <div className="lightning">
            <div className="bolt"></div>
            <div className="bolt"></div>
         </div>
      </div>
   )
}

export const Spinner3 = () => {
   return (
      <div className="icon cloudy">
         <div className="cloud"></div>
         <div className="cloud"></div>
      </div>
   )
}

export const Spinner4 = () => {
   return (
      <div className="icon flurries">
         <div className="cloud"></div>
         <div className="snow">
            <div className="flake"></div>
            <div className="flake"></div>
         </div>
      </div>
   )
}

export const Spinner5 = () => {
   return (
      <div className="icon sunny">
         <div className="sun">
            <div className="rays"></div>
         </div>
      </div>
   )
}

export const Spinner6 = () => {
   return (
      <div className="icon rainy">
         <div className="cloud"></div>
         <div className="rain"></div>
      </div>
   )
}

const allSpinners = [
   <Spinner1 />,
   <Spinner2 />,
   <Spinner3 />,
   <Spinner4 />,
   <Spinner5 />,
   <Spinner6 />
]



class WeatherSpinner extends React.Component {

   componentDidMount = () => {
      // console.log('Spinner Mounted')
   }

   componentDidUpdate = () => {
      // console.log("Spinner updated")
   }

   render () {

      const index = Math.floor( Math.random() * allSpinners.length )

      return(
         <div className="WeatherSpinner">
            <h2 className="loading">{this.props.loadingMessage}</h2>
            {allSpinners[index]}
         </div>
      )
   }
}


const mapStateToProps = (state) => {
   return {
      loadingMessage: state.show.weatherSpinner
   }
}

export default connect(mapStateToProps)(WeatherSpinner);
