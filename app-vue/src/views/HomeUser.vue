<template>
    <div>    
        <v-container grid-list-md mb-10>
            <NavBarUser></NavBarUser>
        </v-container>

        <v-container grid-list-md mt-10>
            

         <v-toolbar flat color="white">
        <v-toolbar-title>My Loans</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" to="/createloans">New Loan</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="loans"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.book }}</td>
          <td class="text-xs-left">{{ props.item.expired }}</td>
        </template>
      </v-data-table>
       
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
    idUser: this.$store.state.idUser,
    message:"",
    headers: [
      {
        text: "Book",value: "book"
      },
      { text: "Expired Date", value: "expired" }
    ],
    loans: [],
  }),

  created() {
    this.getPartnerIdLoan(idUser);
  },

  methods: {
    getPartnerIdLoan(idUser){
      this.$axios
      .get("http://localhost:5555/partners/loans" + idUser)
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
          else if(error.response.status == 401){
              this.message="The user has no loans or not exist"
          }
      })
    }
  }
}
</script>

<style scoped>

</style>