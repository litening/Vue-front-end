Vue.component('app-header', {
    computed: {
        customerName: function () {
            return store.state.setup.CustomerName;
        }
    },
    template: `
    <nav class="navbar site-header py-0 shadow">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">{{customerName}}</span>
            <span class="navbar-text">
                <button class="btn text-white" @click="store.checkout()">
                    <i class="bi bi-cart-fill fs-4"></i>
                    <span class="badge badge-notify">{{store.state.cartItems.length}}</span>
                </button>
            </span>
        </div>
    </nav>
    `
})