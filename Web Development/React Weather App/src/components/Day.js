import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import '../css/Day.scss'
import { days, daysFull, months, monthsFull } from '../constants.js'
import Hourly from './Hourly'
import Moon from './Moon'
import WeatherIcon from '../svgIcons'


//----------------------------------------------------------------//
//    Generic Use functions and terms
//----------------------------------------------------------------//


const currentTimeStamp = new Date().getTime()

const  convertTimeStamp = (timestamp, timezone) => {
   let date = new Date(timestamp * 1000)
   return date.toLocaleTimeString("en-US", { timeZone: timezone }).split(":00 ").join(" ")
}


class Day extends React.Component {
   constructor(props){
      super(props)
      this.state = {
         style: 'normal'
      }
   }

   expandDay = (e) => {
      e.stopPropagation()
      let clickedDay = e.currentTarget.getAttribute('number')
      this.props.expandDay(clickedDay)
   }

   componentDidUpdate(prevProps) {

      const clickedDay = this.props.expandedDay

      if (prevProps.expandedDay !== this.props.expandedDay && clickedDay == this.props.number){
         this.setState({
            style: 'expanded'
         })
      } else if (prevProps.expandedDay !== this.props.expandedDay && clickedDay && clickedDay !== this.props.number){
         this.setState({
            style: 'faded'
         })
      } else if (prevProps.expandedDay !== this.props.expandedDay && !clickedDay){
         this.setState({
            style: 'normal'
         })
      }

   }

   render(){

      const { weatherData, number } = this.props
      const { timezone } = weatherData
      const { temperatureHigh, 
         temperatureLow, 
         temperatureMaxTime,
         temperatureMinTime,
         humidity,
         sunriseTime,
         sunsetTime,
         moonPhase,
         summary, 
         icon } = weatherData.daily.data[this.props.number]

      const thisDay = new Date( currentTimeStamp + 86400000 * number )
      const todaysData = weatherData.hourly.data.slice(1 + number*24, 1 + (number + 1)*24)


      let moonText
      
      if ( moonPhase > 0 && moonPhase < 0.25) {
         moonText = 'Waxing Crescent'
      } else if ( moonPhase > 0.25 && moonPhase < 0.5 ) {
         moonText = 'Waxing Gibbous'
      } else if ( moonPhase > 0.5 && moonPhase < 0.75 ) {
         moonText = 'Waning Gibbous'
      } else if ( moonPhase > 0.75 && moonPhase < 1 ) {
         moonText = 'Waning Crescent'
      } 
      if ( Math.abs(0-moonPhase) <= 0.02 ) {
         moonText = 'New Moon'
      } else if ( Math.abs(0.25-moonPhase) <= 0.02 ) {
         moonText = 'First Quarter Moon'
      } else if ( Math.abs(0.5-moonPhase) <= 0.02 ) {
         moonText = 'Full Moon'
      } else if ( Math.abs(0.75-moonPhase) <= 0.02 ) {
         moonText = 'Last Quarter Moon'
      }

      const illumination = moonPhase < 0.5 ? moonPhase * 2 * 100 : ( 1 - moonPhase ) * 2 * 100
      const dayClass = todaysData.length === 24 ? 'with-hourly' : ''

      return (
         <div className={`Day ${this.state.style}`} number={number} onClick={this.expandDay} >

            <div className={`summaryDay`}>
               <h2>
                  { days[ thisDay.getDay() ] }
               </h2>
               <h2 className="date">
                  { months[thisDay.getMonth()] } { thisDay.getDate() }
               </h2>
               <WeatherIcon icon={icon} className="weatherIcon" style={{width: '100px'}} />
               <p className="maxTemp">{temperatureHigh.toFixed(0)} °F</p>
               <p className="minTemp">{temperatureLow.toFixed(0)} °F</p>
               <div className="clickme-overlay">
                  <div><FaChevronLeft /></div>
                  <div><FaChevronRight /></div>
               </div>
            </div>


            <div className={`expandedDay ${dayClass}`}>

               <header>
                  <WeatherIcon icon={icon} className="weatherIcon" />
                  <div className="title">
                     <h2>{ daysFull[ thisDay.getDay() ] }, { monthsFull[ thisDay.getMonth() ] } { thisDay.getDate() }</h2>
                     <p>{summary}</p>
                  </div>
               </header>

               <Hourly number={number} />

               <section className="details">

                  <p><span className="temp">{Math.round(temperatureHigh)}°F</span> High at {convertTimeStamp(temperatureMaxTime, timezone)}</p>
                  <p><span className="temp">{Math.round(temperatureLow)}°F</span> Low at {convertTimeStamp(temperatureMinTime, timezone)}</p>
                  {/* <p>Humidity: {(humidity * 100).toFixed(0)}%</p> */}

                  <div className="icon-value-pair">
                     <WeatherIcon icon={'sunrise'} className="sunriseIcon" />
                     Sunrise: {convertTimeStamp(sunriseTime, timezone)}
                  </div>
                  <div className="icon-value-pair">
                     <WeatherIcon icon={'sunset'} className="sunriseIcon" />
                     Sunset: {convertTimeStamp(sunsetTime, timezone)}
                  </div>
                  {/* <p>DS Lunation #: {moonPhase}</p> */}
                  <div className="icon-value-pair">
                     <Moon moonPhase={moonPhase} number={number} className="sunriseIcon" />
                     {illumination.toFixed(0)}% Illumination <br /> {moonText}
                  </div>
               </section>


            </div>

         </div>
      )
   }
}

export default Day;