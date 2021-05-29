<template>
  <div>
    <p class="setting-title">Your Settings</p>
    <div class="setting-card">
      <div>
        <p class="text">Change Display Picture</p>
      </div>
      <div>
        <p class="text">Enable Push Notification</p>
        <custom-switcher style="margin-right: 15px"></custom-switcher>
      </div>
      <div>
        <p class="text">Blocked Accounts</p>
      </div>
      <div>
        <p class="text">Change account password</p>
      </div>
    </div>
    <div class="setting-card">
      <div>
        <p class="text">View Terms of Service</p>
      </div>
      <div>
        <p class="text">View Privacy Policy</p>
      </div>
      <div>
        <p class="text">Send us Feedback</p>
      </div>
      <div>
        <p class="text">Logout</p>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSwitcher from "../CustomSwitcher"
export default {
  name: "Setting",
  components: {
    "custom-switcher": CustomSwitcher
  }
};
</script>

<style lang="scss">
.setting-title {
  font-size: 40px;
  line-height: 51px;
  font-family: "soleil";
  color: #ffffff;
  margin: 0;
  padding: 20px 0;
}
.setting-card {
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
    justify-content: space-between;
  }
  .q-avatar {
    height: 30px;
    width: 30px;
  }
  .text {
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
</style>
