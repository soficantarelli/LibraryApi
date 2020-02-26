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

                <v-btn rounded color="info" type="submit" :disabled="!valid" block>Create</v-btn>

                <v-btn rounded color="dark red" type="submit" block to="/books">Cancel</v-btn>
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
  name: "createbooks",
  data: () => ({
    valid: false,
    title: "",
    author: "",
    amount: 0
  }),
  methods: {
    postBook() {
      this.$axios.post("http://localhost:8080/books", {
        title: this.title,
        author: this.author,
        amount: this.amount
      })
      .then(response => {
           if (res.status == 200) {
            this.message="Book successfully added"
						this.$router.push("/homeuser");
					} 
      })
      .catch(e => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired"
            .then(() => this.$router.push("/"));

          } else if (error.response.status == 401) {
            this.message = "Existing book or Wrong parameters"
            .then(() => this.$router.push("/books"));  
          }  
        })
    }
  }
};
</script>

<style scoped>
</style>