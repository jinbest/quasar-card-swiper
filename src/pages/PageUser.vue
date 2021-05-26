<template>
  <q-page class="flex">
    <div class="user-header">
      <div></div>
      <div class="setting">
        <div>
          <img src="../assets/img/mail.png" />
        </div>
        <div>
          <img src="../assets/img/setting.png" />
        </div>
      </div>
    </div>
    <div class="profile">
      <q-avatar>
        <img :src="userData.avatar" />
      </q-avatar>
      <p class="username">{{ userData.username }}</p>
      <div class="profile-data">
        <div v-for="(item, index) in userData.data" :key="index">
          <p class="total">{{ item.total }}</p>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageUser",
  data() {
    return {
      userData: this.$store.state.main.userData
    };
  }
};
</script>
<style lang="scss">
.q-page {
  width: 100%;
  padding: 20px;
  display: block;
  .user-header {
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .setting {
      display: flex;
      & > div {
        width: 20px;
        height: 20px;
        margin-left: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    .q-avatar {
      width: 80px;
      height: 80px;
    }
    .username {
      padding: 10px 0;
      font-size: 16px;
      font-family: "soleil";
      margin: 0;
    }
    .profile-data {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        .total {
          font-size: 18px;
          padding: 5px 0 0;
          margin: 0;
          color: white;
        }
        .name {
          font-size: 12px;
          color: #8e8e93;
          padding: 5px 0;
          margin: 0;
        }
      }
    }
  }
}
</style>
