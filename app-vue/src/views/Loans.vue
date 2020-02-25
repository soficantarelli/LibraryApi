<template>
<div>    
    <v-container grid-list-md mb-10>
        <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>

        <v-toolbar flat color="white">
        <v-toolbar-title>Loans</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
      </v-toolbar>

      <v-data-table
        :headers="headers"
        :items="loans"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
            
          <td>{{ props.item.book }}</td>
          <td class="text-xs">{{ props.item.user }}</td>
          <td class="text-xs">{{ props.item.expired }}</td>
            
        <td class="left layout">            
            <v-icon small color="error" 
            @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>


    </v-container>


</div>
</template>

<script>
export default {
    data: () => ({
    dialog: false,
    headers: [
      {text: "Book",value: "book"},
      { text: "Partner", value: "partner" },
      { text: "Expired Date", value: "expired" },
      { text: "Actions", value: "action"}
    ],
    loans: []
  }),

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.loans = [
      ];
    },

    deleteItem(item) {
      const index = this.books.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.books.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.books[this.editedIndex], this.editedItem);
      } else {
        this.books.push(this.editedItem);
      }
      this.close();
    }
  }
}
</script>

<style scoped>

</style>