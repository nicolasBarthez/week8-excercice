/*
* SORTING BY LONGNAME
*/

exports.sortTrendingByNameDes = function(a, b) {
  if (a.longName < b.longName) return -1;
  if (a.longName > b.longName) return 1;
  return 0;
};

exports.sortTrendingByNameAsc = function(a, b) {
  if (a.longName < b.longName) return 1;
  if (a.longName > b.longName) return -1;
  return 0;
};

/*
* SORTING BY PRICE
*/

exports.sortTrendingByPriceDes = function(a, b) {
  if (a.currentPrice < b.currentPrice) return 1;
  if (a.currentPrice > b.currentPrice) return -1;
  return 0;
};

exports.sortTrendingByPriceAsc = function(a, b) {
  if (a.currentPrice < b.currentPrice) return -1;
  if (a.currentPrice > b.currentPrice) return 1;
  return 0;
};

/*
* SORTING BY variation
*/

exports.sortTrendingByvariationDes = function(a, b) {
  if (a.variation < b.variation) return 1;
  if (a.variation > b.variation) return -1;
  return 0;
};

exports.sortTrendingByvariationAsc = function(a, b) {
  if (a.variation < b.variation) return -1;
  if (a.variation > b.variation) return 1;
  return 0;
};

/*
* SORTING BY VOLUME
*/

exports.sortTrendingByVolumeDes = function(a, b) {
  if (a.volume < b.volume) return 1;
  if (a.volume > b.volume) return -1;
  return 0;
};

exports.sortTrendingByVolumeAsc = function(a, b) {
  if (a.volume < b.volume) return -1;
  if (a.volume > b.volume) return 1;
  return 0;
};

/*
* SORTING BY TRENDING
*/

exports.sortTrendingByTrendingDes = function(a, b) {
  if (a.trending.percentage < b.trending.percentage) return 1;
  if (a.trending.percentage > b.trending.percentage) return -1;
  return 0;
};

exports.sortTrendingByTrendingAsc = function(a, b) {
  if (a.trending.percentage < b.trending.percentage) return -1;
  if (a.trending.percentage > b.trending.percentage) return 1;
  return 0;
};

/*
* SORTING BY HOT INSIGHTS
*/

exports.sortTrendingByHotInsightsDes = function(a, b) {
  if (a.hotInsights < b.hotInsights) return 1;
  if (a.hotInsights > b.hotInsights) return -1;
  return 0;
};

exports.sortTrendingByHotInsightsAsc = function(a, b) {
  if (a.hotInsights < b.hotInsights) return -1;
  if (a.hotInsights > b.hotInsights) return 1;
  return 0;
};

/*
* SORTING BY BEST INSIDERS
*/

exports.sortTrendingByBestInsiderDes = function(a, b) {
  if (a.bestInsiders[0] && b.bestInsiders[0]) {
    if (a.bestInsiders[0].perf < b.bestInsiders[0].perf) return 1;
    if (a.bestInsiders[0].perf > b.bestInsiders[0].perf) return -1;
    return 0;
  }
  return a.bestInsiders[0] ? -1 : 1;
};

exports.sortTrendingByBestInsiderAsc = function(a, b) {
  if (a.bestInsiders[0] && b.bestInsiders[0]) {
    if (a.bestInsiders[0].perf < b.bestInsiders[0].perf) return -1;
    if (a.bestInsiders[0].perf > b.bestInsiders[0].perf) return 1;
    return 0;
  }
  return a.bestInsiders[0] ? 1 : -1;
};
