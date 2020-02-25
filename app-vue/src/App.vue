<template>
  <v-app>
    <!-- <v-app-bar v-if="$route.meta.requiresNavBar" app extension-height="40">
        <v-toolbar-side-icon>
            <v-img class="mr-3" src="@/assets/logo.jpg" height="30px" width="40px"> 
            </v-img>
        </v-toolbar-side-icon>
        
        <v-btn to="/" text rounded>
					<span class="mr-2">Home</span>
				</v-btn>
   
        <v-spacer></v-spacer>

       <div class="my-2">
        <v-btn depressed rounded color="blue" to="/singup">Sing up</v-btn>
        </div>

       <div class="my-2">
        <v-btn depressed rounded color="dark green" to="/login">Login</v-btn>
        </div>

  </v-app-bar>

  <v-app-bar v-else app extension-height="40">
        <v-toolbar-side-icon>
            <v-img class="mr-3" src="@/assets/logo.jpg" height="30px" width="40px"> 
            </v-img>
        </v-toolbar-side-icon>
         <v-spacer></v-spacer>
       <div class="my-2">
        <v-btn depressed rounded color="dark red" to="/login">Log out</v-btn>
        </div>

  </v-app-bar> -->

   <div>
    <v-content>
      <router-view/>
    </v-content>
  </div>
    
  </v-app>
  
</template>

<script>
export default {

}
</script>

<style>
</style>
