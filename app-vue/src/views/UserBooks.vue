<template>
  <div class="imagen">
    <v-container grid-list-md mb-10>
      <NavBarUser></NavBarUser>
    </v-container>

    <v-container>
      <v-layout>
        <v-flex xs20 sm8 offset-sm2>
          <v-card>
            <v-toolbar color="#b51100">
              <v-toolbar-title color="white">Books</v-toolbar-title>
            </v-toolbar>

            <table class="data">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Disponibles</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book,index) in books" :key="index">
                  <td>{{book.title}}</td>
                  <td>{{book.author}}</td>
                  <td>{{book.availables}}</td>
                  <td v-if="book.availables > 0">
                    <v-btn
                      color="info"
                      dark
                      class="btn-sm"
                      :to="{ name: 'createloans', params: { bookId: book.id } }"
                      style="margin-right: 15px"
                    >Loan</v-btn>
                  </td>
                  <td v-else></td>
                </tr>
              </tbody>
            </table>
          </v-card>

        </v-flex>
    </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name:"userbooks",
  data: () => ({
    message: "",
    books: []
  }),

  created() {
    this.getAllBooks();
  },

  methods: {
    getAllBooks() {
      this.books = [];
      this.$axios
        .get("http://localhost:5555/books")
        .then(response => {
          response.data.forEach(book => {
            this.books.push(book);
          });
          if (this.books.length == 0) {
            this.books.push({
              title: "Not Found Books",
              author: "",
              amount: ""
            });
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
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
.data{
  width: 100%;
}

.data th{
    padding-right: 50px;
    font-size: 18px;
}

.data td {
    padding-right: 35px;
    padding-bottom: 5px;
    text-align: center;
}
</style>