<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App"></HelloWorld>
  </div>
</template>

<script>
  // @ is an alias to /src
  import HelloWorld from '@/components/hello-world';

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    created() {
      console.log('dfvdfvdfv');
    }
  };
</script>
