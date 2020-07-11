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
              <v-toolbar-title color="white">Loans</v-toolbar-title>
            </v-toolbar>

            <table class="data">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Book</th>
                  <th></th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(loan,index) in loans" :key="index">
                  <td>{{loan.username}}</td>
                  <td>{{loan.title}}</td>
                  <td>{{loan.author}}</td>
                  <td v-if="loan.dueDate < Date.now()" class="red-text">{{ formatDate(loan.dueDate) }}</td>
                  <td v-if="loan.dueDate > Date.now()">{{ formatDate(loan.dueDate) }}</td>
                  <td v-else>{{ loan.dueDate }}</td>
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
    data: () => ({
    loans: []
  }),

  created() {
    this.getAllLoans();
  },

  methods: {
    getAllLoans() {
      this.$axios
        .get("http://localhost:5555/loans")
        .then(response => {
          response.data.forEach(loan => {
            this.loans.push(loan);
          });
          if (this.loans.length == 0) {
            this.loans.push({
              username: "Not Found Loans",
              dueDate: ""
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
    formatDate(millsec) {
			function pad(s) {
				return s < 10 ? "0" + s : s;
			}
			var d = new Date(millsec);
			return [
				pad(d.getDate()),
				pad(d.getMonth() + 1),
				d.getFullYear()
			].join("/");
        }
  }
}
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