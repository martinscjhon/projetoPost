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

    <div class="postarea loading" v-if="loading">
      <h2>Buscando todos os posts...</h2>
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" :key="post.id">
        <h1>{{post.autor}}</h1>
        <p>{{post.content}}</p>
        <div class="action-post">
          <button>
            {{post.like === 0 ? "curtir" : post.like + " curtidas"}}
          </button>
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
  data() {
    return {
      mensagem: "",
      user: {},
      loading: true,
      posts: [],
    };
  },
  async created() {
    const user = localStorage.getItem("@projeto-post");
    this.user = JSON.parse(user);

    await firebase.firestore().collection('posts')
    .onSnapshot((doc) => {
      this.posts = [];

      doc.forEach((items) => {
        this.posts.push({
          id: items.id,
          autor: items.data().autor,
          content: items.data().content,
          like: items.data().like,
          created: items.data().created,
          userId: items.data().userId
        })
      })
      this.loading = false

    })
  },
  methods: {
    async createPost() {
      if (this.mensagem === "") {
          return;
      }
      await firebase.firestore().collection("posts")
        .add({
        created: new Date(),
        content: this.mensagem,
        autor: this.user.nome,
        userId: this.user.uid,
        like: 0
      })
          .then(() => {
          this.mensagem = "";
          console.log("POST ENVIADO COM SUCESSO");
      })
          .catch((error) => {
          console.log("ERROR: " + error);
      });
    }
  },
  filters:{
    postLength(valor){
      if(valor.length < 200){
        return valor;
      }

      return `${valor.substring(0,200)}...`
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
