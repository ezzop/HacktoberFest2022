import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import WeatherIcon from '../svgIcons'

const Error = () => {

   const [visible, setVisible] = useState(false)

   console.log('visible', visible)

   useEffect( () => {
      setVisible(true)
   } , [] )

   console.log('visible', visible)


   const callerError = useSelector(state => state.data.callerError)
   const loaderingScreenOpen = useSelector(state => state.show.weatherSpinner)
   
   if (!loaderingScreenOpen){
      return(
         <CSSTransition 
            in={visible} 
            appear
            classNames="error-transition"
            timeout={500} >

            <div className="Error">
               <WeatherIcon icon="warning" className="warning-icon" />
               <h3 className="error">{callerError}</h3>
            </div>

         </CSSTransition>
      )
   }

   return null

}

export default Error
