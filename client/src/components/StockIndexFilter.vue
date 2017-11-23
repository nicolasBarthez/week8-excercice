<template>
    <b-dropdown v-model="usstock">
        <button class="button is-primary" type="button" slot="trigger">
            <template v-if="nyse">
                <b-icon icon="public"></b-icon>
                <span>NYSE</span>
            </template>
            <template v-if="dowjones">
                <b-icon icon="people"></b-icon>
                <span>Dow Jones</span>
            </template>
            <template v-if="nasdaq">
                <b-icon icon="people"></b-icon>
                <span>Nasdaq</span>
            </template>
            <b-icon icon="arrow_drop_down"></b-icon>
        </button>

        <b-dropdown-item :value="true">
            <div class="media">
                <b-icon class="media-left" icon="public"></b-icon>
                <div class="media-content">
                    <h3>NYSE</h3>
                    <small>All value of all index</small>
                </div>
            </div>
        </b-dropdown-item>

        <b-dropdown-item :value="false">
            <div class="media">
                <b-icon class="media-left" icon="people" ></b-icon>
                <div class="media-content">
                    <h3>cac40</h3>
                    <small>represents a capitalization-weighted measure of the 40 most significant values among the 100 highest market caps on the Euronext Paris</small>
                </div>
            </div>
        </b-dropdown-item>

        <b-dropdown-item :value="false">
            <div class="media">
                <b-icon class="media-left" icon="people"></b-icon>
                <div class="media-content">
                    <h3>nasdaq</h3>
                    <small>reflects companies across major industry groups including computer hardware and software, telecommunications, retail/wholesale trade and biotechnology</small>
                </div>
            </div>
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
export default {
  data() {
    return {
      nyse: true,
      dowjones: false,
      nasdaq: false
    };
  }
};
</script>
