Vue.component("app-header", {
  computed: {
    customerName: function () {
      return store.state.setup.CustomerName;
    },
    searchBar: function () {
      return store.state.setup.SearchBar;
    },
    items: function () {
      return [].concat(...store.state.catalog.map((v) => v.CatalogItems));
    },
  },
  components: {
    Autocomplete,
  },
  methods: {
    search(input) {
      const options = {
        isCaseSensitive: false,
        keys: ["CatalogItemDescription", "CatalogItemName"],
      };
      const fuse = new Fuse(this.items, options);
      return fuse.search(input).map((v) => v.item);
    },
    getResultValue(result) {
      return result.CatalogItemName;
    },
    onSubmit(result) {
      store.setCurrentItem(result);
      store.state.itemDetailModal.show();
      store.trackActivity(2, result.CatalogItemId);
    },
  },
  template: `
    <nav class="navbar site-header py-0 shadow">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">{{customerName}}</span>
            <span class="d-flex w-50" v-if="searchBar">
                <autocomplete :search="search" @submit="onSubmit" :get-result-value="getResultValue" placeholder="Search" style="width: 100%;">
                    <template #result="{ result, props }">
                        <li v-bind="props">
                            <div class="row">
                                <div class="col-md-1">
                                    <img :src="result.Images[0].ImageThumb" style="width:40px;" class="rounded" />
                                </div>
                                <div class="col-md-11">
                                    {{ result.CatalogItemName }}
                                </div>
                            </div>
                        </li>
                    </template>
                </autocomplete>
            </span>
            <span class="navbar-text">
                <button class="btn text-white" @click="store.checkout()">
                    <i class="bi bi-cart-fill fs-4"></i>
                    <span class="badge badge-notify">{{store.state.cartItems.length}}</span>
                </button>
            </span>
        </div>
    </nav>
    `,
});
