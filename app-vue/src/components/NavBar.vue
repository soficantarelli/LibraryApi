<template>
  <div id="navega">
    <div id="menu">
      <div id="fijo">
        <v-toolbar dark color="grey">
            <v-toolbar-side-icon>
            <v-img src="@/assets/logo.jpg" height="30px" width="40px"></v-img>
        </v-toolbar-side-icon>
          <v-btn to="/" text rounded>Home</v-btn>
          <v-spacer></v-spacer>
          <h1 class="black--text text-center font-weight-bold"> Welcome to the virtual library</h1>
        <v-spacer></v-spacer>
        <v-btn depressed rounded color="blue" to="/singup">Sing up</v-btn>
        <v-btn depressed rounded color="dark green" to="/login">Login</v-btn>
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