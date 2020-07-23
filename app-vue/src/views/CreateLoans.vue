<template>
  <div class="imagen">
    <v-container grid-list-md mb-10>
      <NavBarUser></NavBarUser>
    </v-container>

    <v-container grid-list-md mt-10>
      <v-snackbar v-model="snackbar" :timeout="timeout" top :color="color">
        {{ message }}
        <v-btn color="white" text @click="snackbar = false">Cerrar</v-btn>
      </v-snackbar>

      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-12">
            <v-toolbar color="#b51100" dark flat>
              <v-toolbar-title>New Loan</v-toolbar-title>
            </v-toolbar>

            <v-card-text>
              <v-form v-model="valid" ref="form">
                <v-text-field label="Title" name="title" :value="title" v-model="title" disabled />

                <v-text-field
                  label="Author"
                  name="author"
                  v-model="author"
                  :value="author"
                  disabled
                />

                <v-text-field
                  label="Days"
                  name="days"
                  v-model="days"
                  required
                  :rules="[v => v > 0 && v < 11 || '1 to 10 days last the loans']"
                />
                <v-spacer />

                <v-btn
                  rounded
                  color="success"
                  type="submit"
                  :disabled="!valid"
                  block
                  @click="postLoan"
                >Save</v-btn>

                <v-btn rounded color="error" type="submit" block to="/homeuser">Cancel</v-btn>
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
    title: "",
    author: "",
      message: "",
  color: "error",
  snackbar: false,
  timeout: 2000,
  }),

  mounted() {
    this.$axios
      .get("http://localhost:5555/books/" + this.$route.params.bookId)
      .then(response => {
        this.title = response.data[0].title;
        this.author = response.data[0].author;
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
    postLoan(e) {
      e.preventDefault();
      this.$axios
        .post("http://localhost:5555/loans", {
          idUser: this.$store.state.idUser,
          idBook: this.$route.params.bookId,
          days: parseInt(this.days)
        })
        .then(data => {
          if (res.status == 200) {
            this.message = "Loan successfully created";
            this.$router.push("/userbooks");
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          } else if (error.response.status == 404) {
            this.message = "Book not found".then(() =>
              this.$router.push("/homeuser")
            );
          } else {
            this.snackbar = true;
            this.message = "The loan could not be created";
          }
        });
    }
  }
};
</script>

<style scoped>
.imagen {
  background-image: url("../assets/fondo.jpg");
  background-size: 100% 100%;
  background-attachment: fixed;
  min-height: 100vh;
  min-width: 100vh;
}
</style>