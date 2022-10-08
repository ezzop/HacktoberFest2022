import store from './store'
import { lightTheme, darkTheme } from '../components/ThemeChanger'
import { monthsFull, celciusToFerinheight } from '../constants.js'


export const GEOLOCATE_USER = "GEOLOCATE_USER";

export const TYPE_IN_CITYNAME_FIELD = "TYPE_IN_CITYNAME_FIELD"
export const TYPE_IN_ZIP_FIELD = "TYPE_IN_ZIP_FIELD"
export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const SHOW_SPINNER = "SHOW_SPINNER";
export const RECIEVE_LOCATION_DATA = "RECIEVE_LOCATION_DATA";
export const RECIEVE_WEATHER_DATA = "RECIEVE_WEATHER_DATA";
export const INCREMENT_WEATHER_STATION = "INCREMENT_WEATHER_STATION";
export const RESET_WEATHER_STATION_INDEX = "RESET_WEATHER_STATION_INDEX";
export const RECIEVE_WEATHER_HISTORY = "RECIEVE_WEATHER_HISTORY";
export const THROW_CALLER_ERROR = "THROW_CALLER_ERROR";
export const VIEW_LOCATIONLIST = "OPEN_LOCATIONLIST";
export const VIEW_WEATHER_HISTORY = "VIEW_WEATHER_HISTORY";
export const CHANGE_LOCATION = "CHANGE_LOCATION";
export const CHANGE_THEME = "CHANGE_THEME";


const dsAPIKey = '8bc745aa5c2da5e2367d048fdb76ca8a'
const meteoStatKey = 'ISjQKF2F'


export function geolocateUser(){

   const options = {
      enableHighAccuracy: true,
      maxTimeout: 5000,
   }

   const success = (userLocation) => {

      // Get user's location and time of day
      // console.log('userLocation', userLocation)
      const userCurrentTime = userLocation.timestamp

      const lat = userLocation.coords.latitude
      const lon = userLocation.coords.longitude
      const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

      // Fetch weather data and get sunrise and sunset time
      // Compare with user's current time to choose night or day theme
      fetch(url)
         .then( results => results.json() )
         .then( userWeather => {
            // console.log('localWeather', userWeather)
            const userSunriseTime = userWeather.daily.data[0].sunriseTime*1000
            const userSunsetTime = userWeather.daily.data[0].sunsetTime*1000

            // console.log('userSunriseTime', userSunriseTime, 'userSunsetTime', userSunsetTime, 'userCurrentTime', userCurrentTime);

            if (userSunriseTime < userCurrentTime && userCurrentTime < userSunsetTime){
               console.log('it is daytime');
               store.dispatch( setTheme(lightTheme) )
            } else {
               console.log('it is nighttime')
               store.dispatch( setTheme(darkTheme) )
            }
         })
         .catch( error => console.log(error) )
   }

   const error = (error) => {
      console.log(error)
   }

   navigator.geolocation.getCurrentPosition(success, error, options)

}

export function setTheme(theme){
   document.documentElement.style.setProperty("--foreground-color", theme.foregroundColor);
   document.documentElement.style.setProperty("--background-color", theme.backgroundColor);
   document.documentElement.style.setProperty("--sun-color", theme.sunColor);

   return{
      type: CHANGE_THEME,
      payload: theme
   }
}

export function typeZip(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('zipValue', searchTerm)()
   }
   return {
      type: TYPE_IN_ZIP_FIELD,
      zipValue: e.target.value
   }
}

export function typePlacename(e){
   if (e.keyCode === 13 && e.target.value.trim().length > 0){
      let searchTerm = encodeURIComponent(e.target.value)
      searchLocation('cityValue', searchTerm)()
   }
   return {
      type: TYPE_IN_CITYNAME_FIELD,
      cityValue: e.target.value
   }
}

export function showSpinner(message){
   return {
      type: SHOW_SPINNER,
      weatherSpinnerOpen: message,
      showMoreLocations: false,
      showWeatherHistory: false
   }
}

