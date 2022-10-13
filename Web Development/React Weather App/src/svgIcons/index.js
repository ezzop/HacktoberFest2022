import React from 'react'

// All Icons adapted from Sihan Liu's Icons at IconFinder:
// https://www.iconfinder.com/iconsets/weather-color-2

// Some other nice options:
// https://www.iconfinder.com/iconsets/the-weather-is-nice-today

import { ClearDayIcon } from './ClearDayIcon'
import { ClearNightIcon } from './ClearNightIcon'
import { CloudyIcon } from './CloudyIcon'
import { RainMediumIcon } from './RainMediumIcon'
import { RainHeavyIcon } from './RainHeavyIcon'
import { SnowIcon } from './SnowIcon'
import { WindyDayIcon } from './WindyDayIcon'
import { FogIcon } from './FogIcon'
import { PartlyCloudyDayIcon } from './PartlyCloudyDayIcon'
import { PartlyCloudyNightIcon } from './PartlyCloudyNightIcon'
import { HailIcon } from './HailIcon'
import { LightningIcon } from './LightningIcon'
import { TornadoIcon } from './TornadoIcon'
import { SunriseIcon } from './SunriseIcon'
import { SunsetIcon } from './SunsetIcon'
import { WarningIcon } from './WarningIcon'
import { GraphIcon } from  './GraphIcon'


const Icons = props => ({
   // commonly used darksky icon names
   "clear-day": <ClearDayIcon {...props} />,
   "clear-night": <ClearNightIcon {...props} />,
   "rain": <RainMediumIcon {...props} />,
   "snow": <SnowIcon {...props} />,
   "sleet": <RainHeavyIcon {...props} />,
   "wind": <WindyDayIcon {...props} />,
   "fog": <FogIcon {...props} />,
   "cloudy": <CloudyIcon {...props} />,
   "partly-cloudy-day": <PartlyCloudyDayIcon {...props} />,
   "partly-cloudy-night": <PartlyCloudyNightIcon {...props} />,
   "sunrise": <SunriseIcon {...props} />,
   "sunset": <SunsetIcon {...props} />,
   // potential future icon names
   "hail": <HailIcon {...props} />,
   "thunderstorm": <LightningIcon {...props} />,
   "tornado": <TornadoIcon {...props} />,
   // other good icons
   "warning": <WarningIcon {...props} />,
   "graph": <GraphIcon {...props} />
})

const WeatherIcon = props => Icons(props)[ props.icon ]


export default WeatherIcon