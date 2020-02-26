import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        userId: null,
        username: null,
        role: null
    },
    plugins: [createPersistedState()],
    mutations: {
        login (state,user){
            state.loggedIn = true;
            state.idUser = user.idUser;
            state.username = user.username;
            state.role = user.userRole;
        },
        logout (state){
            state.loggedIn = false;
            state.idUser = null;
            state.username = null;
            state.role = null;
        }
    }
})