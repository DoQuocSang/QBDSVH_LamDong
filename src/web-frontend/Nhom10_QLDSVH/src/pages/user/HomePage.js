import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "components/user/hero/BackgroundAsVideoWithCenteredContent";
import RandomHeritage from "components/user/testimonials/ContainerTwoColumnWithImageAndProfilePictureReview.js";
import ManagementUnit from "components/user/blogs/ThreeColSimpleWithImageAndDashedBorder.js";
import Location from "components/user/blogs/BlogIndex.js";
import FAQS from "components/user/faqs/SingleCol.js";

export default () => {
  document.title = 'Trang chủ';

  return(
    <AnimationRevealPage>
      <Hero />
      <RandomHeritage />
      <Location />
      <ManagementUnit />
      <FAQS />
    </AnimationRevealPage>
  );
}
