import React from 'react';
import { connect } from 'react-redux'
import store from '../store/store'
import { changeLocation } from '../store/actions'

window.store = store

class LocationList extends React.Component {

   render(){

      if (!this.props.locationData || this.props.weatherSpinnerOpen) {
         return null
      }

      const locations = this.props.locationData.map( (locationResult, i) =>
         <div id={`locationResult${i}`} number={i} key={i} className={`location-result ${Number(this.props.locationIndex) === i ? 'current-selection' : ''}`} onClick={ this.props.changeLocation }>
            {locationResult.display_name}
            { Number(this.props.locationIndex) === i && <h5 className="current-selection">Currently selected</h5> }
         </div>
      )

      return(
         <div className="location-list">
            {this.props.locationData.length > 15 &&
               <h4>Your search returned quite a few results.  Consider making your search term more specific</h4>}
            {locations}
         </div>
      )
   };



}


const mapStateToProps = (state) => {
   return {
      weatherSpinnerOpen: state.show.weatherSpinner,
      locationData: state.data.locations.data,
      locationIndex: state.data.locations.index
   }
}

const mapDispatchToProps = (e) => {
   return {
      changeLocation: (e) => store.dispatch( changeLocation(e) )
   }
}


export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
