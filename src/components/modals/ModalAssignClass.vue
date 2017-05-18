<template>
    <modal :show="show" :closeModal="closeModal">
        <div style="color: red;" v-if="errorMessage.length > 0">
            {{ errorMessage }}
        </div>
        <div class="modal-header">
            <h3>Invite or Enroll User in a Master Class</h3>
            <br> {{ student.email }}
        </div>
        <div class="modal-body">
            <h3>Select The Master Class</h3>
            <br>
            <select v-model="selectedMasterClass">
                <option v-for="mclass in masterClasses" :value="mclass._id">{{ mclass.title }}</option>
            </select>
        </div>
        <br>
        <div class="modal-footer text-right">
            <button class="btn btn-primary" @click="enrollInClass()">
                Enroll
            </button>
            <button class="btn btn-primary" @click="inviteToClass()">
                Invite
            </button>
        </div>
    </modal>
</template>

<script>
    import Modal from './Modal.vue';
    import { Class, User } from '../../api';
    export default {
        components: {
            modal: Modal
        },
        props: ['show', 'closeModal', 'student', 'masterClasses'],
        data: function () {
            return {
                selectedMasterClass: '',
                errorMessage: ''
            };
        },
        methods: {
            close() {
                this.errorMessage = '';
                this.selectedMasterClass = '';
                this.closeModal();
            },
            showErrorMessage(message) {
                this.errorMessage = message;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 3000);
            },
            enrollInClass() {

                if (this.selectedMasterClass.length == 0) {
                    this.showErrorMessage('please select a master class before continuing.');
                    return;
                }

                this.errorMessage = ''

                let _this = this;
                let params = {
                    user: this.student._id,
                    course: this.selectedMasterClass
                }
                console.log(params);
                User.enrollStudentInMasterClass(this, params).then(response => {
                    console.log(response);
                    _this.errorMessage = '';
                    _this.selectedMasterClass = '';
                    _this.closeModal();
                }).catch(err => {
                    console.log(JSON.stringify(err));
                    _this.showErrorMessage(err);
                })
            },
            inviteToClass() {

                if (this.selectedMasterClass.length == 0) {
                    this.showErrorMessage('please select a master class before continuing.');
                    return;
                }

                this.errorMessage = ''

                let _this = this;
                let params = {
                    user: this.student._id,
                    course: this.selectedMasterClass
                }

                User.inviteStudentToMasterClass(this, params).then(response => {
                    console.log(JSON.stringify(response));
                    _this.errorMessage = '';
                    _this.selectedMasterClass = '';
                    _this.closeModal();
                }).catch(err => {
                    console.log('there has been an error');
                    console.log(JSON.stringify(err));
                    _this.showErrorMessage(err);
                })
            }
        }
    }

</script>

<style scoped>

</style>