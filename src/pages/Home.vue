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
      <h2>Buscando todos os posts...</h2  >
    </div>

    <div class="postarea" v-else>
      <article class="post" v-for="post in posts" :key="post.id">
        <router-link :to="`/perfil/${post.userId}`">{{post.autor}}</router-link>
        <p>
          {{post.content.length < 200 ? post.content : post.content.substring(0,180) + "..."}}
        </p>
        <div class="action-post">
          <button @click="likePost(post.id, post.like)">
            {{post.like === 0 ? "curtir" : post.like + " curtidas"}}
          </button>
          <button @click="togglePostModal(post)">Veja post completo</button>
        </div>
      </article>
    </div>

    <Modal
      v-if="showPostModal"
      :post="fullPost"
      @close="togglePostModal()"
    >
    </Modal>
  </div>
</template>

<script>
import Modal from '../components/Modal';
import firebase from '../services/firebaseConnection';

export default {
  name: "HomeComponent",
  components:{
    Modal
  },
  data() {
    return {
      mensagem: "",
      user: {},
      loading: true,
      posts: [],
      showPostModal: false,
      fullPost: {}
    };
  },
  async created() {
    const user = localStorage.getItem("@projeto-post");
    this.user = JSON.parse(user);

    await firebase.firestore().collection('posts')
    .orderBy('created', 'desc') //ordem (qual atributo do banco, qual ordem)
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
    },
    async likePost(id, like){
      const userId = this.user.uid;
      const docId = `${userId}_${id}`

      // checando se o post já foi curtindo - aula 96
      const doc = await firebase.firestore().collection('likes')
      .doc(docId)
      .get()

      if(doc.exists){
        await firebase.firestore().collection('posts')
        .doc(id)
        .update({
          like: like - 1
        })


        await firebase.firestore().collection('likes')
        .doc(docId).delete();

        return;
      }

      await firebase.firestore().collection('likes')
      .doc(docId).set({
        postId: id,
        userId: userId
      })

      // criando o like
      await firebase.firestore().collection('posts')
      .doc(id).update({
        like: like + 1
      })
    },
    togglePostModal(post){
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
