import React from 'react'
import { connect } from 'react-redux'
import '../css/Hourly.scss'

import { normalizeArray, svgPath, bezierCommand } from '../constants'

const formatHour = timestamp => {
   const date = new Date(timestamp * 1000)
   const hour = date.toLocaleTimeString()
   const formattedHour = `${hour.split(':')[0]} ${hour.split(' ')[1]}`
   return formattedHour
}

class Hourly extends React.Component{

   state = {
      weatherSpec: 'temperature',
      hoveredIndex: undefined
   }

   units = {
      c: {
         temperature: '°C',
         precipitation: 'mm',
         humidity: "%"
      },
      f: {
         temperature: '°F',
         precipitation: 'in',
         humidity: "%"
      }
   }

   render(){

      const { data, number } = this.props
      const todaysData = data.slice(1 + number*24, 1 + (number + 1)*24)

      const test = normalizeArray( todaysData.map( hour => hour[this.state.weatherSpec]), 30 ,80).map( value => Number(value.toFixed(1)) )
      // console.log('test', test)

      const temperaturePoints = todaysData.map( (hour, index) => [index*100 + 50, 100 - test[index]] )
      // console.log('temperaturePoints', temperaturePoints)
      // const formattedTempPoints = JSON.stringify(temperaturePoints).split('],[').join(' ').replace('[[','').replace(']]','')
      const formattedTempPoints = svgPath(temperaturePoints, bezierCommand, 0.2)

      return(

         <section className="Hourly">

            <svg className="graph" viewBox="0 0 2400 100" width="100%" preserveAspectRatio="none">
               <g className="grid x-grid">
                  <line x1="0" x2="2300" y1="100" y2="100"></line>
               </g>
               <g className="grid y-grid">
                  <line x1="2" x2="2" y1="0" y2="100"></line>
               </g>
               <path
                  fill="none"
                  stroke="#0074d9"
                  strokeWidth="3"
                  d={formattedTempPoints} />
               
            </svg>

            <div className="overlay">
               {todaysData.map( (datapoint, index) => {    

                  const barStyle = {
                     backgroundColor: this.state.hoveredIndex === index 
                        ? 'rgba(0,0,200,0.2)' 
                        : `rgba(200,200,200, ${0.2 * (index % 2 === 0 ? 0 : 1)})`
                     }

                  return (
                     <div className="column" key={index} 
                        onMouseEnter={ () => { this.setState({hoveredIndex: index})} } 
                        onMouseLeave={ () => { this.setState({hoveredIndex: undefined})}}
                        style={barStyle}>

                           <p className="data-specs">
                              {(this.state.hoveredIndex === index || (new Date(datapoint.time * 1000).getHours() % 3 === 0)) && 
                                 <>
                                    {datapoint[this.state.weatherSpec].toFixed(0)}{this.units['f'][this.state.weatherSpec]}
                                 </>
                              }
                           </p>

                           <p style={{fontSize: '0.7em'}}>
                              { (new Date(datapoint.time * 1000).getHours() % 3 === 0) &&
                                 <>
                                    {formatHour(datapoint.time)}
                                 </>
                              }
                           </p>
                        
                     </div>
                  )
               })}    
            </div>

            {todaysData.length < 23 && <div>Hourly Data Not Available</div>}

         </section>

      )
   }

}

const mapStateToProps = state => ({
   data: state.data.forecast.data.hourly.data
})

export default connect(mapStateToProps)(Hourly)