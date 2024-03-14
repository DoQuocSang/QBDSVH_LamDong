// import React, { useRef, useEffect } from 'react';
// import * as pannellum from 'pannellum';

// const PanoramaDemo = ({ imagePath }) => {
//     const pannellumContainer = useRef(null);

//     useEffect(() => {
//         if (pannellumContainer.current && imagePath) { // Check if container and imagePath are valid
//             const viewer = pannellum.viewer(pannellumContainer.current, {
//                 type: 'equirectangular',
//                 panorama: imagePath
//             });

//             return () => {
//                 viewer.destroy();
//             };
//         }
//     }, [imagePath]);

//     return (
//         <div ref={pannellumContainer} style={{ width: '100%', height: '500px' }}></div>
//     );
// };

// export default PanoramaDemo;
