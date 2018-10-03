<template>
  <v-container fluid>
      <v-layout>
        <h1 class="font-weight-light">Super-slick config generat0rz</h1>
      </v-layout>
      <v-layout>
        <h2>Devices</h2>
      </v-layout>
      <v-layout>
        <v-combobox
          v-model="model"
          :filter="filter"
          :hide-no-data="!search"
          :items="items"
          :search-input.sync="search"
          hide-selected
          label="Select devices"
          multiple
          small-chips
          solo
        >
          <template slot="no-data">
            <v-list-tile>
              <span class="subheading">Create</span>
              <v-chip
                :color="`${colors[nonce - 1]} lighten-3`"
                label
                small
              >
                {{ search }}
              </v-chip>
            </v-list-tile>
          </template>
          <template
            v-if="item === Object(item)"
            slot="selection"
            slot-scope="{ item, parent, selected }"
          >
            <v-chip
              :color="`${item.color} lighten-3`"
              :selected="selected"
              label
              small
            >
              <span class="pr-2">
                {{ item.text }}
              </span>
              <v-icon
                small
                @click="parent.selectItem(item)"
              >close</v-icon>
            </v-chip>
          </template>
          <template
            slot="item"
            slot-scope="{ index, item, parent }"
          >
            <v-list-tile-content>
              <v-text-field
                v-if="editing === item"
                v-model="editing.text"
                autofocus
                flat
                background-color="transparent"
                hide-details
                solo
                @keyup.enter="edit(index, item)"
              ></v-text-field>
              <v-chip
                v-else
                :color="`${item.color} lighten-3`"
                dark
                label
                small
              >
                {{ item.text }}
              </v-chip>
            </v-list-tile-content>
            <v-spacer></v-spacer>
            <v-list-tile-action @click.stop>
              <v-btn
                icon
                @click.stop.prevent="edit(index, item)"
              >
                <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
              </v-btn>
            </v-list-tile-action>
            <v-list-tile-action @click.stop>
              <v-btn icon @click.stop.prevent="remove(index,item)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </template>
        </v-combobox>
      </v-layout>
      <v-layout>
        <h2>Variables</h2>
      </v-layout>
      <v-layout v-if="variables.length == 0">
        <div>
          You don't have any variables yet. Write some in the template. IE: $ip.
        </div>
      </v-layout>
      <v-layout>
          <v-expansion-panel v-if="variables.length > 0">
            <v-expansion-panel-content
              v-for="(item,i) in variables"
              :key="i"
            >
              <div slot="header"><b>{{item}} <span v-if="var_compliance(item) > 0" style='color:red;'>(Missing on {{var_compliance(item)}} devices)</span></b></div>
              <v-card>
                <v-card-text>
                <span v-if="model.length == 0">Add devices first!</span>
                <v-form v-else>
                  <v-text-field v-for="(device, i) in model"
                    :key="i"
                    v-model="device[item]"
                    :label="device.text"
                    required
                  ></v-text-field>
                </v-form>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
      </v-layout>
      <v-layout>
        <h2>Template</h2>
      </v-layout>
      <v-layout>
          Variables used: {{ variables.join(',') }}
      </v-layout>
      <v-layout>
           <v-textarea
            name="input-7-1"
            box
            label="Template"
            auto-grow
            v-model="template"
          ></v-textarea>
      </v-layout>
      <v-layout>
        <h2>Results</h2>
      </v-layout>
      <v-layout>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(device, i) in model"
            :key="i"
          >
            <div slot="header"><b>{{device.text}}</b></div>
            <v-card>
              <v-card-text v-if="dev_compliance(i)">
<code style="width:100%">
{{ generated_config(i) }}
</code>                
              </v-card-text>
              <v-card-text v-else>
                Fix variables first!
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  computed: {
    variables: function() {
      // filter away duplicate variables
      return this.template.match(/\$\w+/g).filter((v, i, a) => a.indexOf(v) === i) || []
    }
  },
  data() {
    return {
      template: "interface loopback1\n  ip address $loopback/32",
      tvars: {},
      activator: null,
      attach: null,
      colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
      editing: null,
      index: -1,
      items: [
        { header: 'Select an device or create one' },
      ],
      nonce: 1,
      menu: false,
      model: [
      ],
      x: 0,
      search: null,
      y: 0
    }
  },
  watch: {
      model (val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1]
            }

            this.items.push(v)

            this.nonce++
          }

          return v
        })
      }
    },
  methods: {
      var_compliance(var_name) {
        var missing = 0
          this.model.forEach(m => {
            if (!m.hasOwnProperty(var_name) || !m[var_name].trim()) {
              missing++
            }
          })
        return missing
      },
      dev_compliance(dev_idx) {
        var res = true
        this.variables.forEach(v => {
          if (!this.model[dev_idx].hasOwnProperty(v)) {
            res = false
          }
        })
        return res
      },
      edit (index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      remove (index,item) {
        this.items = this.items.filter(i => i.text != item.text)
      },
      filter (item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      generated_config(dev_idx) {
        return this.template.replace(/\$\w+/g, m => this.model[dev_idx][m])
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

textarea {
  font-family: 'Monaco', courier, monospace;
  color: red;
}
</style>
