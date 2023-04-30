<template>
  <div class="login-page">
    <div class="form-group">
      LOGIN
    </div>
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
          :disabled="!username || disable || !password || GET_IS_LOGGING_IN"
          @click.prevent="login"
        >
          <span
            style="margin-right:10px"
            v-show="GET_IS_LOGGING_IN"
            class="icon-dotted-roller icon spinner animate font-15"
          ></span>
          <span>
            Login
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { TOAST_ACTION } from "../../components/SideNotificationSnack/store.module/constants";
import {
  POST_LOGIN_ACTION,
  GET_IS_LOGGING_IN,
  GET_LOGIN_DATA
} from "./store.module/constants";
export default {
  name: "DevLogin",
  data() {
    return {
      username: "",
      password: "",
      disable: false
    };
  },
  methods: {
    ...mapActions([POST_LOGIN_ACTION, TOAST_ACTION]),
    login() {
      this[POST_LOGIN_ACTION]({
        email: this.username,
        password: this.password
      });
    }
  },
  computed: {
    ...mapGetters([GET_IS_LOGGING_IN, GET_LOGIN_DATA])
  },
  watch: {
    GET_LOGIN_DATA() {
      this[GET_LOGIN_DATA];
      if (
        this[GET_LOGIN_DATA] &&
        this[GET_LOGIN_DATA]?.code === 200 &&
        this[GET_LOGIN_DATA]?.message === "Login is successful" &&
        this[GET_LOGIN_DATA]?.name === "success"
      ) {
        this.disable = true;
        const callback = async () => {
          localStorage.setItem(
            "gradelyAuthToken",
            this[GET_LOGIN_DATA]?.data?.token
          );
          localStorage.setItem(
            "authUser",
            JSON.stringify({
              ...this[GET_LOGIN_DATA]?.data,
              term: this[GET_LOGIN_DATA]?.data?.termWeek?.term,
              week: this[GET_LOGIN_DATA]?.data?.termWeek?.week
            })
          );
          window.location = `${window.location.origin}/lms/create-homework`;
        };
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText: this[GET_LOGIN_DATA]?.message || "Login is successful",
            toastState: "success",
            showBtn: false
          },
          timeout: 3000,
          callback
        });
      } else {
        this[TOAST_ACTION]({
          toastData: {
            toastOpen: true,
            toastText:
              this[GET_LOGIN_DATA]?.message ||
              "There is An error loggin you in",
            toastState: "error",
            showBtn: true
          },
          timeout: 1000,
          isStatic: true
        });
      }
    }
  },
  mounted() {
    if (process.env.NODE_ENV === "production") {
      window.location = `${window.location.origin}/login`;
    }
  }
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
