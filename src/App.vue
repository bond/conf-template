<template>
  <v-app id="inspire">
    <!-- v-navigation-drawer
      permanent
      app
    >
      <v-list dense>
        <v-list-tile v-for="item in items" :key="item.path" :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
      </v-list>
    </v-navigation-drawer -->
    <v-content>
      <v-container fluid fill-height>
        <Template />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import Template from './components/Template.vue'
  export default {
    components: { Template},
    data: () => ({
      dialog: false,
      drawer: null,
      items: [
        { icon: 'settings_system_daydream', text: 'Devices', link: '/devices' },
        { icon: 'description', text: 'Template', link: '/template' },
      ]
    }),
    props: {
      source: String
    }
  }
</script>