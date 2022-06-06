<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '../src/components/Header.vue'
export default {
  name: "App",
  components: { Header }
}
</script>

<style>
  #app{
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }
</style>
