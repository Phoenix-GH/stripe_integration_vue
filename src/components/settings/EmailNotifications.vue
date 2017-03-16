<template lang="html">
  <div class="panel">

              <!-- PANEL HEADER -->
              <div class="panel__head">
                  <div class="wrapper">
                      <div class="wrapper__inner">
                          <h3 class="ts--title">Email Notifications</h3>
                          <p class="ts--body is--secondary">Choose what you’d like to recieve from us in your inbox.</p>
                      </div>
                      <div class="wrapper__inner align--right">
                          <svg class="icon-email-settings icon--l color--accent"><use xlink:href="#icon-email-settings"></use></svg>
                      </div>
                  </div>
              </div>
              <!-- /PANEL HEADER -->

              <!-- PANEL BODY -->
              <div class="panel__body">

                  <!-- NEW CONTENT NOTIFICATIONS -->
                  <div class="panel__section">
                      <h4 class="ts--subtitle">Notify me:</h4>
                      <div class="control__group margin--s no--margin-r">
                          <label class="control control__checkbox">
                              <input type="checkbox" name="notifNewClasses">
                              <div class="control__indicator"></div>
                              New classes are released
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="notifNewPodcasts">
                              <div class="control__indicator"></div>
                              New podcast episodes are available
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="notifNewAnnouncements">
                              <div class="control__indicator"></div>
                              Announcements/upcoming events
                          </label>
                      </div>
                  </div>
                  <!-- /NEW CONTENT NOTIFICATIONS -->

                  <!-- FOLLOWED TOPICS -->
                  <div class="panel__section">
                      <h4 class="ts--subtitle">Followed Topics</h4>
                      <p class="ts--body is--secondary">Notify me when new classes are released for my followed topics:</p>
                      <div class="control__group margin--s no--margin-r">
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedMindset">
                              <div class="control__indicator"></div>
                              Mindset
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedProductivity">
                              <div class="control__indicator"></div>
                              Productivity
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedEntreneurship">
                              <div class="control__indicator"></div>
                              Entreneurship
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedMoney">
                              <div class="control__indicator"></div>
                              Money
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedGiving">
                              <div class="control__indicator"></div>
                              Giving
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedHealthFitness">
                              <div class="control__indicator"></div>
                              Health &amp; Fitness
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedDefense">
                              <div class="control__indicator"></div>
                              Defense
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedLifestyle">
                              <div class="control__indicator"></div>
                              Lifestyle
                          </label>
                          <label class="control control__checkbox">
                              <input type="checkbox" name="followedRelationships">
                              <div class="control__indicator"></div>
                              Relationships
                          </label>
                      </div>
                  </div>
                  <!-- /FOLLOWED TOPICS -->

              </div>
              <!-- /PANEL BODY -->

          </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
