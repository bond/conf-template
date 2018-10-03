import Vue from 'vue'
//import Vuetify from 'vuetify'
//Vue.use(Vuetify)

//import 'vuetify/dist/vuetify.min.css'

import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VSubheader,
  VDivider,
  VFooter,
  VForm,
  VTextField,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  VTextarea,
  VCard,
  VChip,
  VCombobox,
  VExpansionPanel,
  transitions
} from 'vuetify'

import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VSubheader,
    VDivider,
    VFooter,
    VForm,
    VTextField,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTextarea,
    VCard,
    VChip,
    VCombobox,
    VExpansionPanel,
    transitions
  },
  iconfont: 'md',
})
