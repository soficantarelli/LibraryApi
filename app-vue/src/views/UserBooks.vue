<template>
    <div>    
        <v-container grid-list-md mb-10>
            <NavBarUser></NavBarUser>
        </v-container>

        <v-container grid-list-md mt-10>
            

         <v-toolbar flat color="white">
        <v-toolbar-title>Books</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="books"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <td>{{ props.item.book }}</td>
          <td>{{ props.item.amount }}</td>
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
       {
        text: "Amount",value: "amount"
      }
    ],
    books: [],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.books = [
        {
          book: "Frozen Yogurt",
          amount: "1"
        }
      ];
    }
  }
}
</script>

<style scoped>

</style>