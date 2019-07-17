<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <ul>
      <li v-for="(crime,index) in crimes" :key="index">{{crime.Category}}: <strong>{{crime.arrest_count}}</strong></li>
    </ul>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

export default {
  name: 'app',
  //components: {
   // HelloWorld
  //},
  async created(){

    let response = await this.$http.get("http://nflarrest.com/api/v1/crime").then((response) => {
      this.crimes = response.data
    })
  },
  data(){
    return{
      crimes: []
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
