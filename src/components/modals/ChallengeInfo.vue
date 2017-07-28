<template>
    <div id="modalShowChallengeInfo" class="modal modal--s reversed--head" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <a href="javascript:;" class="modal__close" @click="close"><svg class="icon-close icon--s"><use xlink:href="#icon-close"></use></svg></a>
            <div class="banner modal__header align--center bg--positive jagged jagged--white is--reversed">
                <span class="ts--headline is--secondary">Quick-Start Challenge:</span>
                <span class="ts--display" style="line-height:1em;">Earn a Free* Hat!</span>
            </div>
            <div class="modal__body">
                <div class="well no--border">
                    <!-- PANEL BODY -->
                    <div class="panel__body">
                        <div class="row">
                            <div class="col col--2-of-3 col--am">
                                <p class="ts--body">Complete 3 lessons and you’ll earn yourself a brand new Self Made Man hat. You can keep track of your progres in the <strong>Challenges</strong> dropdown.</p>
                                <p class="ts--small">*Outside U.S. must pay shipping.</p>
                            </div>
                            <div class="col col--1-of-3 col--am">
                                <img src="../../assets/img/content/challenge-area.png" alt="" width="100%">
                            </div>
                        </div>
                    </div>
                    <!-- /PANEL BODY -->
                </div>
            </div>
            <div class="modal__footer align--center">
                <button class="btn btn--cta" @click="handleAction">Got It</button>
            </div>
        </div>
        <div class="modal__overlay" @click="close"></div>
    </div>

</template>

<script>
    import { User, Class } from '../../api';
    import { mapGetters } from 'vuex';
    import { eventBus } from '../../main';

    export default {
        mounted() {

        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal', 'user'
            ]),
            active() {
                if ((this.hasModal) && (this.activeModal == 'challengeinfo')) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            close() {
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
            handleAction() {
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
        }
    }

</script>
<style>

</style>
