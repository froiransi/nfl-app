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
            <a class="nav-link rounded active" @click="changeTab('crimes')"  href="#">Crimes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" @click="changeTab('teams')" href="#">Teams</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" @click="changeTab('players')" href="#">Players</a>
          </li>
          <li class="nav-item">
            <a class="nav-link rounded" @click="changeTab('positions')" href="#">Positions</a>
          </li>
        </ul>
      </div>

      <div v-if="currentTab == 'crimes'">
        <apexchart type=pie width="60%" :options="chartOptionsCrimes" :series="seriesCrimes" />
      </div>
      <div v-if="currentTab == 'teams'">
        <apexchart type=pie width="60%" :options="chartOptionsTeams" :series="seriesTeams" />
      </div>
      <div v-if="currentTab == 'players'">
        <apexchart type=pie width="60%" :options="chartOptionsPlayers" :series="seriesPositions" />
      </div>
      <div v-if="currentTab == 'positions'">
        <apexchart type=pie width="60%" :options="chartOptionsPositions" :series="seriesPositions" />
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
  methods: {
    changeTab(name){
      this.currentTab = name
    },
    async calculateCrimes(){
      let internalLabelsCrimes = []
      let internalSeriesCrimes = []
      let responseCrime = await this.$http.get("http://nflarrest.com/api/v1/crime")
      this.crimes = responseCrime.data
      console.log(this.crimes)
      this.crimes.forEach(element => {
        internalLabelsCrimes.push(element.Category)
        internalSeriesCrimes.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsCrimes = {
          labels: internalLabelsCrimes,
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        this.chartOptionsCrimes= internalChartOptionsCrimes
        this.seriesCrimes=internalSeriesCrimes
    },
    async calculateTeams(){
      let internalLabelsTeams = []
      let internalSeriesTeams = []
      let responseTeam = await this.$http.get("http://nflarrest.com/api/v1/team")
      this.teams = responseTeam.data
      console.log(this.teams)
      this.teams.forEach(element => {
        internalLabelsTeams.push(element.Team)
        internalSeriesTeams.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsTeams = {
          labels: internalLabelsTeams,
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        this.chartOptionsTeams= internalChartOptionsTeams
        this.seriesTeams=internalSeriesTeams
    },
    async calculatePlayers(){
      let internalLabelsPlayers = []
      let internalSeriesPlayers = []
      let responsePlayer = await this.$http.get("http://nflarrest.com/api/v1/player")
      this.players = responsePlayer.data
      console.log(this.players)
      this.players.forEach(element => {
        internalLabelsPlayers.push(element.Name)
        internalSeriesPlayers.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsPlayers = {
          labels: internalLabelsPlayers,
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        this.chartOptionsPlayers= internalChartOptionsPlayers
        this.seriesPlayers=internalSeriesPlayers
    },
    async calculatePositions(){
      let internalLabelsPositions = []
      let internalSeriesPositions = []
      let responsePosition = await this.$http.get("http://nflarrest.com/api/v1/position")
      this.positions = responsePosition.data
      console.log(this.positions)
      this.positions.forEach(element => {
        internalLabelsPositions.push(element.Position)
        internalSeriesPositions.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsPositions = {
          labels: internalLabelsPositions,
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
        this.chartOptionsPositions= internalChartOptionsPositions
        this.seriesPositions=internalSeriesPositions
    }
  },
  async created(){
    await this.calculateCrimes()
    await this.calculateTeams()
    await this.calculatePlayers()
    await this.calculatePositions()
  },
  components: {
    apexchart: VueApexCharts,
  },
  data(){
    return{
      currentTab: "crimes",
      chartOptionsCrimes: {},
      seriesCrimes: [],
      chartOptionsTeams: {},
      seriesTeams: [],
      chartOptionsPlayers: {},
      seriesPlayers: [],
      chartOptionsPositions: {},
      seriesPositions: []
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
