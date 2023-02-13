<template>
  <div id="app">
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
                  <h2 class="title-1">Business</h2>
                </div><br>
                <!-- Search Box Data User -->
                <div class="card">
                  <div class="card-header">
                    <strong>Search</strong> Business
                  </div>
                  <div class="card-body card-block">
                    <div class="row form-group">
                      <div class="col col-md-1">
                        <label for="text-input" class=" form-control-label">Location</label>
                      </div>
                      <div class="col-12 col-md-5">
                        <input type="text" id="text-input" placeholder="Input location" v-model="location" class="form-control">      
                      </div>
                      <div class="col col-md-1">
                        <label for="text-input" class=" form-control-label">Term</label>
                      </div>
                      <div class="col-12 col-md-5">
                        <input type="text" id="text-input" placeholder="Input Term" v-model="term" class="form-control">      
                      </div>
                    </div>
                    <div class="row form-group">
                      <div class="col col-md-1">
                        <label for="text-input" class=" form-control-label">Latitude</label>
                      </div>
                      <div class="col-12 col-md-5">
                        <input type="text" id="text-input" placeholder="Input latitude" v-model="latitude" class="form-control">      
                      </div>
                      <div class="col col-md-1">
                        <label for="text-input" class=" form-control-label">Longitude</label>
                      </div>
                      <div class="col-12 col-md-5">
                        <input type="text" id="text-input" placeholder="Input Longitude" v-model="longitude" class="form-control">      
                      </div>
                    </div>
                    <button class="btn btn-primary is-small" @click="searchBusiness">
                          <i class="fas fa-search"> Search</i>
                        </button>
                  </div>
                  <div class="card-footer">      
                  </div>
                </div>
                <!-- Show All Data Business With Vue Good Table -->
                <div class="card">
                  <div class="card-header">
                    <strong>List Business</strong> in New York
                  </div>
                  <div class="card-body card-block">
                    <div class="table-responsive m-b-40">
                      <vue-good-table :columns="columns" 
                                      :rows="items" 
                                      :line-numbers="true"
                                      :pagination-options="{
                                              enabled: true,
                                              perPage: 10
                                      }">
                        <template slot="table-row" slot-scope="props">
                          <span v-if="props.column.field == 'before'"><center>
                            <a :href="`/#/business/${props.row.id}/${props.row.alias}`"><button class="btn btn-info is-small"><i class="far fa-edit"> Detail</i></button></a>&nbsp;
                            </center>
                          </span>
                          <span v-else>
                            {{props.formattedRow[props.column.field]}}
                          </span>
                        </template>
                      </vue-good-table>
                    </div>
                  </div>
                  <div class="card-footer">          
                  </div>
                </div>
                <!-- End Show Data Business -->
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
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';

export default {
  name: 'BusinessList',
  components: {
    NavigationBar,
    SideBar,
    VueGoodTable,
  },
  data() {
    return {
      name: "",
      location: "New York",
      term: "",
      latitude: "",
      longitude: "",
      items: [],
      columns: [
        {
          label: 'Name',
          field: 'name',
          thClass: 'text-center'
        },
        {
          label: 'Categories',
          field: 'categories',
          thClass: 'text-center'
        },
        {
          label: 'Latitude',
          field: 'coordinates.latitude',
          thClass: 'text-center'
        },
        {
          label: 'Longitude',
          field: 'coordinates.longitude',
          thClass: 'text-center'
        },
        {
          label: 'City',
          field: 'location.city',
          thClass: 'text-center'
        },
        {
          label: 'Country',
          field: 'location.country',
          thClass: 'text-center'
        },
        {
          label: 'State',
          field: 'location.state',
          thClass: 'text-center'
        },
        {
          label: 'Zip Code',
          field: 'location.zip_code',
          thClass: 'text-center'
        },
        {
          label: 'Phone No',
          field: 'display_phone',
          thClass: 'text-center'
        },
        {
          label: 'Action',
          field: 'before',
          thClass: 'text-center',
          tdClass: 'text-center'
        }
      ],
    }
  },
  created() {
    this.getBusiness();
  },
  methods: {
    // Get All Data User
    async getBusiness() {
      try {
        const response = await axios.get(`http://localhost:8080/v3/businesses/search?location=${this.location}&limit=50`);
        this.items = response.data.businesses;
        console.log(response.data)
      } catch (err) {
        console.log(err);
      }
    },
    // Search User By Name User
    async searchBusiness(){
      try {
        var params = ''
        if(this.location!="" && this.term!="" && this.latitude!="" && this.longitude!=""){
            params += 'location='+this.location+'&term='+this.term+'&latitude='+this.latitude+'&longitude='+this.longitude
        } else if(this.location!="" && this.term!=""){
            params += 'location='+this.location+'&term='+this.term
        } else if(this.latitude!="" && this.longitude!=""){
            params += 'latitude='+this.latitude+'&longitude='+this.longitude
        } else if(this.location!=""){
            params += 'location='+this.location
        }

        if(params!=""){
          const response = await axios.get(`http://localhost:8080/v3/businesses/search?`+params);
          this.items = response.data.businesses;
        } else {
          const response = await axios.get(`http://localhost:8080/v3/businesses/search?location=New York&limit=50`);
          this.items = response.data.businesses;
        }
      } catch (err) {
        console.log(err);
      }
    },
  }
}
</script>

<style>
</style>
