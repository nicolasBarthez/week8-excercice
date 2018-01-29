<template>
  <section v-if="connectedUser.role==='admin'" class="main">
    <h1 class= "title">
      Stock administration : {{stocks.length}} stocks registered.
    </h1>

      <br class="page" ref="top">
      <button type="button" @click="addNewStock()"name="button">Add a stock</button>
      <button type="button" @click="exportToExcel()"name="button">Export</button>
      <br>
      <button class="btn-red" type="button" @click="closeOldWatchitems()"name="button">Close old positions</button>
      <hr>
      <br>
      <button @click="goto('bottom')">Go to bottom</button>
      <table >
        <tr>
          <th>IMAGE</th>
          <th>STOCK NAME</th>
          <th>SHORT NAME</th>
          <th>INDEX</th>

        </tr>
      <tr v-for="(stock, index) in stocks" :key="index" >

            <td><figure class="image is-64x64 is-circle"><img class ="imgProfile" :src="stock.stockImg" alt="Image"></figure></td>

        <td>
          <router-link :to="'/stocks/'+stock.shortName" data-replace="Symbol"><strong>{{stock.longName}}</strong></router-link>
        </td>
        <td>
          {{stock.shortName}}
        </td>
        <td>
          <span class="has-text-green">{{stock.index}}</span>
        </td>
        <td>
          <button type="button" @click="editStock(stock)" name="button">Edit</button>
        </td>
        <td>
          <button type="button" @click="confirmDeleteStock(stock)"name="button">Delete</button>
        </td>
        </tr>

      </table>
      <button class="page" ref="bottom" @click="goto('top')">Go to top</button>


      <div v-if= "stockModal">

      <b-modal :active.sync="isStockEditingActive">
          <div class="mediaModal">
                  <h1 class="modalTitle">
                      Editing {{stockModal.longName}} !
                  </h1>

                    <div class="card profile-card">
                      <div class="card-content column is-6 is-center"id="ActionCard">
                        <div >
                          <div class="media-left">
                                    <figure class="image is-64x64 is-circle"><img class ="imgProfile" :src="stockModal.stockImg" alt="Image"></figure>
                                </div>
                          <div class="media-content">
                            <p class="title is-5">
                              {{stockModal.shortName}}
                            </p>
                          </div>
                          <br>
                          <div >
                            <p >
                              Id : {{stockModal._id}}
                            </p>
                          </div>
                          <div >
                            <p >
                              Created at :{{moment(stockModal.created_at).format('DD-MM-YYYY HH:mm')}}
                            </p>
                          </div>
                            <p >
                              Updated at :{{moment(stockModal.updated_at).format('DD-MM-YYYY HH:mm')}}
                            </p>
                            <br><hr>

                                <span>longName:</span><br>
                              <input class="location" type="text" v-model="stockModal.longName"/>
                                <br><hr>
                                <span>shortName:</span><br>
                                <input class="location" type="text" v-model="stockModal.shortName"/>
                                <br><hr>
                                <span>Index:</span><br>
                                <v-select multiple :closeOnSelect='false' v-model="stockModal.index" :options="options"></v-select>
                                <br><hr>
                                <span>isin:</span><br>
                                  <input class="location" type="text" v-model="stockModal.isin"/>
                                <br><hr>
                                <span>currency:</span><br>
                                  <input class="location" type="text" v-model="stockModal.currency"/>
                                <br><hr>
                                <span>currency2:</span><br>
                                  <input class="location" type="text" v-model="stockModal.currency2"/>
                                <br><hr>
                                <span>symbolPrice:</span><br>
                                  <input class="location" type="text" v-model="stockModal.symbolPrice"/>
                                <br><hr>
                                <span>price:</span><br>
                                  <input class="location" type="text" v-model="stockModal.price"/>
                                <br><hr>
                                <span>price2:</span><br>
                                  <input class="location" type="text" v-model="stockModal.price2"/>
                                <br><hr>
                                <span>volume:</span><br>
                                  <input class="location" type="text" v-model="stockModal.volume"/>
                                <br><hr>
                                <span>scrapKey:</span><br>
                                  <input class="location" type="text" v-model="stockModal.scrapKey"/>
                                <br><hr>
                                <span>description:</span><br>
                                  <textarea class="location" type="text" v-model="stockModal.description"></textarea>
                                <br><hr>
                                <span>descriptionEng:</span><br>
                                  <textarea class="location" type="text" v-model="stockModal.descriptionEng"></textarea>
                                <br><hr>

                              <label><span>Update stock photo:</span><br>
                                <croppa v-model="image"
                                  :prevent-white-space="false"
                                  :reverse-scroll-to-zoom="true"
                                  :show-loading="true"
                                  :loading-size="50"
                                  :accept="'image/*'"
                                  initial-image=""
                                  :width="250"
                                  :height="250"
                                  :quality="1"
                                  :placeholder-font-size="18"
                                  >
                                </croppa>
                              </label>
                              <br><hr>
                              <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveUpdate">Save modifications</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

      </b-modal>
      </div>
    <div v-if= "deleteModale">

      <b-modal :active.sync="isStockDeletingActive">
        <div class="mediaModal">
          <div class="card profile-card">
        <p>T'es sûr de vouloir effacer cette action  ????</p>

        <button type="button" @click="deleteStock(deleteModale)" name="button">YES - ERASE IT!</button>
        <button type="button" @click="noDelete()" name="button">NO ... My mistake</button>
      </div>
      </div>
      </b-modal>
    </div>


    <b-modal :active.sync="isStockCreatingActive">
        <div class="mediaModal">
                <h1 class="modalTitle">
                    Create a new stock !
                </h1>

                  <div class="card profile-card">
                    <div class="card-content column is-6 is-center"id="ActionCard">
                      <div >

                              <span>longName:</span><br>
                            <input class="location" type="text" v-model="stockModal.longName"/>
                              <br><hr>
                              <span>shortName:</span><br>
                              <input class="location" type="text" v-model="stockModal.shortName"/>
                              <br><hr>
                              <span>Index:</span><br>
                              <v-select multiple :closeOnSelect='false' v-model="stockModal.index" :options="options"></v-select>
                              <br><hr>
                              <span>isin:</span><br>
                                <input class="location" type="text" v-model="stockModal.isin"/>
                              <br><hr>
                              <span>currency:</span><br>
                                <input class="location" type="text" v-model="stockModal.currency"/>
                              <br><hr>
                              <span>currency2:</span><br>
                                <input class="location" type="text" v-model="stockModal.currency2"/>
                              <br><hr>
                              <span>symbolPrice:</span><br>
                                <input class="location" type="text" v-model="stockModal.symbolPrice"/>
                              <br><hr>
                              <span>scrapKey:</span><br>
                                <input class="location" type="text" v-model="stockModal.scrapKey"/>
                              <br><hr>
                              <span>description:</span><br>
                                <textarea class="location" type="text" v-model="stockModal.description"></textarea>
                              <br><hr>
                              <span>descriptionEng:</span><br>
                                <textarea class="location" type="text" v-model="stockModal.descriptionEng"></textarea>
                              <br><hr>

                            <label><span>Update stock photo:</span><br>
                              <croppa v-model="image"
                                :prevent-white-space="false"
                                :reverse-scroll-to-zoom="true"
                                :show-loading="true"
                                :loading-size="50"
                                :accept="'image/*'"
                                initial-image=""
                                :width="250"
                                :height="250"
                                :quality="1"
                                :placeholder-font-size="18"
                                >
                              </croppa>
                            </label>
                            <br><hr>
                            <div class ="centerButton"><button id="adWL" class="button is-small is-outlined is-primary" @click="saveCreate()">Save</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

    </b-modal>


