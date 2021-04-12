Vue.component('app-footer', {
    computed: {
        setup: function () {
            return store.state.setup;
        }
    },
    template: `
    <footer class="footer mt-auto py-3 bg-light">
      <div class="container text-center">
        <a v-if="setup.FAQpage" :href="setup.FAQpage" target="_blank">
            FAQs
        </a>
        <a v-if="setup.AboutUsPage" :href="setup.AboutUsPage" target="_blank">
            About Us
        </a>
        <a v-if="setup.PhoneNumber" :href="'tel:' + setup.PhoneNumber" :title="setup.PhoneNumber">
            Call Us Now
        </a>
        <a v-if="setup.TermsConditionsPage" :href="setup.TermsConditionsPage" target="_blank">
            Terms
        </a>
        <a v-if="setup.MessengerLink" :href="'//' + setup.MessengerLink" target="_blank">
            Messenger
        </a>
      </div>
    </footer>
    `
})