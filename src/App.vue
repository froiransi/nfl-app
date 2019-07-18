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
      <div id="chart">
        <apexchart type=pie width=400 :options="chartOptions" :series="series" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueApexCharts from 'vue-apexcharts'

Vue.component('apexchart', VueApexCharts)
Vue.use(VueAxios, axios)

export default {
  name: 'app',
  async created(){
    let labels = []
    let series = []
    let response_crime = await this.$http.get("http://nflarrest.com/api/v1/crime").then((response_crime) => {
      this.crimes = response_crime.data
      this.crimes.forEach(element => {
        labels.push(element.Category)
        series.push(element.arrest_count)
      });
    })
    let teams = []
    let response_team = await this.$http.get("http://nflarrest.com/api/v1/team").then((response_team) => {
      this.teams = response_team.data
      this.teams.forEach(element => {
        teams.push(element)
      });
    })
    let players = []
    let response_player = await this.$http.get("http://nflarrest.com/api/v1/player").then((response_player) => {
      this.players = response_player.data
      this.players.forEach(element => {
        players.push(element)
      });
    })
    let positions = []
    let response_position = await this.$http.get("http://nflarrest.com/api/v1/position").then((response_position) => {
      this.positions = response_position.data
      this.positions.forEach(element => {
        positions.push(element)
      });
    })
  },
  components: {
    apexchart: VueApexCharts,
  },
  data(){
    return{
      crimes: [],
      series: [44, 55, 7, 43, 22, 33, 15],
        chartOptions: {
          labels: ['A','B','C','D','E','F','G'],
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
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
