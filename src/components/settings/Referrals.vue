<template lang="html">
  <div class="panel">

    <!-- PANEL HEADER -->
    <div class="panel__head">
        <div class="wrapper">
            <div class="wrapper__inner">
                <h3 class="ts--title">Rewards &amp; Referrals</h3>
                <p class="ts--body is--secondary">Keep track of the friend’s you’ve referred and the rewards you’ve received.</p>
            </div>
            <div class="wrapper__inner align--right">
                <svg class="icon-reward icon--l color--accent"><use xlink:href="#icon-reward"></use></svg>
            </div>
        </div>
    </div>
    <!-- /PANEL HEADER -->

    <!-- PANEL BODY -->
    <div class="panel__body">

        <!-- SHARING -->
        <div class="panel__section">
            <h4 class="ts--subtitle">Give a month, earn a month!</h4>
            <p class="ts--body is--secondary">
                Share your unique referral code with your friends and you’ll both receive a free month of Premium when they sign up!
            </p>
            <div class="well bg--snow" style="overflow:visible;">
                <div class="wrapper">
                    <div class="wrapper__inner padding--m no--pad-l no--pad-tb">
                        <div class="input input--text" data-tooltip="Click to copy" data-tip-pos="right">
                            <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID" value="http://smm.co/J3ki80a">
                            <label for="inputID">Referral URL</label>
                        </div>
                    </div>
                    <div class="wrapper__inner" style="width:190px; transform: translateY(-4px);">

                        <!-- FACBOOK SHARE -->
                        <div id="fb-root"></div>
                        <div class="fb-share-button" data-href="https://selfmademan.com/" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fselfmademan.com%2F&amp;src=sdkpreparse">Share</a></div>
                        <!-- /FACEBOOK SHARE -->

                        <!-- TWITTER SHARE -->
                        <div class="disp--ib" style="transform:translateY(7px);">
                            <a href="https://twitter.com/share" class="twitter-share-button" data-show-count="false">Tweet</a>
                        </div>
                        <!-- /TWITTER SHARE -->

                        <a class="btn btn--share is--email" href="mailto:" style="transform: translateY(7px);">Email</a>

                    </div>
                </div>
            </div>
        </div>
        <!-- /SHARING -->

        <!-- MY REFERRALS -->
        <div class="panel__section">
            <h4 class="ts--subtitle">My Referrals</h4>

            <!-- REFERRALS - (EMPTY STATE) -->
            <!-- NOTE: Display only if the user has no referrals -->
            <div class="well is--empty align--center">
                You haven't invited any friends yet.
            </div>
            <!-- /REFERRALS - (EMPTY STATE) -->

            <!-- REFERRALS -->
            <table class="table">
                <tbody>

                    <!-- SINGLE REFERRAL -->
                    <tr>
                        <td>
                            <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-2.jpg')"></div>
                            William D.
                        </td>
                        <td class="align--center">
                            Jan 17, 2017
                        </td>
                        <td class="align--right fontWeight--2">
                            1 Month Free
                        </td>
                    </tr>
                    <!-- /SINGLE REFERRAL -->

                    <!-- SINGLE REFERRAL -->
                    <tr>
                        <td>
                            <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-3.jpg')"></div>
                            Senisa S.
                        </td>
                        <td class="align--center">
                            Jan 17, 2017
                        </td>
                        <td class="align--right fontWeight--2">
                            <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                            <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                1 Month Free
                            </span>
                        </td>
                    </tr>
                    <!-- /SINGLE REFERRAL -->

                    <!-- SINGLE REFERRAL -->
                    <tr>
                        <td>
                            <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-4.jpg')"></div>
                            Bosco B.
                        </td>
                        <td class="align--center">
                            Jan 17, 2017
                        </td>
                        <td class="align--right fontWeight--2">
                            <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                            <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                1 Month Free
                            </span>
                        </td>
                    </tr>
                    <!-- /SINGLE REFERRAL -->

                </tbody>
            </table>
            <!-- /REFERRALS -->

        </div>
        <!-- MY REFERRALS -->

    </div>
    <!-- /PANEL BODY -->

</div>
</template>

<script>

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=1262316793801783";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));

export default {
}
</script>

<style lang="css">
</style>
