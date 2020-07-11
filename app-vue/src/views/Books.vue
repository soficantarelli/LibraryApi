<template>
  <div class="imagen">
    <v-container grid-list-md mb-10>
      <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container>
      <v-layout>
        <v-flex xs20 sm8 offset-sm2>
          <v-card>
            <v-toolbar color="#b51100">
              <v-toolbar-title color="white">Books</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn color="success" dark class="mb-2" to="/createbook">New Book</v-btn>
            </v-toolbar>

            <table class="data">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Cantidad</th>
                  <th>Disponibles</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(book,index) in books" :key="index">
                  <td>{{book.title}}</td>
                  <td>{{book.author}}</td>
                  <td>{{book.amount}}</td>
                  <td>{{book.availables}}</td>
                  <td>
                    <v-btn
                      color="info"
                      dark
                      class="btn-sm"
                      :to="{ name: 'editbook', params: { bookId: book.id } }"
                      style="margin-right: 5px"
                    >Edit</v-btn>
                    <v-btn color="error" dark class="btn-sm" @click="deleteItem(book.id)">Delete</v-btn>
                  </td>
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
  name: "books",
  data: () => ({
    dialog: "",
    message: "",
    books: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted() {
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
              title: "Not Found Books"
            });
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          }
        });
    },
    deleteBook(idBook) {
      this.$axios
        .delete("http://localhost:5555/books/" + idBook)
        .then(response => {
          // if (response.status == 200) {
          this.message = "Book successfully removed";
          this.refreshBooks();
          // }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          } else {
            this.message = "Book not found".then(() =>
              this.$router.push("/books")
            );
          }
        });
    },

    refreshBooks() {
      // Le doy tiempo al backend de actualizar todo
      setTimeout(() => this.getAllBooks(), 2000);
    },

    deleteItem(id) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteBook(id);
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