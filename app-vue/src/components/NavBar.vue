<template>
    <div id="menu">
        <v-toolbar color="#8f3e00">
          <v-btn to="/" text rounded class="white--text">Home</v-btn>
          <v-spacer></v-spacer>
          <h1 class="white--text text-center font-weight-bold"> Welcome to the virtual library</h1>
        <v-spacer></v-spacer>
        <v-btn depressed rounded color="blue" to="/singup">Sign up</v-btn>
        <v-btn depressed rounded color="dark green" to="/login">Login</v-btn>
         </v-toolbar>  
      </div>
</template>

<script>
export default {

}
</script>

<style scope>
#menu {
  position: fixed;
  font-size: 11pt;
  text-align: center;
  top: 0px;
  left: 0px; 
  width: 100%;
  z-index: 1;
}
#logo{
  position: fixed;
  text-align: left;
  width: 10%;
}
</style> 