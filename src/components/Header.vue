<template>
  <header id="header">
    <router-link to="/">SujeitoPost</router-link>
    <router-link to="/dashboard" class="button">Dashboard</router-link>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent"
}
</script>

<style scoped>
  #header{
    display: flex;
    background-color: #202225;
    width: 100vw;
    align-items: center;
    justify-content: space-around;
    height: 60px;
    box-shadow: 0 0 10px rgba(0,0,0, 0.2);
  }

  #header a{
    text-decoration: none;
    color: #FFF;
    cursor: pointer;
    font-weight: bold;
  }

  #header a:nth-child(1){
    font-size: 30px;
  }

  #header a + a{
    font-size: 14px;
  }

  .button{
    cursor: pointer;
    border:0;
    color: #FFF;
    background: transparent;
    padding: 5px 15px;
    outline: none;
    font-weight: bold;
  }
</style>
