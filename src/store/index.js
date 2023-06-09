import { createStore } from 'vuex';

const localStorageKey = 'myAppData'; // Clave para almacenar en localStorage

export default createStore({
  state: {
    counter: 1,
    statusLogin: false,
    codempresa: "",
    codcliente: "",
    username: "",
    tipousuario: "",
  },
  getters: {
    times2(state) {
      return state.counter * 2;
    }
  },
  mutations: {
    setCounter(state, value) {
      state.counter = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    setStatusLogin(state, value) {
      state.statusLogin = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    setCodEmpresa(state, value) {
      state.codempresa = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    setCodCliente(state, value) {
      state.codcliente = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    setUsername(state, value) {
      state.username = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    setTipousuario(state, value){
      state.tipousuario = value;
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
    // Agregar una mutación para inicializar el estado desde localStorage al cargar la página
    initializeStateFromLocalStorage(state) {
      const storedState = localStorage.getItem(localStorageKey);
      if (storedState) {
        Object.assign(state, JSON.parse(storedState));
      }
    }
  },
  actions: {
    // Agregar una acción para inicializar el estado desde localStorage
    initializeStateFromLocalStorage({ commit }) {
      commit('initializeStateFromLocalStorage');
    }
  }
});