</section>

</template>

<script>
import {
  getAllStocks,
  stockUpdate,
  stockDelete,
  stockCreate,
  scoreUpdate
} from "@/api/apiAdmin";
import moment from "moment";
import vSelect from "vue-select";

export default {
  // multi select component
  components: {
    vSelect
  },
  data() {
    return {
      stocks: {},
      isStockEditingActive: false,
      isStockDeletingActive: false,
      isStockCreatingActive: false,
      stockModal: {},
      deleteModale: "",

      // start INDEX LIST
      options: [
        "NASDAQ",
        "INDEX",
        "SELECTED",
        "CRYPTO",
        "CAC40",
        "SBF120",
        "EURONEXT PARIS",
        "AUTRES"
      ],
      //end INDEX LIST
      image: null
    };
  },
  created() {
    getAllStocks().then(stocks => {
      if (stocks === "unauthorized") {
        this.$router.push("/404");
      } else {
        this.stocks = stocks;
      }
    });
  },
  props: {
    connectedUser: Object
  },
  methods: {
    goto(refName) {
      var element = this.$refs[refName];

      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    addNewStock() {
      this.isStockCreatingActive = true;
    },
    closeOldWatchitems() {
      scoreUpdate().then(data => {
        alert("Mise à jour des Watchitems réussie!");
      });
    },
    saveCreate() {
      this.image.imageSet === true ? this.generateImage() : "";
      stockCreate(this.stockModal)
        .then(data => {
          getAllStocks().then(stocks => {
            if (stocks === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.stocks = stocks;
              this.isStockCreatingActive = false;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    editStock(stock) {
      this.stockModal = stock;
      this.isStockEditingActive = true;
      this.url = this.stockModal.stockImg;
    },
    confirmDeleteStock(stock) {
      this.deleteModale = stock;
      this.isStockDeletingActive = true;
    },
    deleteStock(stock) {
      stockDelete(stock._id)
        .then(data => {
          getAllStocks().then(stocks => {
            if (stocks === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.stocks = stocks;
              this.isStockDeletingActive = false;
              alert("success");
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    noDelete() {
      this.isStockDeletingActive = false;
    },
    moment: function(time) {
      return moment(time);
    },
    saveUpdate() {
      const stockId = this.stockModal._id;
      this.image.imageSet === true ? this.generateImage() : "";
      stockUpdate(
        this.stockModal._id,
        this.stockModal.longName,
        this.stockModal.shortName,
        this.stockModal.index,
        this.stockModal.isin,
        this.stockModal.currency,
        this.stockModal.currency2,
        this.stockModal.symbolPrice,
        this.stockModal.price,
        this.stockModal.price2,
        this.stockModal.volume,
        this.stockModal.description,
        this.stockModal.descriptionEng,
        this.stockModal.stockImg,
        this.stockModal.scrapKey
      )
        .then(data => {
          this.isStockEditingActive = false;
          getAllStocks().then(stocks => {
            if (stocks === "unauthorized") {
              this.$router.push("/404");
            } else {
              this.stocks = stocks;
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    generateImage: function() {
      let url = this.image.generateDataUrl("image/jpeg", 0.8);
      if (!url) {
        alert("no image");
        return;
      }
      this.stockModal.stockImg = url;
    }
  }
};
</script>

<style scoped>
tr {
  margin: 25px;
  padding: 10px 30px;
}

.btn-red {
    margin: 30px;
    PADDING-LEFT: 30PX;
    PADDING-RIGHT: 30PX;
    color: #fff!important;
    background-color: #ff6026!important;
    box-shadow: 0 0 0 0.125em #ff6026!important;;
    border-color: #ff6026!important;;
    font-weight: bolder;
    FONT-SIZE: 1.2REM;
}

th {
  margin: 25px 10px 25px 60px;
  padding: 10px;
  background-color: #BDBDBD;
}

.title{
  font-size: 100%;
  font-weight: bold;
  FONT-STYLE: ITALIC
}
.insider{
  display:flex;
  align-items:center;
  justify-content:start;
}
a{
  color:#192b41
}
#no{
    TEXT-ALIGN: CENTER;
    MARGIN-TOP: 5%;
    font-weight: bold;
    color:#192b41
}
.main {
    background-color: #f9f9f9!important;
    padding: 7rem 1.5rem;
}
.container{
  display: flex;
}

.navbar.is-dark {
    background-color: #192b41!important;
    color: #f9f9f9!important;
}

.navbar-item.is-tab.is-active {
    background-color: transparent;
    border-bottom-color: #f9f9f9!important;
    border-bottom-style: solid!important;
    border-bottom-width: 3px!important;
    color: #f9f9f9!important;
    padding-bottom: calc(0.5rem - 3px)!important;
}
.babblesMenu {
    display: flex;
    overflow:auto;
}

.image{
  margin-right: 20px !important;
}

@media (max-width: 768px) {
  .main {
    padding-top:0.5rem  !important;
  }
    .icon {
    height: 1.5em!important;
    width: 1.5em!important;
  }
  .control{
        height: 30px!important;
    }
    .navbar.is-dark{
        margin-bottom:3%!important
    }
}
</style>
