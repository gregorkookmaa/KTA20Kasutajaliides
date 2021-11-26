<template>
  <v-app dark>
    <v-navigation-drawer app>
    <!-- -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-tabs>
        <v-tab
          nuxt-link
          to="/"
        >
          Home
        </v-tab>
        <v-tab
          nuxt-link
          to="/map"
        >
          Map
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer app>
    <!-- -->
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      
    };
  }
};
</script>