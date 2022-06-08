<template>
  <div class="modal">
    <div class="container">
      <a class="close" @click="$emit('close')">X</a>
        <h2>{{post.autor}}</h2>
        <span
          v-if="post.like === 0 ? false : true">
            {{post.like === 1 ? `${post.like} curtida` : `${post.like} curtidas`}}
          </span>
        <p>{{post.content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalComponent",
  props:["post"]
}
</script>

<style scoped>
  .modal{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .modal .container{
    position: fixed;
    max-width: 450px;
    top: 4vh;
    bottom: 4vh;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 2rem;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: rgba(0,0,0,0.5);
    overflow-y: scroll;
  }

  .close{
    cursor: pointer;
    background: #121212;
    padding: 2px 10px;
    color: #fff;
    position: absolute;
    top: 15px;
    right: 20px;
    border-radius: 15px;
  }

  span{
    font-style: italic;
  }

  p{
    white-space: pre-wrap;
  }
</style>
