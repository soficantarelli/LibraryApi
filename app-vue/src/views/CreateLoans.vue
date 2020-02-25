<template>
<div>    
    <v-container grid-list-md mb-10>
            <NavBarUser></NavBarUser>
        </v-container>

        <v-container grid-list-md mt-10>
            

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="dark green" dark flat>
                <v-toolbar-title>Create Loan</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" @submit="postLoan" ref="form">
					<v-select
                    :items="items"
                    name="book"
                    label="Book"
                    required
                    ></v-select>

                  <v-text-field
                  label="Days"
                  name="days"
                  v-model="number"
                  required
                  :rules="[v => v > 0 && v < 11 || 'De 1 a 10 días duran los prestamos']"
                  />
				  <v-spacer />

				    <v-btn
                      rounded
                      color="info"
                      type="submit"
					  :disabled="!valid"
                      block
                    >Create</v-btn>

                      <v-btn
                      rounded
                      color="dark red"
                      type="submit"
                      block
                     to='/homeuser'
                    >Cancelar</v-btn>

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
name: "createloans",
	data: () => ({
		valid: false
  }),
  created() {
    this.initialize();
  },
  methods: {
    postLoan(){
       
        this.$axios
        this.$router.push("/homeuser");
        // .post("http://localhost:8080/prestamos", {
        //   idLibro: this.book.id,
        //   cantidadDias: this.cantidadDias
        // })
        // .then(data => {
        //   this.getLoans();
        //   console.log(data);
        // })
        // .catch(e => {
        //   this.messageResponse = e.response.data;
        //   this.snackbar = true;
        //   console.log("Incorrect loan");
        // });
    },
    initialize() {
      this.items = [
        {
          book: "Frozen Yogurt"
        }
      ];
    }
}
}
</script>

<style scoped>

</style>