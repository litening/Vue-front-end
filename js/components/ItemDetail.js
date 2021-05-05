Vue.component("app-item-detail", {
  data: function () {
    return {
      quantity: 1,
      options: [],
    };
  },
  computed: {
    currentItem: function () {
      if (store.state.currentItem) {
        let optionState = [];
        store.state.currentItem.OptionGroups?.forEach((v, k) => {
          optionState.push("");
        });
        this.options = [...optionState];
      }
      return store.state.currentItem;
    },
  },
  mounted() {
    store.setItemDetailModal(
      new bootstrap.Modal(this.$refs["itemDetailModalRef"])
    );
  },
  methods: {
    closeModal: function () {
      store.state.itemDetailModal.hide();
      store.trackActivity(3, this.currentItem.CatalogItemId);
    },
    handleAddToCart: function (openCheckout = false) {
      const haveBlankOption = this.options.filter((v) => !v);
      if (haveBlankOption.length) {
        alert("Please choose the options first");
        return false;
      }
      if (this.quantity < 1) {
        alert("Quantity must be minimum 1");
        return false;
      }
      let productData = {
        extraPrice: 0,
        item: this.currentItem,
        formValues: {
          ItemId: this.currentItem.CatalogItemId,
          DigitalItem: this.currentItem.DigitalProduct ? 1 : 0,
          MenuItem: this.currentItem.CatalogItemName,
          MenuPrice: this.currentItem.Price.toFixed(2),
          MenuWeight: this.currentItem.Weight,
          quantity: this.quantity,
          dropdowns: {},
        },
      };
      this.currentItem.OptionGroups?.forEach((v, k) => {
        v.OptionList.forEach((opt, ke) => {
          if (opt.ItemOptionId == this.options[k]) {
            productData.formValues.dropdowns[
              v.OptionGroupName.replace(/\s/g, "")
            ] = {
              value: opt.ItemOptionId,
              text: opt.ItemOptionDescription,
              price: opt.ItemOptionPrice,
              optionKey: ke,
              key: k,
            };
            productData.extraPrice += opt.ItemOptionPrice;
          }
        });
      });
      store.addToCart(productData, openCheckout);
      if (Object.values(productData.formValues.dropdowns).length) {
        Object.values(productData.formValues.dropdowns).forEach((v) => {
          store.trackActivity(4, productData.formValues.ItemId, v.value);
        });
      } else {
        store.trackActivity(4, productData.formValues.ItemId);
      }
      this.quantity = 1;
      store.state.itemDetailModal.hide();
    },
  },
  template: `
    <div
        class="modal fade"
        ref="itemDetailModalRef"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div v-if="currentItem" class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{currentItem.CatalogItemName}}
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="closeModal()"
                ></button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-md-6">
                    <div
                      id="carouselExampleControls"
                      class="carousel carousel-dark slide"
                      data-bs-ride="carousel"
                    >
                      <div class="carousel-inner">
                        <div
                          v-for="(image, index) in currentItem.Images"
                          :class="
                            'carousel-item' + (index == 0 ? ' active' : '')
                          "
                        >
                            <img
                                :src="image.ImageLink"
                                class="d-block w-100"
                                :alt="image.AltText"
                            />
                        </div>
                      </div>
                      <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="prev"
                      >
                        <span
                          class="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleControls"
                        data-bs-slide="next"
                      >
                        <span
                          class="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <p>{{currentItem.CatalogItemDescription}}</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6 text-center">
                      <h4 v-if="currentItem.StrikePrice" class="text-danger">
                        <s>Was $\{{currentItem.StrikePrice.toFixed(2)}}</s>
                      </h4>
                    <h6 class="card-item-price">
                      Only $\{{currentItem.Price.toFixed(2)}}
                    </h6>
                  </div>
                  <div class="col-md-6 text-center">
                    <div class="row">
                      <div class="col-6 text-end">
                        <label class="form-label">Quantity</label>
                      </div>
                      <div class="col-6">
                        <input
                          type="number"
                          class="form-control"
                          v-model="quantity"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="currentItem.OptionGroups" class="row mt-3">
                    <div class="col-md-6" v-for="(optionGroup, index) in currentItem.OptionGroups" :key="index">
                        <select
                            class="form-select"
                            v-model="options[index]"
                        >
                            <option selected disabled value="">
                                {{optionGroup.OptionGroupName}}
                            </option>
                            <option :value="option.ItemOptionId" v-for="(option, i) in optionGroup.OptionList" :key={i}>
                                {{option.ItemOptionDescription}}
                            </option>
                        </select>
                    </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn add-to-cart-btn"
                  @click="handleAddToCart()"
                >
                  ADD TO CART
                </button>
                <button
                  type="button"
                  class="btn checkout-btn"
                  @click="handleAddToCart(true)"
                >
                  CHECKOUT
                </button>
              </div>
            </div>
        </div>
      </div>
    `,
});
