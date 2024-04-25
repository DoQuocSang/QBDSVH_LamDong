

const Scene = {
    outsideOne: {
      title: "Nhà trưng bày chính",
      image: "/images/BaotangLD1.jpg",
      pitch: 17,
      yaw: 5,
      hotSpots: {
        mapTour: {
          type: "info",
          text: "Sơ đồ tham quan bảo tàng",
          image: "/public/images/so-do-tham-quan.jpg",
          pitch: -1,
          yaw: -41,
          cssClass: "hotSpotElementImg",
        },
        nextScene: {
          type: "custom",
          pitch: 9.8,
          yaw: 4.1,
          cssClass: "moveScene",
          scene: "insideOne",
        },
        nextTour: {
          type: "custom",
          pitch: 0.2,
          text: "Dạo quanh khuôn viên",
          yaw: -125,
          cssClass: "moveScene",
          scene: "outsideTwo",
        },
      },
    },
    outsideTwo: {
      title: "Khuôn viên xung quanh bảo tàng",
      image: "/images/BaotangLD-outside.jpg",
      pitch: 17,
      yaw: 5,
      hotSpots: {
        outSide: {
          type: "info",
          image: "/images/so-do-tham-quan.jpg",
          text: "Nơi diễn ra các hoạt động trò chơi dân gian",
          pitch: -0.8,
          yaw: -111,
          cssClass: "hotSpotElementImg",
        },
        videoHotspot: {
          type: "custom",
          pitch: 0,
          yaw: 0,
          video: "./images/videoplayback1.mp4",
          cssClass: "videoHotspot",
        },
        nextScene: {
          type: "custom",
          pitch: -11,
          yaw: 158,
          cssClass: "moveScene",
          scene: "insideOne",
        },
      },
    },
    insideOne: {
      title: "Bên trong nhà trưng bày",
      image: "/images/BaotangLD10.jpg",
      pitch: 10,
      yaw: 180,
      hotSpots: {
        typeWrite: {
          type: "custom",
          pitch: -18,
          yaw: 87,
          nameModel: "typeWrite",
          cssClass: "hotSpotElement",
        },
        model2: {
          type: "custom",
          pitch: -31,
          yaw: 11,
          nameModel: "batavialand",
          cssClass: "hotSpotElement",
        },
        machineGun: {
          type: "custom",
          pitch: -7.5,
          yaw: 122,
          nameModel: "buddha_wood",
          cssClass: "hotSpotElement",
        },
        model3: {
          type: "custom",
          pitch: -28,
          yaw: 32,
          nameModel: "bronze_age_vesse",
          cssClass: "hotSpotElement",
        },
        model4: {
          type: "custom",
          pitch: -6,
          yaw: 103,
          nameModel: "seeker_gun",
          cssClass: "hotSpotElement",
        },
        model5: {
          type: "custom",
          pitch: -31,
          yaw: -8.8,
          nameModel: "galaxy_s21",
          cssClass: "hotSpotElement",
        },
  
        outSide: {
          type: "custom",
          pitch: -49,
          yaw: -162,
          cssClass: "moveScene",
          scene: "outsideOne",
        },
      },
    },
  };
  
  export default Scene;