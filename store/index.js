export const state = () => ({
    countries: [],
    country: [],
    search: '',
    sortingCategories: [
      { name: 'Total Confirmed Asc', field: 'TotalConfirmed', order: 'asc' },
      { name: 'Total Confirmed Desc', field: 'TotalConfirmed', order: 'desc' },
      { name: 'New Confirmed Asc', field: 'NewConfirmed', order: 'asc' },
      { name: 'New Confirmed Desc', field: 'NewConfirmed', order: 'desc' },
      { name: 'Total Deaths Asc', field: 'TotalDeaths', order: 'asc' },
      { name: 'Total Deaths Desc', field: 'TotalDeaths', order: 'desc' },
      { name: 'New Deaths Asc', field: 'NewDeaths', order: 'asc' },
      { name: 'New Deaths Desc', field: 'NewDeaths', order: 'desc' },
    ],
    sort: {
      name: 'Total Confirmed Desc',
      field: 'TotalConfirmed',
      order: 'desc',
    },
    selectedDates: { from: '', to: new Date().toISOString().substr(0, 10) },
  });
  
  export const mutations = {
    SET_COUNTRIES(state, countries) {
      state.countries = countries;
    },
    SET_SEARCH(state, search) {
      state.search = search;
    },
    SET_SORT(state, sort) {
      state.sort = sort;
    },
    SET_COUNTRY(state, country) {
      state.country = country;
    },
    SET_DATES(state, { from, to } = {}) {
      // "to" must be defined
      const desiredDates = {
        from: from || state.selectedDates.from,
        to:
          to || state.selectedDates.to || new Date().toISOString().substr(0, 10),
      };
      const desiredDateValues = [
        new Date(desiredDates.from).valueOf(),
        new Date(desiredDates.to).valueOf(),
      ];
  
      if (desiredDateValues[0] > desiredDateValues[1])
        desiredDates.from = desiredDates.to;
      state.selectedDates = desiredDates;
    },
  };
  
  export const actions = {
    getSummary(context) {
      this.$axios.get('https://api.covid19api.com/summary').then((response) => {
        context.commit('SET_COUNTRIES', response.data.Countries);
      });
    },
    getCountry(context, slug) {
      this.$axios
        .get('https://api.covid19api.com/country/' + slug)
        .then((response) => {
          context.commit('SET_COUNTRY', response.data);
        });
    },
  };
  
  export const getters = {
    countryNames(state) {
      return state.countries.map((country) => country.Country);
    },
    filteredCountries(state) {
      return state.countries.filter((country) => {
        return (
          state.search.toLowerCase() ===
          country.Country.substr(0, state.search.length).toLowerCase()
        );
      });
    },
    sortedCountries(state, getters) {
      return getters.filteredCountries.sort((a, b) => {
        let desc = state.sort.order == 'desc' ? -1 : 1;
        if (a[state.sort.field] > b[state.sort.field]) {
          return 1 * desc;
        } else if (a[state.sort.field] < b[state.sort.field]) {
          return -1 * desc;
        }
        return 0;
      });
    },
    labels(state) {
      return state.country.map((data) =>
        new Date(data.Date).toLocaleDateString()
      );
    },
    confirmed(state) {
      return state.country.map((data) => data.Confirmed);
    },
    deaths(state) {
      return state.country.map((data) => data.Deaths);
    },
    selectedDates(state) {
      return state.selectedDates;
    },
  };