<template>

    <div class="container container--fw container--s layout--1-4 cf">

        <!-- LEFT SIDEBAR -->
        <div class="layout__col">
            <ul class="list list--nav page__tabs hide--m">
                <li class="item">
                    <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                </li>
                <li class="item">
                    <router-link class="link" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
                </li>
                <li class="item">
                    <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
                </li>
                <li class="item" v-if="user.role == 2">
                    <router-link class="link" :to="{ name: 'reviews' }">Reviews</router-link>
                </li>
                <li class="item" v-if="user.role == 2">
                    <router-link class="link is--active" :to="{ name: 'students' }">Students</router-link>
                </li>

            </ul>
        </div>
        <!-- /LEFT SIDEBAR -->

        <!-- SETTINGS PANEL -->
        <div class="layout__col">

            <!-- MOBILE NAV -->
            <div class="input input--dropdown mobile__menu show--m">
                <span class="input__field">Navigation</span>
                <ul class="dropdown__list">
                    <li class="item">
                        <router-link class="link" :to="{ name: 'account' }">Account</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" v-if="!hasFacebook" :to="{ name: 'password' }">Password</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
                    </li>
                    <li class="item">
                        <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
                    </li>
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link" :to="{ name: 'reviews' }">Reviews</router-link>
                    </li>
                    <li class="item" v-if="user.role == 2">
                        <router-link class="link is--active" :to="{ name: 'students' }">Students</router-link>
                    </li>
                </ul>
            </div>
            <!-- /MOBILE NAV -->

            <div>

                <div class="well">
                    <div class="input input--search">
                        <input @keyup.enter="searchUsers" v-model="searchTerms" type="text" placeholder="Search for users by name and email...">
                    </div>
                </div>

                <!-- SINGLE STUDENT -->
                <div v-for="student in students" class="well wrapper bg--white margin--s no--margin-lr">
                    <div class="wrapper__inner" style="width:112px;">
                        <span class="avatar avatar--xxl" :style="{ 'background-image': 'url(' + student.profileImageUrl + ')' }">
                            <div v-if="student.facebookId != undefined" class="badge badge--fb"><svg class="icon-social-facebook"><use xlink:href="#icon-social-facebook"></use></svg></div>
                        </span>
                    </div>
                    <div class="wrapper__inner">
                        <div class="ts--subtitle">
                            {{ student.firstName }} {{ student.lastName }}
                            <span class="has--badge badge--text badge--cap" :class="{'badge--alert': student.subscriptionType == 'paused', 'is--affirmative': student.subscriptionType == 'annual'||student.subscriptionType == 'monthly'}"
                                :data-badge="student.subscriptionType"></span>
                        </div>
                        <div><i>{{ student.email }}</i></div>
                    </div>
                    <div class="wrapper__inner align--right">
                        <ul class="list list--inline list--buttons">
                            <li class="item">
                                <button class="btn btn--secondary is--affirmative btn--s" @click="enrollStudent(student)">Enroll</button>
                            </li>
                            <li class="item">
                                <div @click.stop="openMenuForStudent(student)" class="has--popover disp--ib" :class="{'is--active': currentMenuOpen.length > 0 && currentMenuOpen == student._id }">
                                    <svg class="icon-more icon--s color--black no--margin">
                                        <use xlink:href="#icon-more"></use>
                                    </svg>
                                    </a>
                                    <ul class="list">
                                        <li class="item" v-if="student.facebookId == undefined">
                                            <a @click="resetPassword(student.email)">Reset Password</a>
                                        </li>
                                        <li class="item">
                                            <a @click="deleteStudent(student)">Delete User</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- /SINGLE STUDENT -->

            </div>
        </div>
        <!-- /SETTINGS PANEL -->

        <modalview :show="modalConfig.show" :closeModal="closeModal" :student="selectedStudent" :masterClasses="masterClasses"></modalview>



    </div>

</template>

<script>
    import { Class, User } from '../../api';
    import { mapGetters } from 'vuex';
    import { eventBus } from '../../main';
    import ModalView from '../modals/ModalAssignClass.vue';
    export default {
        data: function () {
            return {
                students: [],
                masterClasses: [],
                selectedStudent: {},
                searchTerms: '',
                selectedMasterClass: '',
                modalConfig: {
                    show: false
                },
                currentMenuOpen: ''
            }
        },
        components: {
            modalview: ModalView
        },
        watch: {
            searchTerms(val) {
                if (val.length > 0) {
                    console.log(val);
                    let _this = this;
                    User.searchUsers(this, val, response => {
                        _this.students = response;
                    })
                } else {
                    console.log('will clear')
                    this.refreshUsers();
                }
            }
        },
        computed: {
            ...mapGetters([
                'user', 'userLoggedIn'
            ]),
            hasFacebook() {
                if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
                return true;
            }
        },
        methods: {
            openMenuForStudent(student) {
                if (this.currentMenuOpen == student._id) {
                    this.currentMenuOpen = '';
                } else {
                    this.currentMenuOpen = student._id;
                }
            },
            deleteStudent(student) {
                let _this = this;
                if (confirm('Are you sure you want to delete this student? The student will be removed from the system and will not be able to be recovered.')) {
                    User.deleteStudent(this, student._id, response => {
                        _this.refreshUsers();
                    });
                }
            },
            enrollStudent(student) {
                console.log(JSON.stringify(student));
                this.selectedStudent = student;
                this.modalConfig.show = true;
            },
            closeModal() {
                this.modalConfig.show = false;
            },
            resetPassword(email) {
                if (email.length == 0) {
                    return;
                }
                let payload = {
                    email: email
                }
                let _this = this;
                User.requestPasswordReset(this, payload).then(response => {
                    console.log(JSON.stringify(response));
                    console.log('success!!!!');
                    alert("password reset email sent!");
                }).catch(err => {
                    console.log(JSON.stringify(err));
                })
            },
            searchUsers() {
                console.log(this.searchTerms);
                let _this = this;
                User.searchUsers(this, this.searchTerms, response => {
                    _this.students = response;
                })
            },
            refreshUsers() {
                let _this = this;
                User.studentList(this, (data) => {
                    _this.students = data;
                });
            },
            updateMasterClasses() {
                let _this = this;
                Class.recentMasterClasses(this, data => {
                    console.log(JSON.stringify(data));
                    _this.masterClasses = data;
                })
            }
        },
        created() {
            this.refreshUsers();
            this.updateMasterClasses();
            eventBus.$on('closeMenu', () => {
                this.currentMenuOpen = '';
            })
        },
        beforeDestroy() {
            eventBus.$off('closeMenu');
        }

    }

</script>

<style scoped>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .7);
        transition: opacity .3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .modal-container {
        min-width: 50vw;
        max-width: 80vw;
        max-height: 80vh;
        padding: 20px 30px;
        background: #fff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        transition: all .3s ease;
        overflow: auto;
    }

    .modal-body {
        margin: 20px 0;
    }

    .modal-enter,
    .modal-leave {
        opacity: 0;
    }

    .modal-enter .modal-container,
    .modal-leave .modal-container {
        transform: scale(1.1);
    }

    label {
        display: block;
        margin-bottom: 20px;
    }
</style>