export function searchLocation(name, searchTerm) {

   const makeSearchTerm = {
      domestic: {
         cityValue: function(cityValue){
            return `https://nominatim.openstreetmap.org/search?q=${cityValue}&limit=50&format=json`
         },
         zipValue: function(zipValue){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&country=US&limit=50&format=json`
         }
      },
      international: {
         cityValue: function(cityValue){
            return `https://nominatim.openstreetmap.org/search?city=${cityValue}&limit=50&format=json`
         },
         zipValue: function(zipValue){
            return `https://nominatim.openstreetmap.org/search?postalcode=${zipValue}&limit=50&format=json`
         }
      }
   }

   store.dispatch( showSpinner('Loading Weather...') )

   const url = makeSearchTerm.domestic[name](searchTerm)
   // console.log(url)
   return function() {
      return fetch(url)
         .then( response => response.json() )
         .then ( locationData => {
            // console.log( locationData )
            if (locationData.length >= 1){
               store.dispatch( receiveLocationData( locationData ) )
               getWeather(locationData, store.getState().data.locations.index)()
            } else if (locationData.length > 2){
               store.dispatch( receiveLocationData( locationData ) )
               getWeather(locationData, store.getState().data.locations.index)()

            } else {
               store.dispatch(throwCallerError("No results returned.  Try another search term.") )
            }
         })
         .catch( error => {
            store.dispatch(throwCallerError(error))
            throw(error)
         } )
   }
}

export function receiveLocationData(locationData){
   return {
      type: RECIEVE_LOCATION_DATA,
      data: locationData,
      showWeatherHistory: false
   }
}

export function getWeather(locationData, locationIndex) {

   // If weatherspinner is already open from location search, don't open it again
   if (!store.getState().show.weatherSpinner){
      store.dispatch( showSpinner('Loading Weather...') )
   }

   //  Feed the lat lng into the weather caller
   let lat = locationData[locationIndex].lat
   let lon = locationData[locationIndex].lon
   let url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}?extend=hourly`
   // let url = `https://api.darksky.net/forecast/${dsAPIKey}/${lat},${lon}`

   let fetchOptions = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
        'Access-Control-Allow-Headers': 'http://localhost:3000'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }


   return function () {

      fetch(url)
         .then( results => results.json() )
         .then( weatherData => {
            store.dispatch( receiveWeatherData(weatherData) )
         })
         .catch( (error) => {
            store.dispatch(throwCallerError(error.message))
         })


   }
}

export function receiveWeatherData(data){
   return {
      type: RECIEVE_WEATHER_DATA,
      data: data,
      weatherSpinnerOpen: false
   }
}




export function getWeatherHistory() {

   // First show the loading spinner:
   store.dispatch( showSpinner('Loading Weather History...') )

   const locationData = store.getState().data.locations.data
   const locationIndex = store.getState().data.locations.index

   // Craft url from lat and lng from the location
   const lat = locationData[locationIndex].lat
   const lon = locationData[locationIndex].lon
   const stationlimit = 100

   const meteostatSearchUrl = `https://api.meteostat.net/v1/stations/nearby?lat=${lat}&lon=${lon}&limit=${stationlimit}&key=${meteoStatKey}`

   const { index } = store.getState().data.history.station

   return function(){
      fetch(meteostatSearchUrl)
      .then( response => response.json() )
      .then( historyData => {
         // console.log(historyData)
         const totalstations = historyData.data.length
         const { id, name, distance } = historyData.data[index]
         getHistoryFromWeatherStation(id, name, distance, totalstations)()
      })
      // .catch( (error) => {
      //    store.dispatch(throwCallerError(error.message))
      // })
   }


}



