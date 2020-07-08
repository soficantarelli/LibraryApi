<template>
  <div>
    <v-container grid-list-md>
      <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>
      <v-row align="center" justify="center">
        <v-col cols="4" align-self="start">
          <v-card max-width="600" class="mx-auto" shaped>
            <v-toolbar color="blue-grey darken-3" dark>
              <v-toolbar-title>Partners</v-toolbar-title>
            </v-toolbar>
            <v-list two-line subheader elevation="10">
              <v-list-item v-for="(partner,index) in partners" :key="index">
                <v-list-item-content>
                  <v-list-item-title>{{partner.username}}</v-list-item-title>
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
</style>