<template>
  <div id="perfil">
    <div class="postarea loading overflow" v-if="loading">
      <h2>Buscando posts...</h2>
    </div>

    <div v-else>
      <div class="headerPerfil">
        <h2>Olá, {{nome}}</h2>
        <span>Já fez <strong>{{totalPost}}</strong> posts</span>
      </div>

      <div class="postarea overflow">
        <article class="post" v-for="post in posts" :key="post.id">
          <h1>{{post.autor}}</h1>
          <p>{{post.content.length < 200 ? post.content : post.content.substring(0, 180) + "..."}}</p>

          <div class="action-post">
            <button @click="toggleOpenModal(post)">Veja post completo</button>
          </div>
        </article>
      </div>
    </div>

    <modal
      v-if="showPostModal"
      :post="fullPost"
      @close="toggleOpenModal()"
    >
    </modal>
  </div>
</template>

<script>
import Modal from '@/components/Modal.vue';
import firebase from '../services/firebaseConnection';


export default {
  components: { Modal },
  name: "PerfilComponent",
  data(){
    return{
      loading: true,
      showPostModal: false,
      fullPost: {},
      posts: [],
      nome: "",
      user: {},
      totalPost: ""
    }
  },
  props:["userId"],
  async created(){
    const user = localStorage.getItem('@projeto-post');
    this.user = JSON.parse(user)

    await firebase.firestore().collection('posts')
    .where("userId", "==", this.userId)
    .orderBy('created', 'desc')
    .onSnapshot((snapshot) => {
      this.posts = []

      snapshot.forEach((doc) => {
        this.posts.push({
          id: doc.id,
          autor: doc.data().autor,
          content: doc.data().content,
          like: doc.data().like,
          created: doc.data().created,
          userId: doc.data().userId
        })
      })
      this.nome = this.posts[0].autor
      this.totalPost = this.posts.length
      this.loading = false
    })
  },
  methods: {
    toggleOpenModal(post){
      this.showPostModal = !this.showPostModal;

      if(this.showPostModal){
        this.fullPost = post;
      }else {
        this.fullPost = {}
      }
    }
  }
}
</script>

<style scoped>
  #perfil{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(95vh - 60px);
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }

  @import url('../styles/home.css');
</style>
