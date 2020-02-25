<template>
	<v-app id="container">
    <v-content> 
      <v-container grid-list-md>
          <NavBar></NavBar>   
      </v-container>
      <v-container fluid class="mx-auto my-auto" mt-8>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="dark blue" dark flat>
                <v-toolbar-title>Sing Up</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" @submit="formLogin" ref="form">
					<v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    v-model="text"
					:rules="[v => !!v || 'Debe ingresar su nombre']"
					required
                  />

                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="person"
                    v-model="text"
					:rules="[v => !!v || 'Debe ingresar su usuario']"
					required
                  />

                  <v-text-field
                    :type="showPassword ? 'text' : 'password'"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                 
                  v-model="password"
                  required
                  :rules="[v => !!v || 'Debe ingresar su contraseña']"
                  />
				  <v-spacer />

				    <v-btn
                      rounded
                      color="info"
                      type="submit"
					  :disabled="!valid"
                      block
                    >Ingresar</v-btn>

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
	  name: "singup",
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
        	.post("http://localhost:8000/singup", {
			name: this.name,
          	username: this.username,
          	password: this.password
        })
        .then(response => {
				
					//if (res.status == 200) {
						this.$router.push("/login");
					//} else {
						//console.log(res);
					//}

		})
		.catch(error => {
					console.log(e.message);

				});
  	}
  }
}
</script>