
import shoutMedia from "./img/ShoutMedia.png"

const cardsData = [
  {
    control: {
      avatar: "https://cdn.quasar.dev/img/avatar.png",
      title: {
        discover: "Control - Discover a world unknown",
        shout: "What do you want to shout about?"
      }
    },
    text: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds... ",
    details: [
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: shoutMedia
      },
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: shoutMedia
      },
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: ""
      }
    ],
    other: {
      heart: 32,
      msg: 179,
    },
    themeIndex: 0
  },
  {
    control: {
      avatar: "https://cdn.quasar.dev/img/avatar.png",
      title: {
        discover: "Popular - Discover a world unknown",
        shout: "What do you want to shout about?"
      }
    },
    text: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds... ",
    details: [
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: shoutMedia
      }
    ],
    other: {
      heart: 16,
      msg: 120,
    },
    themeIndex: 0
  },
  {
    control: {
      avatar: "https://cdn.quasar.dev/img/avatar.png",
      title: {
        discover: "Control - Discover a world unknown",
        shout: "What do you want to shout about?"
      }
    },
    text: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds... ",
    details: [
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: shoutMedia
      },
      {
        content: "The mathematics that is involved is particularly simple, involving simple algebraic operations and no differential equations or at most only very simple ones. The only problem is that we must jump the gap of no longer being able to describe the behavior in detail of particles in space. So this is what we are going to try to do: to tell you about what conventionally would be called the “advanced” parts of quantum mechanics. But they are, we assure you, by all odds.",
        img: shoutMedia
      }
    ],
    other: {
      heart: 22,
      msg: 150,
    },
    themeIndex: 0
  }
];

const cardThemes = [
  {
    deg: "192.04deg",
    colors: [
      {
        hex: "#0FB8FF",
        percent: "0%"
      },
      {
        hex: "#DF47FD",
        percent: "48.46%"
      },
      {
        hex: "#FFB72B",
        percent: "100%"
      }
    ]
  },
  {
    deg: "180deg",
    colors: [
      {
        hex: "#07D057",
        percent: "0%"
      },
      {
        hex: "#4A7FA6",
        percent: "100%"
      }
    ]
  },
  {
    deg: "180deg",
    colors: [
      {
        hex: "#D05B07",
        percent: "0%"
      },
      {
        hex: "#A64A65",
        percent: "100%"
      }
    ]
  }
]

const shoutUpText = (total) => {
  return `You now have ${total} invites to shoutup! Invite your friends!`
}

const mockNotifyData = [
  {
    date: "2021-5-25",
    followed: [
      {
        user: "@username",
        userAvatar: "https://cdn.quasar.dev/img/avatar.png",
        text: "followed you. Would you like to follow them back?"
      }
    ],
    shoutup: {
      total: 3,
      text: shoutUpText(3),
      inviteLink: "#"
    },
    liked: [
      {
        user: "@username",
        userAvatar: "https://cdn.quasar.dev/img/avatar.png",
        text: "liked your shout about",
        about: "Minecraft official site | Minecraft"
      }
    ],
    commented: [
      {
        user: "@username",
        userAvatar: "https://cdn.quasar.dev/img/avatar.png",
        text: "commented on your shout about",
        about: "Minecraft official site | Minecraft"
      }
    ]
  },
  {
    date: "2021-5-22",
    followed: [
      {
        user: "@jack",
        userAvatar: "https://cdn.quasar.dev/img/avatar.png",
        text: "followed you. Would you like to follow them back?"
      }
    ],
    shoutup: {
      total: 5,
      text: shoutUpText(5),
      inviteLink: "#"
    },
    liked: [
      {
        user: "@jack",
        userAvatar: "https://cdn.quasar.dev/img/avatar.png",
        text: "liked your shout about",
        about: "Minecraft official site | Minecraft"
      }
    ],
    commented: []
  }
]

export {
  cardsData,
  cardThemes,
  mockNotifyData
}
