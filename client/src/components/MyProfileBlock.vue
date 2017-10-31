<template >
<section v-if = "profileInfo" class="section main">
  <div class="column is-6" id="ActionCard">
    <div class="card profile-card">
      <div class="card-content">
        <div class="media">
          <div class="media-left">
            <figure class="image is-64x64 is-circle">
              <img  :src="profileInfo.picProfile" alt="my picture">
            </figure>
          </div>
          <div class="media-content">
            <p class="title is-5">
              {{profileInfo.username}}
            </p>
            <p class="subtitle is-6"> <strong>Following</strong> {{profileInfo.following}}
            </p>
            <p class="subtitle is-6"> <strong>Followers</strong> {{profileInfo.followers}}
            </p>
            <p class="subtitle is-6"> <strong>Babbles posted</strong> {{profileInfo.nbBabbles}}
            </p>
            <p class="subtitle is-6"> <strong>Nb of insights won</strong> {{profileInfo.nbOfInsightsWon}}
            </p>
            <p class="subtitle is-6"> <strong>Likes</strong> {{profileInfo.nbOfLikes}}
            </p>
            <a href="/profile/edit"><button id="BEditFollow" class="button is-small is-outlined is-primary" type="button" name="button">Update my picture</button></a>
          </div>
        </div>
        <nav class="level">
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light"><strong>PERF</strong></p>
              <p class="is-4">
                {{profileInfo.performancePoints}} <strong>P$</strong>
              </p>
              </a>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light"><small>Location</small></p>
              <p class="is-4">
                {{profileInfo.location ? profileInfo.location : "Secret..." }}

              </p>
              </p>
            </div>
          </div>
          <div class="level-item has-text-centered">
            <div>
              <p class="is-6 has-text-grey-light">Prefered trades</p>
              <p class="is-4">
              1.   {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].stockId.longName  : "-" }} - {{profileInfo.preferedStocks[0]? profileInfo.preferedStocks[0].performancePoints : "-" }}  P$
              </p>
              <p class="is-4">
              2.   {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].stockId.longName  : "-" }} - {{profileInfo.preferedStocks[1]? profileInfo.preferedStocks[1].performancePoints : "-" }}  P$
              </p>
              <p class="is-4">
              3.   {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].stockId.longName  : "-" }} - {{profileInfo.preferedStocks[2]? profileInfo.preferedStocks[2].performancePoints : "-" }}  P$
              </p>
            </div>
          </div>

          <div class="level-item has-text-centered">
            <div>

            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  props: {
    profileInfo: Object
  }
};
</script>

<style lang="css">
</style>
