import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { getHeritagesForGallery } from "../../services/HeritageRepository";
import GalleryItem from "components/user/blogs/GridWithFeaturedPost";
import { PrimaryButton } from "components/user/misc/Buttons";
import FAQS from "components/user/faqs/SingleCol.js";

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`my-16 mx-auto`;
const ShortenButton = tw(PrimaryButton)`my-16 mx-auto bg-red-500`;

export default () => {
  document.title = 'Thư viện ảnh';

  const [heritageList, setHeritageList] = useState([]);

  useEffect(() => {
    getHeritagesForGallery().then(data => {
      if (data) {
        setHeritageList(data.data);
      }
      else {
        setHeritageList([]);
      }
      //console.log(data)
    })
  }, []);

  const [visible, setVisible] = useState(5);
  const onLoadMoreClick = () => {
    setVisible(v => v + 5);
  };
  const onShortenClick = () => {
    setVisible(5);
  };

  return (
    <AnimationRevealPage>
      {heritageList.slice(0, visible).map((heritage, index) => (
        <GalleryItem index={index} heritage={heritage}></GalleryItem>
      ))}
      {visible < heritageList.length ? (
        <ButtonContainer>
          <LoadMoreButton onClick={onLoadMoreClick}>Xem thêm</LoadMoreButton>
        </ButtonContainer>
      )
        :
        (
          heritageList.length > 5 &&
          <ButtonContainer>
            <ShortenButton onClick={onShortenClick}>Ẩn bớt</ShortenButton>
          </ButtonContainer>
        )}
       <FAQS />
    </AnimationRevealPage>
  );
};
