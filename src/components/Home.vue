<template>
    <div>
        <h1>Home</h1>
        <button @click="testShowSpinner">SHOW SPINNER</button>
    </div>
</template>

<script>
    export default {
        methods: {
            testShowSpinner() {
                let _this = this;
                this.$store.dispatch('updateSpinner', true);
                setTimeout(() => {
                    _this.$store.dispatch('updateSpinner', false);
                }, 3000);
            }
        }
    }

</script>

<style>

</style>