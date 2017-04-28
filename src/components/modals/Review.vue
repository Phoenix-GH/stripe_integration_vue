<template>
    <div id="modalReviewClass" class="modal modal--s" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <div class="modal__body">
                <div class="well no--border">
                    <a href="javascript:;" class="modal__close" @click="close">
                        <svg class="icon-close icon--s">
                            <use xlink:href="#icon-close"></use>
                        </svg>
                    </a>
                    <!-- PANEL BODY -->
                    <div class="panel__body">
                        <form id="formSubmitReview" class="form" @submit.prevent="">
                            <div class="align--center">
                                <span class="ts--subtitle">Tell Us About Your Experience</span>
                                <span class="divider divider--s"></span>
                            </div>

                            <!-- ERROR MESSAGE -->
                            <!-- NOTE: Possible responses separated by '||' Let us know if you'd recommend this class! || Tell us about your experience! || All fields are required. -->
                            <div class="well bg--light align--center" :class="{'color--negative border--negative bg--light-negative': checkErrorMessage}">
                                {{ toolMessage }}
                            </div>
                            <!-- /ERROR MESSAGE -->

                            <!-- RECOMMEND -->
                            <div class="well align--center" style="padding-bottom:14px;">
                                <span class="ts--title disp--ib margin--s no--margin-tb no--margin-l">Would you recommend this class?</span>
                                <div class="control__group is--inline disp--ib no--margin-b" style="transform:translateY(-2px);">
                                    <label class="control control__radio control__icon no--margin-b">
                                    <input type="radio" name="radioGroup" required @click="selectedLike(true)">
                                    <div class="control__indicator">
                                        <svg class="icon-thumbs-up-fill"><use xlink:href="#icon-thumbs-up-fill"></use></svg>
                                    </div>
                                </label>
                                    <label class="control control__radio control__icon">
                                    <input type="radio" name="radioGroup" @click="selectedLike(false)">
                                    <div class="control__indicator">
                                        <svg class="icon-thumbs-down-fill"><use xlink:href="#icon-thumbs-down-fill"></use></svg>
                                    </div>
                                </label>
                                </div>
                            </div>
                            <!-- /RECOMMEND -->

                            <!-- REVIEW TEXT -->
                            <div class="input input--textarea input--m">
                                <textarea v-model="reviewBody" class="input__field" :class="{'not--empty': reviewBody.length > 0}" maxlength="500" required>{{ reviewBody }}</textarea>
                                <label for="reviewText">Tell us about it...</label>
                                <span class="input__counter"><span>0</span>/500</span>
                            </div>
                            <!-- /REVIEW TEXT -->

                            <button @click="submitReview" class="btn btn--cta btn--block">Submit Review</button>

                        </form>

                    </div>
                    <!-- /PANEL BODY -->
                </div>
            </div>
        </div>
        <div class="modal__overlay" @click="close"></div>
    </div>

</template>

<script>
    import { User, Class } from '../../api';
    import { mapGetters } from 'vuex';

    export default {
        created() {

        },
        data: function () {
            return {
                reviewBody: '',
                errorMessage: '',
                likedClass: true
            }
        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal', 'activeCourse', 'user'
            ]),
            active() {
                if ((this.hasModal) && (this.activeModal == 'review')) {
                    return true;
                } else {
                    return false;
                }
            },
            checkErrorMessage() {
                if (this.errorMessage.length > 0) {
                    return true;
                } else {
                    return false;
                }
            },
            toolMessage() {
                if (this.checkErrorMessage) {
                    return 'All fields are required.';
                } else {
                    return 'Tell us about your experience!';
                }
            }
        },
        methods: {
            close() {
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
            submitReview() {
                if (this.reviewBody.length == 0) {
                    this.errorMessage = 'All fields are required.';
                    return;
                }
                let rating = 0;
                if (this.likedClass) {
                    rating = 1;
                }
                let payload = {
                    body: this.reviewBody,
                    rating: rating,
                    course: this.activeCourse._id
                }
                let _this = this;
                Class.addReviewForClass(this, payload, review => {
                    Class.classDetails(this, this.activeCourse._id, error => {
                        _this.close();
                    }, course => {
                        _this.close();
                    });
                })
            },
            selectedLike(liked) {
                if (liked) {
                    console.log('liked it');
                    this.likedClass = true;
                } else {
                    console.log("didn't like it");
                    this.likedClass = false;
                }
            }
        }
    }

</script>

<style>

</style>