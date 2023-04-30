<template>
  <div class="login-page">
    <div class="form-group">LOGIN</div>
    <form>
      <div class="form-group">
        <input placeholder="EMAIL" type="text" v-model="username" />
      </div>
      <div class="form-group">
        <input placeholder="PASSWORD" type="password" v-model="password" />
      </div>
      <div class="form-group">
        <button
          class="btn btn-accent"
          :disabled="!username || disable || !password || getIsLoggingIn"
          @click.prevent="login"
        >
          <span
            style="margin-right: 10px"
            v-show="getIsLoggingIn"
            class="icon-dotted-roller icon spinner animate font-15"
          ></span>
          <span> Login </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "DevLogin",
  data() {
    return {
      username: "",
      password: "",
      disable: false,
    };
  },
  methods: {
    ...mapActions(["postLoginAction", "toastAction"]),
    login() {
      this.postLoginAction({
        email: this.username,
        password: this.password,
      });
    },
  },
  computed: {
    ...mapGetters(["getIsLoggingIn", "getLoginData"]),
  },
  watch: {
    getLoginData() {
      if (
        this.getLoginData &&
        this.getLoginData?.code === 200 &&
        this.getLoginData?.message === "Login is successful" &&
        this.getLoginData?.name === "success"
      ) {
        this.disable = true;
        const callback = async () => {
          localStorage.setItem(
            "gradelyAuthToken",
            this.getLoginData?.data?.token
          );
          localStorage.setItem(
            "authUser",
            JSON.stringify(this.getLoginData?.data)
          );
          if (this.$route?.query?.redirect) {
            window.location = this.$route?.query?.redirect;
          } else {
            window.location = `${window.location.origin}/start-exam/0`;
          }
        };
        this.toastAction({
          toastData: {
            toastOpen: true,
            toastText: this.getLoginData?.message || "Login is successful",
            toastState: "success",
            showBtn: false,
          },
          timeout: 3000,
          callback,
        });
      } else {
        this.toastAction({
          toastData: {
            toastOpen: true,
            toastText:
              this.getLoginData?.message || "There is An error loggin you in",
            toastState: "error",
            showBtn: true,
          },
          timeout: 1000,
          isStatic: true,
        });
      }
    },
  },
};
</script>
<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 9rem;
}
.form-group {
  width: 17rem;
}
input {
  background: #ffffff;
  border: 1px solid #d5d5d5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  color: #353535;
  padding: 0.5rem;
  width: 100%;
}
</style>
