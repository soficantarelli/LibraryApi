<template>
  <div class="imagen">
    <v-container grid-list-md mt-10>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="#b51100" dark flat>
              <v-toolbar-title>Edit Amount's Book</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" ref="form">
                
                <v-text-field 
                    label="Title" 
                    name="title" 
                    :value="title" 
                    v-model="title" 
                    disabled 
                />

                <v-text-field
                    label="Author"
                    name="author"
                    v-model="author"
                    :value="author"
                    disabled
                />

                <v-text-field
                    label="Amount"
                    name="amount"
                    v-model="amount"
                    :value="amount"
                    disabled
                />
                <v-spacer />

                <v-text-field
                    label="amountNew"
                    name="amountNew"
                    v-model="amountNew"
                    required
                    :rules="[v => v > 0 || 'The amount must be greater than 0']"
                />
                <v-spacer />

                <v-btn
                    rounded
                    color="success"
                    type="submit"
                    :disabled="!valid"
                    block
                    @click="putBook">
                    Save
                </v-btn>

                <v-btn 
                    rounded 
                    color="error" 
                    type="submit" 
                    block 
                    to="/books">
                    Cancel
                </v-btn>

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
  name: "editbook",
  data: () => ({
    valid: false,
    title: "",
    author: "",
    amount: "",
    amountNew: ""
  }),

  mounted() {
    this.$axios
      .get("http://localhost:5555/books/" + this.$route.params.bookId)
      .then(response => {
        this.title = response.data[0].title;
        this.author = response.data[0].author;
        this.amount = response.data[0].amount;
      })
      .catch(error => {
        if (error.response.status == 400) {
          this.$store.commit("logout");
          this.message = "Session expired".then(() => this.$router.push("/"));
        } else if (error.response.status == 404) {
          this.$router.push("/books");
        }
      });
  },

  methods: {
    putBook(e) {
      e.preventDefault();

      this.$axios
        .put("http://localhost:5555/books/" + this.$route.params.bookId, {
          amount: parseInt(this.amountNew)
        })
        .then(response => {
          if (response.status == 200) {
            this.$router.push("/books");
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          } else if (error.response.status == 404) {
            this.message = "Book not found".then(() =>
              this.$router.push("/books")
            );
          } else {
            this.message = "Wrong parameters or Amount couldn't be removed".then(
              () => this.$router.push("/books")
            );
          }
        });
    }
  }
};
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