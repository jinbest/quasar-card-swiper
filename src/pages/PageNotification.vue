<template>
  <q-page class="flex">
    <p class="title">Notifications</p>
    <div class="container custom-scroll-bar">
      <div v-if="notifiData.length">
        <div v-for="(item, index) in notifiData" :key="index">
          <p>{{ diffDate(item.date) }}</p>
          <div class="notifi-panel">
            <div
              v-for="(it, idx) in item.followed"
              :key="`${idx}-followed`"
              :style="borderStyle(idx)"
            >
              <div class="flex-content">
                <div v-if="it.indicator" class="blue-indicator">
                  <div />
                </div>
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <div>
                  <p>
                    <span>{{ it.user }}</span> {{ it.text }}
                  </p>
                  <p style="color:#8E8E93;font-size:12px;">2m</p>
                </div>
              </div>
              <div class="flex-content" style="margin-left: 45px;">
                <q-btn
                  color="primary"
                  label="Follow"
                  no-caps
                  class="follow-btn"
                />
                <q-btn color="grey" label="Ignore" no-caps class="ignore-btn" />
              </div>
            </div>
            <div>
              <div class="flex-content">
                <div v-if="item.shoutup.indicator" class="blue-indicator">
                  <div />
                </div>
                <div>
                  <p>
                    {{ item.shoutup.text }}
                  </p>
                  <p style="color:#8E8E93;font-size:12px;">2m</p>
                </div>
              </div>
              <div class="flex-content" style="margin-left: 15px">
                <q-btn
                  color="primary"
                  label="Invite"
                  no-caps
                  class="invite-btn"
                />
              </div>
            </div>
            <div v-for="(it, idx) in item.liked" :key="`${idx}-liked`">
              <div class="flex-content">
                <div v-if="it.indicator" class="blue-indicator">
                  <div />
                </div>
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <div>
                  <p>
                    <span>{{ it.user }}</span> {{ it.text }} {{ it.about }}
                  </p>
                  <p style="color:#8E8E93;font-size:12px;">2m</p>
                </div>
              </div>
            </div>
            <div v-for="(it, idx) in item.commented" :key="`${idx}-commented`">
              <div class="flex-content">
                <div v-if="it.indicator" class="blue-indicator">
                  <div />
                </div>
                <q-avatar>
                  <img :src="it.userAvatar" />
                </q-avatar>
                <div>
                  <p>
                    <span>{{ it.user }}</span> {{ it.text }} {{ it.about }}
                  </p>
                  <p style="color:#8E8E93;font-size:12px;">2m</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PageNotification",
  data() {
    return {
      notifiData: this.$store.state.main.notificationData
    };
  },
  methods: {
    diffDate(day) {
      let date1 = new Date(day),
        date2 = new Date(),
        unit = "days";
      const diff = date.getDateDiff(date2, date1, unit);
      if (diff === 0) {
        return "Today";
      } else if (diff === 1) {
        return "Yesterday";
      } else {
        return `${diff} days ago`;
      }
    },
    borderStyle(index) {
      if (index === 0) {
        return "border-top: none";
      } else {
        return "";
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
    height: calc(100vh - 130px);
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
    .blue-indicator {
      margin-right: 10px;
      div {
        width: 6px;
        height: 6px;
        background: #0a84ff;
        border-radius: 100px;
      }
    }
    .follow-btn {
      width: 113px;
      height: 40px;
      background: #0a84ff !important;
      border-radius: 7px;
      span {
        font-size: 16px;
      }
    }
    .ignore-btn {
      width: 98px;
      height: 40px;
      background: #636366 !important;
      border-radius: 7px;
      span {
        font-size: 16px;
      }
    }
    .invite-btn {
      width: 107px;
      height: 40px;
      background: #0a84ff !important;
      border-radius: 7px;
      span {
        font-size: 16px;
      }
    }
  }
}
</style>
