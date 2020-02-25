<template>
<div>    
    <v-container grid-list-md>
          <NavBarLibrarian></NavBarLibrarian>
      </v-container>

       <v-container grid-list-md mt-10>
            

         <v-toolbar flat color="white">
        <v-toolbar-title>Partners</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="partners"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.book }}</td>
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
      {
        text: "Partners",value: "partners"
      }],
    partners:[],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.partners = [
        {
          partners: "Frozen Yogurt",
        }
      ];
    }
  }
}
</script>

<style scoped>

</style>