import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase';
import Vuelidate from 'vuelidate'
import { firebaseSettings } from './../config';
import "./assets/tailwind.css";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

const firebaseConfig = { ...firebaseSettings };

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
