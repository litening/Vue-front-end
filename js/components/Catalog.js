Vue.component('app-catalog', {
    computed: {
        catalogs: function () {
            return store.state.catalog;
        }
    },
    template: `
    <div class="container-fluid my-3">
      <div class="accordion shadow" id="catalogAccordion">
          <div class="accordion-item" v-for="(catalog, index) in catalogs" :key="index">
            <h2 class="accordion-header">
              <button
                :class="
                  'accordion-button category-label shadow' +
                  (index > 0 ? ' collapsed' : '')
                "
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + index"
              >
                {{catalog.CategoryName}}
              </button>
            </h2>
            <div
              :id="'collapse' + index"
              :class="
                'accordion-collapse collapse' + (index === 0 ? ' show' : '')
              "
              data-bs-parent="#catalogAccordion"
            >
              <div class="accordion-body">
                <div class="row">
                    <div
                        v-for="(item, i) in catalog.CatalogItems"
                        :key="item.CatalogItemId + '' + catalog.CategoryId"
                        class="col-md-3 mb-3 d-flex"
                    >
                        <app-item :item="item" />
                    </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
    `
})