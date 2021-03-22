<template lang="html">
  <div>
    <h1>Dashboard</h1>
    <button
      class="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
      @click="signOut"
    >
      Sign out
    </button>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Dashboard",

  created() {
    console.log(firebase.getCurrentUser());
  },

  methods: {
    signOut() {
      firebase.auth().signOut();
      this.$router.push('/');
    },
  },
};
</script>
