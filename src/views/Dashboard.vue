<template lang="html">
  <div>
    <h1>Dashboard</h1>
    welcome: {{ user.displayName }}
    <img class="w-20 h-20 rounded" :src="user.photoURL" />
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

  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },

  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("/");
        })
        .catch((error) => console.log(error.message));
    },
  },
};
</script>
