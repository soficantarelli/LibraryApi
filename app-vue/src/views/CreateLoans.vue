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
                <v-select :items="items" name="idBook" label="Book" required></v-select>

                <v-text-field
                  label="Days"
                  name="days"
                  v-model="number"
                  required
                  :rules="[v => v > 0 && v < 11 || '1 to 10 days last the loans']"
                />
                <v-spacer />

                <v-btn rounded color="info" type="submit" :disabled="!valid" block>Create</v-btn>

                <v-btn rounded color="dark red" type="submit" block to="/homeuser">Cancel</v-btn>
              </v-form>
            </v-card-text>
            <v-card-actions></v-card-actions>
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
    valid: false,
    days: 0,
    idBook: 0,
    idUser: this.$store.state.idUser
  }),
  created() {
    this.initialize();
  },
  methods: {
    postLoan() {
      this.$axios
        .post("http://localhost:8080/loans", {
          idUser: this.idUser,
          idBook: this.idBook,
          days: this.days
        })
        .then(data => {
          if (res.status == 200) {
            this.message="Loan successfully created"
						this.$router.push("/homeuser");
					} 
        })
        .catch(e => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired"
            .then(() => this.$router.push("/"));

          } else if (error.response.status == 404) {
            this.message = "Book not found"
            .then(() => this.$router.push("/homeuser"));

          } else {
            this.message = "The loan could not be created"
            .then(() => this.$router.push("/books"));
          }
        });
    }
  }
};
</script>

<style scoped>
</style>