<template>
  <div class="column is-6">
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                   <figure class="image is-32x32 is-circle"><img src="<%= user.picProfile %>" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <form action="/stream">
                        <div class="field">
                            <div class="control"><textarea id="babble-text" name="babble" maxlength="200" rows="3" placeholder="Whats happening?" class="textarea"></textarea></div>
                                            <!---->
                        </div>
                            <div class="level">
                                <div class="level-left"><a class="has-text-grey-light"><span class="icon"><i class="fa fa-image"></i></span></a></div>
                                <div class="level-right">
                                    <div class="level-item has-text-grey">200</div>
                                    <div class="level-item"><button id="babble-submit" class="button is-outlined is-primary" @click="isCardModalActive = true">
                                    Babble</button>
                                    </div>
                                </div>
                            </div>
                    </form>
                </div>
            </div>
        </div>
     </div>
  
<b-modal :active.sync="isCardModalActive" :width="640">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="static/img/placeholder-1280x960.png" alt="Image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                        <div class="media-left">
                            <figure class="image is-48x48">
                                <img src="static/img/placeholder-1280x960.png" alt="Image">
                            </figure>
                        </div>
                        <div class="media-content">
                            <p class="title is-4">John Smith</p>
                            <p class="subtitle is-6">@johnsmith</p>
                        </div>
                    </div>

                    <div class="content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                        <a>#css</a> <a>#responsive</a>
                        <br>
                        <small>11:09 PM - 1 Jan 2016</small>
                    </div>
                </div>
            </div>
        </b-modal>

</div>
</template>






<script>
export default {
name: 'Babble',
data() {
            return {
                isImageModalActive: false,
                isCardModalActive: false
            }
        }
}
</script>

<style>

</style>
