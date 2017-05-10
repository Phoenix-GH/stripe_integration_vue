<template>

    <div>
        <!-- BANNER -->
        <div class="banner bg--black bg--wood">
            <div class="banner__content container container--fw is--reversed">
                <div class="wrapper">
                    <div class="wrapper__inner">
                        <h1 class="ts--headline">Saved for Later</h1>
                        <p class="ts--title is--secondary">View a list of all the classes you’ve saved to take later</p>
                    </div>
                    <!-- BROWSE CLASSES -->
                    <!-- NOTE: This button is only displayed if the user is enrolled in classes -->
                    <div class="wrapper__inner align--right">
                        <button @click="openClasses" class="btn btn--cta">Browse Classes</button>
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
            <div class="well is--empty align--center padding--xxl border--medium" v-if="savedClasses.length <= 0">
                <span class="ts--title">You haven't saved any classes yet!</span>
                <div class="divider divider--s" style="margin-left:auto; margin-right:auto;"></div>
                <button @click="openClasses" class="btn btn--cta">Browse Classes</button>
            </div>
            <!-- /EMPTY STATE -->

            <!-- /CLASS LIST -->
            <savedClassesSection />

        </div>

    </div>

</template>

<script>
    import { mapGetters } from 'vuex';
    import { Class, User } from '../../api';
    import SavedClassesSection from './sections/SavedClassesSection.vue'
    export default {
        computed: {
            ...mapGetters([
                'user', 'savedClasses'
            ])
        },
        components: {
            savedClassesSection: SavedClassesSection
        },
        methods: {
            openClasses() {
                this.$router.push({ name: 'classes' });
            }
        },
        mounted() {
            Class.getSavedForLater(this);
        }
    }

</script>

<style>

</style>