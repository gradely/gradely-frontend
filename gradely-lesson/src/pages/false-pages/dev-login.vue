<template>
  <div class="dev-login-page">
    <img
      v-lazy="
        'https://res.cloudinary.com/gradely/image/upload/v1639029641/helpFooterBlob_a0elwy.svg'
      "
      alt=""
      class="login-bg"
    />

    <div class="container">
      <div class="row position-relative">
        <div class="wrapper col-12 col-sm-8 col-lg-6 col-xl-4 mx-auto">
          <div class="w-100 d-flex justify-content-center mgb-15 gradely-logo">
            <img v-lazy="staticImg('Gradely.svg')" alt="" />
          </div>

          <h6 class="text-center color-ash mgb-30 gfont-14-5">
            Gradely Tutoring Dev Login
          </h6>

          <form @submit.prevent="handleLogin">
            <div class="form-row">
              <label class="control-label gfont-14 brand-primary">Email:</label>
              <input
                type="text"
                v-model="form.email"
                class="form-control"
                placeholder="Enter email or student code"
              />
            </div>

            <div class="form-row mgt-30">
              <label class="control-label gfont-14 brand-primary"
                >Password:</label
              >
              <input
                type="password"
                v-model="form.password"
                class="form-control"
                placeholder="Enter Password"
              />
            </div>

            <div class="form-row mgt-35">
              <button
                type="submit"
                class="btn btn-md btn-block w-100 btn-accent pdy-18"
                ref="loginBtn"
                :disabled="isDisabled"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
import { VueConstructor } from 'vue';
import { Component, Vue } from 'vue-property-decorator';

// INTERFACES
import { IVue } from '../../interfaces';

@Component({
  methods: {
    ...mapActions({
      login: 'auth/loginUser',
    }),
  },
})
export default class extends (Vue as VueConstructor<IVue>) {
  // DECLRATIONS
  login!: (form: { email: string; password: string }) => any;

  // COMPUTED
  get isDisabled() {
    return this.form.email && this.form.password ? false : true;
  }

  // DATA
  private form = {
    email: '',
    password: '',
  };

  // METHODS
  handleLogin() {
    this.$refs.loginBtn.disabled = true;
    this.$refs.loginBtn.innerHTML =
      '<div class="icon-dotted-roller font-17 mgr-2 animate"></div>LOGGING IN...';

    // DISPATCH LOGIN ACTION
    this.login(this.form)
      .then((response: any) => {
        console.log(response);
        // HANDLE A NON 200 RESPONSE ERROR
        if (response.code !== 200) {
          setTimeout(() => {
            // CHECK IF RESPONSE MESSAGE IS A NETWORK ERROR
            if (response.message === 'Network Error')
              this.$bus.$emit('show_response_alert', {
                message: '0ops! No internet connection, try again!',
                type: 'error',
              });
            else
              this.$bus.$emit('show_response_alert', {
                message: 'An error occured, please try again!',
                type: 'error',
              });

            this.$refs.loginBtn.disabled = false;
            this.$refs.loginBtn.innerText = 'LOG IN';
          }, 1000);
        }
        // HANDLE A 200 RESPONSE ERROR
        else {
          this.$bus.$emit('show_response_alert', {
            message: 'Login was successful!',
            type: 'success',
          });

          this.$refs.loginBtn.disabled = false;
          this.$refs.loginBtn.innerHTML =
            '<div class="icon-accept font-18 mgr-5"></div>LOG IN SUCCESSFUL';

          setTimeout(() => (location.href = `/lesson/`), 1000);
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  // HOOKS
  created() {}
  mounted() {
    this.$color.setPageBackgroundColor('#FFFFFF');
  }
}
</script>

<style lang="scss" scoped>
.dev-login-page {
  @include fixed-display-area;

  .login-bg {
    @include background-cover;
  }

  .row {
    height: 100vh;

    .wrapper {
      @include center-placement;

      .gradely-logo {
        img {
          position: relative;
          @include rectangle-shape(140, 50);
        }
      }
    }
  }
}
</style>
