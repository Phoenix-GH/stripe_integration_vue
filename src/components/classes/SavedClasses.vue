<template>
  <form>
    <input type="text" name="cardholder_name" v-model="name" />
    <input type="text" name="card_number" v-model="cardNumber" />
    <input type="text" name="expiration" v-model="expiration" />
    <input type="text" name="security_code" v-model="securityCode" />
    <input type="text" name="postal_code" v-model="postalCode" />
    <input type="hidden" name="token" v-model="token" />
  </form>
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
    data: function() {
      return {
        name: '',
        cardNumber: '',
        expiration: '',
        securityCode: '',
        postalCode: '',
        token: '',
      }
    },
    created(){
      console.log('I was created');
    },
    destroyed(){
      console.log('destroyed');
      //this.unmountStripeComponent();
    },
    mounted() {
      console.log('i was mounted');
      //this.mountStripeComponent();
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
      },
      getToken() {
        console.log('getting token');
        console.log(stripe);
        console.log(card.cardNumber);
        stripe.createToken(card).then(function(result) {
          if (result.error) {
            // Inform the user if there was an error
            //var errorElement = document.getElementById('card-errors');
            //errorElement.textContent = result.error.message;
            console.log(result.error.message);
          } else {
            // Send the token to your server
            //stripeTokenHandler(result.token);
            console.log(result.token);
          }
        });
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
