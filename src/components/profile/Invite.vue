<template>
  <div>
    <p class="invite-title" v-if="!inviteEmail && !inviteSent">
      Invite to Shoutup
    </p>
    <p class="invite-title" v-if="inviteEmail && !inviteSent">
      Invite using Email
    </p>
    <p class="invite-title" v-if="!inviteEmail && inviteSent">Invite Sent</p>
    <p class="invite-remaing" v-if="!inviteEmail && !inviteSent">
      You have <span>3 invites</span> remaining.
    </p>
    <p class="invite-remaing" v-if="inviteEmail && !inviteSent">
      Enter the <span>email address</span> of the person you wish to invite.
    </p>
    <p class="invite-remaing" v-if="!inviteEmail && inviteSent">
      An invite has been sent to <span>{{ email }}</span> We will notify you
      when this person has joined shoutup.
    </p>
    <div class="invite-card" v-if="!inviteEmail && !inviteSent">
      <div @click="$emit('invite')">
        <div class="avatar-container">
          <img src="../../assets/img/email-open.png" />
        </div>
        <p class="text">Invite using Email</p>
      </div>
      <div>
        <div class="avatar-container">
          <img src="../../assets/img/copy-link.png" />
        </div>
        <p class="text">Copy Invite Link</p>
      </div>
    </div>
    <div class="invite-email-form" v-if="inviteEmail && !inviteSent">
      <div class="custom-input" :class="error ? 'err-input' : ''">
        <input type="email" placeholder="Email address" v-model="email" @input="validateEmail" />
        <q-avatar @click="handleInvite">
          <img v-if="!error" src="../../assets/img/send-email.png" />
          <img v-if="error" src="../../assets/img/err-send.png" />
        </q-avatar>
      </div>
      <span v-if="error">{{ errMsg }}</span>
    </div>
    <div v-if="!inviteEmail && inviteSent" class="back-to-profile">
      <q-btn @click="$emit('backToProfile')">
        <q-icon>
          <img src="../../assets/img/back.png" />
        </q-icon>
        Back to Profile
      </q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Invite",
  props: ["inviteEmail", "inviteSent"],
  data() {
    return {
      email: "",
      error: false,
      errMsg: ""
    };
  },
  methods: {
    handleInvite() {
      if (!this.email || this.error) {
        return;
      }
      console.log("send email invitation", this.email);
      this.$emit("sentInvite");
    },
    validateEmail() {
      const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!this.email || reg.test(this.email.toLowerCase())) {
        this.errMsg = "";
        this.error = false;
        return true;
      } else {
        this.errMsg = "Please enter a valid email address";
        this.error = true;
        return false;
      }
    }
  }
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
  .avatar-container {
    border-radius: 100px;
    border: 1px solid #3a3a3c;
    width: 32px;
    height: 32px;
    margin-left: 15px;
    text-align: center;
    img {
      margin-top: 1px;
      width: 25px;
      height: 25px;
    }
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
.invite-email-form {
  padding: 100px 0 0;
  text-align: center;
  .custom-input {
    width: 100%;
    border-radius: 100px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 0 15px;
    margin-bottom: 30px;
    input {
      width: calc(100% - 30px);
      background: transparent;
      border: none;
      outline: none;
      color: white;
      font-size: 14px;
    }
    .q-avatar {
      width: 28px;
      height: 28px;
    }
  }
  .err-input {
    background: rgba(117, 4, 23, 0.23);
    border: 1px solid #ff2d55;
    input {
      color: white;
    }
  }
  span {
    color: #ff2d55;
  }
}
.back-to-profile {
  text-align: center;
  padding: 50px 0 0;
}
</style>
