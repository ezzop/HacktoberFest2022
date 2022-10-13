import React from 'react'
import { useSelector } from 'react-redux'

import DarkskyIcon from '../svgIcons/darksky-favicon.png'
import MeteostatIcon from '../svgIcons/meteostat-favicon.png'
import NomiatimIcon from '../svgIcons/nominatim-favicon.png'


const Footer = () => {

   const theme = useSelector(state => state.theme.name)
   const locationsOpen = useSelector(state => state.show.moreLocations)

   if (!locationsOpen){
      return (
         <footer>
            <p>
               Powered by: 
                  <a className="footer-link" href="https://darksky.net/dev" target="_blank" rel="noopener noreferrer">
                     <img alt="darksky icon" src={DarkskyIcon} />
                     DarkSky
                  </a>
                  <a className="footer-link" href="https://api.meteostat.net/" target="_blank" rel="noopener noreferrer">
                     <img alt="meteostat icon" src={MeteostatIcon} />
                     meteostat
                  </a>
                  <a className="footer-link" href="https://nominatim.org/" target="_blank" rel="noopener noreferrer">
                     <img style={theme === "nighttime" ? {filter: `invert(100%)`} : {} } alt="nominatim icon" src={NomiatimIcon} />
                     Nominatim
                  </a>
            </p>
         </footer>
      )
   }

   return null


}



export default (Footer)