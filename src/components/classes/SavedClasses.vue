<template>
  <div>
    <div class="col col--10-of-12">
        <form action="/charge" method="post" id="payment-form">
          <div class="form-row">
            <label for="card-element">
              Credit or debit card
            </label>
            <div id="card-element">
              <!-- a Stripe Element will be inserted here. -->
            </div>
            <!-- Used to display form errors -->
            <div id="card-errors"></div>
          </div>
          <button class="btn btn--primary">Submit</button>
        </form>
    </div>
  </div>
</template>

<script>

  // Create a Stripe client
  var stripe = Stripe('pk_test_hz7Ftxjb7anZasP8PFtcFwQv');

  // Create an instance of Elements
  var elements = stripe.elements();

  // Custom styling can be passed to options when creating an Element.
  // (Note that this demo uses a wider set of styles than the guide below.)
  var style = {
    base: {
      color: '#32325d',
      lineHeight: '24px',
      fontFamily: 'Helvetica Neue',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  };

  // Create an instance of the card Element
  var card = elements.create('card', {style: style});


  export default {
    created(){
      console.log('I was created');
    },
    destroyed(){
      console.log('destroyed');
      this.unmountStripeComponent();
    },
    mounted() {
      console.log('i was mounted');
      this.mountStripeComponent();
    },
    beforeMount() {
      console.log('before mounted');
    },
    methods:{
      mountStripeComponent() {
        console.log('mounting stripe');
        const node = document.getElementById('card-element');
        const card = stripe.elements().create('card', {style: style});
        card.mount(node);
      },
      unmountStripeComponent() {
        card.unmount();
      }
    }
  }

</script>

<style>

.bottom {
  padding-top: 50px;
}

.StripeElement {
  background-color: white;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}

</style>