// Fetch URL that gets weather history from weather station number.  Currently the time period is static
export const getHistoryFromWeatherStation = ( id, name, distance, totalstations) => {

   const { index } = store.getState().data.history.station

   const meteostatHistoryURL = `https://api.meteostat.net/v1/history/monthly?station=${id}&start=1990-01&end=2019-12&key=${meteoStatKey}`
   const maxRadius = 50 //in miles
   const maxRaiusKm = maxRadius * 1.60934

   return function(){
      fetch(meteostatHistoryURL)
      .then( response => response.json() )
      .then( data => {
         if (data.data.length > 1){

            if (Number(distance) > maxRaiusKm) {
               store.dispatch(throwCallerError("No weather history available within 20km"))
            } else {
               console.log('History Data', data.data)
               const processedData = processWeatherHistoryData(data.data)
               store.dispatch( receiveWeatherHistory(processedData, id, name, distance) )
            }

         } else {

            // console.log("checking station index", store.getState().data.history.station.index)
            // console.log('distance', distance)

            if (index + 1 >= totalstations) {
               store.dispatch(throwCallerError(`Sorry, weather history and trends not available for this location.  Try searching for a nearby location.`))
               store.dispatch( resetWeatherStationIndex() )
            } else {
               store.dispatch( incrementWeatherStation(id, name, distance) )
               store.dispatch( getWeatherHistory() )
            }
            
         }


      })
      // .catch( (error) => {
      //    store.dispatch(throwCallerError(error.message))
      // })
   }
}

export const incrementWeatherStation = (id, name, distance) => {
   return{
      type: INCREMENT_WEATHER_STATION,
      index: store.getState().data.history.station.index + 1,
      id,
      name,
      distance
   }
}

export const resetWeatherStationIndex = () => {
   return {
      type: RESET_WEATHER_STATION_INDEX,
      index: 0
   }
}


export const receiveWeatherHistory = (data, id, name, distance) => {
   return{
      type: RECIEVE_WEATHER_HISTORY,
      data,
      id,
      name, 
      distance,
      index: 0
   }
}


// export function getWeatherHistory(weatherStationNumber){

//    let meteostatHistoryURL = `https://api.meteostat.net/v1/history/monthly?station=${weatherStationNumber}&start=2009-01&end=2019-12&key=${meteoStatKey}`

//    fetch(meteostatHistoryURL)
//       .then( response => response.json() )
//       .then( data => console.log('meteostat history', data) )

// }


