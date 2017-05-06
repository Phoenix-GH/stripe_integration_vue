<template>
    <div>
        <h1>Home</h1>
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