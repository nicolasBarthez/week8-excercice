<template >
<section v-else class="section main">
  <my-profile-block :preferedStocks="preferedStocks" :profileInfo="profileInfo"></my-profile-block>
</section>
</template>

<script>
import MyProfileBlock from "../components/MyProfileBlock";
import { getUserProfileInfo, getUserPreferedStock } from "@/api/apiDashboard";
export default {
  data() {
    return {
      profileInfo: null,
      preferedStocks: null
    };
  },
  components: {
    MyProfileBlock
  },
  methods: {},
  created() {
    getUserProfileInfo().then(profileInfo => {
      this.profileInfo = profileInfo;
    });
    getUserPreferedStock().then(preferedStocks => {
      this.preferedStocks = preferedStocks;
    });
  }
};
</script>

<style scoped>
.section.main {
  background-color: #f9f9f9;
  padding: 7rem 1.5rem;
}

.container {
  display: flex;
}
</style>
