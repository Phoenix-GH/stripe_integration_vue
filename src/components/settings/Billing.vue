<template lang="html">
  <div class="panel">

            <!-- PANEL HEADER -->
            <div class="panel__head">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <h3 class="ts--title">Billing</h3>
                        <p class="ts--body is--secondary">Next invoice date – Feb 17, 2017</p>
                    </div>
                    <div class="wrapper__inner align--right">
                        <svg class="icon-billing icon--l color--accent"><use xlink:href="#icon-billing"></use></svg>
                    </div>
                </div>
            </div>
            <!-- /PANEL HEADER -->

            <!-- PANEL BODY -->
            <div class="panel__body">
                <div class="panel__section">

                    <!-- INVOICE LIST -->
                    <table class="table">
                        <tbody>

                            <!-- SINGLE INVOICE (REFERRAL REWARD) -->
                            <!-- NOTE: If the month was comp'd from a referral, the total is '$0.00' and the 'reward' icon is displayed. Additionally the 'View Receipt' link is disabled. -->
                            <tr>
                                <td>
                                    <span class="ts--subtitle disp--block">Jan 17, 2017</span>
                                    <span class="ts--body is--secondary">Monthly Membership</span>
                                </td>
                                <td class="align--right">
                                    <div class="disp--ib align--left">
                                        <!-- NOTE: Has a tooltip with the name of the person referred -->
                                        <span class="ts--subtitle disp--block" data-tooltip="Bruce Springclean" data-tip-pos="left">
                                            $0.00
                                            <svg class="icon-reward icon--s color--accent"><use xlink:href="#icon-reward"></use></svg>
                                        </span>
                                        <a class="link link--secondary is--disabled">View Reciept</a>
                                    </div>
                                </td>
                            </tr>
                            <!-- SINGLE INVOICE (REFERRAL REWARD) -->

                            <!-- SINGLE INVOICE (NORMAL) -->
                            <tr>
                                <td>
                                    <span class="ts--subtitle disp--block">Dec 17, 2017</span>
                                    <span class="ts--body is--secondary">Monthly Membership</span>
                                </td>
                                <td class="align--right">
                                    <div class="disp--ib align--left">
                                        <span class="ts--subtitle disp--block">
                                            $14.95
                                        </span>
                                        <a class="link link--secondary" href="#">View Reciept</a>
                                    </div>
                                </td>
                            </tr>
                            <!-- SINGLE INVOICE (NORMAL) -->

                        </tbody>
                    </table>
                    <!-- /INVOICE LIST -->

                    <!-- EMPTY STATE -->
                    <!-- NOTE: Display if no history is available -->
                    <div class="well is--empty align--center">
                        <p class="ts--body">You don't have any billing history yet.</p>
                    </div>
                    <!-- /EMPTY STATE -->

                </div>
            </div>
            <!-- /PANEL BODY -->

        </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
