<template>
  <div>
    <div v-for="item in dataItme"
         :key="item"
         target="_blank"
         rel="noopener"
         class="about">
      {{ item }}+'dfvvvvvvvvvvvvvvvvvvvvvvvvvvvvvd'
    </div>
    <div>dfvdf</div>
    <div class="this-is-a-test xiixhhah "
         href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
         target="_blank"
         rel="noopener">
      你是谁。你在哪里
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'about',
  data() {
    return {
      dataItme: [1, 32]
    };
  },
  created() {},
  methods: {
    test() {}
  }
};
</script>
