<template>
  <div id="app">
    <router-view/>
  </div>
</template>

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
  height: 9rem !important;
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

.breadcrumb{
  background-color: transparent;
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
    height: 7rem;
  }

  .icon_nfl{
    max-height: 5rem;
    padding-top: 0.5rem;
  }

  .banner_title{
    font-size: 2.5rem;
  }

  .apexcharts-canvas{
    right: -2rem !important;
  }

  .dropdown-toggle, .dropdown-menu{
    margin-left: 1rem !important;
  }


}
</style>
