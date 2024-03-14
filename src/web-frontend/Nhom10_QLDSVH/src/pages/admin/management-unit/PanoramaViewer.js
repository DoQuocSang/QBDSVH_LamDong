import { Pannellum } from 'pannellum-react';
import React, { useEffect, useRef, useState } from 'react';
import DataScene from "./DataScene.js"

const PanoramaViewer = ({ title, isOpen }) => {
  var image360url = localStorage.getItem('image360url');
  const [scene, setScene] = useState(DataScene['insideOne']);
  const [totalConsoleContent, setTotalConsoleContent] = useState('');
  const mountRef = useRef(null);

  useEffect(() => {
    var consoleFrame = document.getElementById('console-frame');
    console.log(consoleFrame)
    if (consoleFrame) {
      var consoleContent = '';

      function appendLog(msg) {
        consoleContent += msg;
        setTotalConsoleContent(consoleContent);
        consoleFrame.contentDocument.body.innerHTML = consoleContent;
        consoleFrame.contentWindow.scrollTo(0, consoleFrame.contentDocument.body.scrollHeight);
      }

      console.log = function (msg) {
        msg = msg.toString();
        const matches = msg.match(/Pitch:\s+([-\d.]+).*Yaw:\s+([-\d.]+)/);
        if (matches && matches.length >= 3) {
          const pitch = parseFloat(matches[1]).toFixed(1);
          const yaw = parseFloat(matches[2]).toFixed(1);
          appendLog(
            `<div style="    
                box-shadow: 0 0 10px #d8d8d8;
                display: flex;
                background-color: #ffffff;
                align-items: center;
                gap: 8px;
                margin: 10px 0px;
                padding: 10px 10px;
                border-radius: 5px;">
            <svg style="    
              color: #00cae1;
              width: 24px;
              height: 24px; 
              flex-shrink: 0;"
              ria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd"/>
            </svg>
            Góc nhìn: ${pitch}, Góc quay: ${yaw}
            </div> 
            `);
        }
      };
    }
  }, []);

  const hotSpots = (element, i) => {
    if (element.cssClass === 'hotSpotElement')
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          yaw={element.yaw}
          cssClass={element.cssClass}
          handleClick={() => { alert(element.nameModel) }}
        />
      );

    else if (element.cssClass === 'moveScene')
      return (
        <Pannellum.Hotspot
          key={i}
          type="custom"
          pitch={element.pitch}
          yaw={element.yaw}
          cssClass={element.cssClass}
          handleClick={() => { setScene(DataScene['insideTwo']) }}
        />
      );
  }

  const pannellumRef = useRef(null);

  return (
    <>
      {isOpen && (
        <>
          <div className='mt-4 rounded-lg overflow-hidden'>
            <Pannellum
              width="100%"
              height='50vh'
              title={scene.title}
              yaw={360}
              hfov={110}
              autoLoad={true}
              autoRotate={-5}
              compass={true}
              showZoomCtrl={true}
              mouseZoom={true}
              // draggable={true}
              showControls={true}
              doubleClickZoom={true}
              image={scene.image}
              minPitch={-90}
              maxPitch={90}
              hotspotDebug={true}
              ref={pannellumRef}
              onMouseup={evt => {

              }}
            >
              {Object.values(scene.hotSpot).map((element, i) => (hotSpots(element, i)))}
            </Pannellum>
          </div>
          

        </>
      )}
      <div className={isOpen ? '' : 'hidden'}>
            <div className={totalConsoleContent ? '' : 'hidden'}>
              <div className='px-4 py-2 bg-gray-100 rounded-lg my-4'>
                <iframe id="console-frame" className='bg-gray-100 rounded-lg' width="100%" height="300"></iframe>
              </div>
            </div>
            <div className={totalConsoleContent ? 'hidden' : ''}>
              <div className='px-10 py-6 bg-gray-100 rounded-lg my-4 flex flex-col gap-1 justify-center border-l-4 border-teal-500' >
                <p className='font-semibold text-xl text-teal-500'>Thông báo</p>
                <p className='font-semibold text-sm text-gray-600'>Vui lòng di chuyển chuột trong phần ảnh 360 để xem</p>
              </div>
            </div>
          </div>
    </>
  )
};

export default PanoramaViewer;