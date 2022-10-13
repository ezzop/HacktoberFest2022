import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter, useLocation } from 'react-router-dom'
import {useTransition, animated} from 'react-spring'
import { FiArrowLeftCircle } from 'react-icons/fi'

const BackButton = props => {

   const location = useLocation()
   const [visible, setVisible] = useState(false)

   const [show, setShow] = useState(false)
   const transitions = useTransition(show, null, {
      from: { position: 'absolute', opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
   })

   useEffect( () => {
      if (location.pathname === '/' || location.pathname === '/forecast') {
         setVisible(false)
         setShow(false)
      } else {
         setVisible(true)
         setShow(true)
      }
   }, [location])

   const clickBackButton = () => { 
      window.history.back()
   }

   return transitions.map(({ item, key, props }) =>
      item && 
         <animated.div key={key} style={props}>
            <>
               {visible && <div onClick={clickBackButton} className="BackButton" >
                  <FiArrowLeftCircle />
                  <h3>Back <span>to Forecast</span></h3>
               </div>}
            </>
         </animated.div>
   )      

   

}

export default withRouter(BackButton)

