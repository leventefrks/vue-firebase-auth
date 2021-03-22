import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";
import Vuelidate from "vuelidate";
import { firebaseConfig } from "./../config";
import "./assets/tailwind.css";

Vue.use(Vuelidate);

Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
