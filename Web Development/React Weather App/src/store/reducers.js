import {
   TYPE_IN_CITYNAME_FIELD,
   TYPE_IN_ZIP_FIELD,
   SHOW_SPINNER,
   THROW_CALLER_ERROR,
   RECIEVE_LOCATION_DATA,
   RECIEVE_WEATHER_DATA,
   INCREMENT_WEATHER_STATION,
   RESET_WEATHER_STATION_INDEX,
   RECIEVE_WEATHER_HISTORY,
   VIEW_LOCATIONLIST,
   CHANGE_LOCATION,
   CHANGE_THEME,
   VIEW_WEATHER_HISTORY
 } from './actions'

import { darkTheme, lightTheme } from '../components/ThemeChanger'
import { sampleData } from '../constants'

export const initialState = {

   // Revised state tree - makes more sense
   currentRoute: '/',
   show: { // for now, until I implement router
      moreLocations: false,
      weatherHistory: false,
      weatherSpinner: false,
   },
   theme: lightTheme,
   userInput: {
      zipValue: '',
      cityValue: ''
   },
   data: {
      callerError: false,
      userPosition: undefined,
      locations: {
         data: '',
         index: 0
      },
      forecast: {
         ready: false,
         data: ''
      },
      history: {
         ready: false,
         station: {
            index: 0,
            id: '',
            name: '',
            distance: ''
         },
         data: ''
      }
   },

}


export function rootReducer(state = initialState, action) {
   switch(action.type){

      case TYPE_IN_CITYNAME_FIELD:
         return{
            ...state,
            userInput: {
               ...state.userInputs,
               cityValue: action.cityValue
            }
         }

      case TYPE_IN_ZIP_FIELD:
         return {
            ...state,
            userInput: {
               ...state.userInputs,
               zipValue: action.zipValue
            }
         }

      case SHOW_SPINNER:
      return {
         ...state,
         data: {
            ...state.data,
            callerError: null
         },
         show: {
            moreLocations: action.showMoreLocations,
            weatherHistory: action.showWeatherHistory,
            weatherSpinner: action.weatherSpinnerOpen,
         },
      }

      case RECIEVE_LOCATION_DATA:
         return {
            ...state,
            data: {
               ...state.data,
               callerError: false,
               locations: {
                  data: action.data,
                  index: 0
               }
            },
         }

      case RECIEVE_WEATHER_DATA:
         return {
            ...state,
            currentRoute: '/forecast',
            data: {
               ...state.data,
               callerError: false,
               forecast: {
                  ready: true,
                  data: action.data
               }
            },
            show: {
               ...state.data.show,
               weatherSpinner: false,
               moreLocations: false
            },
         }

      case INCREMENT_WEATHER_STATION:
         return {
            ...state,
            data: {
               ...state.data,
               history: {
                  ...state.data.history,
                  station: {
                     index: action.index,
                     id: action.id,
                     name: action.name,
                     distance: action.distance
                  }
               }
            }
         }
      
      case RESET_WEATHER_STATION_INDEX:
         return {
            ...state,
            data: {
               ...state.data,
               history: {
                  ...state.data.history,
                  station: {
                     ...state.data.history.station,
                     index: action.index,
                  }
               }
            }
         }

      case RECIEVE_WEATHER_HISTORY:
         return {
            ...state,
            currentRoute: '/weatherhistory',
            data: {
               ...state.data,
               callerError:false,
               history: {
                  ready: true,
                  data: action.data,
                  station: {
                     index: 0, // reseting for next search - may need its own action
                     id: action.id,
                     name: action.name,
                     distance: action.distance
                  }
               }
            },
            show: {
               ...state.show,
               weatherHistory: true,
               weatherSpinner: false
            }
         }

      case THROW_CALLER_ERROR:
         return {
            ...initialState,
            currentRoute: '/err',
            data: {
               ...state.data,
               callerError: action.error,
            },
         }

      case VIEW_LOCATIONLIST:
         return {
            ...state,
            currentRoute: '/locationlist',
            show: {
               ...state.show,
               moreLocations: action.showMoreLocations
            },
         }

      case VIEW_WEATHER_HISTORY:
         return {
            ...state,
            currentRoute: '/history',
            show: {
               ...state.show,
               weatherHistory: action.showWeatherHistory
            },
         }

      case CHANGE_LOCATION:
         return {
            ...state,
            data: {
               ...state.data,
               locations: {
                  ...state.data.locations,
                  index: action.chosenIndex
               },
               forecast: {
                  ...state.data.forecast,
                  ready: false
               }
            },
            show: {
               ...state.show,
               moreLocations: false
            },
         }

      case CHANGE_THEME:
         return {
            ...state,
            theme: action.payload
         }

      default:
         return state

   }
}
