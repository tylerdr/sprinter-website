import React, { Component } from 'react'
// import GoogleMapReact from 'google-map-react'
// import { MapPin } from 'react-feather'

// let mapkey = ''
// if (process.env.NETLIFY_MAP_KEY) {
//   mapkey = process.env.NETLIFY_MAP_KEY
// }

class GoogleMap extends Component {
  // static defaultProps = {
  //   center: {
  //     lat: 36.0331,
  //     lng: 86.7828
  //   },
  //   zoom: 14
  // }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <iframe src="https://www.google.com/maps/d/u/0/embed?mid=14kzIy1-akwT3TDnrhufbzEmztvBWbZmj" width="100%" height="350"></iframe>
      </div>
    )
  }
}

export default GoogleMap

// const Marker = () => {
//   return (
//     <div style={{ color: 'red' }}>
//       <MapPin />
//     </div>
//   )
// }