export const processWeatherHistoryData = (data) => {

   function processData(data) {
      processByMonth(data)
      processByType()
   }

   const dataByMonth = [];
   for (var i = 0; i <= 11; i++) {
      dataByMonth.push({})
   }

   function processByMonth(data){

      // ---- First round of processing - organizing into the structure I need for raw celcius values
      dataByMonth.forEach( (month, index) => {

         month.datum = {
            c: {},
            f: {},
         }

         const allData = filterByMonth(data, index+1)

         month.name = monthsFull[index]
         month.datum.c = {
            "Average Temperature": 
               average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean') ) ),
            "Average High Temp": 
               average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean_max') ) ),
            "Average Low Temp": 
               average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean_min') ) ),
            "Record High": [
               Math.max( ...nullFilteredMaxArray( extractValues( filterByMonth(data, index+1), 'temperature_max') ) ), 
               allData[indexOfMaxValue( nullFilteredMaxArray( extractValues( filterByMonth(data, index+1), 'temperature_max') ) )].month 
            ],
            "Record Low": [
               Math.min( ...nullFilteredMinArray( extractValues( filterByMonth(data, index+1), 'temperature_min') ) ),
               allData[indexOfMinValue( nullFilteredMinArray( extractValues( filterByMonth(data, index+1), 'temperature_min') ) )].month 
            ],
            "Total Rainfall": 
               average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'precipitation') ) ),
         }

         month.datum.f = {
            "Average Temperature": 
               celciusToFerinheight(average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean') ) ) ),
            "Average High Temp": 
               celciusToFerinheight( average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean_max') ) ) ),
            "Average Low Temp": 
               celciusToFerinheight( average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'temperature_mean_min') ) ) ),
            "Record High": [
               celciusToFerinheight( Math.max( ...nullFilteredMaxArray( extractValues( filterByMonth(data, index+1), 'temperature_max') ) ) ), 
               allData[indexOfMaxValue( nullFilteredMaxArray( extractValues( filterByMonth(data, index+1), 'temperature_max') ) )].month 
            ],
            "Record Low": [
               celciusToFerinheight( Math.min( ...nullFilteredMinArray( extractValues( filterByMonth(data, index+1), 'temperature_min') ) ) ),
               allData[indexOfMinValue( nullFilteredMinArray( extractValues( filterByMonth(data, index+1), 'temperature_min') ) )].month 
            ],
            "Total Rainfall": 
               average( filterArrayByNull( extractValues( filterByMonth(data, index+1), 'precipitation') ) ) / 25.4,
         }

      } ) //forEach


      // ---- Second round: transforming into Farenheight Units (American Units)
      // const dataTypes = Object.keys(dataByMonth[0].datum.c.raw)

      // dataTypes.forEach( type => {
      //    dataByMonth.forEach( month => {

      //       month.datum.f.raw[type] = celciusToFerinheight(month.datum.c.raw[type])
            
      //    }) // forEach dataByMonth
      // })  // forEach dataTypes



   } // processData

   // console.log('dataByMonth', dataByMonth)

   
   // ---- Fifth round: reorganizing to categorize by weather data type
   const dataByType = []

   function processByType(){

      const dataTypes = Object.keys(dataByMonth[0].datum.c)

      dataTypes.forEach( typeName => {
         dataByType.push({
            name: typeName,
            datum: {
               c: {},
               f: {},
            }
         })
      })

      dataByMonth.forEach( month => {
         dataByType.forEach( type => {
            let thisMonth = month.name
            type.datum.c[thisMonth] = (dataByMonth.filter( month => month.name === thisMonth))[0].datum.c[type.name]
            type.datum.f[thisMonth] = (dataByMonth.filter( month => month.name === thisMonth))[0].datum.f[type.name]

         })
      })

      // console.log('dataByType', dataByType)


   }

   //  The following functions can be piped
   //  How to pipe: https://www.freecodecamp.org/news/10-ways-to-write-pipe-compose-in-javascript-f6d54c575616/

   const filterByMonth = (data, month) => data.filter( entry => Number(entry.month.slice(entry.month.length-2, entry.month.length)) === month )
   
   const extractValues = (array, subvalue) => array.map( value => value[subvalue])

   const average = values => values.reduce( (a, b) => a + b, 0) / values.length

   const round = (value, n) => Number(value.toFixed(n))

   // Get index of max value(s) in an array
   // bitten from https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array/11301464
   const indexOfMaxValue = a => a.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
   const indexOfMinValue = a => a.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0);

   // Filter out null values of an array
   const filterArrayByNull = array => array.filter( item => item )

   // To find min and max, and indexes thereof, need to turn null into infinity (when looking for min) and turn null into -infinity (when looking for max)
   // bitten from https://stackoverflow.com/questions/11817861/math-min-apply-returns-0-for-null
   const nullFilteredMaxArray = array => array.map( item => item == null ? -Infinity : item )
   const nullFilteredMinArray = array =>  array.map( item => item == null ? Infinity : item )

   // console.log(dataByMonth)
   // console.log(dataByType)

   processData(data)

   return {
      byMonth: dataByMonth,
      byType: dataByType
   }

   

}









export function throwCallerError(error){
   return {
      type: THROW_CALLER_ERROR,
      error: error
   }
}



export function viewLocationlist(){
   return {
      type: VIEW_LOCATIONLIST,
      showMoreLocations: true
   }
}

export function viewWeatherHistory(){
   console.log('view weather history')
   return {
      type: VIEW_WEATHER_HISTORY,
      showWeatherHistory: true
   }
}

export function changeLocation(e){
   getWeather(store.getState().data.locations.data, e.target.getAttribute('number'))()
   return {
      type: CHANGE_LOCATION,
      showMoreLocations: false,
      chosenIndex: e.target.getAttribute('number')
   }
}