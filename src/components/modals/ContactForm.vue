<template>

    <div id="modalContact" class="modal modal--s" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <a href="javascript:;" class="modal__close" @click="close"><svg class="icon-close icon--s"><use xlink:href="#icon-close"></use></svg></a>
            <div class="modal__body">
                <div class="well no--border">

                    <!-- PANEL BODY -->
                    <div class="panel__body">

                        <!-- MODAL HEADER -->
                        <div class="align--center">
                            <svg class="icon-contact icon--m color--accent">
                                <use xlink:href="#icon-contact"></use>
                            </svg>
                            <span class="ts--title margin--s no--margin-lr no--margin-b">Contact Us!</span>
                            <span class="divider divider--s"></span>
                        </div>
                        <!-- /MODAL HEADER -->

                        <!-- ERROR MESSAGE -->
                        <!-- NOTE: Possible responses separated by '||' -->
                        <div v-if="errorMessage.length > 0" class="well bg--light-negative border--negative align--center color--negative">
                            {{ errorMessage }}
                        </div>
                        <!-- /ERROR MESSAGE -->

                        <form @submit.prevent="">

                            <!-- Name -->
                            <!-- NOTE: Display if not logged in. -->
                            <div class="input__row">
                                <div class="input input--text">
                                    <input v-model="firstName" type="text" class="input__field" :class="{'not--empty': firstName.length > 0}" id="fName" value=""
                                        required>
                                    <label for="fName">First Name</label>
                                </div>
                                <div class="input input--text">
                                    <input v-model="lastName" type="text" class="input__field" :class="{'not--empty': lastName.length > 0}" id="lName" value=""
                                        required>
                                    <label for="lName">Last Name</label>
                                </div>
                            </div>

                            <!-- Email Address -->
                            <!-- NOTE: Display if not logged in. -->
                            <div class="input input--text">
                                <input v-model="email" type="email" class="input__field" :class="{'not--empty': email.length > 0}" id="email" value="" required>
                                <label for="email">Email</label>
                            </div>

                            <!-- Message -->
                            <div class="input input--textarea input--m">
                                <textarea v-model="message" class="input__field" :class="{'not--empty': message.length > 0}" id="reviewText" value="" maxlength="1000"
                                    required></textarea>
                                <label for="reviewText">Type your message...</label>
                                <span class="input__counter"><span>0</span>/1000</span>
                            </div>

                            <!-- Submit -->
                            <button @click="submitContactForm" class="btn btn--cta btn--block">Submit</button>

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
    import { eventBus } from '../../main';

    export default {
        data: function () {
            return {
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                errorMessage: ''
            }
        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal'
            ]),
            active() {
                if ((this.hasModal) && (this.activeModal == 'contact')) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        methods: {
            close() {
                this.firstName = '';
                this.lastName = '';
                this.email = '';
                this.message = '';
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
            submitContactForm() {
                if (this.message.length == 0 || this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0) {
                    this.errorMessage = 'All fields are required.';
                    return;
                }

                let payload = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    message: this.message
                }

                let _this = this;

                User.contactForm(this, payload).then(response => {
                    _this.close();
                }).catch(error => {
                    _this.errorMessage = error.response.data.message;
                })

            },
        }
    }

</script>

<style>

</style>
