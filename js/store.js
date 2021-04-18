const store = {
  debug: true,
  state: Vue.observable({
    setup: null,
    catalog: null,
    cartItems: [],
    currentItem: null,
    itemDetailModal: null,
  }),
  async loadSetup() {
    const res = await ApiSetup();
    this.state.setup = { ...res.data };
    try {
      const colors = Object.values(res.data.Colors[0]).filter(
        (v) => v[0].active
      )[0][0];
      delete colors.active;
      Object.keys(colors).forEach((k) => {
        console.log();
        document.documentElement.style.setProperty(`--${k}`, `${colors[k]}`);
      });
    } catch (error) {
      console.log(error);
    }
  },
  async loadCatalog() {
    const res = await ApiCatalog();
    this.state.catalog = [...res.data.Catalog];
  },
  loadInitialData() {
    this.loadCatalog();
    this.loadSetup();
  },
  setCurrentItem(item) {
    this.state.currentItem = { ...item };
  },
  setItemDetailModal(modal) {
    this.state.itemDetailModal = modal;
  },
  addToCart(obj, openCheckout) {
    const newCartData = [...this.state.cartItems, obj];
    this.state.cartItems = [...newCartData];
    if (openCheckout) {
      this.checkout(newCartData);
    }
  },
  checkout(cartData = this.state.cartItems) {
    if (!!cartData.length) {
      window["PRODUCT_DATA"] = [...cartData];
      window["MAIN_CATALOG"] = true;

      const params = {
        UserId: USER_ID,
      };
      var checkout = goToCheckout(params);

      var popupTick = setInterval(function () {
        if (checkout.closed) {
          clearInterval(popupTick);
          console.log("checkout window closed!");
        }
      }, 500);
    }
  },
  removeFromCart(index) {
    let tempCart = this.state.cartItems;
    tempCart.splice(index, 1);
    this.state.cartItems = [...tempCart];
  },
  async trackActivity(trackcode, trackingid, trackingOption) {
    if (this.state.setup.ServiceLevel > 2) {
      await ApiTrackActivity(trackcode, trackingid, trackingOption);
    }
  },
};
