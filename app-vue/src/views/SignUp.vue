<template>
<div class="imagen">
      <v-container grid-list-md>
          <NavBar></NavBar>   
      </v-container>
      <v-container fluid class="mx-auto my-auto" mt-8>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#b51100" dark flat>
                <v-toolbar-title>Sign Up</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" @submit="formLogin" ref="form">
					<v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    v-model="name"
					:rules="[v => !!v || 'You must enter your name']"
					required
                  />

                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    v-model="username"
					:rules="[v => !!v || 'You must enter your username']"
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
                      type="submit"
					  :disabled="!valid"
                      block
                    >Sign Up</v-btn>

                </v-form>
              </v-card-text>
              <v-card-actions>
                
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
  export default {
	  name: "signup",
	data: () => ({
		name: "",
    username: "",
    password: "",
	showPassword: false,
	valid: false
  }),
  methods: {
    formLogin(e) {
		e.preventDefault();
      	this.axios
        	.post("http://localhost:5555/signup", {
			      name: this.name,
          	username: this.username,
          	password: this.password
        })
        .then(response => {				
					if (response.status == 200) {
						this.$router.push("/login");
					} 

		})
		.catch(error => {
					console.log(e.message);
				});
  	}
  }
}
</script>

<style scoped>
.imagen {
    background-image:url("../assets/fondo.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;
    min-height: 100vh;
    min-width: 100vh;
}
</style>