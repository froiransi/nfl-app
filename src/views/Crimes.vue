<template>
    <div class="container main">
        <header class="header_nfl mb-2">
            <img class="icon_nfl" src="../../src/assets/nfl_icon.png">
            <span class="banner_title">NFL Reports</span>
        </header>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item font-weight-bold"><a href="/">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">Statistics by Crime: {{currentCrime}}</li>
            </ol>
        </nav>
      <div class="container py-2 px-2">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a :class="activeTab('crimesByPlayer')" class="nav-link" @click="changeTab('crimesByPlayer')"  href="#">Top Players for Crime</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('crimesByTeam')" @click="changeTab('crimesByTeam')" class="nav-link" href="#">Top Teams for Crime</a>
          </li>
          <li class="nav-item">
            <a :class="activeTab('crimesByPosition')" @click="changeTab('crimesByPosition')" class="nav-link" href="#">Top Positions for Crime</a>
          </li>
        </ul>
        <div v-if="currentTab == 'crimesByPlayer'">
          <h4 class="px-3 pt-3">Players by crime: </h4>
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
                <tr v-for="(crime, id) in crimesByPlayer" v-bind:key="crime.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{crime.Name}}</td>
                  <td>{{crime.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="currentTab == 'crimesByTeam'">
          <h4 class="px-3 pt-3">Teams by crime: </h4>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Arrest count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(crime, id) in crimesByTeam" v-bind:key="crime.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{crime.Team_city}} {{crime.Team_name}}</td>
                  <td>{{crime.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div v-if="currentTab == 'crimesByPosition'">
          <h4 class="px-3 pt-3">Positions by crime: </h4>
          <div class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Position</th>
                  <th scope="col">Arrest count</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(crime, id) in crimesByPosition" v-bind:key="crime.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{crime.Position}}</td>
                  <td>{{crime.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>
</template>
<script>
export default {
  async created() {
    const crimeId = this.$route.params.crimeCategory
    await this.calculateCrimesByPlayer(crimeId);
    await this.calculateCrimesByTeam(crimeId);
    await this.calculateCrimesByPosition(crimeId);
  },
  methods: {
    async calculateCrimesByPlayer(crimeId) {
      this.currentCrime = crimeId;
      let internalCrimesByPlayer = []
      let responseCrimePlayer = await this.$http.get(`https://nflarrest.com/api/v1/crime/topPlayers/${crimeId}`)
      this.crimesByPlayer = responseCrimePlayer.data
      this.crimesByPlayer.forEach(element => {
        internalCrimesByPlayer.push(element)
      });
      this.crimesByPlayer = internalCrimesByPlayer
    },
    async calculateCrimesByTeam(crimeId) {
      this.currentCrime = crimeId;
      let internalCrimesByTeam = []
      let responseCrimeTeam = await this.$http.get(`https://nflarrest.com/api/v1/crime/topTeams/${crimeId}`)
      this.crimesByTeam = responseCrimeTeam.data
      this.crimesByTeam.forEach(element => {
        internalCrimesByTeam.push(element)
      });
      this.crimesByPlayerTeam = internalCrimesByTeam
    },
    async calculateCrimesByPosition(crimeId) {
      this.currentCrime = crimeId;
      let internalCrimesByPosition = []
      let responseCrimePosition = await this.$http.get(`https://nflarrest.com/api/v1/crime/topPositions/${crimeId}`)
      this.crimesByPosition = responseCrimePosition.data
      this.crimesByPosition.forEach(element => {
        internalCrimesByPosition.push(element)
      });
      this.crimesByPlayerPosition = internalCrimesByPosition
    },
    changeTab(name){
      this.currentTab = name
    },
    activeTab(tab){
      if (tab == this.currentTab){
        return 'active'
      } else {
        return ''
      }
    }
  },
  components: {},
  data() {
    return {
      currentCrime: "",
      currentTab: "crimesByPlayer",
      crimesByPlayer: [],
      crimesByTeam: [],
      crimesByPosition: []
    };
  }
};
</script>
<style>
</style>


