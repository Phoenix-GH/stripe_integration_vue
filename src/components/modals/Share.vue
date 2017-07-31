<template>
    <div id="modalShareClass" class="modal modal--s" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <a href="javascript:;" class="modal__close" @click="close"><svg class="icon-close icon--s"><use xlink:href="#icon-close"></use></svg></a>
            <div class="modal__body">
                <div class="well no--border">

                    <!-- PANEL BODY -->
                    <div class="panel__body">

                        <!-- SHARE CONTENT -->
                        <div class="align--center">
                            <svg class="icon-reward icon--m color--accent">
                                <use xlink:href="#icon-reward"></use>
                            </svg>
                            <span class="ts--title margin--s no--margin-lr no--margin-b">Share with your Friends!</span>
                            <br>
                            <div style="width:100%; max-width:400px; margin:0 auto;">
                                <p class="ts--body">Share this class with your friends and you’ll both receive a free month of Premium when they
                                    sign up.</p>
                            </div>
                            <span class="divider divider--s"></span>
                        </div>
                        <!-- /SHARE CONTENT -->

                        <!-- REFERRAL URL -->
                        <div @click="addToClipboard" class="input input--text" data-tooltip="Click to copy" data-tip-pos="right" style="width:100%; max-width:440px; margin-right:auto; margin-left:auto;">
                            <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID2" :value="shareUrl">
                            <label for="inputID">Referral URL</label>
                        </div>
                        <!-- /REFERRAL URL -->

                        <!-- SHARE BUTTONS -->
                        <div v-if="active" style="width:190px; transform: translateY(-4px); margin:0 auto;">

                            <!-- FACBOOK SHARE -->
                            <div class="fb-share-button" :data-href="shareUrl" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                            <!-- /FACEBOOK SHARE -->

                            <!-- TWITTER SHARE -->
                            <div class="disp--ib" style="transform:translateY(7px);">
                                <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false" :data-url="shareUrl">Tweet</a>
                            </div>
                            <!-- /TWITTER SHARE -->

                            <a class="btn btn--share is--email" href="mailto:support@smm.co">Email</a>
                            <!-- /EMAIL SHARE -->
                        </div>
                        <!-- /SHARE BUTTONS -->

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
            twttr.widgets.load();
            if (window.FB) {
                window.FB.XFBML.parse();
            }
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
                if ((this.hasModal) && (this.activeModal == 'share')) {
                    this.$nextTick(() => {
                        twttr.widgets.load();
                        if (window.FB) {
                            window.FB.XFBML.parse();
                        }
                    })
                    return true;
                } else {
                    return false;
                }
            },
            shareUrl() {
                return `https://smm.co?ref=${this.user.referralId}`;
            },
            twitterShareUrl() {
                return `https://twitter.com/intent/tweet?url=${this.shareUrl}`;
            }
        },
        methods: {
            close() {
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
            addToClipboard() {
                document.querySelector('#inputID2').select();
                document.execCommand('copy');
            }
        }
    }

</script>

<style>

</style>
