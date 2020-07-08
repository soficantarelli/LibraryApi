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
              <v-toolbar-title>Loans</v-toolbar-title>
            </v-toolbar>
            <v-list two-line subheader elevation="10">
              <v-list-item v-for="(loan,index) in loans" :key="index">
                <v-list-item-content>
                  <v-list-item-idPartner>{{loan.idPartner}}</v-list-item-idPartner>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
       
        </v-container>
    </div>
</template>

<script>
export default {
    data: () => ({
    idUser: this.$store.state.idUser,
    message:"",
    loans: [],
  }),

  created() {
    this.getPartnerIdLoan(idUser);
  },

  methods: {
    getPartnerIdLoan(idUser){
      this.loans = [];
      this.$axios
      .get("http://localhost:5555/partners/loans" + idUser)
      .then(response => {
         response.data.forEach(loan => {
            this.loans.push(loan);
          });
          if (this.loans.length == 0) {
            this.loans.push({
              loan: "Not Found partners"
            });
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