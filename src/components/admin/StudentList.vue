<template>

    <div class="row content">

        <!-- LEFT SIDEBAR -->
        <div class="col col--2-of-12 col--push-1-of-12">
            <ul class="list list--nav page__tabs">
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
        <div class="col col--7-of-12">
            <div>
                <div class="input input--search">
                    <input @keyup.enter="searchUsers" v-model="searchTerms" type="text" placeholder="Search for users by name and email...">
                </div>
                <div v-for="student in students" style="margin-bottom: 25px; background-color: white; padding: 10px; width: auto">
                    <div style="display: inline-flex">
                        <div style="width:auto; padding: 15px">
                            <span class="avatar avatar--xxl" :style="{ 'background-image': 'url(' + student.profileImageUrl + ')' }"></span>
                        </div>
                        <div style="width:auto; background-color: white; margin-left: 25px; padding: 15px;">
                            <div><b>{{ student.firstName }} {{ student.lastName }}</b></div>
                            <div>email: <i>{{ student.email }}</i></div>
                            <div>subscription: <i>{{ student.subscriptionType }}</i></div>
                            <div v-if="student.facebookId != undefined"><i>facebook user</i></div>
                        </div>
                    </div>
                    <div style="display: flex; justify-content: center; padding-bottom: 20px 0px 20px 0px">
                        <button class="btn btn--primary is--affirmative" @click="enrollStudent(student)">Enroll In Masterclass</button>
                        <div style="width: 15px"></div>
                        <button v-if="student.facebookId == undefined" class="btn btn--primary" @click="resetPassword(student.email)">Reset Password</button>
                        <div v-if="student.facebookId == undefined" style="width: 15px"></div>
                        <button class="btn btn--primary" @click="deleteStudent(student)">Delete</button>
                    </div>
                </div>
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
                }
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