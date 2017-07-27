<template>
    <div id="modalShowAHA" class="modal modal--s" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <div class="modal__body">
                <div class="well no--border">
                    <!-- PANEL BODY -->
                    <div class="panel__body">
                        <div class="align--center">
                            <button @click="handleAction">Action</button>
                            <audio ref="audioElm" src="https://www.soundjay.com/button/button-1.mp3"></audio>
                            <button@click="openShare">Share</button>   
                        </div>
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
        mounted() {
           
        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal', 'user', 'ahaCourse'
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
                 var course = {
                    course : this.ahaCourse
                 }
                 console.log(this.ahaCourse);
                Class.updateAHA(this, course).then(response => {
                  this.$store.dispatch('updateAHACourse', this.ahaCourse);
                }).catch(error => {
                    this.errorMessage = `${error.response.data.message}`
                })
            },
            openShare(){
                this.close();
                this.$store.dispatch('updateHasModal', true);
                this.$store.dispatch('updateActiveModal', 'share');
                eventBus.$emit('refreshSocial');
            }
        }
    }

</script>
<style>

</style>