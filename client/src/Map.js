/*import React, {Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

const coords = {
    lat: 51.5258541,
    lng: -0.08040660000006028
};

const params = {v: '3.exp', key: 'AIzaSyD0dpZoUc_MBJ86CEq4me3KLKWZUmiJ6dY'};

const App = React.createClass({

    onMapCreated(map) {
        map.setOptions({
            disableDefaultUI: true
        });
    },

      onDragEnd(e) {
          console.log('onDragEnd', e);
      },

      onCloseClick() {
          console.log('onCloseClick');
      },

      onClick(e) {
          console.log('onClick', e);
      },

      render() {
          return (
                  <Gmaps
                  width={'800px'}
                  height={'600px'}
                  lat={coords.lat}
                  lng={coords.lng}
                  zoom={12}
                  loadingMessage={'Be happy'}
                  params={params}
                  onMapCreated={this.onMapCreated}>
                  <Marker
                  lat={coords.lat}
                  lng={coords.lng}
                  draggable={true}
                  onDragEnd={this.onDragEnd} />
                  <InfoWindow
                  lat={coords.lat}
                  lng={coords.lng}
                  content={'Hello, React :)'}
          onCloseClick={this.onCloseClick} />
              <Circle
              lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick} />
              </Gmaps>
              );
      }

});

ReactDOM.render(<App />, document.getElementById('gmaps'));*/
