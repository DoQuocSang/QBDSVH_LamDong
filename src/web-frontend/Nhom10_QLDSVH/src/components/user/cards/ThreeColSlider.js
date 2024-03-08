import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading } from "components/user/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons";
import { ReactComponent as PriceIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import { ReactComponent as LocationIcon } from "feather-icons/dist/icons/map-pin.svg";
import { ReactComponent as StarIcon } from "feather-icons/dist/icons/star.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import BookDefault from "images/book-default.png"
import CatDefault from "images/cat-404-full-2.png";

import { Link, useParams } from "react-router-dom";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";
import { getManagementUnits } from "../../../services/ManagementUnitRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faSynagogue } from "@fortawesome/free-solid-svg-icons";

import { getRelatedHeritagesBySlug } from "../../../services/HeritageRepository";
import { toThousandFormat } from "../../utils/Utils";
import { checkImageArray } from "../../utils/Utils";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)`text-3xl`;
const Controls = tw.div`flex items-center`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;

const CardSlider = styled(Slider)`
  ${tw`mt-16`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;
const Card = tw.div`h-full flex! flex-col shadow-lg border-gray-200 sm:border max-w-sm sm:rounded-tl-4xl sm:rounded-br-5xl relative focus:outline-none`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-56 sm:h-64 bg-cover bg-center rounded sm:rounded-none sm:rounded-tl-4xl relative`
]);

const TextInfo = tw.div`py-6 sm:px-10 sm:py-6 flex-grow`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.a`text-xl font-bold line-clamp-2 transition duration-300 hover:text-primary-500`;

const Description = tw.p`text-sm mt-2 sm:mt-2 line-clamp-3`;

const InfoTagContainer = tw.div`flex flex-col mb-2 sm:flex-row`;
const TagContainer = styled.div(({ otherColor }) => [
  tw`flex items-center mr-3 my-2 sm:my-0 bg-red-500 rounded-md transition duration-300 hover:bg-red-600 text-white text-xs px-2 py-1`,
  otherColor && tw`bg-teal-500 hover:bg-teal-600`,
]);
const TagText = tw.a`pl-2 font-semibold text-white line-clamp-1`;
const ErrorImage = tw.img`max-w-3xl h-auto mx-auto rounded-lg pt-4`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-auto sm:text-lg rounded-none w-full rounded sm:rounded-none sm:rounded-br-4xl py-3 sm:py-6`;

const CardRatingContainer = tw.div`leading-none absolute bottom-0 left-0`;
const CardRatingItem = tw.div`inline-flex items-center bg-teal-400 ml-4 mb-4 rounded-full px-5 py-2`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end text-white`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-white`;
const SubTitle = tw.p`font-semibold text-xs text-primary-500`;

export default ({ HeadingText = "Các di sản liên quan" }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        }
      },

      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        }
      },
    ]
  };

  const [relatedHeritages, setRelatedHeritages] = useState([]);
  
  let { slug } = useParams();

  if (typeof slug === 'undefined') {
    slug = "";
  }

  useEffect(() => {
    getRelatedHeritagesBySlug(slug).then(data => {
      if (data) {
        setRelatedHeritages(data.data);
      }
      else
        setRelatedHeritages([]);
      //console.log(data.data)
    })
    
  }, []);

  return (
    <Container>
      <Content>
        <HeadingWithControl>
          <Heading>{HeadingText}</Heading>
          <Controls>
            <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon /></PrevButton>
            <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon /></NextButton>
          </Controls>
        </HeadingWithControl>
        {relatedHeritages.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {relatedHeritages.map((heritage, index) => (
            <Card key={index}>
                <CardImage imageSrc={checkImageArray(heritage.images)[0]}>
                  <CardRatingContainer>
                    <CardRatingItem>
                      <CardRating>
                        {toThousandFormat(heritage.view_count)}
                      </CardRating>
                      <CardReview> lượt xem</CardReview>
                    </CardRatingItem>
                  </CardRatingContainer>
                </CardImage>
              <TextInfo>
                {/* <InfoTagContainer>
                  <TagContainer otherColor>
                    <FontAwesomeIcon icon={faSynagogue} />
                    <TagText href={"/all-product/" + "author/" + card.urlSlug}>
                      {heritage.note}
                    </TagText>
                  </TagContainer>
                </InfoTagContainer> */}

                <SubTitle>Di sản liên quan</SubTitle>
                <TitleReviewContainer>
                  <Title href={`/heritage-detail/${heritage.urlslug}`}>{heritage.name}</Title>
                </TitleReviewContainer>
                <Description>{heritage.short_description}</Description>

              </TextInfo>
              <a href={`/heritage-detail/${heritage.urlslug}`}>
                <PrimaryButton>Xem chi tiết</PrimaryButton>
              </a>
            </Card>
          ))}
        </CardSlider>
      </Content>
    </Container>
  );
};
