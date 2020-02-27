<template>
  <div>
    <v-container grid-list-md mb-10>
      <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>
      <v-toolbar flat color="white">
        <v-toolbar-title>Books</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>

        <v-spacer></v-spacer>
        <v-btn color="primary" dark class="mb-2" to="/createbook">New Book</v-btn>
      </v-toolbar>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">"Edit Item"</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.amount" label="Amount"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-data-table :headers="headers" :items="books" hide-actions class="elevation-1">
        <template slot="items" slot-scope="props">
          <td>{{ props.item.title }}</td>
          <td class="text-xs">{{ props.item.author }}</td>
          <td class="text-xs">{{ props.item.amount }}</td>
        </template>
        <template v-slot:item.action="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
          <v-icon small @click="deleteItem(item)">delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    message: "",
    headers: [
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
      { text: "Amount", value: "amount" },
      { text: "Actions", value: "action" }
    ],
    books: [],
    editedItem: {
      idBook: "",
      title: "",
      author: "",
      amount: 0
    },
    defaultItem: {
      idBook: "",
      title: "",
      author: "",
      amount: 0
    }
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getAllBooks();
  },

  methods: {
    getAllBooks() {
      this.$axios
        .get("http://localhost:8080/books")
        .then(response => {
          if (response.status == 200) {
            if (response.data.length == 0) {
              this.books = "No books availables";
            } else {
              this.books = response.data;
            }
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
        .delete("http://localhost:8080/books/" + idBook)
        .then(response => {
          if (response.status == 200) {
            this.message = "Book successfully removed";
            this.getAllBooks();
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
            this.message = "Book couldn't be removed".then(() =>
              this.$router.push("/books")
            );
          }
        });
    },
    putBook(idBook, newAmount) {
      this.$axios.put("http://localhost:8080/book/" + idBook),
        {
          amount: newAmount
        }
          .then(response => {
            if (response.status == 200) {
              this.message = "Amount successfully modified";
              this.getAllBooks();
            }
          })
          .catch(error => {
            if (error.response.status == 400) {
              this.$store.commit("logout");
              this.message = "Session expired".then(() =>
                this.$router.push("/")
              );
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
    },

    editItem(item) {
      this.idBook = item.idBook;
      this.title = item.title;
      this.author = item.author;
      this.amount = item.amount;
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteBook(item.idBook);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedItem.idBook) {
        this.editedItem.title = this.title;
        this.editedItem.author = this.author;
        this.editedItem.amount = this.amount;
        this.putBook(this.editedItem.idBook, this.editedItem.amount);
      }
      this.close();
    }
  }
};
</script>

<style scoped>
</style>