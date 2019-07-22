<template>
    <div class="container main">
        <header class="header_nfl mb-2">
            <img class="icon_nfl" src="../../src/assets/nfl_icon.png">
            <span class="banner_title">NFL Reports</span>
        </header>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item font-weight-bold"><a href="/">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">Statistics by Team</li>
            </ol>
        </nav>
        <div v-if="currentTab == 'crimesByPlayer'">
          <h4 class="px-3 pt-3">Crimes by: {{currentTeam.Team_preffered_name}}</h4>
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
                <tr v-for="(team, id) in teamsByCrime" v-bind:key="team.id">
                  <th scope="row">{{id+1}}</th>
                  <td>{{team.Category}}</td>
                  <td>{{team.arrest_count}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  async created() {
    const teamId = this.$route.params.teamName
    this.currentTeam = teamId
    await this.setTeam(teamId)
  },
  methods: {
    async setTeam(teamId){
        let response = await this.$http.get("http://nflarrest.com/api/v1/team")
        this.teams = response.data
        this.teams.forEach(element => {
            if (element.Team_preffered_name == teamId){
                this.currentTeam = element
            }
        });
        let internalTeamsByCrime = []
        let responseTeamByCrime = await this.$http.get(`http://nflarrest.com/api/v1/team/topCrimes/${this.currentTeam.Team}`)
        this.teamsByCrime = responseTeamByCrime.data
        this.teamsByCrime.forEach(element => {
            internalTeamsByCrime.push(element)
        });
        this.teamsByCrime = internalTeamsByCrime
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
      teamId: "",
      currentCrime: "",
      currentTeam: "",
      currentTab: "crimesByPlayer",
      crimesByPlayer: [],
      crimesByTeam: [],
      crimesByPosition: [],
      teamsByCrime: []
    };
  }
};
</script>
<style>
</style>


