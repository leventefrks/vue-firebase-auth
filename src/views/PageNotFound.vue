<template lang="html">
  <div class="container mx-auto flex flex-wrap items-center">
    <div class="w-full text-center">
      <div class="text-6xl font-medium">404</div>
      <div class="text-xl md:text-3xl font-medium mb-4">
        Oops. This page has gone missing.
      </div>
      <div class="text-lg mb-8">
        You may have mistyped the address or the page may have moved.
      </div>
      <router-link
        to="/"
        class="text-xs text-black hover:text-gray-700 font-medium underline"
        >Go Home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>
