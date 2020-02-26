<template>
<div>    
    <v-container grid-list-md mb-10>
        <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>

        <v-toolbar flat color="white">
        <v-toolbar-title>Loans</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="loans"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
            
          <td>{{ props.item.book }}</td>
          <td class="text-xs">{{ props.item.user }}</td>
          <td class="text-xs">{{ props.item.expired }}</td>
            
        <td class="left layout">            
            <v-icon small color="error" 
            @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>


    </v-container>


</div>
</template>

<script>
export default {
    data: () => ({
    dialog: false,
    headers: [
      { text: "Partner", value: "partner" },
      {text: "Book",value: "book"},
      { text: "Expired Date", value: "expired" },
      { text: "Actions", value: "action"}
    ],
    loans: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.getAllLoans();
  },

  methods: {
    getAllLoans() {
      this.$axios
        .get("http://localhost:8080/loans")
        .then(response => {
          if (response.status == 200) {
              this.loans = response.data;
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          }
          else if(error.response.status == 404){
              this.message="Loans not found"
          }
        });
    },

    deleteLoan(idLoan){
      this.$axios
        .delete("http://localhost:8080/loans/" + idLoan)
        .then(response => {
          if (response.status == 200) {
            this.message = "Loan successfully removed"
            this.getAllBooks();
          }
          
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired"
            .then(() => this.$router.push("/"));
          } else if (error.response.status == 404) {
            this.message = "Loan not found"
            .then(() => this.$router.push("/loans"));
          }
        });
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteLoan(item.idLoan);
    }
  }
}
</script>

<style scoped>

</style>