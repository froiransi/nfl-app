<template>
  <div id="app">
    <div class="container main">
      <header class="header_nfl">
        <img class="icon_nfl" src="../src/assets/nfl_icon.png">
        <span class="banner_title">NFL Reports</span>
      </header>
      <div class="container py-2">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a class="nav-link rounded active" href="#">Crimes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="#">Teams</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="#">Players</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" href="#">Positions</a>
          </li>
        </ul>
      </div>
      <div class="container chart">
        <ul>
          <li v-for="(crime,index) in crimes" :key="index">{{crime}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)
Vue.use(VueAxios, axios)

export default {
  name: 'app',
  //components: {
   // HelloWorld
  //},
  async created(){

    let response = await this.$http.get("http://nflarrest.com/api/v1/crime").then((response) => {

      for (let i=0; i<response.lenght;i++){
        this.crimes.push(response[`Category${i}`])
      }
      
    })
  },
  data(){
    return{
      crimes: [],
      options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [{
        name: 'series-1',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }]
    }
  }

}
</script>

<style>
#app {
font-family: 'Sunflower', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #070042;
}

.main{
  padding-left: 0px;
  padding-right: 0px;
}

.icon_nfl{
  max-height: 7rem;
  padding-top: 1rem;
}

.banner_title{
  vertical-align: bottom;
  font-size: 4rem;
  color: white;
}

.header_nfl{
  background-image: url(../src/assets/banner.png);
  border: none;
  height: 8rem;
  border-radius: 0px 0px 15px 15px;
  -moz-border-radius: 0px 0px 15px 15px;
  -webkit-border-radius: 0px 0px 15px 15px;
  -webkit-background-size: 100% 100%; /* Safari 3.0 */
  -moz-background-size: 100% 100%; /* Gecko 1.9.2 (Firefox 3.6) */
  -o-background-size: 100% 100%; /* Opera 9.5 */
  background-size: 100% 100%;
}

.nav-link{
  color: white;
  background-color: #070042;
  margin-right: 2px !important;
}

.nav-link:hover{
  color: #070042 !important;
  background-color: #F2F2F2 !important;
}

.active, .active:hover{
  font-weight: 700;
  background-color: #B5000C !important;
  color: white!important;
}

.chart{
  background-color: #F2F2F2;
}


@media (max-width: 454px) {

  .header_nfl{
    background-image: url(../src/assets/banner_mobile.png);
    height: 6rem;
  }

  .icon_nfl{
    max-height: 5rem;
    padding-top: 0.5rem;
  }

  .banner_title{
    font-size: 3rem;
  }

}

</style>
