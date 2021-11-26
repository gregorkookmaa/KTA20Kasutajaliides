<template>
  <div ref="map" />
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
function addMarker(location, map) {
  // https://developers.google.com/maps/documentation/javascript/markers#marker_labels
  // eslint-disable-next-line no-undef
  const marker = new google.maps.Marker({
    position: location,
    map: map,
  });
  // https://developers.google.com/maps/documentation/javascript/infowindows#open
  marker.addListener('rightclick', () => {
    // https://developers.google.com/maps/documentation/javascript/markers#remove
    marker.setMap(null);
  });
  return marker;
}
export default {
  name: 'GoogleMaps',
  props: {
    center: { type: Object, required: true },
    zoom: { type: Number, default: 4 },
    markerCoordinates: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      map: null,
      propMarkers: [],
      userMarkers: [],
    };
  },
  watch: {
    center(newCenter) {
      this.map.panTo(newCenter);
    },
    zoom(newZoom) {
      this.map.setZoom(newZoom);
    },
    markerCoordinates(newCoords) {
      this.updatePropMarkers(newCoords);
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: this.$config.googleApiKey,
      version: 'weekly',
    });
    loader.load().then((google) => {
      this.map = new google.maps.Map(this.$refs['map'], {
        center: this.center,
        zoom: this.zoom,
      });
      this.updatePropMarkers(this.markerCoordinates);
      google.maps.event.addListener(this.map, 'rightclick', (event) => {
        this.userMarkers.push(addMarker(event.latLng, this.map));
      });
    });
  },
  methods: {
    /** @param {{lat: Number, lng: Number}[]} coordinates */
    updatePropMarkers: function (coordinates) {
      this.propMarkers.forEach((marker) => {
        marker.setMap(null);
      });
      this.propMarkers = coordinates.map((coord) => addMarker(coord, this.map));
    },
  },
};
</script>

<style scoped>
div {
  height: 800px;
}
</style>