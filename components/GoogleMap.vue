<template>
  <div ref="map" />
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';
export default {
  name: 'GoogleMaps',
  props: {
    center: { type: Object, required: true },
    zoom: { type: Number, default: 4 },
  },
  data() {
    return {
      map: null,
    };
  },
  watch: {
    center(newCenter) {
      this.map.panTo(newCenter);
    },
    zoom(newZoom) {
      this.map.setZoom(newZoom);
    },
  },
  mounted() {
    const loader = new Loader({
      apiKey: this.$config.googleApiKey,
      version: 'weekly',
    });
    loader.load().then(() => {
      // eslint-disable-next-line no-undef
      this.map = new google.maps.Map(this.$refs['map'], {
        center: this.center,
        zoom: this.zoom,
      });
    });
  },
};
</script>

<style scoped>
div {
  height: 800px;
}
</style>