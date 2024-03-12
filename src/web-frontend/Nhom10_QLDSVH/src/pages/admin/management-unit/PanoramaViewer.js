import { Pannellum } from 'pannellum-react';
import React, { useEffect, useState } from 'react';
;

const PanoramaViewer = () => {
   var image360url = localStorage.getItem('image360url');
   const [currentScene, setCurrentScence] = useState(image360url);

   return(
    <>
      <div className='my-4 rounded-lg overflow-hidden'>
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
          title="image 1"
          author="user"
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
