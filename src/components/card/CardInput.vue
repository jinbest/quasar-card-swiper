<template>
  <div class="card-input">
    <q-card-section class="card-input-header">
      <div>
        <div class="img-btn">
          <img src="../../assets/img/align-center.png" />
        </div>
        <div class="img-btn">
          <img src="../../assets/img/round-ball.png" />
        </div>
        <div class="img-btn upload-container">
          <img src="../../assets/img/upload-img.png" />
          <input
            type="file"
            multiple
            @input="handleFileInput"
            class="upload-input"
          />
        </div>
      </div>
      <div>
        <div class="done-btn" @click="SaveInputValue">
          Done
        </div>
        <!-- <div @click="$emit('close')">
          <img src="../../assets/img/close.png" />
        </div> -->
      </div>
    </q-card-section>

    <div class="container custom-scroll-bar">
      <div class="card-input-details">
        <div v-for="(item, index) in details" :key="index">
          <p style="color: white;text-align:center;">{{ item.content }}</p>
          <img :src="item.img" style="width: 100%;" />
        </div>
      </div>

      <div class="text">
        <textarea v-model="text" placeholder="Tap to start typing..." />
      </div>
    </div>

    <q-card-section class="card-input-footer">
      <div class="color-patterns">
        <img src="../../assets/img/color-pattern.png" />
      </div>
      <div class="text-selector">
        <img src="../../assets/img/Aa.png" />
      </div>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: "CardInput",
  data() {
    return {
      text: "",
      details: []
    };
  },
  methods: {
    SaveInputValue() {
      if (!this.details.length && !this.text) {
        return;
      }
      if (this.text) {
        this.details.push({
          content: this.text,
          img: ""
        });
      }
      this.$emit("saveInputValue", this.details);
      this.$emit("close");
    },
    handleFileInput(e) {
      if (e.target.files && e.target.files[0]) {
        this.handleAddDetails(URL.createObjectURL(e.target.files[0]));
      }
    },
    handleAddDetails(img_src) {
      this.details.push({
        content: this.text,
        img: img_src
      });
      this.text = "";
    }
  }
};
</script>

<style lang="scss">
.card-input {
  max-width: 600px !important;
  position: fixed;
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    192.04deg,
    #0fb8ff 0%,
    #df47fd 44.87%,
    #ffb72b 100%
  );
  border-radius: 23px !important;
  -webkit-backdrop-filter: blur(32px);
  backdrop-filter: blur(32px);
  max-height: 100vh !important;
  top: 0;
  padding: 15px;
  .container {
    height: calc(100vh - 150px);
    margin-top: 20px;
    outline: none;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
  }
  .done-btn {
    font-family: "soleil";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    text-align: right;
    color: #FFFFFF;
    margin-right: 5px;
  }
  .text {
    font-size: 18px;
    line-height: 26px;
    font-family: "soleil";
    font-weight: 400;
    border: none !important;
    textarea {
      margin: 0;
      padding: 5px 10px;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: transparent;
      color: white;
      text-align: center;
      font-family: "soleil";
      font-style: normal;
      font-weight: bold;
      font-size: 20px;
      line-height: 26px;
      &::-webkit-input-placeholder {
        color: rgba(255, 255, 255, 0.65);
        font-size: 23px;
      }
    }
  }
}
.card-input-header {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100% !important;
  padding: 0 !important;
  margin-top: 10px;
  & > div {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 0 auto 0;
    color: white;
    font-size: 17px;
    .q-avatar {
      width: 32px;
      height: 32px;
    }
    p {
      margin: auto 5px;
      padding: 0;
    }
  }
  .img-btn {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 0.23);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    border-radius: 100px;
    margin-right: 10px;
  }
  .upload-container {
    position: relative;
    outline: none;
    input {
      opacity: 0;
    }
    .upload-input {
      position: absolute;
      outline: none;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
    }
  }
  .card-input-details {
    & > div {
      margin-bottom: 20px !important;
    }
  }
}
.card-input-footer {
  display: flex;
  position: absolute;
  bottom: 20px;
  left: 0;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .color-patterns {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.23);
    border: 1px solid rgba(255, 255, 255, 0.13);
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    border-radius: 100px;
    width: 40px;
    height: 40px;
    img {
      width: 36px;
      height: 36px;
    }
  }
  .text-selector {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.92);
    border: 0.5px solid rgba(0, 0, 0, 0.17);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.13);
    box-sizing: border-box;
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    border-radius: 100px;
    width: 40px;
    height: 40px;
    img {
      width: 24px;
      height: 16px;
    }
  }
}
</style>
