import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/user/misc/Headings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarCheck, faCaretDown, faCaretUp, faClapperboard, faFaceFrownOpen, faFaceLaughBeam, faFaceMeh, faImage, faTag, faUserPen } from "@fortawesome/free-solid-svg-icons";
import PostDefault from "images/post-default.png";
import PostDefaultFull from "images/post-default-full.png";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import InfoSidebar from "../../components/user/blogs/InfoSidebar";
import { checkImageArray, checkImageUrl, formatDateTme, toThousandFormat } from "../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../components/utils/Utils";
import { FormatParagraph } from "../../components/utils/Utils";
import { getHeritageWithDetailBySlug } from "../../services/HeritageRepository";
import { DescriptionWithImage } from "../../components/utils/Utils";
import { PrimaryButton } from "components/user/misc/Buttons";
import ThreeColSlider from "components/user/cards/ThreeColSlider.js";
import { increaseViewCount } from "../../services/HeritageRepository";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { FacebookShareButton } from "react-share";
import { getVideoIdFromUrl } from "../../components/utils/Utils";
import CatDefault from "images/cat-404-full-2.png";

const HeadingRow = tw.div`flex`;
const BlogImage = tw.img`w-full h-auto rounded-lg my-4`;
// const BlogImage = styled.div(props => [
//   `background-image: url("${props.imageSrc}"); `,
//   tw`rounded md:w-1/2 lg:w-5/12 xl:w-1/3 flex-shrink-0 h-80 md:h-144 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8`
// ]);
const Heading = tw(SectionHeading)`text-gray-900 mb-0 mt-2 text-3xl text-left`;
const HeadingSmall = tw(Heading)`text-lg mr-3 `;

const TagContainer = tw.div`my-3 flex flex-wrap`;
const TagItem = tw.p`mr-3 my-2 py-2 px-3 bg-teal-400 rounded-lg font-semibold text-xs text-white transition duration-300 hover:bg-teal-500`;

const InfoContainer = tw.div`my-3 text-right`;
const InfoItem = tw.p`py-1 text-base text-gray-500`;

const Text = styled.div`
  ${tw`text-lg  text-gray-800`}
  p {
    ${tw`mt-2 leading-loose`}
  }
  h1 {
    ${tw`text-3xl font-bold mt-10`}
  }
  h2 {
    ${tw`text-2xl font-bold mt-8`}
  }
  h3 {
    ${tw`text-xl font-bold mt-6`}
  }
  ul {
    ${tw`list-disc list-inside`}
    li {
      ${tw`ml-2 mb-3`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

const Row = tw.div`flex flex-col lg:flex-row mx-20 max-w-screen-xl mx-auto my-5`;

const PopularPostsContainer = tw.div`lg:w-2/3 mr-16`;
const PostsContainer = tw.div`mt-5 `;

const SubHeading = tw.p`cursor-pointer font-semibold text-base text-teal-600`;

const DescriptionContainer = styled.div`
  ${tw``}
  & .imageContainer {
    ${tw`flex flex-col my-5 mx-20 h-full bg-gray-200 rounded-lg`}
  }

  & .imageSection {
    ${tw`rounded-t-lg`}
  }

  & .imageDescription {
    ${tw`text-gray-900 text-sm py-3 px-10 text-center`}
  }

  & .title {
    ${tw`text-gray-900 text-2xl font-semibold`}
  }

  & .description {
    ${tw`text-gray-900 my-4`}
  }
`;

const TableOfContentContainer = tw.div`mx-20 my-5 bg-gray-100 flex flex-col px-4 py-3 rounded-lg shadow`;
const TableOfContentHeading = tw.div`leading-normal mb-3 text-base text-red-400 font-semibold text-lg text-center`;
const TableOfContent = styled.div`
  ${tw`text-sm text-gray-800 font-semibold`}
  ol {
    ${tw`list-decimal list-inside`}
    li {
      ${tw`ml-2 mb-3 hover:text-primary-500 transition duration-300 cursor-pointer`}
      p {
        ${tw`mt-0 inline leading-normal`}
      }
    }
  }
