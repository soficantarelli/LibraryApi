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
        text: "Book",value: "book"
      },
      { text: "Expired Date", value: "expired" }
    ],
    loans: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loans = [
        {
          book: "Frozen Yogurt",
          expired: 159,
        }
      ];
    }
  }
}
</script>

<style scoped>

</style>