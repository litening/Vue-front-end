const app = new Vue({
  el: "#app",
  template: `
        <div v-if="isLoaded">
            <app-header />
            <app-catalog />
            <app-footer />
            <app-item-detail />
        </div>
        <loading-spinner v-else />
    `,
  data: {
    setup: store.state.setup,
  },
  computed: {
    isLoaded: function () {
      return !!store.state.setup && !!store.state.catalog;
    },
  },
  methods: {
    removeFromCart(index) {
      store.removeFromCart(index);
    },
  },
  created() {
    store.loadInitialData();
    window.removeCartItem = this.removeFromCart;
  },
});

Vue.use(Autocomplete);
