import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import ContactItem from "components/user/forms/TwoColContactUsWithIllustrationFullForm.js";

export default () => {
  document.title = 'Liên hệ';
  
  return (
    <AnimationRevealPage>
     <ContactItem />
    </AnimationRevealPage>
  );
};
