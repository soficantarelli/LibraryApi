import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loggedIn: false,
        idUser: null,
        rol: null
    },
    plugins: [createPersistedState()],
    mutations: {
        login (state,user){
            state.loggedIn = true;
            state.idUser = user.idUser;
            state.rol = user.rol;
        },
        logout (state){
            state.loggedIn = false;
            state.idUser = null;
            state.rol = null;
        }
    }
})