`;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw.div`my-3 text-teal-400 mx-auto text-sm hover:text-primary-500 transition duration-300 cursor-pointer`;
const ShortenButton = tw.div`my-3 text-red-400 mx-auto text-sm hover:text-primary-500 transition duration-300 cursor-pointer`;

const ShareContainer = tw.div`flex mt-10 items-center`;
const ShareText = tw.div`text-gray-800 font-semibold mr-3`;
const SocialText = tw.div`font-semibold text-xs pl-1`;
const SocialLinksContainer = tw.div`flex`;
const SocialLink = styled.p`
  ${tw`flex items-center cursor-pointer px-3 py-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-900 transition duration-300 mr-4`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const VideoContainer = tw.div`mt-8 mb-10 flex items-center justify-center`;
const VideoYT = tw.div`shadow-lg rounded`;

const CustomHeadingContainer = tw.div`mt-10 mb-5`
const CustomHeading = styled.p(({ color1, color2 }) => [
  tw`px-4 py-3 rounded-tl-3xl rounded-br-3xl rounded-bl-sm rounded-tr-sm inline text-white text-base font-semibold`,
  color1 && tw`bg-teal-500`,
  color2 && tw`bg-primary-500`,
])

const ContactContainer = tw.div`w-full my-10 py-5 flex items-center justify-center bg-gray-100 rounded-lg shadow-lg`
const ContactItem = styled.div(({ flexCol, normal }) => [
  tw`flex mx-4`,
  flexCol && tw`flex-col items-start`,
  normal && tw`items-center`,
])
const ContactSubTex = tw.div`font-semibold text-primary-500 text-sm`
const ContactText = tw.div`font-semibold text-gray-800 text-base`
const ContactButton = styled.div(({ color1, color2, color3 }) => [
  tw`flex flex-col items-center mx-4 text-4xl transition duration-300 cursor-pointer`,
  color1 && tw`text-teal-500 hover:text-teal-600`,
  color2 && tw`text-yellow-500 hover:text-yellow-600`,
  color3 && tw`text-red-500 hover:text-red-600`,
])
const ContactButtonText = tw.div`font-semibold text-gray-800 text-sm mt-3`

export default () => {
  document.title = 'Thông tin di sản';
  
  const { slug } = useParams();

  const defaultHeritage = {
    id: 0,
    name: '',
    short_description: '',
    time: '',
    image_360_url: '',
    urlslug: '',
    video_url: '',
    location_id: 0,
    management_unit_id: 0,
    heritage_type_id: 0,
    heritage_category_id: 0,
    view_count: 0,
    heritage_category: {
      id: 0,
      name: '',
      description: '',
      urlslug: ''
    },
    heritage_type: {
      id: 0,
      name: '',
      description: '',
      urlslug: ''
    },
    location: {
      id: 0,
      name: '',
      urlslug: '',
      image_url: '',
      description: '',
      short_description: ''
    },
    management_unit: {
      id: 0,
      name: '',
      description: '',
      urlslug: '',
      image_url: '',
      address: '',
      note: '',
      short_description: ''
    },
    images: []
  };

  const defaultParagraphs = [
    {
      id: 0,
      title: '',
      description: '',
      image_description: '',
      image_url: '',
      heritage_id: 0
    }
  ];

  const initialState = {
    heritage: {
      ...defaultHeritage,
    },
    paragraphs: defaultParagraphs
  }, [heritageData, setHeritageData] = useState(initialState);

  const [videoId, setVideoId] = useState("");

  useEffect(() => {
    getHeritageWithDetailBySlug(slug).then(data => {
      if (data) {
        setHeritageData(data);
        setVideoId(getVideoIdFromUrl(data.heritage.video_url))
        //console.log(data)
      }
      else
        setHeritageData(initialState);
    })

    increaseViewCount(slug).then(data => {
      if (data) {
        console.log(data)
      }
      else
        console.log("Lỗi")
    })

  }, []);


  const [visible, setVisible] = useState(3);
  const onLoadMoreClick = () => {
    setVisible(v => v + 3);
  };
  const onShortenClick = () => {
    setVisible(3);
  };

  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%"
    },
    hover: {
      backgroundSize: "110%"
    }
  };


  // Youtube player
  useEffect(() => {
    // Tạo một player YouTube khi component được tạo
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: videoId,
        playerVars: {
          autoplay: 0, // Đặt autoplay thành 0 để tắt tự động phát
        },
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    // Callback khi player YouTube đã sẵn sàng
    function onPlayerReady(event) {
      event.target.pauseVideo();
    }

    return () => {
      // Loại bỏ tham chiếu đến đối tượng YT bằng cách gán nó thành undefined
      window.YT = undefined;
      // Xoá các script và event khác khi component bị hủy
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  return (
    <AnimationRevealPage>
      <Container>
        <Row>
          <PopularPostsContainer>
            <SubHeading>Thông tin di sản</SubHeading>
            <Heading>{heritageData.heritage.name}</Heading>
            <InfoItem>
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              {"Số lượt xem: "}{toThousandFormat(heritageData.heritage.view_count)}
            </InfoItem>
            <TableOfContentContainer>
              <TableOfContentHeading>
                <FontAwesomeIcon icon={faBars} className="mr-3" />
                Mục lục
              </TableOfContentHeading>
              <TableOfContent>
                <ol type="1">
                  {heritageData.paragraphs.slice(0, visible).map((paragraph, index) => (
                    <li key={index}>
                      <a href={`#paragraph-${index}`} onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(`paragraph-${index}`).scrollIntoView({ behavior: "smooth" });
                      }}>
                        <p>{paragraph.title}</p>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href={`#paragraph-video`} onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`paragraph-video`).scrollIntoView({ behavior: "smooth" });
                    }}>
                      <p>Video chi tiết</p>
                    </a>
                  </li>
                  <li>
                    <a href={`#paragraph-image360`} onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(`paragraph-image360`).scrollIntoView({ behavior: "smooth" });
                    }}>
                      <p>Ảnh 360</p>
                    </a>
                  </li>
                </ol>
                {visible < heritageData.paragraphs.length ? (
                  <ButtonContainer>
                    <LoadMoreButton onClick={onLoadMoreClick}>
                      <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                      Xem thêm
                    </LoadMoreButton>
                  </ButtonContainer>
                )
                  :
                  (
                    heritageData.paragraphs.length > 3 &&
                    <ButtonContainer>
                      <ShortenButton onClick={onShortenClick}>
                        <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                        Ẩn bớt
                      </ShortenButton>
                    </ButtonContainer>
                  )}
              </TableOfContent>
            </TableOfContentContainer>

            <PostsContainer>
              {/* <TagContainer >
                  {heritageData.tags.map((tag, index) => (
                    <a href={`/blog/${"tag/"}${tag.urlSlug}`}>
                      <TagItem key={index} >
                        <FontAwesomeIcon icon={faTag} className="pr-2" />
                        {tag.name}
                      </TagItem>
                    </a>
                  ))}
                </TagContainer> */}

              {/* {isEmptyOrSpaces(heritageData.imageUrl) ? (
                  <BlogImage src={PostDefaultFull} />
                ) : (
                  <BlogImage src={heritageData.imageUrl} />
                )} */}

              {/* {heritageData.paragraphs.map((paragraph, index) => (
                  <Text key={index}>
                    {<FormatParagraph props={paragraph.description} />}
                  </Text>
                ))} */}

              <DescriptionContainer>
                {heritageData.paragraphs.map((paragraph, index) => (
                  <DescriptionWithImage key={index}
                    title={paragraph.title}
                    description={paragraph.description}
                    image_description={paragraph.image_description}
                    image_url={paragraph.image_url}
                    index={index}
                  />
                ))}
              </DescriptionContainer>
              <CustomHeadingContainer>
                <CustomHeading id={`paragraph-video`} color1>
                  <FontAwesomeIcon icon={faClapperboard} className="mr-2"/>
                  Video chi tiết
                </CustomHeading>
              </CustomHeadingContainer>
              {videoId === null ? (
                <BlogImage src={CatDefault} />
              ) : (
                <VideoContainer>
                <VideoYT id="youtube-player" />
              </VideoContainer>
              )}
    
              <CustomHeadingContainer>
                <CustomHeading id={`paragraph-image360`} color2>
                  <FontAwesomeIcon icon={faImage} className="mr-2"/>
                  Ảnh 360 độ
                </CustomHeading>
              </CustomHeadingContainer>

              {isEmptyOrSpaces(heritageData.heritage.image_360_url) ? (
                <BlogImage src={CatDefault} />
              ) : (
                <p>Có ảnh 360</p>
              )}

              <ContactContainer>
                <ContactItem flexCol>
                  <ContactSubTex>Phản hồi</ContactSubTex>
                  <ContactText>Bạn cảm thấy mô tả trên như thế nào?</ContactText>
                </ContactItem>
                <ContactItem normal>
                  <ContactButton color1>
                    <FontAwesomeIcon icon={faFaceLaughBeam} />
                    <ContactButtonText>Hài lòng</ContactButtonText>
                  </ContactButton>
                  <ContactButton color2>
                    <FontAwesomeIcon icon={faFaceMeh} />
                    <ContactButtonText>Tạm ổn</ContactButtonText>
                  </ContactButton>
                  <ContactButton color3>
                    <FontAwesomeIcon icon={faFaceFrownOpen} />
                    <ContactButtonText>Rất tệ</ContactButtonText>
                  </ContactButton>
                </ContactItem>
              </ContactContainer>
              <ShareContainer>
                <ShareText>
                  Chia sẻ:
                </ShareText>
                <SocialLinksContainer>
                  <FacebookShareButton url={window.location.href}>
                    <SocialLink>
                      <FacebookIcon />
                      <SocialText>Facebook</SocialText>
                    </SocialLink>
                  </FacebookShareButton>
                  <SocialLink>
                    <TwitterIcon />
                    <SocialText>Twitter</SocialText>
                  </SocialLink>
                </SocialLinksContainer>
              </ShareContainer>
            </PostsContainer>
          </PopularPostsContainer>

          <InfoSidebar heritage={heritageData.heritage} image={checkImageArray(heritageData.heritage.images)[0]} />
        </Row>
        <ThreeColSlider />
      </Container>
    </AnimationRevealPage>
  );
};
