<template>
  <div class="card-type-select">
    <div class="search-header">
      <div>
        <q-icon name="search" color="white" />
        <input
          v-model="text"
          placeholder="Search for an interest ..."
          @input="handleSearch($event)"
        />
      </div>
      <q-btn label="Cancel" @click="handleCancel" text-color="white" />
    </div>

    <div class="container custom-scroll-bar">
      <p v-if="recentFilterData.length">Recent Selected:</p>
      <div v-if="recentFilterData.length" class="data-panel">
        <div
          v-for="(item, index) in recentFilterData.slice(0, 3)"
          :key="index"
          @click="selectCardType(index, recentFilterData)"
        >
          <q-avatar>
            <img :src="item.avatar" />
          </q-avatar>
          <p class="header-title">{{ item.text }}</p>
        </div>
      </div>

      <div v-if="filteredData.length" class="data-panel">
        <div
          v-for="(item, index) in filteredData"
          :key="index"
          @click="selectCardType(index, filteredData)"
        >
          <q-avatar>
            <img :src="item.avatar" />
          </q-avatar>
          <p class="header-title">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"

export default {
  name: "CardTypeSelect",
  props: ["title"],
  data() {
    return {
      text: "",
      dense: false,
      filteredData: _.cloneDeep(this.$store.state.main.cardType),
      recentFilterData: _.cloneDeep(this.$store.state.main.recentSelectType)
    };
  },
  methods: {
    handleSearch(event) {
      const allCardType = _.cloneDeep(this.$store.state.main.cardType);
      const filterData = _.filter(allCardType, o =>
        o.text.toLowerCase().includes(event.target.value.toLowerCase())
      );
      this.filteredData = filterData;
    },
    handleCancel() {
      this.$emit("close")
    },
    selectCardType(index, data) {
      const recentSelectedType = _.cloneDeep(this.$store.state.main.recentSelectType);
      recentSelectedType.unshift(data[index])
      this.$store.dispatch("main/setRecentSelectType", recentSelectedType);
      this.$emit("title", data[index].text)
      this.$emit("close")
    }
  }
};
</script>

<style lang="scss">
.card-type-select {
  max-width: 600px !important;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: #1c1c1e;
  backdrop-filter: blur(32px);
  max-height: 100vh !important;
  top: 0;
  padding: 15px;
  .container {
    margin: 20px auto;
    height: calc(100vh - 160px);
    overflow-y: scroll;
    overflow-x: hidden;
    color: white;
  }
  .search-header {
    display: flex;
    align-content: center;
    justify-content: space-between;
    width: 100%;
    height: 40px;
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
      width: calc(100% - 100px);
      .q-icon {
        width: 32px;
        height: 32px;
      }
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
      border-bottom: 1px solid #3a3a3c;
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