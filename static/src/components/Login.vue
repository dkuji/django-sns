<template>
  <v-app id="inspire" :dark="setTheme">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#e6e8eb" dark flat>
                <v-toolbar-title class="black--text">Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom></v-tooltip>
                <v-tooltip right></v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form method="POST" action>
                  <v-text-field
                    v-model="username"
                    label="Login"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    :rules="rules.username"
                  />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    :rules="rules.password"
                  />

                  <v-card-actions>
                    <v-spacer />
                    <v-btn color="#e6e8eb" @click="login">Login</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <!--<v-switch :label="`Dark Theme`" v-model="goDark"></v-switch>-->
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  props: { csrfToken: String },
  //props: ["csrf_token"]
  data: () => ({
    goDark: false,
    credentials: {},
    valid: true,
    loading: false,
    rules: {
      username: [
        v => !!v || "ユーザー名は必須です",
        v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません",
        v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
      ],
      password: [
        v => !!v || "パスワードは必須です",
        v => (v && v.length > 4) || "ユーザー名は5文字以上でなければなりません"
      ]
    }
  }),
  methods: {
    login() {
      //if (this.$refs.form.validate()) {
      this.loading = true;
      const axiosPost = axios.create({
        baseURL: "http://localhost:8000/",
        xsrfCookieName: "csrftoken",
        xsrfHeaderName: "X-CSRFToken",
        withCredentials: true
      });
      const params = new URLSearchParams();
      params.append("username", this.username);
      params.append("password", this.password);

      axiosPost
        .post("/login/", params)
        .then(response => {
          console.log(params);
          console.log(response);
          console.log(response.request.responseURL);
          //this.$session.start();
          //this.$session.set("token", res.data.token);
          // eslint-disable-next-line
          window.location.href = response.request.responseURL;
        })
        .catch(error => {
          console.log(error);
          this.loading = false;
          Swal.fire({
            type: "warning",
            title: "Error",
            text: "ユーザー名もしくはパスワード、または両方が間違っています",
            showConfirmButton: false,
            showCloseButton: false,
            timer: 3000
          });
        });
    }
  },
  computed: {
    setTheme() {
      if (this.goDark == true) {
        return (this.$vuetify.theme.dark = true);
      } else {
        return (this.$vuetify.theme.dark = false);
      }
    }
  }
};
</script>
