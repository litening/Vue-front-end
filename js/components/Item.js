Vue.component("app-item", {
  props: ["item"],
  computed: {},
  methods: {
    showDetail: function () {
      store.setCurrentItem(this.item);
      store.state.itemDetailModal.show();
      store.trackActivity(2, this.item.CatalogItemId);
    },
  },
  template: `
    <div class="card item-card shadow w-100">
        <div v-if="item.Badge" class="ribbon-wrapper">
          <div class="glow">&nbsp;</div>
          <div class="ribbon-front">{{item.Badge}}</div>
          <div class="ribbon-edge-topleft"></div>
          <div class="ribbon-edge-topright"></div>
          <div class="ribbon-edge-bottomleft"></div>
          <div class="ribbon-edge-bottomright"></div>
        </div>
      <h5 class="card-header d-flex align-items-center item-card-head">
        {{item.CatalogItemName}}
      </h5>
      <div class="item-card-image">
        <img
          class="shadow"
          :src="item.Images[0].ImageThumb"
          :alt="item.Images[0].AltText"
          style="width:100%;"
        />
      </div>
      <div class="card-body">
        <div class="item-card-description">
          <p class="card-text">{{item.CatalogItemDescription}}</p>
        </div>
      </div>
      <div class="card-footer bg-transparent">
        <div class="row d-flex align-items-center">
          <div class="col-md-6">
              <h4 v-if="item.StrikePrice" class="text-danger">
                <s>Was $\{{item.StrikePrice.toFixed(2)}}</s>
              </h4>
            <h6 class="card-item-price">Only $\{{item.Price.toFixed(2)}}</h6>
          </div>
          <div class="col-md-6 text-end">
            <button
              class="btn shadow-sm item-card-select-btn px-3"
              @click="showDetail()"
            >
              SELECT
            </button>
          </div>
        </div>
      </div>
    </div>
    `,
});
