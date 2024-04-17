import React, { useEffect } from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import UserPanoramaViewer from "components/user/vr/UserPanoramaViewer";


export default () => {
  document.title = 'VR Tour';
  
  return(
    <AnimationRevealPage>
      <Container className="w-screen h-screen flex items-center justify-center">
        <UserPanoramaViewer /> 
      </Container>
    </AnimationRevealPage>
  );
}