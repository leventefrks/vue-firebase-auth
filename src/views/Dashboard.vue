<template lang="html">
  <h1>Dashboard</h1>
</template>

<script>
import firebase from 'firebase';
export default {
  name: "Dashboard",

  created() {
    console.log(firebase.getCurrentUser());
  }
};
</script>
