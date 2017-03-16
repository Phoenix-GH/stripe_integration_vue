<template lang="html">
  <div class="panel">

    <!-- PANEL HEADER -->
    <div class="panel__head">
        <div class="wrapper">
            <div class="wrapper__inner">
                <h3 class="ts--title">Payment Settings</h3>
                <p class="ts--body is--secondary">Change your saved method of payment.</p>
            </div>
            <div class="wrapper__inner align--right">
                <svg class="icon-payments icon--l color--accent"><use xlink:href="#icon-payments"></use></svg>
            </div>
        </div>
    </div>
    <!-- /PANEL HEADER -->

    <!-- PANEL BODY -->
    <div class="panel__body">
        <div class="panel__section">

            <!-- PAYMENT METHOD -->
            <!-- NOTE: Display only if Credit Card saved -->
            <div class="well">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <ul class="list list--inline list--divided">
                            <li class="item no--pad-l">
                                <span class="cc__icon is--visa"></span>
                            </li>
                            <li class="item">
                                <span class="ts--subtitle disp--block">Visa ending in 6455</span>
                                <span class="ts--body is--secondary">Expires June/2018</span>
                            </li>
                        </ul>
                    </div>
                    <div class="wrapper__inner align--right">
                        <button class="btn btn--secondary">Change Method</button>
                    </div>
                </div>
            </div>
            <!-- /PAYMENT METHOD -->

            <!-- PAYMENT METHOD - EMPTY STATE -->
            <!-- NOTE: Display if no payment method is added -->
            <div class="well is--empty align--center">
                <p class="ts--body">You don't have a payment method saved yet.</p>
                <button class="btn btn--primary">Add Credit Card</button>
            </div>
            <!-- /PAYMENT METHOD - EMPTY STATE -->

            <!-- Billing Link -->
            <div class="align--right">
                <a class="link link--secondary" href="/templates/settings/billing">View Billing History</a>
            </div>

        </div>
    </div>
    <!-- /PANEL BODY -->

</div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
