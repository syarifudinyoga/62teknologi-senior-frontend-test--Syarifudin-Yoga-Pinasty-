<template>
  <div id="businessDetail">
    <navigation-bar></navigation-bar>
    <side-bar></side-bar>
    <router-view></router-view>
    <div class="page-container">
      <!-- Header Desktop-->
      <header class="header-desktop">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="header-wrap">
              <form class="form-header" action="" method="POST">
              </form>
              <div class="header-button">
                <div class="account-wrap">
                  <div class="account-item">
                    <div class="content">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <!-- End Header Desktop -->
      <!-- Main Content User -->
      <div class="main-content">
        <div class="section__content section__content--p30">
          <div class="container-fluid">
            <div class="row m-t-0">
              <div class="col-md-12">
                <div class="overview-wrap">
                  <h2 class="title-1">{{business}}</h2>
                </div><br>
                <!-- Search Box Data User -->
                <div class="card">
                  <div class="card-header">
                    {{business}} - <strong> Rating ({{rating}})</strong>
                  </div>
                  <div class="card-body card-block">
                    <h6>Slide Show Picture</h6>
                    <carousel :per-page="1">
                      <slide v-for="photo in photos"
                        :key="photo"
                      >
                        <div class="img-container">
                          <img
                            :src="photo"
                          />
                        </div>
                      </slide>
                    </carousel>
                    <br>
                    <!-- Review -->
                    <h6>Review</h6>
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Timestamp</th>
                          <th scope="col">Review</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="review in reviews" :key="review.id">
                          <td>{{review.user.name}}</td>
                          <td>{{review.time_created}}</td>
                          <td>{{review.text}}</td>
                        </tr>
                      </tbody>
                    </table>
                    <br>
                    <h6>Maps</h6>
                      <GmapMap
                        :center='position'
                        :zoom='12'
                        style='width:100%;  height: 400px;'
                      >
                      <GmapMarker
                        :position="position"
                      />
                      </GmapMap>
                  </div>
                  <div class="card-footer">      
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/HeaderBar.vue'
import SideBar from '../components/SideBartemp.vue'
import axios from 'axios'
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'businessDetail',
  components: {
    NavigationBar,
    SideBar,
    Carousel,
    Slide
  },
  data() {
    return {
      business: "",
      name: "",
      position: {
        lat: 0, 
        lng: 0
      },
      rating : 0,
      photos : [],
      reviews : []
    }
  },
  created() {
    this.getBusinessDetail();
    this.getBusinessReview();
  },
  methods: {
    // Get All Data User
    async getBusinessDetail() {
      try {
        const response = await axios.get(`http://localhost:8080/v3/businesses/${this.$route.params.id}`);
        console.log("detail")
        console.log(response.data)
        this.position.lat = response.data.coordinates.latitude
        this.position.lng = response.data.coordinates.longitude
        this.photos = response.data.photos
        this.rating = response.data.rating
        this.business = response.data.name
      } catch (err) {
        console.log(err);
      }
    },
    async getBusinessReview() {
      try {
        const response = await axios.get(`http://localhost:8080/v3/businesses/${this.$route.params.alias}/reviews`);
        this.reviews = response.data.reviews
      } catch (err) {
        console.log(err);
      }
    },
  },

}
</script>

<style>
img {
    float: left;
    width:  10000px;
    height: 500px;
    object-fit: cover;
}
</style>
