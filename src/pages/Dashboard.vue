<template>
  <div id="dashboard">
    <div class="loginArea">
      <h2>Minha conta</h2>
      <span>Atualize seu perfil</span>

      <form @submit.prevent="atualizarPerfil">
        <label for="name">Nome: </label>
        <input type="text" id="name" v-model="nome" :placeholder="user.nome"/>
        <button type="submit" class="button">Atualizar perfil</button>
      </form>

        <button @click="logOut" class="button logOut">Sair</button>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: "DashboadComponent",
  data()  {
    return{
      nome: "",
      user: {}
    }
  },
  async created(){
    const user = localStorage.getItem('@projeto-post')
    this.user = JSON.parse(user)
  },
  methods: {
    async logOut(){
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
    },
    async atualizarPerfil(){
      if(this.nome === ""){
        return;
      }

      await firebase.firestore().collection('users')
      .doc(this.user.uid)
      .update({
        nome: this.nome
      })

      // atualizando todos os posts do usuário

      const postDocs = await firebase.firestore().collection('posts')
      .where('userId', "==", this.user.uid)
      .get()

      postDocs.forEach( async (doc) => {
        await firebase.firestore().collection('posts')
        .doc(doc.id)
        .update({
          autor: this.nome
        })
      })

      //atualizando localstorage

      localStorage.setItem('@projeto-post', JSON.stringify({
        uid: this.user.uid,
        nome: this.nome
      }))

      alert('Perfil atualizado com sucesso!')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
  #dashboard{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  .loginArea{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 2rem;
    min-width: 20%;
    background-color: #4c5059;
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(0,0,0,0.4);
  }

  form{
    width: 80%;
    display: flex;
    flex-direction: column;
  }

  form label{
    margin-top: 1rem;
  }

  h2{
    margin-bottom: 0rem;
  }

  span{
    font-size: 0.8rem;
  }

  h2, span, label{
    color: #fff;
  }

  input{
    margin-bottom: 10px;
    height: 15px;
    border-radius: 5px;
    border: none;
    font: 400 .8rem "Poppins";
    padding: 10px;
    outline: none;
  }

  input::placeholder{
    color: rgb(0, 0, 0);
  }

  input:focus::placeholder{
    color: rgb(136, 136, 136);
  }

  button{
    margin: 15px 0;
    height: 35px;
    cursor: pointer;
    border: none;
    background-color: rgb(15, 115, 216);
    color: #fff;
    font-family: "Poppins";
    border-radius: 15px;
  }

  button.logOut{
    background-color: rgb(216, 38, 15);
    width: 80%;
    margin-top: -0.5rem;
  }
</style>
