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
      </div>
      <div v-if="currentTab == 'home'" class="container">
        <p class="px-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
        <div class="row">
          <div class="col-md-3 col-12">
            <div class="card mb-3">
              <img src="../src/assets/img1.jpg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Top 5 Crimes</h5>
                <ol>
                  <li v-for="crime in crimes.slice(1,6)" v-bind:key="crime.id">{{crime.Category}}</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <div class="card mb-3">
              <img src="../src/assets/img2.jpeg" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">Top 5 Teams</h5>
                <ol>
                  <li v-for="team in teams.slice(1,6)" v-bind:key="team.id">{{team.Team_preffered_name}}</li>
                </ol>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-12">
            <div class="card mb-3">
              <img src="../src/assets/img3.jpg" class="card-img-top" alt="...">
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
              <img src="../src/assets/img4.jpg" class="card-img-top" alt="...">
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
        <p class="px-4">Most popular crimes in the NFL.</p>
        <apexchart class="chart_set" type=donut :options="chartOptionsCrimes" :series="seriesCrimes" />
      </div>
      <div v-if="currentTab == 'teams'">
        <p class="px-4">Teams that have had the most arrests in the NFL.</p>
        <apexchart class="chart_set" type=donut :options="chartOptionsTeams" :series="seriesTeams" />
      </div>
      <div v-if="currentTab == 'players'">
        <p class="px-4">Players that have had the most arrests in the NFL.</p>
        <apexchart class="chart_set" type=donut :options="chartOptionsPlayers" :series="seriesPlayers" />
      </div>
      <div v-if="currentTab == 'positions'">
        <p class="px-4">Positions that have had the most arrests in the NFL.</p>
        <apexchart class="chart_set" type=donut :options="chartOptionsPositions" :series="seriesPositions" />
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
      let responseCrime = await this.$http.get("http://nflarrest.com/api/v1/crime")
      this.crimes = responseCrime.data
      this.crimes.forEach(element => {
        if (parseInt(element.arrest_count)<7){
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
      let internalLabelsTeams = []
      let internalSeriesTeams = []
      let responseTeam = await this.$http.get("http://nflarrest.com/api/v1/team")
      this.teams = responseTeam.data
      this.teams.forEach(element => {
        internalLabelsTeams.push(element.Team)
        internalSeriesTeams.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsTeams = {
          labels: internalLabelsTeams,
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
                  height: 400,
                },
              }
            }
          ]
        }
        this.chartOptionsTeams= internalChartOptionsTeams
        this.seriesTeams=internalSeriesTeams
    },
    async calculatePlayers(){
      let internalLabelsPlayers = []
      let internalSeriesPlayers = []
      let aux_player = 0
      let responsePlayer = await this.$http.get("http://nflarrest.com/api/v1/player")
      this.players = responsePlayer.data
      this.players.forEach(element => {
        if(element.arrest_count < 3){
          aux_player++
        } else {
          internalLabelsPlayers.push(element.Name)
          internalSeriesPlayers.push(parseInt(element.arrest_count))
        }
      });
      internalLabelsPlayers.push("Other")
      internalSeriesPlayers.push(aux_player)
      let internalChartOptionsPlayers = {
          labels: internalLabelsPlayers,
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
                  height: 500
                },
              }
            }
          ]
        }
      this.chartOptionsPlayers= internalChartOptionsPlayers
      this.seriesPlayers=internalSeriesPlayers
    },
    async calculatePositions(){
      let internalLabelsPositions = []
      let internalSeriesPositions = []
      let responsePosition = await this.$http.get("http://nflarrest.com/api/v1/position")
      this.positions = responsePosition.data
      this.positions.forEach(element => {
        internalLabelsPositions.push(element.Position)
        internalSeriesPositions.push(parseInt(element.arrest_count))
      });

      let internalChartOptionsPositions = {
          labels: internalLabelsPositions,
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
      currentTab: "home",
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
  margin-bottom: 2px !important;
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

.apexcharts-canvas{
  right: -15rem !important;
}

.chart_set{
  width: 50% !important;
}

.btn{
  background-color: #4E0110;
  border: none;
}

.btn:hover{
  background-color: #B5000C;
}
@media (max-width: 992px) {

  .apexcharts-canvas{
    right: -10rem !important;
  }

}


@media (max-width: 768px) {

  .apexcharts-canvas{
    right: -6.5rem !important;
  }

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

  .apexcharts-canvas{
    right: -2rem !important;
  }

}

</style>
