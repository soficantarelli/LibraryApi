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
            </v-toolbar>

               <v-list-item v-for="loan in loans" :key="loan.id">
                <v-list-item-content>
                  <div v-if="loan.nameP.length" >
                    <v-list-item>{{loan.nameB}}, {{loan.author}}, {{loan.dueDate}}
                  </v-list-item>
                  </div>
                  <div v-else>
                    <v-list-item>{{loan.nameB}}
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
    dialog: false,
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
        .get("http://localhost:5555/loans")
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
        .delete("http://localhost:5555/loans/" + idLoan)
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