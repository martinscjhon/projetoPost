<template>
  <div id="dashboard">
    <h1>Dashboard</h1>

    <button @click="signOut">Sair</button>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: "DashboadComponent",
  data()  {
    return{

    }
  },
  methods: {
    async signOut(){
      const confirm = window.confirm("Você realmente deseja sair da aplicação?");

      if(confirm){
        await firebase.auth().signOut()
        .then(async () => {
          await localStorage.removeItem("@projeto-post");

          this.$router.push("/login")
        })
      } else {
        return;
      }
    }
  }
}
</script>

<style>

</style>
