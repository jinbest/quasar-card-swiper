<template>
  <q-page class="flex">
    <div class="search-header">
      <div>
        <q-icon name="search" />
        <input
          v-model="text"
          placeholder="Search for an interest ..."
          @input="handleSearch($event)"
        />
      </div>
      <!-- <q-btn label="Cancel" @click="handleCancel" /> -->
      <p class="cancel-btn" @click="handleCancel">Cancel</p>
    </div>

    <div class="container custom-scroll-bar">
      <p v-if="recentFilterData.length">Recent Searches:</p>
      <div v-if="recentFilterData.length" class="data-panel">
        <div
          v-for="(item, index) in recentFilterData.slice(0, 3)"
          :key="index"
          @click="openCardDetails(index, recentFilterData)"
          :style="borderStyle(index)"
        >
          <q-avatar>
            <img :src="item.control.avatar" />
          </q-avatar>
          <p class="header-title">{{ item.control.title.discover }}</p>
        </div>
      </div>

      <div v-if="filteredData.length" class="data-panel">
        <div
          v-for="(item, index) in filteredData"
          :key="index"
          @click="openCardDetails(index, filteredData)"
          :style="borderStyle(index)"
        >
          <q-avatar>
            <img :src="item.control.avatar" />
          </q-avatar>
          <p class="header-title">{{ item.control.title.discover }}</p>
        </div>
      </div>
    </div>

    <q-dialog v-model="cardsData.length && showCardDialog">
      <card-details
        @close="closeCardDetails"
        :data="showCardData"
        :theme="makeTheme(showCardData.themeIndex)"
        :dataIndex="cardDetailsIndex"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import CardDetails from "../components/card/CardDetails";
import _ from "lodash";

export default {
  name: "PageSearch",
  props: ["cardsData", "cardThemes"],
  data() {
    return {
      text: "",
      showCardDialog: false,
      cardDetailsIndex: 0,
      themeIndex: 0,
      showCardData: this.cardsData.length ? _.cloneDeep(this.cardsData[0]) : {},
      filteredData: this.cardsData,
      recentFilterData: this.$store.state.main.recentSearchCards
    };
  },
  methods: {
    openCardDetails(index, data) {
      this.cardDetailsIndex = index;
      this.themeIndex = data.length ? data[index].themeIndex : 0;
      this.showCardData = data.length ? _.cloneDeep(data[index]) : {};
      this.showCardDialog = true;
    },
    closeCardDetails() {
      this.recentFilterData.unshift(this.showCardData);
      this.$store.dispatch("main/setRecentSearchData", this.recentFilterData);
      this.themeIndex = 0;
      this.showCardDialog = false;
    },
    makeTheme(index) {
      const colLen = this.cardThemes[index].colors.length;
      let linearParam = this.cardThemes[index].deg + ", ";
      for (let i = 0; i < colLen - 1; i++) {
        linearParam += `${this.cardThemes[index].colors[i].hex} ${this.cardThemes[index].colors[i].percent}, `;
      }
      linearParam += `${this.cardThemes[index].colors[colLen - 1].hex} ${
        this.cardThemes[index].colors[colLen - 1].percent
      }`;
      return `background: linear-gradient(${linearParam});`;
    },
    handleSearch(event) {
      const filterData = _.filter(this.cardsData, o =>
        o.control.title.discover
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      this.filteredData = filterData;
    },
    handleCancel() {
      this.text = "";
      this.filteredData = this.cardsData;
    },
    borderStyle(index) {
      if (index === 0) {
        return "border-top: none";
      } else {
        return "";
      }
    }
  },
  components: {
    "card-details": CardDetails
  }
};
</script>
<style lang="scss">
.q-page {
  width: 100%;
  padding: 20px;
  display: block;
  .container {
    margin: 20px auto;
    height: calc(100vh - 160px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .search-header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
    align-items: center;
    input {
      border: none;
      background: transparent;
      outline: none;
      color: white;
    }
    & > div {
      display: flex;
      align-content: center;
      box-sizing: border-box;
      margin: auto 10px auto 0;
      padding: 5px 10px;
      border-radius: 100px;
      border: 1px solid rgb(100, 100, 100);
      width: calc(100% - 80px);
      .q-icon {
        width: 32px;
        height: 32px;
      }
    }
    .cancel-btn {
      width: 60px;
      height: 20px;
      font-family: "soleil";
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      display: flex;
      align-items: center;
      text-align: right;
      color: #FFFFFF;
      padding: 0;
      margin: 0;
    }
  }
  .data-panel {
    background: #292929;
    border-radius: 20px;
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    & > div {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-top: 1px solid #3a3a3c;
      margin-top: -1px;
    }
    .q-avatar {
      height: 30px;
      width: 30px;
    }
    .header-title {
      color: white;
      font-size: 16px;
      line-height: 20px;
      font-weight: normal;
      font-family: "soleil";
      text-align: left;
      margin: auto 0 auto 15px;
      padding: 0;
    }
  }
  .q-dialog {
    .q-card {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0px;
      background: rgba(30, 30, 30, 0.75);
      border-radius: 14px 14px 0 0;
      height: fit-content;
      & > div {
        color: white;
        text-align: center;
        font-size: 17px;
        width: 100%;
        height: 50px;
        margin: 0;
        padding: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        & > p {
          margin: 0 auto;
        }
        .col-blue {
          color: #0a84ff;
        }
      }
    }
  }
}
</style>
