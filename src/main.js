import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase';
import Vuelidate from 'vuelidate';
import "./assets/tailwind.css";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

var firebaseConfig = {
  apiKey: "AIzaSyALy0w4rGAgucSUyouMxook-EaSPgyCNLA",
  authDomain: "vue-firebase-auth-f8d44.firebaseapp.com",
  projectId: "vue-firebase-auth-f8d44",
  storageBucket: "vue-firebase-auth-f8d44.appspot.com",
  messagingSenderId: "395604083564",
  appId: "1:395604083564:web:b1c9179d4cef1f36a2e949",
  measurementId: "G-NRY9XMCP5E"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
