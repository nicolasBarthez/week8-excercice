<template>
<section class="section main">
    <div class="card">
        <div class="card-content bg-light">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-32x32 is-circle"><img src="<%= user.picProfile %>" alt="Image"></figure>
                </div>
                <div class="media-content">
                    <div>
                        <div class="field">
                            <div class="control"><textarea id="babble-text" name="babble" maxlength="200" rows="3" placeholder="Whats happening?" class="textarea"></textarea></div>
                        </div>
                        <div class="level">
                            <div class="level-left"><a class="has-text-grey-light"><span class="icon"><i class="fa fa-image"></i></span></a></div>
                            <div class="level-right">
                                <div class="level-item has-text-grey">200</div>
                                <div class="level-item"><button id="babble-submit" type="submit" class="button is-outlined is-primary">Babble</button><div>
                            </div>
                        </div>      
              </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
import {  } from "@/api/api";
import  from "../components/";

export default {
  data() {
    return {
      stock: null,
      
    };
  },
  components: {
    
  },
  methods: {
    
  },
  created() {
    
  }
};
</script>

<style>

</style>
