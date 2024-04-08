import React, { useEffect, useState } from 'react';
import { Pannellum } from "pannellum-react";

const MyPanorama = () => {
    const [hotspots, setHotspots] = useState([]);

    const handleInteraction = (mouseEventValue) => {
        const mouse_ev = JSON.parse(mouseEventValue)
        const panoramaWidth = mouse_ev.rect.width;
        const panoramaHeight = mouse_ev.rect.height;

        const clientX = mouse_ev.clientX - mouse_ev.rect.left;
        const clientY = mouse_ev.clientY - mouse_ev.rect.top;

        const newPitch = calculatePitch(clientY, panoramaHeight);
        const newYaw = calculateYaw(clientX, panoramaWidth);

        const newHotspot = { id: Date.now(), pitch: newPitch, yaw: newYaw };

        setHotspots([...hotspots, newHotspot]);

        console.log(newPitch);
        console.log(newYaw);
    };

    const calculatePitch = (clientY, panoramaHeight) => {
        const normalizedY = clientY / panoramaHeight;
        const halfFov = Math.PI / 3;
        const pitch = Math.atan(-normalizedY * Math.tan(halfFov)) * (180 / Math.PI);
        return pitch;
    };

    const calculateYaw = (clientX, panoramaWidth) => {
        const normalizedX = clientX / panoramaWidth;
        const halfFov = Math.PI / 3;
        const yaw = normalizedX * (180 / Math.PI) * halfFov;
        return yaw;
    };

    const handleCreateHotspot = () => {
        handleInteraction(localStorage.getItem('mouseEventValue'));
    };

    const handleMouseUp = (event) => {
        const newMouseEventValue = { rect: event.target.getBoundingClientRect(), clientX: event.clientX, clientY: event.clientY };
        localStorage.setItem('mouseEventValue', JSON.stringify(newMouseEventValue));
        // console.log(localStorage.getItem('mouseEventValue'))
    };

    return (
        <div>
            <button className='bg-amber-500 text-sm px-4 py-2 rounded-lg my-4 text-white font-semibold' onClick={handleCreateHotspot}>Create Hotspot</button>
            <Pannellum
                width="100%"
                height='50vh'
                yaw={360}
                hfov={110}
                autoLoad={true}
                image={"https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/panoramas%2Fpanorama_94ae124f-7f5b-48d2-9def-cda4005336ce.jpg?alt=media&token=f5d564b2-3a15-44bf-b5a0-4d0bd243d952"}
                onMouseup={evt => {
                    handleMouseUp(evt);
                }}
            >
                {hotspots.map((element, i) => (
                    <Pannellum.Hotspot
                        key={i}
                        type="custom"
                        pitch={element.pitch}
                        yaw={element.yaw}
                        cssClass={element.cssClass}
                    />
                ))}
            </Pannellum>
        </div>
    );
};

export default MyPanorama;
