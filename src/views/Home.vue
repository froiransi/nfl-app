<template>
  <div id="app">
    <div class="container main">
      <header class="header_nfl  mb-2">
        <img class="icon_nfl" src="../../src/assets/nfl_icon.png">
        <span class="banner_title">NFL Reports</span>
      </header>
      <div class="container py-2 px-2">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a :class="activeTab('home')" class="nav-link rounded" @click="changeTab('home')"  href="#">Home</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('crimes')" class="nav-link rounded" @click="changeTab('crimes')"  href="#">Top Crimes</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('teams')" class="nav-link rounded" @click="changeTab('teams')" href="#">Top Teams</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('players')" class="nav-link rounded" @click="changeTab('players')" href="#">Top Players</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('positions')" class="nav-link rounded" @click="changeTab('positions')" href="#">Top Positions</a>
          </li>
        </ul>
        <div v-if="currentTab == 'home'" class="container">
          <div class="row">
            <div class="col-md-3 col-12">
              <div class="card mb-3">
                <img src="../../src/assets/img1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Top 5 Crimes</h5>
                  <ol>
                    <li v-for="crime in crimes.slice(1,6)" v-bind:key="crime.id"><a :href="`/crimes/${crime.Category}`">{{crime.Category}}</a></li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="card mb-3">
                <img src="../../src/assets/img2.jpeg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Top 5 Teams</h5>
                  <ol>
                    <li v-for="team in teams.slice(1,6)" v-bind:key="team.id"><a :href="`/teams/${team.Team}`">{{team.Team_preffered_name}}</a></li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="card mb-3">
                <img src="../../src/assets/img3.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Top 5 Players</h5>
                  <ol>
                    <li v-for="player in players.slice(1,6)" v-bind:key="player.id">{{player.Name}}</li>
                  </ol>
                </div>
              </div>
            </div>
            <div class="col-md-3 col-12">
              <div class="card mb-3">
                <img src="../../src/assets/img4.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">Top 5 Positions</h5>
                  <ol>
                    <li v-for="position in positions.slice(1,6)" v-bind:key="position.id">{{position.Position}}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentTab == 'crimes'">
          <h4 class="px-3 pt-3">Most popular crimes in the NFL.</h4>
          <apexchart class="chart_set" type=donut :options="chartOptionsCrimes" :series="seriesCrimes" />
        </div>
        <div v-if="currentTab == 'teams'">
          <h4 class="px-4 pt-3">Teams that have had the most arrests in the NFL.</h4>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Team Division</th>
                  <th scope="col">Arrest count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(team, id) in teams" v-bind:key="team.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{team.Team_preffered_name}}</td>
                  <td>{{team.Team_Conference_Division}}</td>
                  <td>{{team.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="currentTab == 'players'">
          <h4 class="px-4 pt-3">Players that have had the most arrests in the NFL.</h4>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Player Name</th>
                  <th scope="col">Arrest count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(player, id) in players" v-bind:key="player.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{player.Name}}</td>
                  <td>{{player.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="currentTab == 'positions'">
          <h4 class="px-4 pt-3">Positions that have had the most arrests in the NFL.</h4>
          <apexchart class="chart_set_bar" type=bar :options="chartOptionsPositions" :series="seriesPositions"/>
        </div>
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
    activeTab(tab){
      if (tab == this.currentTab){
        return 'active'
      } else {
        return ''
      }
    },
    async calculateCrimes(){
      let internalLabelsCrimes = []
      let internalSeriesCrimes = []
      let aux_crime = 0
      let responseCrime = await this.$http.get("https://nflarrest.com/api/v1/crime")
      this.crimes = responseCrime.data
      this.crimes.forEach(element => {
        if (parseInt(element.arrest_count)<20){
          aux_crime++
        } else {
          internalLabelsCrimes.push(element.Category)
          internalSeriesCrimes.push(parseInt(element.arrest_count))
        }
      });
      internalLabelsCrimes.push("Other")
      internalSeriesCrimes.push(aux_crime)
      let internalChartOptionsCrimes = {
          labels: internalLabelsCrimes,
          colors: ['#12355B','#070042','#4E0110','#B5000C','#7D90A5','#424242','#D6737A','#020012','#777397','#050F19'],
          chart: {
            width: 600,
            height: 500
          },
          plotOptions: {
            bar: {
              horizontal: false
            }
          },
          legend: {
            position: "bottom"
          },
          responsive: [
            {
              breakpoint: 1000,
              options: {
                dataLabels: {
                  enabled: false
                },
                chart: {
                  width: 350,
                  height: 400
                },
              }
            }
          ]
        }
        this.chartOptionsCrimes= internalChartOptionsCrimes
        this.seriesCrimes=internalSeriesCrimes
    },
    async calculateTeams(){
      let internalTeams = []
      let responseTeam = await this.$http.get("https://nflarrest.com/api/v1/team")
      this.teams = responseTeam.data
      this.teams.forEach(element => {
        internalTeams.push(element)
      });
      this.teams=internalTeams
    },
    async calculatePlayers(){
      let internalPlayer = []
      let responsePlayer = await this.$http.get("https://nflarrest.com/api/v1/player")
      this.players = responsePlayer.data
      this.players.forEach(element => {
          internalPlayer.push(element)
      });
      this.players=internalPlayer
    },
    async calculatePositions(){
      let internalLabelsPositions = []
      let internalSeriesPositions = []
      let responsePosition = await this.$http.get("https://nflarrest.com/api/v1/position")
      this.positions = responsePosition.data
      this.positions.forEach(element => {
        internalLabelsPositions.push(element.Position)
        internalSeriesPositions.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsPositions = {
          chart: {
              height: 600,
              width: 550,
              type: 'bar',
          },
          colors: ['#070042'],
          plotOptions: {
              bar: {
                  horizontal: true,
              }
          },
          dataLabels: {
              enabled: true
          },
          xaxis: {
              categories: internalLabelsPositions,
          },
          responsive: [
            {
              breakpoint: 1000,
              options: {
                chart: {
                  width: 300,
                  height: 400
                },
              }
            }
          ]
      }
      this.chartOptionsPositions= internalChartOptionsPositions
      this.seriesPositions = [{
              data: internalSeriesPositions,
          }]
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
      crimes: [],
      teams: [],
      players: [],
      positions: [],
      currentTab: "home",
      currentDropdown: "",
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
</style>
