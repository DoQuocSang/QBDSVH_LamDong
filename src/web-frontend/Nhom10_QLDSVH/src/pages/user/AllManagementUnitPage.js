import React, { useEffect, useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import { getManagementUnits } from "services/ManagementUnitRepository";
import PostDefault from "images/post-default.png";
import { isEmptyOrSpaces } from "components/utils/Utils";
import CatDefault from "images/cat-404-full-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const PostImage = tw.img`w-full h-auto rounded-lg pt-4`;
const HeadingRow = tw.div`flex`;
const Heading = tw.h2`text-4xl font-black tracking-wide text-left`;
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`;
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${(props) =>
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
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col rounded-lg shadow-lg overflow-hidden relative`;
const PostDisable = tw.div`p-10 cursor-not-allowed absolute bg-gray-900 inset-0 bg-opacity-50 z-50 flex flex-col justify-center items-center gap-4`;
const DisableTitle = tw.div`font-bold text-base`;
const DisableContainer = tw.div`flex items-center text-sm mt-3 font-semibold bg-white px-4 py-4 rounded-md gap-4`;
const DisableImage = tw.span`bg-orange-200 rounded-full w-10 h-10 flex items-center justify-center`;

const Image = styled.div`
  ${(props) => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg relative`}
`;
const Info = tw.div`p-8 border border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-xl group-hover:text-primary-500 transition duration-300`;
const Description = tw.div`text-gray-600 `;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const ShortenButton = tw(
  PrimaryButton
)`mt-16 mx-auto bg-red-500 hover:bg-red-600 hocus:bg-red-600`;
const CustomSpan = tw.span`text-primary-500`;

const CardRatingContainer = tw.div`leading-none absolute bottom-0 left-0`;
const CardRatingItem = tw.div`inline-flex items-center bg-amber-500 ml-4 mb-4 rounded-full px-5 py-2`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end text-white`}
  svg {
    ${tw`w-4 h-4 fill-current text-red-500 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-white`;

const AddressContainer = tw.div`flex items-center text-sm mt-3 font-semibold`;
const AddressText = tw.p`pl-2 text-sm text-left`;
const InfoImage = tw.span`bg-gray-200 rounded-full w-10 h-10 mr-3 flex items-center justify-center`;

export default ({}) => {
  const [visible, setVisible] = useState(7);

  const onLoadMoreClick = () => {
    setVisible((v) => v + 6);
  };

  const onShortenClick = () => {
    setVisible(6);
  };

  const [managementUnitList, setManagementUnitList] = useState([]);
  let featured = false;

  useEffect(() => {
    document.title = "Danh sách tour";
    getManagementUnits().then((data) => {
      if (data) {
        setManagementUnitList(data.data);
      } else setManagementUnitList([]);
      console.log(data);
    });
  }, []);
  return (
    <AnimationRevealPage>
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>
              Danh sách <CustomSpan>Tour tham quan</CustomSpan>
            </Heading>
          </HeadingRow>
          {managementUnitList.length === 0 ? (
            <PostImage src={CatDefault} />
          ) : (
            ""
          )}
          <Posts>
            {managementUnitList.slice(0, visible).map((item, index) => (
              <>
                {index % 7 === 0 ? (featured = true) : (featured = false)}
                <PostContainer key={index} featured={featured}>
                  <Post
                    className="group"
                    as={item.scene_count > 0 ? "a" : "div"}
                    href={item.scene_count > 0 ? `/vr-tour/${item.id}` : ""}
                  >
                    {item.scene_count === 0 && (
                      <PostDisable>
                        <DisableContainer>
                          <DisableImage>
                            <FontAwesomeIcon
                              icon={faTriangleExclamation}
                              className="m-6 text-red-500"
                            />
                          </DisableImage>
                          <DisableTitle>
                            Tạm thời bạn không thể truy cập tour này
                          </DisableTitle>
                        </DisableContainer>
                      </PostDisable>
                    )}
                    {isEmptyOrSpaces(item.image_url) ? (
                      <Image imageSrc={PostDefault}>
                        <CardRatingContainer>
                          <CardRatingItem>
                            <CardRating>{item.scene_count}</CardRating>
                            <CardReview> khu vực</CardReview>
                          </CardRatingItem>
                        </CardRatingContainer>
                      </Image>
                    ) : (
                      <Image imageSrc={item.image_url}>
                        <CardRatingContainer>
                          <CardRatingItem>
                            <CardRating>{item.scene_count}</CardRating>
                            <CardReview> khu vực</CardReview>
                          </CardRatingItem>
                        </CardRatingContainer>
                      </Image>
                    )}
                    <Info>
                      <Category>{item.note}</Category>
                      <Title>{item.name}</Title>
                      {featured === true ? (
                        <Description css={tw`line-clamp-6`}>
                          {item.short_description}
                        </Description>
                      ) : (
                        <Description css={tw`line-clamp-3 mt-2`}>
                          {item.short_description}
                        </Description>
                      )}
                      <AddressContainer>
                        <InfoImage>
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="m-6"
                          />
                        </InfoImage>
                        <AddressText>{item.address}</AddressText>
                      </AddressContainer>
                    </Info>
                  </Post>
                </PostContainer>
              </>
            ))}
          </Posts>
          {visible < managementUnitList.length ? (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>
                Xem thêm
              </LoadMoreButton>
            </ButtonContainer>
          ) : (
            managementUnitList.length > 6 && (
              <ButtonContainer>
                <ShortenButton onClick={onShortenClick}>Ẩn bớt</ShortenButton>
              </ButtonContainer>
            )
          )}
        </ContentWithPaddingXl>
      </Container>
    </AnimationRevealPage>
  );
};
