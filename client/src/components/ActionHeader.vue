<template>
       <div class="column is-6" id="ActionCard">
            <div id="cardAction" class="card profile-card">
                <div class="card-content">
                    <div class="media" id="stockInfo">
                        <div class="media-left">
                            <figure class="image is-64x64 is-circle">
                                <img :src="$root.stock.stock_img" alt="">
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="stock-banner">
                                <div class="sock-info">
                                    <p class="title is-5">
                                        {{$root.stock.longName}}
                                    </p>
                                    <p class="subtitle is-6">
                                        <a class="">
                                            {{$root.stock.isin}}
                                        </a>
                                        <a class="">
                                            {{$root.stock.shortName}}
                                        </a>
                                        <p class="stock-see-desc is-6 has-text-grey-light">
                                            <router-link :to=`/stock/$root.stock.description` class="">
                                        See description</router-link>
                                        </p>
                                </div>

                                <form @submit.prevent="submit" class="add-to-watchlist" action="/stock/<%=stockId%>/watchlist">
                                    <button id="adWL" class="button is-small is-outlined is-primary">Add to Watchlist</button>
                                </form>

                                <div class="stock-price title is-5">
                                    <strong class="">{{price}} &nbsp;€</strong>
                                    <small class="">&nbsp;{{percent}}</small>
                                </div>

                            </div>
                            <nav id="bandB" class="level media">
                                <div id="bullsAndBears">
                                    <form id="BBull" action="/stock/<%= stockId%>/bull">
                                        <button id="Bbull" type="submit" class="button is-small is-outlined is-primary">Be Bull</button>
                                        <input type="text" style="display: none;" name="priceToSend" value="<%=price%>">
                                    </form>
                                    <span id="bandbdigit1"> {{bullPercent}} %</span>
                                    <div id="bullsAndBearsPic">
                                        <img src="/images/bulls-and-bears.png" alt="bull and bear">
                                    </div>
                                    <span id="bandbdigit2"> {{bearPercent}} %</span>
                                    <form id="BBear" action="/stock/<%= stockId%>/bear" method="post">
                                        <button id="Bbear" type="submit" class="button is-small is-outlined is-primary">Be Bear</button>
                                        <input type="text" style="display: none;" name="priceToSend" value="<%=price%>">
                                    </form>
                                </div>
                            </nav>
                            <div id='Last'>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last 6 hours</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</p>
                                </div>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last 24 hours</small> &nbsp &nbsp <small>|</small> &nbsp &nbsp</p>
                                </div>
                                <div class="level-item has-text-centered">
                                    <p class="is-6 has-text-grey-light"><small>Last Week</small></p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
       </div>
</template>

<script>
export default {
    name: 'ActionHeader'

}
</script>

<style>

</style>
