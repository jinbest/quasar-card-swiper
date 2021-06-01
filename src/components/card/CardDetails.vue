<template>
  <div class="details-container">
    <div class="scrollable-content custom-scroll-bar">
      <q-card class="q-card-details" :style="theme">
        <q-card-section class="card-header-username">
          <div>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <p>@username</p>
            <p style="color:rgba(255, 255, 255, 0.45);">2m</p>
          </div>
          <div>
            <div style="margin-right: 15px">
              <img src="../../assets/img/three-dots.png" />
            </div>
            <div @click="$emit('close')">
              <div class="close-icon">
                <img src="../../assets/svg/icon-close.svg" />
              </div>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="card-details-header">
          <q-avatar>
            <img :src="mainData.control.avatar" />
          </q-avatar>
          <p class="header-title">{{ mainData.control.title.shout }}</p>
        </q-card-section>
        <q-card-section class="text custom-scroll-bar">
          <div v-for="(item, index) in mainData.details" :key="index">
            <p>{{ item.content }}</p>
            <img
              v-if="item.img"
              :src="item.img"
              :alt="`${index}-shout-media`"
            />
          </div>
        </q-card-section>
        <q-card-section class="card-details-footer">
          <div>
            <div class="item">
              <img src="../../assets/img/heart.png" />
              <p>{{ mainData.other.heart }}</p>
            </div>
            <div class="item">
              <img src="../../assets/img/message.png" />
              <p>{{ mainData.other.msg }}</p>
            </div>
          </div>
          <div>
            <div class="item">
              <img src="../../assets/img/share.png" />
              <p>Share</p>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div class="comment-data">
        <div class="discussion">
          <p style="color: #8E8E93">Discussion</p>
          <p class="most-relevant">
            Most Relevant
            <span>
              <q-avatar>
                <img src="../../assets/img/most-relevant.svg" />
              </q-avatar>
            </span>
          </p>
        </div>
        <div class="comment-list">
          <div v-for="(item, index) in mainData.discussion" :key="index">
            <div class="each-comment">
              <q-avatar>
                <img :src="item.avatar" />
              </q-avatar>
              <div class="each-data">
                <p class="p-username">{{ item.username }}</p>
                <div class="discussion" style="align-items: inherit;">
                  <p class="p-comment">{{ item.comment }}</p>
                  <div
                    class="outline-heart"
                    :style="reacted(item.react)"
                    @click="toggleReact(index)"
                  >
                    <img :src="reactImgSrc(item.react)" />
                  </div>
                </div>
                <div class="p-reply">
                  <p>{{ item.date }}</p>
                  <p v-if="item.likes">{{ `${item.likes} Likes` }}</p>
                  <p style="color: white" @click="handleReply(index)">Reply</p>
                </div>
                <div
                  v-for="(itreply, idxreply) in item.reply"
                  class="each-comment"
                  :key="idxreply"
                >
                  <q-avatar style="width:24px; height: 24px;">
                    <img :src="itreply.avatar" />
                  </q-avatar>
                  <div class="each-data">
                    <p class="p-username">{{ itreply.username }}</p>
                    <div class="discussion" style="align-items: inherit;">
                      <p
                        class="p-comment"
                        :style="setBackground(itreply.reply)"
                      >
                        {{ itreply.comment }}
                      </p>
                      <div
                        class="outline-heart"
                        :style="reacted(itreply.react)"
                        @click="toggleReact(index, idxreply)"
                      >
                        <img :src="reactImgSrc(itreply.react)" />
                      </div>
                    </div>
                    <div class="p-reply">
                      <p>{{ itreply.date }}</p>
                      <p v-if="itreply.likes">{{ `${itreply.likes} Likes` }}</p>
                      <p
                        style="color: white"
                        @click="handleReply(index, idxreply)"
                      >
                        Reply
                      </p>
                    </div>
                    <div
                      v-for="(itrereply, idxrereply) in itreply.reply"
                      :key="idxrereply"
                      class="each-comment"
                    >
                      <q-avatar style="width:24px; height: 24px;">
                        <img :src="itrereply.avatar" />
                      </q-avatar>
                      <div class="each-data">
                        <p class="p-username">{{ itrereply.username }}</p>
                        <div class="discussion" style="align-items: inherit;">
                          <p
                            class="p-comment"
                            :style="setBackground(itrereply.reply)"
                          >
                            {{ itrereply.comment }}
                          </p>
                          <div
                            class="outline-heart"
                            :style="reacted(itrereply.react)"
                            @click="toggleReact(index, idxreply, idxrereply)"
                          >
                            <img :src="reactImgSrc(itrereply.react)" />
                          </div>
                        </div>
                        <div class="p-reply">
                          <p>{{ itrereply.date }}</p>
                          <p v-if="itrereply.likes">
                            {{ `${itrereply.likes} Likes` }}
                          </p>
                          <p
                            style="color: white"
                            @click="handleReply(index, idxreply, idxrereply)"
                          >
                            Reply
                          </p>
                        </div>
                        <div
                          v-for="(itrerereply, idxrerereply) in itrereply.reply"
                          :key="idxrerereply"
                          class="each-comment"
                        >
                          <q-avatar style="width:24px; height: 24px;">
                            <img :src="itrerereply.avatar" />
                          </q-avatar>
                          <div class="each-data">
                            <p class="p-username">{{ itrerereply.username }}</p>
                            <div
                              class="discussion"
                              style="align-items: inherit;"
                            >
                              <p class="p-comment" style="background: #0A84FF;">
                                {{ itrerereply.comment }}
                              </p>
                              <div
                                class="outline-heart"
                                :style="reacted(itrerereply.react)"
                                @click="
                                  toggleReact(
                                    index,
                                    idxreply,
                                    idxrereply,
                                    idxrerereply
                                  )
                                "
                              >
                                <img :src="reactImgSrc(itrerereply.react)" />
                              </div>
                            </div>
                            <div class="p-reply">
                              <p>{{ itrerereply.date }}</p>
                              <p v-if="itrerereply.likes">
                                {{ `${itrerereply.likes} Likes` }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="index === 0" class="replies-liner">
                  <div />
                  <span>View 4 Replies</span>
                  <div />
                </div>
              </div>
            </div>            
          </div>
        </div>
      </div>
    </div>
    <div class="comment-container">
      <div class="upload">
        <q-avatar>
          <img src="../../assets/img/upload.png" />
        </q-avatar>
      </div>
      <div class="comment-input">
        <input placeholder="Add a comment..." v-model="comment" />
        <q-avatar @click="addComment">
          <img src="../../assets/img/submit.png" />
        </q-avatar>
      </div>
    </div>

    <q-dialog v-model="prompt" persistent>
      <div class="reply-dialog">
        <q-input
          dense
          v-model="reply"
          autofocus
          @keyup.enter="prompt = false"
          color="white"
        />
        <div align="right" class="text-white">
          <q-btn flat label="Cancel" v-close-popup no-caps />
          <q-btn flat label="Reply" @click="handleSubmitReply" no-caps />
        </div>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import { date } from "quasar";

export default {
  name: "CardDetails",
  props: ["data", "theme", "dataIndex"],
  data() {
    return {
      mainData: _.cloneDeep(this.data),
      prompt: false,
      reply: "",
      idx: "undefined",
      idxreply: "undefined",
      idxrereply: "undefined",
      comment: ""
    };
  },
  methods: {
    setBackground(data) {
      if (data.length) {
        return "";
      } else {
        return "background: #0A84FF;";
      }
    },
    reacted(react) {
      if (react) {
        return "background: #FF2D55";
      } else {
        return "";
      }
    },
    reactImgSrc(react) {
      const images = require.context("../../assets/img", false, /\.png$/);
      if (react) {
        return images("./heart.png");
      } else {
        return images("./outline-heart.png");
      }
    },
    toggleReact(idx, idxreply, idxrereply, idxrerereply) {
      const cntCardsData = _.cloneDeep(this.$store.state.main.cardsData);
      if (typeof idxrerereply !== "undefined") {
        this.mainData.discussion[idx].reply[idxreply].reply[idxrereply].reply[
          idxrerereply
        ].react = !this.mainData.discussion[idx].reply[idxreply].reply[
          idxrereply
        ].reply[idxrerereply].react;

        this.mainData.discussion[idx].reply[idxreply].reply[idxrereply].reply[
          idxrerereply
        ].react
          ? (this.mainData.discussion[idx].reply[idxreply].reply[
              idxrereply
            ].reply[idxrerereply].likes += 1)
          : (this.mainData.discussion[idx].reply[idxreply].reply[
              idxrereply
            ].reply[idxrerereply].likes -= 1);
      } else if (typeof idxrereply !== "undefined") {
        this.mainData.discussion[idx].reply[idxreply].reply[
          idxrereply
        ].react = !this.mainData.discussion[idx].reply[idxreply].reply[
          idxrereply
        ].react;

        this.mainData.discussion[idx].reply[idxreply].reply[idxrereply].react
          ? (this.mainData.discussion[idx].reply[idxreply].reply[
              idxrereply
            ].likes += 1)
          : (this.mainData.discussion[idx].reply[idxreply].reply[
              idxrereply
            ].likes -= 1);
      } else if (typeof idxreply !== "undefined") {
        this.mainData.discussion[idx].reply[idxreply].react = !this.mainData
          .discussion[idx].reply[idxreply].react;

        this.mainData.discussion[idx].reply[idxreply].react
          ? (this.mainData.discussion[idx].reply[idxreply].likes += 1)
          : (this.mainData.discussion[idx].reply[idxreply].likes -= 1);
      } else {
        this.mainData.discussion[idx].react = !this.mainData.discussion[idx]
          .react;

        this.mainData.discussion[idx].react
          ? (this.mainData.discussion[idx].likes += 1)
          : (this.mainData.discussion[idx].likes -= 1);
      }

      cntCardsData[this.dataIndex] = this.mainData;
      this.$store.dispatch("main/setCardsDataAction", cntCardsData);
    },
    handleReply(idx, idxreply, idxrereply) {
      this.idx = idx;
      this.idxreply = idxreply;
      this.idxrereply = idxrereply;
      this.prompt = true;
    },
    handleSubmitReply() {
      const cntCardsData = _.cloneDeep(this.$store.state.main.cardsData);
      const now = Date.now();
      const newReply = {
        username: "@username",
        avatar: "https://cdn.quasar.dev/img/avatar.png",
        comment: this.reply,
        date: date.formatDate(now, "YYYY-MM-DD"),
        likes: 0,
        react: false,
        reply: []
      };

      if (typeof this.idxrereply !== "undefined") {
        this.mainData.discussion[this.idx].reply[this.idxreply].reply[
          this.idxrereply
        ].reply.push(newReply);
      } else if (typeof this.idxreply !== "undefined") {
        this.mainData.discussion[this.idx].reply[this.idxreply].reply.push(
          newReply
        );
      } else {
        this.mainData.discussion[this.idx].reply.push(newReply);
      }

      cntCardsData[this.dataIndex] = this.mainData;
      this.$store.dispatch("main/setCardsDataAction", cntCardsData);

      this.reply = "";
      this.prompt = false;
    },
    addComment() {
      const cntCardsData = _.cloneDeep(this.$store.state.main.cardsData);
      const now = Date.now();
      const newComment = {
        username: "@username",
        avatar: "https://cdn.quasar.dev/img/avatar.png",
        comment: this.comment,
        date: date.formatDate(now, "YYYY-MM-DD"),
        likes: 0,
        react: false,
        reply: []
      };
      this.mainData.discussion.push(newComment);
      cntCardsData[this.dataIndex] = this.mainData;
      this.$store.dispatch("main/setCardsDataAction", cntCardsData);
      this.comment = "";
    }
  }
};
</script>

<style lang="scss">
.details-container {
  max-width: 580px !important;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #1c1c1e;
  -webkit-backdrop-filter: blur(32px);
  backdrop-filter: blur(32px);
  max-height: calc(100vh - 20px) !important;
  border-radius: 23px !important;
  .scrollable-content {
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100% - 65px);
    .comment-data {
      margin: 20px 15px;
      .discussion {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        p {
          margin: 0;
          padding: 0;
          font-size: 14px;
        }
        .most-relevant {
          color: white;
          background: #2c2c2e;
          border-radius: 7px;
          padding: 4px 8px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          .q-avatar {
            width: 15px;
            height: 15px;
            margin-left: 10px;
          }
        }
      }
      .comment-list {
        margin: 10px 0;
        .each-comment {
          display: flex;
          margin-bottom: 20px;
          .q-avatar {
            width: 32px;
            height: 32px;
          }
          .each-data {
            display: block;
            margin-left: 10px;
            width: 100%;
            p {
              margin: 0;
              padding: 0;
            }
            .p-username {
              font-weight: bold;
              font-size: 12px;
              color: white;
            }
            .p-comment {
              color: white;
              font-size: 14px;
              background: #3a3a3c;
              border: 0.5px solid rgba(255, 255, 255, 0.1);
              box-sizing: border-box;
              border-radius: 13px;
              padding: 8px;
              margin-top: 5px;
              max-width: calc(100% - 50px);
              width: fit-content;
            }
            .outline-heart {
              margin: 10px 0 0 10px;
              width: 32px;
              height: 32px;
              border-radius: 100px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              text-align: center;
              img {
                width: 16px;
                height: 16px;
                margin-top: 8px;
              }
            }
            .p-reply {
              display: flex;
              margin: 5px 0;
              p {
                font-size: 12px;
                margin: 0 10px 0 0;
                padding: 0;
                color: rgba(255, 255, 255, 0.45);
              }
            }
            .replies-liner {
              width: calc(100% - 50px);
              display: flex;
              justify-content: space-between;
              align-items: center;
              & > div {
                height: 1px;
                background: #8E8E93;
                width: calc(50% - 65px);
              }
              span {
                color: #8E8E93;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }
  .comment-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-width: 580px;
    height: 65px;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    -webkit-backdrop-filter: blur(32px);
    backdrop-filter: blur(32px);
    .upload {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: #636366;
      border: 0.5px solid rgba(255, 255, 255, 0.1);
      width: 32px;
      height: 32px;
      border-radius: 100px;
      .q-avatar {
        width: 20px;
        height: 20px;
      }
    }
    .comment-input {
      width: calc(100% - 40px);
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      height: 35px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 5px 0 10px;
      input {
        width: calc(100% - 30px);
        background: transparent;
        border: none;
        outline: none;
        color: white;
        font-size: 14px;
      }
      .q-avatar {
        width: 24px;
        height: 24px;
      }
    }
  }
}
.q-card-details {
  max-width: 580px;
  width: 100%;
  border-radius: 23px !important;
  position: relative !important;
  height: calc(100% - 50px) !important;
  margin: 0 auto !important;
  min-height: 300px !important;
  display: flex !important;
  flex-direction: column !important;
  padding-top: 15px;
  .text {
    font-size: 18px !important;
    line-height: 26px !important;
    text-align: center !important;
    font-family: "soleil";
    font-weight: 400;
    height: calc(100% - 180px) !important;
    overflow-y: scroll !important;
    overflow-x: hidden !important;
    margin-bottom: 20px !important;
    border: none !important;
    p {
      margin: 0;
      padding: 5px 10px;
      color: white;
    }
  }
  img {
    max-width: 100%;
  }
}
.card-header-username {
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 100% !important;
  padding: 0 20px !important;
  & > div {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 0 auto 0;
    .q-avatar {
      width: 32px;
      height: 32px;
    }
    p {
      margin: auto 5px;
      padding: 0;
    }
  }
  .close-icon {
    width: 28px;
    height: 28px;
    background: rgba(48, 52, 64, 0.65);
    -webkit-backdrop-filter: blur(7px);
    backdrop-filter: blur(7px);
    border-radius: 56px;
    text-align: center;
    img {
      margin-top: 9px;
    }
  }
}
.card-details-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 12px 3px 8px !important;
  background: #ffffff;
  border: 0.5px solid rgba(0, 0, 0, 0.17);
  box-sizing: border-box;
  border-radius: 100px !important;
  height: fit-content !important;
  margin: 10px 30px !important;
  width: calc(100% - 60px) !important;
  .q-avatar {
    height: 30px;
    width: 30px;
  }
  .header-title {
    color: #0c0c0c;
    font-size: 14px;
    line-height: 20px;
    font-weight: normal;
    font-family: "soleil";
    text-align: center;
    margin: auto;
  }
}
.card-details-footer {
  position: absolute;
  bottom: 0;
  width: 100% !important;
  height: 56px !important;
  padding: 0 10px !important;
  background: rgba(255, 255, 255, 0.1);
  border: 0.5px solid rgba(255, 255, 255, 0.17);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  & > div {
    display: flex;
  }
  .item {
    display: flex;
    align-content: center;
    box-sizing: border-box;
    margin: auto 0 auto 10px;
    img {
      width: 24px;
      height: 24px;
    }
    p {
      margin: auto 5px;
      padding: 0;
      color: white;
    }
  }
}
.q-dialog__inner--minimized {
  padding: 10px 0px;
  align-items: flex-start;
}
.reply-dialog {
  background: #3a3a3c;
  color: white;
  padding: 20px;
  position: fixed;
  bottom: 10px;
  input {
    color: white;
  }
}
</style>
