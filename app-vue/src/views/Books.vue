<template>
<div>    
    <v-container grid-list-md mb-10>
        <NavBarLibrarian></NavBarLibrarian>
    </v-container>

    <v-container grid-list-md mt-10>

        <v-toolbar flat color="white">
        <v-toolbar-title>Books</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        
        <v-spacer></v-spacer>
          <v-btn color="primary" dark class="mb-2" to="/createbook">New Book</v-btn>
      </v-toolbar>

     <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline"> "Edit Item"</span>
            </v-card-title>
  
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.author" label="Author"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="editedItem.amount" label="Amount"></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
  
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="close">Cancel</v-btn>
              <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      <v-data-table
        :headers="headers"
        :items="books"
        hide-actions
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
            
          <td>{{ props.item.title }}</td>
          <td class="text-xs">{{ props.item.author }}</td>
          <td class="text-xs">{{ props.item.amount }}</td>
            
        <td class="left layout">
            <v-icon small class="mr-2" color="success"
              @click="editItem(props.item)">edit  </v-icon>
            
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
      {text: "Title",value: "title"},
      { text: "Author", value: "author" },
      { text: "Amount", value: "amount" },
      { text: "Actions", value: "action"}
    ],
    books: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      author: "",
      amount: 0,
    },
    defaultItem: {
      title: "",
      author: "",
      amount: 0
    }
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
      this.books = [
        {
          title: "Frozen Yogurt",
          author: "Frozen Yogurt",
          amount: 6
        },
        {
          title: "Ice cream sandwich",
          author: "Ice cream sandwich",
          amount: 9
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
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