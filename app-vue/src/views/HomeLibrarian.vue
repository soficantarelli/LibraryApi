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
              <v-toolbar-title color="white">Users</v-toolbar-title>
            </v-toolbar>

            <table class="data">
              <thead>
                <tr>
                  <th>Nombre Apellido</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(partner,index) in partners" :key="index">
                  <td>{{partner.names}}</td>
                  <td>{{partner.username}}</td>
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
    partners: []
  }),

  created() {
    this.getAllPartners();
  },

  methods: {
    getAllPartners() {
      this.partners = [];
      this.$axios
        .get("http://localhost:5555/partners")
        .then(response => {
          response.data.forEach(partner => {
            this.partners.push(partner);
          });
          if (this.partners.length == 0) {
            this.partners.push({
              partner: "Not Found partners"
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