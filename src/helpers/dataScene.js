import styled from "styled-components";

// function contain panel info
export const PanelContainer = styled.section`
  width: 100%;
  height: 100%;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  letter-spacing: 0.1em;
  text-align: center;
  color: rgb(234, 131, 34);
`;

export const InfoPanel = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  margin: auto;
  position: relative;
  top: 40%;
  li {
    color: #fff;
    margin-bottom: 15px;
    padding: 7px;
    fzont-size: 30px;
    text-tranform: uppercase;
    span {
      &:hover {
        & ~ div {
          transform: rotate(-5deg) scale(1);
          opacity: 1;
        }
      }
    }

    .img-cont {
      position: absolute;
      width: 300px;
      transform: translateX(100px) scale(0.8);
      opacity: 0;
      transition: all 0.5s;

      img {
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 15px;
      }
    }
  }
`;

// Oject contain data for scene
const Scene = {
  outsideOne: {
    title: "Nhà trưng bày chính",
    image: "/images/BaotangLD1.jpg",
    pitch: 17,
    yaw: 5,
    hotSpots: {
      mapTour: {
        type: "custom",
        text: "Sơ đồ tham quan bảo tàng",
        panel: "/public/images/so-do-tham-quan.jpg",
        // URL: "https://example.com",
        tooltip: "This is a tooltip",
        pitch: -1,
        yaw: -41,
        cssClass: "hotSpotElementImg",
        // onMouseEnter: () => setPanelVisible(true),
        // onMouseLeave: () => setPanelVisible(false),
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
        video: "/images/videoplayback1.mp4",
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
        text: "Máy đánh chữ cổ",
        nameModel: "typeWrite",
        cssClass: "hotSpotCustom",
      },
      model2: {
        type: "custom",
        pitch: -31,
        yaw: 11,
        nameModel: "batavialand",
        cssClass: "hotSpotCustom",
      },
      machineGun: {
        type: "custom",
        pitch: -7.5,
        yaw: 122,
        nameModel: "buddha_wood",
        cssClass: "hotSpotCustom",
      },
      model3: {
        type: "custom",
        pitch: -28,
        yaw: 32,
        nameModel: "bronze_age_vesse",
        cssClass: "hotSpotCustom",
      },
      model4: {
        type: "custom",
        pitch: -6,
        yaw: 103,
        nameModel: "radio1950s",
        cssClass: "hotSpotCustom",
      },
      model5: {
        type: "custom",
        pitch: -22,
        yaw: -8,
        nameModel: "iphone_01",
        cssClass: "hotSpotCustom",
      },
      model6: {
        type: "custom",
        pitch: -12,
        yaw: 93,
        nameModel: "binh_su",
        cssClass: "hotSpotCustom",
      },
      model7: {
        type: "custom",
        pitch: -23,
        yaw: 63,
        nameModel: "stamp",
        cssClass: "hotSpotCustom",
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
