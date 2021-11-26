<template>
  <div>
    <v-row id="controls">
      <v-col
        v-for="buttonLabel in ['confirmed', 'deaths']"
        :key="buttonLabel"
      >
        <v-btn
          block
          style="margin-top:12px"
          @click="dataLabel = buttonLabel"
        >
          {{ buttonLabel }}
        </v-btn>
      </v-col>

      <v-col
        v-for="(whichDateToPick, index) in ['from', 'to']"
        :key="whichDateToPick"
      >
        <DatePicker
          :label="whichDateToPick"
          :which-date-to-pick="whichDateToPick"
          :min="dateMin"
          :max="index === 0 ? ($store.getters.selectedDates.to || dateMax) : dateMax"
        />
      </v-col>
    </v-row>
    <chart
      :data="$store.getters[dataLabel]"
      :labels="$store.getters.labels"
      :data-label="dataLabel"
      :from="$store.getters.selectedDates.from"
      :to="$store.getters.selectedDates.to"
    />
  </div>
</template>

<script>
import Chart from '~/components/Chart.vue';
import DatePicker from '~/components/CovidDatePicker.vue';
export default {
  name: 'CountrySlug',
  components: { Chart, DatePicker },
  data() {
    return {
      dateMin: '2020-01-22', // Seems to be the earliest date api.covid19api.com gives
      dateMax: new Date().toISOString().substr(0, 10),
      dataLabel: 'confirmed',
    };
  },
  created() {
    this.$store.dispatch('getCountry', this.$route.params.slug);
  },
};
</script>

<style></style>