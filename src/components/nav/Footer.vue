<template lang="html">
    <!-- ===== FOOTER ===== -->
    <div class="page__block">
        <footer class="footer footer__main">
            <div class="container container--fw">
                <nav class="footer__nav--main row">
                    <div class="col col--2-of-12 col--m-1-of-3 col--s-1-of-3">
                        <span class="ts--caption">Self Made Man</span>
                        <ul class="list list--nav">
                            <li class="item">
                                <router-link class="link" :to="{ name: 'home' }">About</router-link>
                            </li>
                            <li class="item">
                                <div v-if="!userSubscribed" class="link" @click="checkPremium">Premium</div>
                            </li>
                            <li class="item">
                                <router-link class="link" :to="{ name: 'podcasts' }">Podcasts</router-link>
                            </li>
                            <li class="item">
                                <router-link class="link" :to="{ name: 'faq' }">FAQ</router-link>
                            </li>
                            <li class="item">
                                <div class="link" @click="openSupport">Support</div>
                            </li>
                        </ul>
                    </div>
                    <div class="col col--2-of-12 col--m-2-of-3 col--s-2-of-3">
                        <span class="ts--caption">My Account</span>
                        <ul class="list list--nav">
                            <li class="item">
                                <router-link class="link" :to="{ name: 'account' }">Profile &amp; Security</router-link>
                            </li>
                            <li class="item">
                                <router-link class="link" :to="{ name: 'account' }">Settings</router-link>
                            </li>
                            <li class="item">
                                <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
                            </li>
                            <li class="item item--blank">&nbsp;</li>
                            <li class="item">
                                <router-link class="link" :to="{ name: 'referrals' }">Refer a Friend</router-link>
                            </li>
                        </ul>
                    </div>
                    <div id="footerCategories" class="col col--6-of-12 col--push-2-of-12">
                        <span class="ts--caption">Learn Skills</span>
                        <div class="row">
                            <div class="col col--2-of-6 col--m-1-of-3 col--s-1-of-3">
                                <ul class="list list--nav">
                                    <li class="item">
                                        <div @click="emitTopic('mindset')" class="link">Mindset</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('productivity')" class="link">Productivity</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('entrepreneurship')" class="link">Entrepreneurship</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col col--2-of-6 col--m-1-of-3 col--s-1-of-3">
                                <ul class="list list--nav">
                                    <li class="item">
                                        <div @click="emitTopic('money')" class="link">Money</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('giving')" class="link">Giving</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('fitness')" class="link">Health &amp; Fitness</div>
                                    </li>
                                </ul>
                            </div>
                            <div class="col col--2-of-6 col--m-1-of-3 col--s-1-of-3">
                                <ul class="list list--nav">
                                    <li class="item">
                                        <div @click="emitTopic('defense')" class="link">Defense</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('lifestyle')" class="link">Lifestyle</div>
                                    </li>
                                    <li class="item">
                                        <div @click="emitTopic('relationships')" class="link">Relationships</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <nav class="footer__nav--sub">
                    <div class="wrapper">
                        <ul id="colophon" class="list list--inline wrapper__inner">
                            <li class="item">
                                &copy; Self Made Man, 2017 / All Rights Reserved
                            </li>
                            <li class="item">
                                <router-link class="link link--secondary" :to="{ name: 'privacypolicy' }">Privacy Policy</router-link>
                            </li>
                            <li class="item">
                                <router-link class="link link--secondary" :to="{ name: 'termsofuse' }">Terms of Use</router-link>
                            </li>
                            <li class="item">
                                <router-link class="link link--secondary" :to="{ name: 'earnings' }">Earnings Disclaimer</router-link>
                            </li>
                        </ul>
                        <ul class="list list--inline list--social wrapper__inner align--right">
                            <li class="item">
                                <a class="link" href="#">
                                    <svg class="icon-social-facebook">
                                        <use xlink:href="#icon-social-facebook"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="item">
                                <a class="link" href="#">
                                    <svg class="icon-social-twitter">
                                        <use xlink:href="#icon-social-twitter"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="item">
                                <a class="link" href="#">
                                    <svg class="icon-social-instagram">
                                        <use xlink:href="#icon-social-instagram"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="item">
                                <a class="link" href="#">
                                    <svg class="icon-social-pinterest">
                                        <use xlink:href="#icon-social-pinterest"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </footer>
    </div>
    <!-- ===== /FOOTER ===== -->
</template>

<script>
    //import the event bus
    import { eventBus } from '../../main';
    import { mapGetters } from 'vuex';

    export default {
        computed: {
            ...mapGetters([
                'user'
            ]),
            userSubscribed() {
                if (this.user.subscribed == null) return false;
                return this.user.subscribed;
            }
        },
        methods: {
            emitTopic(topic) {
                eventBus.$emit('topicChanged', { topic: topic });
                this.$router.push({ name: 'classes', query: { topic: topic } });
            },
            checkPremium() {
                //check for premium membership
            },
            openSupport() {
                //navigate to support website here
            }
        }
    }

</script>

<style lang="css">

</style>