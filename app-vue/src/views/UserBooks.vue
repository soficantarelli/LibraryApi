<template>
    <div>    
        <v-container grid-list-md mb-10>
            <NavBarUser></NavBarUser>
        </v-container>

        <v-container grid-list-md mt-10>
            

         <v-toolbar flat color="white">
        <v-toolbar-title>Books</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="books"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.book }}</td>
          <td>{{ props.item.amount }}</td>
          <td class="justify-center layout px-0">
          </td>
        </template>
      </v-data-table>
       
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
    headers: [
      { text: "Title", value: "title" },
      { text: "Author", value: "author" },
      { text: "Amount", value: "amount" }
    ],
    books: [],
  }),

  ccreated() {
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
    }
  }
}
</script>

<style scoped>

</style>