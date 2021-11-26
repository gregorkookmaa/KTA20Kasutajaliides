<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateFormatted"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="date"
      :min="min"
      :max="max"
      :first-day-of-week="1"
      :show-current="false"
      @input="menu = false"
    />
  </v-menu>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: 'ERROR_LABEL_MISSING',
    },
    whichDateToPick: {
      type: String,
      required: true,
    },
    max: { type: String, default: undefined },
    min: { type: String, default: undefined },
  },
  data: function () {
    return {
      date: this.$store.getters.selectedDates[this.whichDateToPick],
      dateFormatted: undefined,
      menu: false,
    };
  },
  watch: {
    date: {
      immediate: true,
      handler(val) {
        if (!val) this.dateFormatted = undefined;
        else this.dateFormatted = new Date(val).toLocaleDateString();
        
        const dateChange = {};
        dateChange[this.whichDateToPick] = val;
        this.$store.commit('SET_DATES', dateChange);
      },
    },
    max(val) {
      if (new Date(val).valueOf() < new Date(this.date).valueOf())
        this.date = val;
    },
  },
};
</script>