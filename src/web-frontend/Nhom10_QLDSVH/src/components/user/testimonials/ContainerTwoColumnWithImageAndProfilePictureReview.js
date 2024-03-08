import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import HeritageItem from "components/user/testimonials/TwoColumnWithImageAndProfilePictureReview.js";
import { SectionHeading as HeadingTitle, Subheading } from "components/user/misc/Headings.js";
import { getHeritages, getRandomHeritages } from "../../../services/HeritageRepository";
import { Container } from "postcss";

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-xl`;
const CustomContainer = tw.p`mt-20`;
const YellowSpan = tw.span`text-primary-500`;

export default ({
  heading = <>Hôm nay<YellowSpan> xem gì?</YellowSpan></>,
  description = `Dưới đây là 3 di sản văn hóa mà VNESCO đề xuất cho bạn, hãy bấm vào nút "Tìm hiểu thêm" để khám phá ngay`,
}) => {
  const [heritageList, setHeritageList] = useState([]);

  useEffect(() => {
    getRandomHeritages().then(data => {
      if (data) {
        setHeritageList(data);
      }
      else {
        setHeritageList([]);
      }
      //console.log(data)
    })
  }, []);

  return (
    <CustomContainer>
      <HeadingInfoContainer>
        <HeadingTitle>{heading}</HeadingTitle>
        <HeadingDescription>{description}</HeadingDescription>
      </HeadingInfoContainer>
      {heritageList.map((heritage, index) => (
        <HeritageItem index={index} heritage={heritage}></HeritageItem>
      ))}
    </CustomContainer>
  );
};
