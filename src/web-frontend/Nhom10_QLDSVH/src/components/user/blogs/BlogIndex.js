import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container } from "components/user/misc/Layouts";
import { useParams } from 'react-router-dom';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/user/misc/Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryButton } from "components/user/misc/Buttons";
import { Link } from "react-router-dom";
import PostDefault from "images/post-default.png";
import { formatDateTme } from "../../utils/Utils";
import { faBriefcase, faCube, faMountainSun, faTag } from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../utils/Utils";
import CatDefault from "images/cat-404-full-2.png";
import { getLocations } from "../../../services/LocationRepository";
import { SectionHeading as HeadingTitle, Subheading } from "components/user/misc/Headings.js";


const HeadingRow = tw.div`flex`;
// const Heading = tw(SectionHeading)`text-gray-900`;
const Posts = tw.div`mt-0 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0 border-gray-200`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg shadow-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg relative`}
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none border-gray-200`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-xl text-gray-900 group-hover:text-primary-500 transition duration-300`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const ShortenButton = tw(PrimaryButton)`mt-16 mx-auto bg-red-500`;

// const TagContainer = tw.div`my-3 flex flex-wrap mt-12`;
// const TagItem = tw.p`mr-3 my-2 py-2 px-3 bg-teal-400 rounded-lg font-semibold text-xs text-white`;
const Heading = tw(SectionHeading)`text-gray-900 mb-0 mt-3 text-lg text-left mr-3`;

const Row = tw.div`flex flex-col lg:flex-row mx-20 max-w-screen-xl mx-auto py-20`;

const ContentWithNoPadding = tw.div``;

const PostImage = tw.img`w-full h-auto rounded-lg pt-4`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-2xl`;

const InfoContainer = tw.div`mt-2`;
const InfoItem = tw.div`py-1 text-gray-600 text-left text-sm flex items-center`;
const InfoIcon = tw.div`w-3 flex justify-center`;
const InfoText = tw.span`pl-4 font-semibold`;


const CardRatingContainer = tw.div`leading-none absolute bottom-0 left-0`;
const CardRatingItem = tw.div`inline-flex items-center bg-teal-400 ml-4 mb-4 rounded-full px-5 py-2`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end text-white`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-white`;

export default ({
  heading = <>Danh sách<span tw="text-primary-500"> địa điểm</span></>,
  description = `Bạn có thêm xem các di sản văn hóa thuộc từng điểm điểm hiện có tại VNESCO, hãy bấm vào địa điểm để xem danh sách di sản tương ứng với mỗi địa điểm.`,
}) => {

  const [visible, setVisible] = useState(7);
  const onLoadMoreClick = () => {
    setVisible(v => v + 7);
  };
  const onShortenClick = () => {
    setVisible(7);
  };

  let featured = false;

  const [locationList, setLocationList] = useState([]);

  useEffect(() => {

    getLocations().then(data => {
      if (data) {
        setLocationList(data.data);
      }
      else
        setLocationList([]);
      //console.log(data)
    })
  }, []);

  return (
    <AnimationRevealPage>
      <Container>
        <Row>
          <ContentWithNoPadding>
            <HeadingInfoContainer>
              <HeadingTitle>{heading}</HeadingTitle>
              <HeadingDescription>{description}</HeadingDescription>
            </HeadingInfoContainer>
            {locationList.length === 0 ? <PostImage src={CatDefault} /> : ""}
            <Posts>
              {locationList.slice(0, visible).map((location, index) => (
                <>
                  {index % 7 === 0 ? featured = true : featured = false}
                  <PostContainer key={index} featured={featured}>
                    <Post className="group" as="a" href={"/all-heritage/"+ "by-location/" + location.urlslug}>
                      {isEmptyOrSpaces(location.image_url) ? (
                        <Image imageSrc={PostDefault}>
                          <CardRatingContainer>
                            <CardRating>
                              {location.heritage_count}
                            </CardRating>
                            <CardReview> di sản</CardReview>
                          </CardRatingContainer>
                        </Image>
                      ) : (
                        <Image imageSrc={location.image_url}> 
                          <CardRatingContainer>
                            <CardRatingItem>
                            <CardRating>
                              {location.heritage_count}
                            </CardRating>
                            <CardReview> di sản</CardReview>
                            </CardRatingItem>
                            {/* <CardRatingItem>
                            <CardRating>
                                8
                            </CardRating>
                            <CardReview> đơn vị quản lý</CardReview>
                            </CardRatingItem> */}
                          </CardRatingContainer>
                        </Image>
                      )}
                      <Info>
                        <Category>Địa điểm</Category>
                        <a href={"/all-heritage/"+ "by-location/" + location.urlslug}>
                          <Title>{location.name}</Title>
                        </a>
                        {featured === true ?
                          <Description css={tw`line-clamp-6`}>{location.short_description}</Description>
                          :
                          <Description css={tw`line-clamp-3 mt-2`}>{location.short_description}</Description>
                        }
                      </Info>
                    </Post>
                  </PostContainer>
                </>
              ))}
            </Posts>
            {visible < locationList.length ? (
              <ButtonContainer>
                <LoadMoreButton onClick={onLoadMoreClick}>Xem thêm</LoadMoreButton>
              </ButtonContainer>
            )
              :
              (
                locationList.length > 7 &&
                <ButtonContainer>
                  <ShortenButton onClick={onShortenClick}>Ẩn bớt</ShortenButton>
                </ButtonContainer>
              )}
          </ContentWithNoPadding>
        </Row>
      </Container>
    </AnimationRevealPage>
  );
};
