<template>
    <div id="modalShowAHA" class="modal modal--s" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <div class="modal__body">
                <div class="well no--border">

                    <!-- PANEL BODY -->
                    <div class="panel__body">

                        <!-- SHARE CONTENT -->
                        <div class="align--center">
                            <svg class="icon-reward icon--m color--accent">
                                <use xlink:href="#icon-reward"></use>
                            </svg>
                            <span class="ts--title margin--s no--margin-lr no--margin-b">AHA!</span>
                            <br>
                            <div style="width:100%; max-width:400px; margin:0 auto;">
                                <p class="ts--body">Message(TBD)</p>
                            </div>
                            <span class="divider divider--s"></span>
                        </div>
                        <!-- /SHARE CONTENT -->

                        <!-- ACTION BUTTON -->
                        <div class="align--center">
                            <button class="btn btn--cta btn--block" @click="handleAction">Action</button>
                            <button class="btn btn--cta btn--block" @click="openShare">Share</button>
                            <audio ref="audioElm" src="https://www.soundjay.com/button/button-1.mp3"></audio>
                        </div>
                        <!-- /ACTION BUTTON -->
                        
                    </div>
                    <!-- /PANEL BODY -->
                </div>
            </div>
        </div>
        <div class="modal__overlay" @click="close"></div>
    </div>

</template>

<script>
    import $ from 'jquery';
    import { User, Class } from '../../api';
    import { mapGetters } from 'vuex';
    import { eventBus } from '../../main';

    export default {
        data: function () {
            return {
                shareLink: '',
            }
        },
        mounted() {
           
            //referrals
            $('[data-copy]').click(function () {
                var text = $(this).data('copy'),
                    alert = '<span class="field__alert">' + text + '</span>',
                    par = $(this).closest('.input'),
                    dur = 300;
                $(this).select();
                document.execCommand('copy');
                $(alert).hide().appendTo(par).fadeIn(dur).css({ 'transform': 'translateY(-5px)', 'opacity': '0' }).promise().done(function () {
                    $(this).fadeTo(50, 0, function () {
                        setTimeout(function () {
                            $('.field__alert').remove();
                        }, 200)
                    })
                });
            })
        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal', 'user'
            ]),
            active() {
                if ((this.hasModal) && (this.activeModal == 'aha')) {
                    
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
                 this.$refs.audioElm.play();

            }
        }
    }

</script>

<style>

</style>