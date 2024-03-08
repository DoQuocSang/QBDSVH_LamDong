import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "../misc/Headings.js";
import { PrimaryButton } from "../misc/Buttons.js";
import { ReactComponent as QuotesLeftIcon } from "images/quotes-l.svg";
import { ReactComponent as QuotesRightIcon } from "images/quotes-r.svg";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-4.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-5.svg";

import "slick-carousel/slick/slick.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faBriefcase, faCube, faLocation, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { getHeritages } from "../../../services/HeritageRepository.js";
import { handleSplitString } from "../../utils/Utils.js";
import { checkImageArray } from "../../utils/Utils";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const TestimonialsContainer = tw.div`mt-16 lg:mt-0`;
const Testimonials = styled.div``;
const Testimonial = tw.div`max-w-md lg:max-w-none mx-auto lg:mx-0 flex flex-col items-center lg:items-stretch lg:flex-row`;

const TestimonialImageSlider = tw(Slider)`w-full lg:w-5/12 flex-shrink-0 `;
// const TestimonialTextSlider = tw(Slider)``;
// const TestimonialText = tw.div`outline-none`;

const ImageAndControlContainer = tw.div`relative outline-none`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-cover bg-center h-80 sm:h-96 lg:h-144`
]);

const ControlContainer = tw.div`absolute bottom-0 right-0 bg-gray-100 px-6 py-4 rounded-tl-3xl border`;
const ControlButton = styled(PrimaryButton)`
  ${tw`mx-3 rounded-full text-gray-100 p-2`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const TextContainer = styled.div(props => [
  tw`flex flex-col w-full lg:w-7/12`,
  props.textOnLeft ? tw`lg:pr-12 lg:order-first` : tw`lg:pl-12 lg:order-last`
]);

const Subheading = tw(SubheadingBase)`mb-4`;
const HeadingTitle = tw(SectionHeading)`lg:text-left leading-tight`;
const Description = tw.p`max-w-md text-center mx-auto lg:mx-0 lg:text-left lg:max-w-none leading-relaxed text-sm sm:text-base lg:text-lg font-medium mt-4 text-secondary-100`;

// const QuoteContainer = tw.div`relative mt-10 lg:mt-20`;
// const Quote = tw.blockquote`text-center lg:text-left text-sm sm:text-lg lg:text-xl xl:text-2xl`;
// const CustomerInfo = tw.div`mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start`;
// const CustomerProfilePicture = tw.img`rounded-full w-20 h-20`;
// const CustomerTextInfo = tw.div`text-center lg:text-left sm:ml-6 mt-2 sm:mt-0`;
// const CustomerName = tw.h5`font-semibold text-xl lg:text-2xl xl:text-3xl text-primary-500`;
// const CustomerTitle = tw.p`font-medium text-secondary-100`;

// const QuotesLeft = tw(QuotesLeftIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block mr-1 -mt-3`;
// const QuotesRight = tw(QuotesRightIcon)`w-6 h-6 opacity-75 text-primary-500 inline-block ml-1 -mt-3`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`absolute w-32 top-0 left-0 -z-10 text-primary-500 opacity-25 transform -translate-x-full`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`absolute w-32 bottom-0 right-0 -z-10 text-pink-500 opacity-15 transform translate-x-2/3 translate-y-8`;

export const MenuContainer = styled.div(({ flexCol }) => [
  tw`grid grid-cols-4 grow-0 mb-5`,
  flexCol && tw`flex flex-col`,
])

const PrimaryButtonContent = styled(PrimaryButton)(props => [
  tw`mt-2 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);

const TextContent = tw.div`lg:py-8 text-center md:text-left`;
const SubheadingContent = tw(SubheadingBase)`text-center md:text-left`;
const HeadingContent = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const DescriptionContent = tw.p`mt-8 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;


const GridContainer = tw.div`my-3 grid grid-cols-2 grow-0`;
const GridItem = tw.div`px-5 py-3 text-gray-600 flex`;

const InfoHeading = tw.p`text-primary-500 font-bold text-lg`;
const InfoDescription = tw.p`text-gray-600`;

const InfoImage = tw.div`bg-gray-200 rounded-full w-12 h-12 mr-3 flex items-center justify-center`;


export default ({
  index = null,
  heritage = null,
  description = "Here are what some of our amazing customers are saying about our hotels & tours. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  buttonRounded = true,
}) => {
  const [imageSliderRef, setImageSliderRef] = useState(null);

  // const [heritageList, setHeritageList] = useState([]);

  // useEffect(() => {
  //   getHeritages().then(data => {
  //     if (data) {
  //       setHeritageList(data.data);
  //     }
  //     else {
  //       setHeritageList([]);
  //     }
  //     //console.log(data)
  //   })
  // }, []);

  // Xác định bố cục trái hay phải
  let textOnLeft = false;

  return (
    <>
    {index !== null && heritage !== null &&
      <Container key={index}>
      <Content>
        <TestimonialsContainer>
          <Testimonials>
            <Testimonial>
              <TestimonialImageSlider arrows={false} ref={setImageSliderRef} fade={true}>
                {checkImageArray(heritage.images).map((item, index) => (
                  <ImageAndControlContainer key={index}>
                    <Image imageSrc={item} />
                    <ControlContainer>
                      <ControlButton onClick={imageSliderRef?.slickPrev}>
                        <ChevronLeftIcon />
                      </ControlButton>
                      <ControlButton onClick={imageSliderRef?.slickNext}>
                        <ChevronRightIcon />
                      </ControlButton>
                    </ControlContainer>
                  </ImageAndControlContainer>
                ))}
              </TestimonialImageSlider>
              {index % 2 === 0 ? textOnLeft = false : textOnLeft = true}
              <TextContainer textOnLeft={textOnLeft}>
                <TextContent>
                  <SubheadingContent>Đề xuất</SubheadingContent>
                  <HeadingContent> {heritage.name}</HeadingContent>
                  <DescriptionContent>{heritage.short_description}</DescriptionContent>

                  <GridContainer>
                    <GridItem>
                      <InfoImage>
                        <FontAwesomeIcon icon={faBookmark} />
                      </InfoImage>
                      <div>
                        <InfoHeading>Loại di sản</InfoHeading>
                        <InfoDescription>{heritage.heritage_type.name}</InfoDescription>
                      </div>
                    </GridItem>

                    <GridItem>
                      <InfoImage>
                        <FontAwesomeIcon icon={faCube} />
                      </InfoImage>
                      <div>
                        <InfoHeading>Loại hình</InfoHeading>
                        <InfoDescription>{heritage.heritage_category.name}</InfoDescription>
                      </div>
                    </GridItem>

                    <GridItem>
                      <InfoImage>
                        <FontAwesomeIcon icon={faLocationDot} />
                      </InfoImage>
                      <div>
                        <InfoHeading>Địa điểm</InfoHeading>
                        <InfoDescription>{heritage.location.name}</InfoDescription>
                      </div>
                    </GridItem>

                    <GridItem>
                      <InfoImage>
                        <FontAwesomeIcon icon={faBriefcase} />
                      </InfoImage>
                      <div>
                        <InfoHeading>Đơn vị quản lý</InfoHeading>
                        <InfoDescription>{heritage.management_unit.name}</InfoDescription>
                      </div>
                    </GridItem>
                  </GridContainer>
                  <PrimaryButtonContent buttonRounded={buttonRounded} as="a" href={"/heritage-detail/" + heritage.urlslug}>
                    Tìm hiểu thêm
                  </PrimaryButtonContent>
                </TextContent>
              </TextContainer>
            </Testimonial>
          </Testimonials>
        </TestimonialsContainer>
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
    }
    </>
  );
};
