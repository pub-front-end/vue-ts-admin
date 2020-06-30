<template>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component({
    name: 'layout-index'
  })
  export default class extends Vue {}
</script>
