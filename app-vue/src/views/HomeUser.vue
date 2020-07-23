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
              <v-toolbar-title color="white">Loans</v-toolbar-title>
            </v-toolbar>

            <table class="data">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Due Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(loan,index) in loans" :key="index">
                  <td>{{loan.title}}</td>
                  <td>{{loan.author}}</td>
                  <td v-if="loan.dueDate < Date.now()" ><div class="expired">{{ formatDate(loan.dueDate) }}</div>
                   </td>
                  <td v-else>
                     {{ formatDate(loan.dueDate) }} </td>
                  <td v-if="loan.dueDate == 'Loans' "> </td>
                  <td v-else>
                    <v-btn color="error" dark class="btn-sm" @click="returnItem(loan.id)">Return</v-btn>
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
  name:"homeuser",
  data: () => ({
    message: "",
    loans: []
  }),

  mounted() {
   
    this.getAllLoans();
  },

  methods: {
    getAllLoans(){
      this.loans = [];
      this.$axios
        .get("http://localhost:5555/partner/loans/" + this.$store.state.idUser)
        .then(response => {
          response.data.forEach(loan => {
            this.loans.push(loan);
          });
          if (this.loans.length == 0) {
            this.loans.push({
              title: "Not",
              author: "Found",
              dueDate: "Loans"
            });
          }
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired".then(() => this.$router.push("/"));
          } else if (error.response.status == 401) {
            this.message = "The user has no loans or not exist";
          }
        });
    },
    deleteLoan(idLoan){
      this.$axios
        .delete("http://localhost:5555/loans/" + idLoan)
        .then(response => {
          if (response.status == 200) {
            this.message = "Loan successfully removed"
            this.refreshLoans();
          }
          
        })
        .catch(error => {
          if (error.response.status == 400) {
            this.$store.commit("logout");
            this.message = "Session expired"
            .then(() => this.$router.push("/"));
          } else if (error.response.status == 404) {
            this.message = "Loan not found"
            .then(() => this.$router.push("/homeuser"));
          }
        });
    },
    refreshLoans() {
      // Le doy tiempo al backend de actualizar todo
      setTimeout(() => this.getAllLoans(), 2000);
    },

    returnItem(id) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteLoan(id);
    },
    
    formatDate(millsec) {
			function pad(s) {
				return s < 10 ? "0" + s : s;
      }
      
      if(millsec == "Loans"){
          return millsec;
      }else{
        var d = new Date(millsec);
			return [
				pad(d.getDate()),
				pad(d.getMonth() + 1),
				d.getFullYear()
			].join("/");
      }
			
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

.expired{
  color: red;
}
</style>