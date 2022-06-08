<template>
  <div id="login">
    <div class="loginArea" v-if="login">
      <h1>SujeitoPost</h1>
      <form @submit.prevent="handleSubmit">
        <label for="input-email" class="sr-only">Email: </label>
        <input
          type="email"
          id="input-email"
          placeholder="seuemail@gmail.com"
          v-model="email"
        />
        <label for="input-password" class="sr-only">Senha: </label>
        <input
          type="password"
          id="input-password"
          placeholder="Digite sua senha..."
          v-model="senha"
        />
        <button type="submit">Entrar</button>
      </form>
      <a @click="toggleBtn">Criar uma conta</a>
    </div>

    <div class="loginArea" v-else>
      <h1>Cadastrar</h1>
      <form @submit.prevent="handleRegister">
        <label for="input-email" class="sr-only">Nome:</label>
        <input
          type="text"
          id="input-email"
          placeholder="Nome completo"
          v-model="nome"
        />
        <label for="input-email" class="sr-only">Email: </label>
        <input
          type="email"
          id="input-email"
          placeholder="seuemail@gmail.com"
          v-model="email"
        />
        <label for="input-password" class="sr-only">Senha: </label>
        <input
          type="password"
          id="input-password"
          placeholder="Digite sua senha..."
          v-model="senha"
        />
        <button type="submit">Cadastrar</button>
      </form>
      <a @click="toggleBtn">Já possuo uma conta</a>
    </div>
  </div>
</template>

<script>
import firebase from '../services/firebaseConnection';

export default {
  name: "LoginComponent",
  data(){
    return{
      nome: "",
      email: "",
      senha: "",
      login: true
    }
  },
  methods:{
    toggleBtn(){
      this.login = !this.login;

      this.nome = "";
      this.email = "";
      this.senha = ""
    },
    async handleRegister(){
    const { user } = await firebase.auth().createUserWithEmailAndPassword(this.email, this.senha)
    await firebase.firestore().collection('users')
    .doc(user.uid)
    .set({
      nome: this.nome
    })
    .then(async () => {
      const usuarioLogado = {
        uid: user.uid,
        nome: this.nome
      }

      await localStorage.setItem("@projeto-post", JSON.stringify(usuarioLogado))

    })
    .catch( () => {
      alert('Erro ao cadastrar')
    })

    this.$router.push("/")
  },
    async handleSubmit(){
    if(this.email === ""){
      alert('Favor digite um e-mail!')
    } else if(this.senha === "" ) {
      alert('Favor digite uma senha!')
    }

    const {user} = await firebase.auth().signInWithEmailAndPassword(this.email, this.senha)

    const userProfile = await firebase.firestore().collection('users')
    .doc(user.uid)
    .get();

    const userLogado = {
      uid: user.uid,
      nome: userProfile.data().nome
    }

    await localStorage.setItem('@projeto-post', JSON.stringify(userLogado));

    this.$router.push('/')

    }
  }

}
</script>

<style scoped>
  #login{
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 60px);
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

  h1{
    color: #fff;
  }

  .sr-only{
    position: absolute;
    height: 1px;
    width: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip-path: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  form{
    width: 80%;
    display: flex;
    flex-direction: column;
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
    color: rgb(116, 116, 116);
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

  a{
    color: #fff;
    text-decoration: none;
    font: 400 0.7rem "Poppins";
    cursor: pointer;
  }

</style>
