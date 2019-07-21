<template>
    <div class="container main">
        <header class="header_nfl mb-2">
            <img class="icon_nfl" src="../../src/assets/nfl_icon.png">
            <span class="banner_title">NFL Reports</span>
        </header>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item font-weight-bold"><a href="/">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">{{currentCrime}}</li>
            </ol>
        </nav>
    </div>
</template>
<script>
export default {
  async created() {
    const crimeId = this.$route.params.crimeCategory
    await this.calculateCrimes(crimeId);
  },
  methods: {
    async calculateCrimes(crimeId) {
        let responseCrime = await this.$http.get(`http://nflarrest.com/api/v1/crime/topPlayers/${crimeId}`)
        this.currentCrime = crimeId;
    }
  },
  components: {},
  data() {
    return {
      currentCrime: "",
      crimes: []
    };
  }
};
</script>
<style>
</style>


