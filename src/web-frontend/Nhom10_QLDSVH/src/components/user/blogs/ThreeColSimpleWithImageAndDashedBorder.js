import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading as HeadingTitle, Subheading } from "components/user/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons.js";
import { ReactComponent as UserIcon } from "feather-icons/dist/icons/user.svg";
import { ReactComponent as TagIcon } from "feather-icons/dist/icons/tag.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-1.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-3.svg";
import { PrimaryButton } from "components/user/misc/Buttons";
import { getManagementUnits } from "../../../services/ManagementUnitRepository";
import { faLocationDot, faSynagogue } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostDefault from "images/post-default.png";
import { checkImageUrl } from "../../utils/Utils";

const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-24 lg:w-1/3`;

const HeadingInfoContainer = tw.div`flex flex-col items-center`;
const HeadingDescription = tw.p`mt-4 font-medium text-gray-600 text-center max-w-3xl`;

const Card = tw.div`lg:mx-4 xl:mx-8 max-w-sm flex flex-col h-full shadow-lg rounded-lg border border-gray-200`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-cover bg-center h-80 lg:h-64 rounded rounded-b-none relative`
]);

const Details = tw.div`p-6 flex-1 flex flex-col text-center items-start lg:text-left`;
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;

const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;
const Description = tw.p`mt-2 text-sm text-secondary-100 line-clamp-3 flex-1`;
const Link = styled(PrimaryButtonBase).attrs({ as: "a" })`
  ${tw`inline-block mt-4 text-sm font-semibold`}
`
const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;
const ShortenButton = tw(PrimaryButton)`mt-16 mx-auto bg-red-500`;

const AddressContainer = tw.div`flex items-center text-sm mt-3 font-semibold`;
const AddressText = tw.p`pl-2 text-sm text-left`;
const InfoImage = tw.span`bg-gray-200 rounded-full w-10 h-10 mr-3 flex items-center justify-center`;

const TagContainer = tw.div` text-primary-500 text-left text-sm`;
const TagText = tw.span`pl-2 font-bold`;

const DecoratorBlob1 = tw(
  SvgDecoratorBlob1
)`-z-10 absolute bottom-0 right-0 w-48 h-48 transform translate-x-40 -translate-y-8 opacity-25`;
const DecoratorBlob2 = tw(
  SvgDecoratorBlob2
)`-z-10 absolute top-0 left-0 w-48 h-48 transform -translate-x-32 translate-y-full opacity-25`;

const CardRatingContainer = tw.div`leading-none absolute bottom-0 left-0`;
const CardRatingItem = tw.div`inline-flex items-center bg-teal-400 ml-4 mb-4 rounded-full px-5 py-2`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end text-white`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;
const CardReview = tw.div`font-medium text-xs text-white`;

const CustomLink = tw.a`hover:text-primary-500 transition duration-300`;

export default ({
  subheading = "",
  heading = <>Danh sách<span tw="text-primary-500"> đơn vị quản lý di sản</span></>,
  description = `Bạn có thêm xem các di sản văn hóa thuộc từng đơn vị quản lí hiện có tại VNESCO, hãy bấm "Xem chi tiết" để xem danh sách di sản tương ứng với mỗi đơn vị quản lí.`,

}) => {
  const [managementUnitList, setManagementUnitList] = useState([]);

  useEffect(() => {

    getManagementUnits().then(data => {
      if (data) {
        setManagementUnitList(data.data);
      }
      else
        setManagementUnitList([]);
      //console.log(data)
    })
  }, []);

  const [visible, setVisible] = useState(6);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };
  const onShortenClick = () => {
    setVisible(6);
  };

  return (
    <Container>
      <Content>
        <HeadingInfoContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          <HeadingTitle>{heading}</HeadingTitle>
          <HeadingDescription>{description}</HeadingDescription>
        </HeadingInfoContainer>
        <ThreeColumn>
          {managementUnitList.slice(0, visible).map((item, index) => (
            <Column key={index}>
              <Card>
                <Image imageSrc={checkImageUrl(item.image_url)}>
                  <CardRatingContainer>
                    <CardRatingItem>
                      <CardRating>
                        {item.heritage_count}
                      </CardRating>
                      <CardReview> di sản</CardReview>
                    </CardRatingItem>
                  </CardRatingContainer>
                </Image>
                <Details>
                  <TagContainer>
                    <FontAwesomeIcon icon={faSynagogue} />
                    <TagText>{item.note}</TagText>
                  </TagContainer>
                  <CustomLink href={"/all-heritage/"+ "by-management-unit/" + item.urlslug}>
                    <Title>{item.name}</Title>
                  </CustomLink>
                  <Description>{item.short_description}</Description>
                  <AddressContainer>
                    <InfoImage>
                      <FontAwesomeIcon icon={faLocationDot} className="m-6" />
                    </InfoImage>
                    <AddressText>{item.address}</AddressText>
                  </AddressContainer>
                  <Link href={"/all-heritage/"+ "by-management-unit/" + item.urlslug}>Xem chi tiết</Link>
                </Details>
              </Card>
            </Column>
          ))}
        </ThreeColumn>
        {visible < managementUnitList.length ? (
          <ButtonContainer>
            <LoadMoreButton onClick={onLoadMoreClick}>Xem thêm</LoadMoreButton>
          </ButtonContainer>
        )
          :
          (
            managementUnitList.length > 6 && 
            <ButtonContainer>
              <ShortenButton onClick={onShortenClick}>Ẩn bớt</ShortenButton>
            </ButtonContainer>
          )}
      </Content>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};
