<template>
  <div id="home">
    <div class="newpost">
      <h2>Bem-vindo de volta!</h2>
      <span>Compartilhe seu dia</span>
      <textarea
        placeholder="O que você anda fazendo?"
        rows="15"
        v-model="mensagem"
      ></textarea>
      <button @click="createPost">Compartilhar</button>
    </div>

    <div class="postarea">
      <article class="post">
        <h1>Jhon</h1>
        <p>
          Oii! fico feliz de estar na plataforma sujeitoPost
        </p>

        <div class="action-post">
          <button>20 curtidas</button>
          <button>Veja post completo</button>
        </div>
      </article>

      <article class="post">
        <h1>Matheus</h1>
        <p>
          Oii! fico feliz de estar na plataforma sujeitoPost
        </p>

        <div class="action-post">
          <button>20 curtidas</button>
          <button>Veja post completo</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: "HomeComponent",
  data(){
    return{
      mensagem: "",
      user: {}
    }
  },
  created(){
    const user = localStorage.getItem("@projeto-post");
    this.user = JSON.parse(user);
  },
  methods: {
    async createPost(){
      if(this.mensagem === ""){
        return;
      }

      await firebase.firestore().collection('posts')
      .add({
        created: new Date(), //data da criação do post
        content: this.mensagem,
        autor: this.user.nome,
        userId: this.user.uid,
        like: 0
      })
      .then(() => {
        this.mensagem = "";
        console.log("POST ENVIADO COM SUCESSO")
      })
      .catch((error) => {
        console.log("ERROR: " + error)
      })
    }
  }
}
</script>

<style scoped>
  #home{
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    margin-top: 25px;
    height: calc(90vh - 60px)
  }

  @import url('../styles/home.css');
</style>
