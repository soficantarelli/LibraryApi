<template>
	<v-app id="imagen">
    <v-content>
      <v-container grid-list-md>
          <NavBar></NavBar>      
      </v-container>
      <v-container fluid class="mx-auto my-auto" mt-8>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="dark blue" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" @submit="formLogin" ref="form">
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    v-model="text"
					:rules="[v => !!v || 'You must enter your user']"
					required
                  />

                  <v-text-field
                  :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                 
                  v-model="password"
                  required
                  :rules="[v => !!v || 'You must enter your password']"

                  />
				  <v-spacer />

				    <v-btn
                      rounded
                      color="info"
                      id="ingresar"
                      type="submit"
                      :disabled="!valid"
                      block
                    >Login</v-btn>

                </v-form>
              </v-card-text>
              <v-card-actions>
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "login",
    messsage:"",
    data: () => ({
    username: "",
    password: "",
    showPassword: false,
    valid: false
  }),
  methods: {
    formLogin(e) {
		e.preventDefault();
      	this.axios
        	.post("http://localhost:8000/login", {
          	username: this.username,
          	password: this.password
        })
        .then(response => {
					this.loading = false;
					const id = response.data.idPartner;
					const rol = response.data.roles;
					this.$store.commit("login", {
						idUser: id,
						userRol: rol
          } );
          if (response.data.role == 'P') {
            this.$router.push("/homeuser");
          }
          if (response.data.role == 'L') {
            this.$router.push("/homelibrarian");
          }  

    })
    
		.catch(error => {
					if (error.response && error.response.status == 404) {
            this.messsage = "The e-mail and / or password are incorrect";
          } else if ((error.response && error.response.status == 500)) {
            this.messsage = "There was an error, please try again in a moment";
          }

				});
  	}
  }
}
</script>

<style scoped>

</style>