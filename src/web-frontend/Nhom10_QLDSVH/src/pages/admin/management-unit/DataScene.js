// import insideOne from '';
import DefaultImage from "../../../images/cat-404-full-2.png";
var image360url = sessionStorage.getItem('image360url');

const Scenes = {
    "insideOne":{
        title:'VR360',
        //https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/panoramas%2Fpanorama_99cd9ce3-5ae3-4861-a825-ffde7c957608.jpg?alt=media&token=ffca094a-79fb-44a9-8321-2f6bbe6a7f36
        image: image360url,
        yaw: 360,
        hotSpot:{
            flowerVase:{
                type: 'custom',
                pitch: 180,
                yaw: -35,
                nameModel: 'flowerVase1',
                cssClass: 'hotSpotElement',
            },
            plane:{
                type: 'custom',
                pitch: -34,
                yaw: -14,
                nameModel: 'flowerVase2',
                cssClass: 'hotSpotElement',           
            },
            chair:{
                type: 'custom',
                pitch: -28,
                yaw: -64,
                nameModel: 'flowerVase3',
                cssClass: 'hotSpotElement',
            },
            nexScene:{
                type: 'custom',
                pitch: -8,
                yaw: 126,
                nameModel: 'move',
                cssClass: 'moveScene',
                scene: 'insideTwo'
            }
        } 
    },
    "insideTwo":{
        title:'interior 2',
        image: "https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/panoramas%2Fpanorama_46206129-c2cf-42fb-844a-dd33fdd8ddf9.jpg?alt=media&token=e4be9513-e980-4ad2-8ff7-4eecdea8a633",
        pitch: 10,
        yaw: 180,
        hotSpot:{

        }
    }
}

export default Scenes;