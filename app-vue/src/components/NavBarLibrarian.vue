<template>
  <div id="navega">
    <div id="menu">
      <div id="fijo">
        <v-toolbar dark color="grey">
          <v-tabs color="white">
              <v-tab to="homelibrarian">
                  Home
              </v-tab> 
              <v-tab to="loans">
                  Loans
              </v-tab>
              <v-tab to="books">
                  Books
              </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-btn depressed rounded color="dark red" to="/">Logout</v-btn>
        </v-toolbar>  
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scope>
#navega #menu #fijo {
  position: fixed;
  font-size: 11pt;
  text-align: center;
  top: 0px;
  left: 0px; 
  width: 100%;
  z-index: 1;
}
</style> 