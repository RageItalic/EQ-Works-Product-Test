import React, { Component } from "react";
import MapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import axios from "axios";

//I am using a class component instead of a functional compoenent as
//this is my first time using Mapbox and I found a class component to be
//slightly more readable and understandable.

//Map displayed using MAPBOX.
//User can zoom in and out and markers appear clustered when zoomed out far enough.
//User can also see the summed (total) metrics of hourly stats when hovering over a marker.
//Only current issue is that hovering over one marker leads to all markers displaying
//popups with metrics.
//I let this be as is as I thought it might be a good way to compare metrics between locations as is
//asked for in the requirements.
//Although, this "side effect" can be fixed by adding a ref to the markers (using useRef).
//It can also be fixed by removing "popupInfo" from state
//(as it only occurs once and is attached to all markers, thus triggering all popups) and instead
//adding a popupInfo boolean into each individual marker data object in the markerList array.

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapboxGLMap extends Component {
  state = {
    viewport: {
      latitude: 43.653225,
      longitude: -79.383186,
      zoom: 11,
      bearing: 0,
      pitch: 0,
      width: "100%",
      height: 500
    },
    markerList: [],
    popupInfo: null
  };

  //Ideally, in a bigger project, I would not be making api calls from the component file.
  //I would seperate concerns and place all my api calls in functions in a seperate file
  //and then call the functions I need based on the route I need to access.
  //The only reason I did not do this is because this is a smaller project with just a few api calls.

  componentDidMount() {
    axios
      .get("https://hill-roar.glitch.me/stats/hourly/summed-with-poi")
      .then(({ data }) => {
        this.setState({
          markerList: data
        });
      });
  }

  renderPopup(index) {
    const { markerList } = this.state;
    return (
      this.state.popupInfo && (
        <Popup
          tipSize={5}
          anchor="bottom-right"
          longitude={markerList[index].lon}
          latitude={markerList[index].lat}
          onMouseLeave={() => this.setState({ popupInfo: null })}
          closeOnClick={true}
        >
          <p>
            <strong>{markerList[index].name}</strong>
            <br />
            Revenue: {Math.round(markerList[index].revenue)}
            <br />
            Impressions: {markerList[index].impressions}
            <br />
            Clicks: {markerList[index].clicks}
          </p>
        </Popup>
      )
    );
  }

  render() {
    const { viewport, markerList } = this.state;
    return (
      <MapGL
        {...viewport}
        onViewportChange={viewport => this.setState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken={
          "pk.eyJ1IjoicHBhdDk4IiwiYSI6ImNrNmJsM3kzbDEyangza3Bqa2Y4cWV3bzMifQ.2e6L1Hmctoxy_yYpza-uVw"
        }
      >
        <div className="nav" style={navStyle}>
          <NavigationControl
            onViewportChange={viewport => this.setState({ viewport })}
          />
          {markerList.map(({ lon, lat }, index) => {
            return (
              <div key={index}>
                <Marker longitude={lon} latitude={lat}>
                  <div
                    onMouseEnter={() => this.setState({ popupInfo: true })}
                    onMouseLeave={() => this.setState({ popupInfo: null })}
                  >
                    <i class="fas fa-map-marker"></i>
                  </div>
                </Marker>
                {this.renderPopup(index)}
              </div>
            );
          })}
        </div>
      </MapGL>
    );
  }
}
