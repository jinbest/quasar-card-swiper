<template>
  <q-page class="flex">
    <p class="title">Notifications</p>
    <div class="container custom-scroll-bar">
      <div v-if="notifiData.length">
        <div v-for="(item, index) in notifiData" :key="index">
          <p>{{ diffDate(item.date) }}</p>
          <div class="notifi-panel">
            <div v-for="(it, idx) in item.followed" :key="`${idx}-followed`">
              <div class="flex-content">
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <p>
                  <span>{{ it.user }}</span> {{ it.text }}
                </p>
              </div>
              <div class="flex-content" style="margin-left: 45px;">
                <q-btn color="primary" label="Follow" no-caps />
                <q-btn color="grey" label="Ignore" no-caps />
              </div>
            </div>
            <div>
              <div class="flex-content">
                <p>
                  {{ item.shoutup.text }}
                </p>
              </div>
              <div class="flex-content" style="margin-left: 15px">
                <q-btn color="primary" label="Invite" no-caps />
              </div>
            </div>
            <div v-for="(it, idx) in item.liked" :key="`${idx}-liked`">
              <div class="flex-content">
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <p>
                  <span>{{ it.user }}</span> {{ it.text }} {{it.about}}
                </p>
              </div>
            </div>
            <div v-for="(it, idx) in item.commented" :key="`${idx}-commented`">
              <div class="flex-content">
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <p>
                  <span>{{ it.user }}</span> {{ it.text }} {{it.about}}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'

export default {
  name: "PageNotification",
  data() {
    return {
      notifiData: this.$store.state.main.notificationData
    };
  },
  methods: {
    diffDate(day) {
      let date1 = new Date(day), date2 = new Date(), unit = "days"
      const diff = date.getDateDiff(date2, date1, unit)
      if (diff === 0) {
        return "Today"
      } else if (diff === 1) {
        return "Yesterday"
      } else {
        return `${diff} days ago`
      }
    }
  }
};
</script>
<style lang="scss">
.q-page {
  width: 100%;
  padding: 20px;
  display: block;
  .title {
    font-size: 24px;
    line-height: 30px;
    font-family: "soleil";
  }
  .container {
    margin: 20px auto;
    height: calc(100vh - 150px);
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .notifi-panel {
    background: #292929;
    border-radius: 20px;
    width: 100%;
    padding: 15px;
    margin-bottom: 20px;
    & > div {
      padding: 15px 0;
      border-top: 1px solid #3a3a3c;
      border-bottom: 1px solid #3a3a3c;
      margin-top: -1px;
      display: block !important;
    }
    .q-avatar {
      height: 30px;
      width: 30px;
    }
    .flex-content {
      display: flex;
      align-items: center;
      p {
        margin: auto 0 auto 15px;
        padding: 0;
        span {
          font-weight: bold;
        }
      }
      .q-btn {
        margin: 10px 10px 0 0;
      }
    }
  }
}
</style>
