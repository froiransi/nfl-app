<template>
    <div class="container main">
        <header class="header_nfl mb-2">
            <img class="icon_nfl" src="../../src/assets/nfl_icon.png">
            <span class="banner_title">NFL Reports</span>
        </header>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item font-weight-bold"><a href="/">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">Statistic by crime: {{currentCrime}}</li>
            </ol>
        </nav>
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
          <p class="px-3 pt-3">Top Players by crime: </p>
          <ol>
            <li v-for="crime in crimesByPlayer" v-bind:key="crime.id">{{crime.Name}}: {{crime.arrest_count}}</li>
          </ol>
        </div>
        <div v-if="currentTab == 'crimesByTeam'">
          <p class="px-3 pt-3">Top Teams by crime: </p>
          <ol>
            <li v-for="crime in crimesByTeam" v-bind:key="crime.id">{{crime.Team_city}} {{crime.Team_name}}: {{crime.arrest_count}}</li>
          </ol>
        </div>
        <div v-if="currentTab == 'crimesByPosition'">
          <p class="px-3 pt-3">Top Positions by crime: </p>
          <ol>
            <li v-for="crime in crimesByPosition" v-bind:key="crime.id">{{crime.Position}}: {{crime.arrest_count}}</li>
          </ol>
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
      let responseCrimePlayer = await this.$http.get(`http://nflarrest.com/api/v1/crime/topPlayers/${crimeId}`)
      this.crimesByPlayer = responseCrimePlayer.data
      this.crimesByPlayer.forEach(element => {
        internalCrimesByPlayer.push(element)
      });
      this.crimesByPlayer = internalCrimesByPlayer
    },
    async calculateCrimesByTeam(crimeId) {
      this.currentCrime = crimeId;
      let internalCrimesByTeam = []
      let responseCrimeTeam = await this.$http.get(`http://nflarrest.com/api/v1/crime/topTeams/${crimeId}`)
      this.crimesByTeam = responseCrimeTeam.data
      this.crimesByTeam.forEach(element => {
        internalCrimesByTeam.push(element)
      });
      this.crimesByPlayerTeam = internalCrimesByTeam
    },
    async calculateCrimesByPosition(crimeId) {
      this.currentCrime = crimeId;
      let internalCrimesByPosition = []
      let responseCrimePosition = await this.$http.get(`http://nflarrest.com/api/v1/crime/topPositions/${crimeId}`)
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
.breadcrumb{
  background-color: transparent;
}
</style>


