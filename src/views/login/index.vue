<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <div class="tips">
      <p>tips:</p>
      <p>用户名： admin</p>
      <p>密码： any</p>
    </div>
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="userLogin">登 录</el-button>
      </el-form-item>
    </el-form>
    欢迎登陆
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { login, getUserInfo } from '@/api/user';

  @Component
  export default class Login extends Vue {
    private user: Object = {
      username: '',
      password: ''
    };
    private userLogin() {
      login(this.user).then(res => {
        // 获取用户信息会失败，因为没有传递token
        getUserInfo({ userName: 'admin' }).then(res => {
          console.log(res.data);
        });
      });
    }
  }
</script>

<style lang="scss" scoped>
  .tips {
    text-align: left;
    margin-left: 32px;
    font-family: bold;
    margin-bottom: 32px;
  }
  .home {
    width: 20%;
    margin: 0 auto;
  }
</style>
