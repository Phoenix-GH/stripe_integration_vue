<template lang="html">
  <div class="panel">

    <!-- PANEL HEADER -->
    <div class="panel__head">
        <div class="wrapper">
            <div class="wrapper__inner">
                <h3 class="ts--title">Change Password</h3>
                <p class="ts--body is--secondary">Keep your account secure, and your information safe.</p>
            </div>
            <div class="wrapper__inner align--right" data-tooltip="Bruce Springclean" data-tip-pos="left">
                <svg class="icon-lock icon--l color--accent"><use xlink:href="#icon-lock"></use></svg>
            </div>
        </div>
    </div>
    <!-- /PANEL HEADER -->

    <!-- PANEL BODY -->
    <div class="panel__body">

        <!-- PASSWORD INFO -->
        <div class="panel__section">
            <p>For better security, try using a mix of upper/lower-case letters, numbers and special characters like '!@#$%^&*', and don't use passwords like 'password' or '1234567890.'</p>
        </div>
        <!-- /PASSWORD INFO -->

        <!-- PASSWORD FORM -->
        <div class="panel__section">
            <div class="well bg--snow">
                <form id="formChangePassword" class="form" action="">
                    <div class="input input--password">
                        <input type="password" class="input__field" id="currentPassword" value="">
                        <label for="currentPassword">Current Password</label>
                        <div class="input__link"></div>
                    </div>
                    <div class="input input--password">
                        <input type="password" class="input__field" id="newPassword" value="">
                        <label for="newPassword">New Password</label>
                        <div class="input__link"></div>
                        <span class="input__helper">Must be at least 8 characters (case sensitive)</span>
                    </div>
                </form>
            </div>
        </div>
        <!-- /PASSWORD FORM -->

    </div>
    <!-- /PANEL BODY -->

</div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
