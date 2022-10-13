import React from 'react'
import { withRouter } from 'react-router-dom'
import { Spinner1 } from './WeatherSpinner'
import { connect } from 'react-redux'
import ReactLogo from '../svgIcons/react-logo.svg'
import ReduxLogo from '../svgIcons/redux-logo.svg'


class LogoHeader extends React.Component {
   render () {
      return(
         <div className={`LogoHeader ${
            (this.props.history.location.pathname !== '/'
               && (this.props.forecastReady || this.props.weatherHistoryReady)) 
               || this.props.weatherSpinnerOpen || this.props.callerError
                  ? 'step-aside' 
                  : ''
         }`}>
            <img className="slowSpin" src={ReactLogo} />
            <Spinner1 />
            <img className="slowSpin" src={ReduxLogo} />
         </div>

      )
   }
}

const mapStateToProps = (state) => {
   return {
      weatherSpinnerOpen: state.show.weatherSpinner,
      forecastReady: state.data.forecast.ready,
      weatherHistoryReady: state.data.history.ready,
      callerError: state.data.callerError
   }
}

export default connect(mapStateToProps)(withRouter(LogoHeader));
