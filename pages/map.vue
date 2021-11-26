<template>
  <div>
    <v-btn @click="center={lat: 59.4370, lng:24.7536}; zoom=10;">
      Tallinn
    </v-btn>
    <v-btn @click="center={lat: 51.5072, lng:0.1276}; zoom=10;">
      London
    </v-btn>
    <v-btn @click="center={lat: 40.7128, lng:-74.0060}; zoom=10;">
      New York
    </v-btn>
    <v-btn @click="center={lat: 35.6762, lng:139.6503}; zoom=10;">
      Tokyo
    </v-btn>
    <v-btn @click="center={lat: -18.7669, lng:46.8691}; zoom=10;">
      Madagascar
    </v-btn>
    <google-map
      :center="center"
      :zoom="zoom"
      :marker-coordinates="markerCoordinates"
    />
  </div>
</template>

<script>
import GoogleMap from '~/components/GoogleMap.vue';
export default {
  name: 'ShowGoogleMaps',
  components: { GoogleMap },
  data(){
      return {
          center: {lat: 44, lng: 24},
          zoom: 4,
          markerCoordinates: [{lat: 59.4370, lng:24.7536}],
      };
  }
   
};
</script>

<style>
   
</style>