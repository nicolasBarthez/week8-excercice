<template>
  <div class="column is-3">
    <div class="is-sticky">
        <div class="card-image">
            <nav class="navbar is-dark">
               <a id="currentInsight" class="babMenu navbar-item is-tab is-active">Current Insights</a>
            </nav>
        </div>
        <div class="card profile-card">
            <div id="watchList" class="card-content">
                <div class="Symbol">
                   <h1 class="stockName" data-replace="Symbol">Air Liquide</h1>
                   <b class="price is-6">104.87</b><i data-replace="BidRealtime"></i>
                   <b id="variation" class="is-6 has-text-greEN"><span class= "indice">+20.7</span>&nbsp; <span class="indice">(10.8%)</span>
                   </b>
                </div>
                <div id="bullAndBear"><img src="/images/bulls.png" alt="bulls-and-bears"></div>
                <div id="position">
                   <span class="stockName">Performance</span>
                   <h1 id="WinOrLoss">(10.8%)</h1>
                   <form id="close" action="/" method="post">
                      <button id="Bclose" type="submit" class="button is-small is-outlined is-primary">Close</button>
                   </form>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
