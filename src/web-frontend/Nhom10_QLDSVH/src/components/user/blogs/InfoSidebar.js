import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/user/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import PostDefault from "images/post-default.png";
import { useParams } from 'react-router-dom';
import { checkImageUrl, isEmptyOrSpaces } from "../../utils/Utils";
import { getHeritages } from "../../../services/HeritageRepository";
import { PrimaryButton } from "components/user/misc/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import CatDefault from "images/cat-404-full-2.png";
import HeritageDefault from "images/post-default.png";
import { checkImageArray } from "../../utils/Utils";

const Row = tw.div`flex flex-col lg:flex-row mx-20 max-w-screen-xl mx-auto`;

const PopularPostsContainer = tw.div`lg:w-2/3 mr-16`;
const PostsContainer = tw.div`mt-5 `;
const Post = tw(motion.a)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Category = tw(motion.a)`block sm:max-w-sm cursor-pointer py-3 px-4 border border-gray-200 shadow-md rounded-lg mb-4 last:mb-2 hover:bg-primary-500 transition duration-300`;

const Image = styled(motion.div)(props => [
    `background-image: url("${props.$imageSrc}");`,
    tw`h-64 bg-cover bg-center rounded mt-2`
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500 line-clamp-1`;
const CategoryTitle = tw.h5`text-base font-semibold transition duration-300 group-hover:text-white line-clamp-2`;

const PostCategory = tw(motion.a)`cursor-pointer font-semibold text-base transition duration-300 hover:text-primary-500`;

const Description = styled.p(({ moreShort }) => [
    tw`mt-2 font-medium text-secondary-100 leading-loose text-sm line-clamp-2`,
    moreShort && tw`line-clamp-2`,
]);

const AuthorName = tw.h6`font-semibold text-lg`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div`mr-8`

const Heading = tw(SectionHeading)`text-gray-800 mb-0 mt-3 text-2xl text-left font-bold`;
const HeadingLineContainer = tw.div`flex items-center mt-2`;
const HeadingLine = styled.div`
    ${tw`border-b border-2 border-gray-300 basis-2/3 rounded-full`}
    ${props =>
        props.mainColor &&
        css`
        ${tw`border-primary-500 basis-1/3`}
    `}
`

const InfoContainer = tw.div`w-full rounded-3xl my-5 inline-block overflow-hidden shadow-lg cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100 duration-300`
const InfoImageContainer = tw.div`relative w-full overflow-hidden bg-black h-32 rounded-t-3xl`
const InfoImage = tw.img`object-cover w-full h-full transform duration-700 backdrop-opacity-100`
const ImageOverlay = tw.div`absolute bg-gradient-to-t from-black w-full h-full flex items-end justify-center -inset-y-0`
const OverlayText = tw.h1`font-bold text-2xl text-white mb-2 text-center px-10`
const InfoContentContainer = tw.div`bg-white`
const InfoHeading = tw.p`text-center px-3 pt-2 mt-2 max-w-xs mx-auto`
const InfoDescriptionContent = tw.div`flex flex-col items-center px-5 py-2`
const InfoDescriptionGrid = tw.div`grid grid-cols-2 pb-3`
const InfoDescriptionItem = styled.div`
    ${tw`px-5`}
    ${props =>
        props.leftContent &&
        css`
        ${tw`text-right border-r pr-3`}
    `}
    ${props =>
        props.rightContent &&
        css`
        ${tw`text-left pl-3`}
    `}
    ${props =>
        props.centerContent &&
        css`
        ${tw`text-center pb-3`}
    `}
    h2 {
        ${tw`font-semibold text-teal-500`}
    }
    span {
        ${tw``}
    }
`

const ButtonContainer = styled.a(({ isShowMore, isShorten, isNormal }) => [
    tw`hover:text-primary-500 transition duration-300 flex justify-center items-center cursor-pointer`,
    isNormal && tw`text-gray-600`,
    isShowMore && tw`text-teal-400`,
    isShorten && tw`text-red-500`,
]);

const BlogImage = tw.img`w-full h-auto rounded-lg pt-4`;


export default ({ heritage = null, image = [] }) => {
    const [heritageList, setHeritageList] = useState([]);

    useEffect(() => {
        getHeritages(1, 30, "view_count", "DESC").then(data => {
            if (data) {
                setHeritageList(data.data);
            }
            else
                setHeritageList([]);
            // console.log(data.data)
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
        <>
            <RecentPostsContainer>
                {heritage !== null ?
                    <>
                        <Heading>Thông tin di sản</Heading>
                        <HeadingLineContainer>
                            <HeadingLine mainColor />
                            <HeadingLine />
                        </HeadingLineContainer>
                        <InfoContainer>
                            <InfoImageContainer className="group">
                                {isEmptyOrSpaces(image) ?
                                    <InfoImage src={HeritageDefault} />
                                    :
                                    <InfoImage src={image} />
                                }
                                <ImageOverlay>
                                    <OverlayText>
                                        {heritage.name}
                                    </OverlayText>
                                </ImageOverlay>
                            </InfoImageContainer>
                            <InfoContentContainer>
                                <InfoHeading>Bên dưới là một số thông tin chi tiết về di sản mà bạn đang xem</InfoHeading>
                                <InfoDescriptionContent>
                                    <InfoDescriptionItem centerContent>
                                        <h2>Niên đại</h2>
                                        <span>{heritage.time}</span>
                                    </InfoDescriptionItem>
                                    <InfoDescriptionGrid>
                                        <InfoDescriptionItem leftContent>
                                            <h2>Loại di sản</h2>
                                            <span>{heritage.heritage_type.name}</span>
                                        </InfoDescriptionItem>
                                        <InfoDescriptionItem rightContent>
                                            <h2>Hình thức</h2>
                                            <span>{heritage.heritage_category.name}</span>
                                        </InfoDescriptionItem>
                                    </InfoDescriptionGrid>
                                    <InfoDescriptionGrid>
                                        <InfoDescriptionItem leftContent>
                                            <h2>Địa điểm</h2>
                                            <span>{heritage.location.name}</span>
                                        </InfoDescriptionItem>
                                        <InfoDescriptionItem rightContent>
                                            <h2>Đơn vị quản lí</h2>
                                            <span>{heritage.management_unit.name}</span>
                                        </InfoDescriptionItem>
                                    </InfoDescriptionGrid>
                                </InfoDescriptionContent>
                            </InfoContentContainer>
                        </InfoContainer>
                    </>
                    :
                    <>
                        <Heading>Thông tin di sản</Heading>
                        <HeadingLineContainer>
                            <HeadingLine mainColor />
                            <HeadingLine />
                        </HeadingLineContainer>
                        <BlogImage src={CatDefault} />
                    </>
                }

                <>
                    <Heading>Các di sản được xem nhiều</Heading>
                    <HeadingLineContainer>
                        <HeadingLine mainColor />
                        <HeadingLine />
                    </HeadingLineContainer>
                    <PostsContainer>
                        {heritageList.slice(0, visible).map((heritage, index) => (
                            <a href={`${heritage.urlslug}`}>
                                <Post key={index} className="group">
                                    <PostTextContainer>
                                        <Title>{heritage.name}</Title>
                                        <Description moreShort>{heritage.short_description}</Description>
                                    </PostTextContainer>

                                    <Image $imageSrc={checkImageArray(heritage.images)[0]} />
                                </Post>
                            </a>
                        ))}
                    </PostsContainer>
                    {visible < heritageList.length ? (
                        <ButtonContainer isShowMore onClick={onLoadMoreClick}>
                            <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                            Xem thêm
                        </ButtonContainer>
                    )
                        :
                        (
                            heritageList.length > 5 &&
                            <ButtonContainer isShorten onClick={onShortenClick}>
                                <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                                Thu gọn
                            </ButtonContainer>
                        )}
                </>
            </RecentPostsContainer>
        </>
    );
};
