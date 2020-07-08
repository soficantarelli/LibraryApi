<template>
  <div>
    <v-container grid-list-md mb-10>
      <NavBarUser></NavBarUser>
    </v-container>

    <v-container grid-list-md mt-10>

      <v-row align="center" justify="center">
        <v-col cols="4" align-self="start">
          <v-card max-width="600" class="mx-auto" shaped>
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title>Books</v-toolbar-title>
               <v-spacer></v-spacer>
            </v-toolbar>

               <v-list-item v-for="book in books" :key="book.id">
                <v-list-item-content>
                  <div v-if="book.author.length" >
                    <v-list-item>{{book.title}}, {{book.author}}, {{book.amount}}
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
</style>