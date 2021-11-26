<template>
  <div>
    <v-btn @click="dataLabel='confirmed'">
      Confirmed
    </v-btn>
    <v-btn @click="dataLabel='deaths'">
      Deaths
    </v-btn>
    <chart
      :data="$store.getters[dataLabel]"
      :labels="$store.getters.labels"
      :data-label="dataLabel"
    />
  </div>
</template>

<script>
import Chart from '~/components/Chart.vue';
export default {
    components: { Chart },
    data(){
        return {
            dataLabel: 'confirmed'
        };
    },
    created(){
        this.$store.dispatch('getCountry', this.$route.params.slug);
    }
};
</script>

<style>

</style>