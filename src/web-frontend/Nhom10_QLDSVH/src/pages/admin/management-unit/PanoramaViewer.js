import { Pannellum } from 'pannellum-react';
import React, { useEffect, useState } from 'react';


const PanoramaViewer = ({title, isOpen}) => {
   var image360url = localStorage.getItem('image360url');
   const [currentScene, setCurrentScence] = useState(image360url);

   return(
    <>
      <div className={isOpen ? 'my-4 rounded-lg' : 'hidden'}>
        <Pannellum
          width="100%"
          height='50vh'
          image={image360url}
          yaw={360}
          hfov={110}
          autoload
          autoRotate={-5}
          compass={true}
          showZoomCtrl={true}
          mouseZoom={true}
          draggable={true}
          showControls={true}
          doubleClickZoom={true}
          title={title}
          minPitch={-90}
          maxPitch={90} 
        >
          {/* <Pannellum.HotSpot
            type="custom"
            pitch={-10}
            yaw={-120}
            handleClick={(e, name) => {
              // setCurrentScence(currentScene !== )
            }}
          /> */}

        </Pannellum>
      </div>
    </>
   )
};

export default PanoramaViewer;
