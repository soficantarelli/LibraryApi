<template>
  <div>
    <v-container grid-list-md mb-10>
      <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>


      <v-row align="center" justify="center">
        <v-col cols="4" align-self="start">
          <v-card max-width="600" class="mx-auto" shaped>
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title>Books</v-toolbar-title>
               <v-spacer></v-spacer>
              <v-btn color="primary" dark class="mb-2" to="/createbook">New Book</v-btn>
            </v-toolbar>
                
              <v-list-item v-for="book in books" :key="book.id">
                <v-list-item-content>
                  <div v-if="book.author.length" >
                    <v-list-item>{{book.title}} {{book.author}}, {{"Cantidad:"}}{{book.amount}}
                     
                      <v-btn color="primary" dark class="btn-sm" :to="{ name: 'editbook', params: { bookId: book.id } }">Edit</v-btn>
                      
                      <v-btn color="primary" dark class="btn-sm" @click="deleteItem(book.id)">Delete</v-btn>
                      
                      </v-list-item>
                  </div>
                  <div v-else>
                    <v-list-item>{{book.title}}
                    </v-list-item>
                  </div>

                </v-list-item-content>
              </v-list-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "books",
  data: () => ({
    dialog: "",
    message: "",
    books: [],
    titulo:"",
    autor:"",
    cantidad:"",
    editedItem: {
      idBook: "",
      title: "",
      author: "",
      amount: ""
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  mounted(){
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
            this.message = "Session expired".then(() => 
            this.$router.push("/"));
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
</style>