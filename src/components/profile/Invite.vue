<template>
  <div>
    <p class="invite-title">Invite to Shoutup</p>
    <p class="invite-remaing">You have <span>3 invites</span> remaining.</p>
    <div class="invite-card">
      <div>
        <q-avatar>
          <img src="../../assets/img/email-open.png" />
        </q-avatar>
        <p class="text">Invite using Email</p>
      </div>
      <div>
        <p class="text">Copy Invite Link</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invite"
};
</script>

<style lang="scss">
.invite-title {
  font-size: 40px;
  line-height: 51px;
  font-family: "soleil";
  color: #ffffff;
  margin: 0;
  padding: 30px 0;
}
.invite-remaing {
  font-family: "soleil";
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  padding: 0 0 30px;
  margin: 0;
  span {
    font-weight: bold;
  }
}
.invite-card {
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
