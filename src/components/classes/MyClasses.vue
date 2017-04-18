<template lang="html">
    <div>
        <!-- BANNER -->
        <div class="banner bg--black bg--wood">
            <div class="banner__content container container--fw is--reversed">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <h1 class="ts--headline">My Classes</h1>
                        <p class="ts--title is--secondary">View a list of all your in progress and completed classes</p>
                    </div>
                    <!-- BROWSE CLASSES -->
                    <!-- NOTE: This button is only displayed if the user is enrolled in classes -->
                    <div class="wrapper__inner align--right">
                        <button class="btn btn--cta" @click="openClasses">Browse Classes</button>
                    </div>
                    <!-- /BROWSE CLASSES -->
                </div>
            </div>
        </div>
        <!-- /BANNER -->
        <!-- CLASS LIST -->
        <div class="content__section row container container--fw">

            <!-- EMPTY STATE -->
            <!--
            NOTE: Display only if the user hasn't enrolled in any classes.
        -->
            <div class="well is--empty align--center padding--xxl border--medium" v-if="classesInProgress.length == 0">
                <span class="ts--title">You haven't enrolled in any classes yet!</span>
                <div class="divider divider--s" style="margin-left:auto; margin-right:auto;"></div>
                <button class="btn btn--cta" @click="openClasses">Browse Classes</button>
            </div>
            <!-- /EMPTY STATE -->

            <!-- /CLASS LIST -->
            <inprogress />
            <!--<purchased />-->
            <completed-classes />


        </div>


    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    import CompletedClasses from './sections/CompletedClasses.vue'
    import PurchasedClasses from './sections/PurchasedClasses.vue'
    import InProgress from './sections/InProgressClasses.vue'

    export default {
        components: {
            completedClasses: CompletedClasses,
            inprogress: InProgress,
            purchased: PurchasedClasses
        },
        computed: {
            ...mapGetters([
                'user', 'classesInProgress'
            ]),
        },
        methods: {
            openClasses() {
                this.$router.push({ name: 'classes' });
            }
        }
    }

</script>

<style lang="css">

</style>