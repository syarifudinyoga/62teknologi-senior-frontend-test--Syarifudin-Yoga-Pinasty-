import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router/index'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueCarousel from 'vue-carousel';
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAzl30do_fxVkWEw27mbsYggxwUB3IaNyQ',
    libraries: 'places',
  }
});
Vue.use(VueCarousel);

axios.defaults.headers.common["Authorization"] = 'Bearer Ubf1-f0uqsJUnssqPMGo-tiFeZTT85oFmKfznlPmjDtX8s83jYMoAb-ApuD63wgq6LDZNsUXG6gurZIVYaj2jzxJmmLdCdXbDqIHU_b6KiCEVi8v-YB0OSsW6MWaY3Yx';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
