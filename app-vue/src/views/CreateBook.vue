<template>
<div>    
    <v-container grid-list-md mb-10>
        <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>            

        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="dark green" dark flat>
                <v-toolbar-title>Create Book</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" @submit="postBook" ref="form">
					<v-text-field
                    label="Title"
                    name="title"
                    v-model="text"
					:rules="[v => !!v || 'You must enter the title']"
					required
                  />
                  <v-text-field
                    label="Author"
                    name="Author"
                    v-model="text"
					:rules="[v => !!v || 'You must enter the author']"
					required
                  />

                  <v-text-field
                  label="Amount"
                  name="amount"
                  v-model="number"
                  required
                  :rules="[v => v > 0 || 'The amount must be greater than 0']"
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
                     to='/books'
                    >Cancel</v-btn>

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
        this.$router.push("/books");
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