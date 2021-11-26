<template>
  <div>
    <v-row>
      <v-col cols="9">
        <v-text-field
          v-model="search"
          dense
          filled
          label="Search"
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="sort"
          :items="$store.state.sortingCategories"
          item-text="name"
          filled
          label="Sort"
          return-object
        />
      </v-col>  
    </v-row>
    <v-row>
      <v-col
        v-for="country in $store.getters.sortedCountries"
        :key="'result-' + country.ID"
        :cols="3"
      >
        <v-card elevation="2">
          <v-card-title>
            <nuxt-link :to="'/country/' + country.Slug">
              {{ country.Country }}
            </nuxt-link>
          </v-card-title>
          <v-card-text>
            <ul>
              <li><b>New Confirmed:</b>{{ country.NewConfirmed }}</li>
              <li><b>Total Confirmed:</b>{{ country.TotalConfirmed }}</li>
              <li><b>New Deaths:</b>{{ country.NewDeaths }}</li>
              <li><b>Total Deaths:</b>{{ country.TotalDeaths }}</li>
              <!-- <li><b>New Recovered:</b>{{country.NewRecovered}}</li>
              <li><b>Total Recovered:</b>{{country.TotalRecovered}}</li>           -->
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  computed: {
    search: {
      get(){
        return this.$store.state.search;
      },
      set(value){
        this.$store.commit('SET_SEARCH', value);
      }
    },
    sort: {
      get(){
        return this.$store.state.sort;
      },
      set(value){
        this.$store.commit('SET_SORT', value);
      }
    }
  },
  created(){
    this.$store.dispatch('getSummary');
  },
  methods: {
    
  }
};
</script>

<style>
</style>