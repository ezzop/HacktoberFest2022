import React from 'react'
import '../css/Moon.scss'
import { drawPlanetPhase } from '../moonphase'

// uses function from http://codebox.org.uk/pages/html-moon-planet-phases
// darksky moonphase units: https://darksky.net/dev/docs#data-point-object

class Moon extends React.Component{

   shadowStyle = {
      left: `${2 * ( 0.5 - this.props.moonPhase ) * 100}%`,
   }

   moonPhaseStyle = {
      lightColour: 'white',
      shadowColour: 'var(--background-color)',
      diameter: 32,
      earthshine: 1
   }

   componentDidMount(){

      const id = document.getElementById(`Moon-${this.props.number}`)

      // Adapting the darksky lunation number to fit with the drawPlanetPhase function lunation number and shadow side
      const moonPhase = this.props.moonPhase <= 0.5 ? this.props.moonPhase * 2 : (1-this.props.moonPhase) * 2
      const shadowRight = this.props.moonPhase <= 0.5 ? true : false

      drawPlanetPhase(id, moonPhase, shadowRight);
      
   }

   render(){
      return <div className={`Moon ${this.props.className}`} id={`Moon-${this.props.number}`}></div>
   }


}

export default Moon