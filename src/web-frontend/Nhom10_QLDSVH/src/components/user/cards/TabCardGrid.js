import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
// import { SectionHeading } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/user/misc/Buttons.js";
import { ReactComponent as StarIcon } from "images/star-icon.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import CatDefault from "images/cat-404-full-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDownAZ, faCube, faDollarSign, faEye } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { isEmptyOrSpaces } from "../../utils/Utils";
import { toVND } from "../../utils/Utils";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { getHeritages } from "../../../services/HeritageRepository";
import { handleGetFirstString } from "../../utils/Utils";
import { toThousandFormat } from "../../utils/Utils";
import { getHeritagesByLocationSlug } from "../../../services/LocationRepository";
import { getLocationBySlug } from "../../../services/LocationRepository";
import { scrollToTop } from "../../utils/Utils";
import { getHeritagesByManagementUnitSlug } from "../../../services/ManagementUnitRepository";
import { getManagementUnitBySlug } from "../../../services/ManagementUnitRepository";
import { getHeritagesByTypeSlug } from "../../../services/HeritageTypeRepository.js";
import { getHeritageTypeBySlug } from "../../../services/HeritageTypeRepository.js";
import { getHeritagesByCategorySlug } from "../../../services/HeritageCategoryRepository.js";
import { getHeritageCategoryBySlug } from "../../../services/HeritageCategoryRepository.js";
import MainInfoSection from "components/user/hero/BackgroundAsImageWithCenteredContent.js";
import { checkImageArray } from "../../utils/Utils";


const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`;
const Header = tw.h2`text-3xl font-black tracking-wide text-left`
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(motion.div)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`;
const Card = tw(motion.a)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0 shadow-md h-full`;
const CardImageContainer = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-56 xl:h-64 bg-center bg-cover relative rounded-t`}
`;
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`;
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-center`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`;
const CardButton = tw(PrimaryButtonBase)`text-sm`;

const CardReview = tw.div`font-medium text-xs text-gray-600`;

const CardText = tw.div`p-4 text-gray-900`;
const CardTitle = tw.h5`text-lg text-gray-800 font-semibold group-hover:text-primary-500 line-clamp-2`;
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600 line-clamp-3`;
const CardPrice = tw.p`mt-4 text-lg font-bold text-red-500`;

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const SubCardHeading = styled.div`
  ${tw`mr-1 text-xs font-semibold flex items-center mb-2 text-gray-700`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`;

const BlogImage = tw.img`w-full h-auto rounded-lg pt-4`;

export default ({ hasTab = true, isProductPage = false }) => {
  //scrollToTop();

  let { slug } = useParams();
  let { type } = useParams();

  if (typeof slug === 'undefined') {
    slug = "";
  }

  if (typeof type === 'undefined') {
    type = "";
  }

  const [heritageList, setHeritageList] = useState([]);
  const [headingText, setheadingText] = useState("Danh sách di sản");

  const initialState = {
    subHeading: '',
    heading: '',
    description: '',
    image_url: '',
  }, [mainInfo, setMainInfo] = useState(initialState);

  useEffect(() => {
    if (isEmptyOrSpaces(slug)) {
      getHeritages(1, 100, "name", "ASC").then(data => {
        if (data) {
          setHeritageList(data.data);
        }
        else
          setHeritageList([]);
        // console.log(data.data)
      })
    }
    else {
      if (type === "by-location") {
        getLocationBySlug(slug).then(data => {
          if (data) {
            setheadingText("Các di sản tại " + data.name);
            setMainInfo({
              ...data,
            });
          }
          else{
            setheadingText("Danh sách di sản");
            setMainInfo(initialState);
          }
          //console.log(data.items)
        })

        getHeritagesByLocationSlug(slug, 1, 100, "name", "ASC").then(data => {
          if (data) {
            setHeritageList(data.data);
          }
          else {
            setHeritageList([]);
          }
          //console.log(data.data)
        })
      }

      if (type === "by-management-unit") {
        getManagementUnitBySlug(slug).then(data => {
          if (data) {
            setheadingText("Các di sản thuộc " + data.name);
            setMainInfo({
              ...data,
            });
          }
          else {
            setheadingText("Danh sách di sản");
            setMainInfo(initialState);
          }
            
          // console.log(data.items)
        })

        getHeritagesByManagementUnitSlug(slug, 1, 100, "name", "ASC").then(data => {
          if (data) {
            setHeritageList(data.data);
          }
          else {
            setHeritageList([]);
          }
          //console.log(data.fullName)
        })
      }

      if (type === "by-heritage-category") {
        getHeritageCategoryBySlug(slug).then(data => {
          if (data) {
            setheadingText("Các di sản thuộc hình thức " + data.name);
            setMainInfo({
              ...data,
            });
          }
          else {
            setheadingText("Danh sách di sản");
            setMainInfo(initialState);
          }
          // console.log(data.items)
        })

        getHeritagesByCategorySlug(slug, 1, 100, "name", "ASC").then(data => {
          if (data) {
            setHeritageList(data.data);
          }
          else {

            setHeritageList([]);
          }
          //console.log(data.fullName)
        })
      }

      if (type === "by-heritage-type") {
        getHeritageTypeBySlug(slug).then(data => {
          if (data) {
            setheadingText("Các di sản thuộc loại " + data.name);
            setMainInfo({
              ...data,
            });
          }
          else {
            setheadingText("Danh sách di sản");
            setMainInfo(initialState);
          }
          // console.log(data.items)
        })

        getHeritagesByTypeSlug(slug, 1, 100, "name", "ASC").then(data => {
          if (data) {
            setHeritageList(data.data);
          }
          else {

            setHeritageList([]);
          }
          //console.log(data.fullName)
        })
      }
    }
  }, []);

  // const onLoadMoreClick = () => {
  //   getRandomBooks(8).then(data => {
  //     if (data) {
  //       setHeritageList(data.items);
  //       setMetadata(data.metadata);
  //     }
  //     else
  //       setHeritageList([]);
  //     //console.log(data.items)
  //   })
  //   return heritageList;
  // };

  let tabs = {
    "A-Z": ["name", "ASC"],
    "Z-A": ["name", "DESC"],
  }

  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  //  console.log(mainInfo)

  return (
    <Container>
      {/* <MainInfoSection /> */}
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>
            {headingText}
          </Header>

          {heritageList.length > 0 ? (
            <TabsControl>
              {hasTab && Object.keys(tabs).map((tabName, index) => (
                <TabControl key={index} active={activeTab === tabName} onClick={() => {
                  {
                    setActiveTab(tabName);
                    if (isEmptyOrSpaces(slug)) {
                      getHeritages(1, 100, tabs[tabName][0], tabs[tabName][1]).then(data => {
                        if (data) {
                          setHeritageList(data.data);
                        }
                        else {
                          setHeritageList([]);
                        }
                        //console.log(heritageList);
                      })
                    }
                  }

                  if (type === "by-management-unit") {
                    getHeritagesByManagementUnitSlug(slug, 1, 100, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setHeritageList(data.data);
                      }
                      else {
                        setHeritageList([]);
                      }
                      //console.log(data.fullName)
                    })
                  }

                  if (type === "by-location") {
                    getHeritagesByLocationSlug(slug, 1, 100, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setHeritageList(data.data);
                      }
                      else {

                        setHeritageList([]);
                      }
                      //console.log(data.data)
                    })
                  }

                  if (type === "by-heritage-category") {
                    getHeritagesByCategorySlug(slug, 1, 100, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setHeritageList(data.data);
                      }
                      else {

                        setHeritageList([]);
                      }
                      //console.log(data.fullName)
                    })
                  }

                  if (type === "by-heritage-type") {
                    getHeritagesByTypeSlug(slug, 1, 100, tabs[tabName][0], tabs[tabName][1]).then(data => {
                      if (data) {
                        setHeritageList(data.data);
                      }
                      else {

                        setHeritageList([]);
                      }
                      //console.log(data.fullName)
                    })
                  }
                }}>
                  {tabName}
                </TabControl>
              ))}
            </TabsControl>
          )
            : ("")}
        </HeaderRow>

        {heritageList.length === 0 ? <BlogImage src={CatDefault} /> : ""}

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              }
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {heritageList.map((card, index) => (
              <CardContainer key={index}>
                <Card className="group" href={"/heritage-detail/" + card.urlslug} initial="rest" whileHover="hover" animate="rest">
                  <CardImageContainer imageSrc={checkImageArray(card.images)[0]}>
                    <CardRatingContainer>
                      <CardRating>
                        <FontAwesomeIcon icon={faCube} className="pr-1" />
                        {card.heritage_category.name}
                      </CardRating>
                      {/* <CardReview>({card.name})</CardReview> */}
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto"
                        },
                        rest: {
                          opacity: 0,
                          height: 0
                        }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <a href={`/heritage-detail/${card.urlslug}`}>
                        <CardButton>Xem chi tiết</CardButton>
                      </a>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <SubCardHeading>
                      <FontAwesomeIcon icon={faEye} className="pr-1 text-teal-500" />
                      {toThousandFormat(card.view_count)} lượt xem
                    </SubCardHeading>
                    <CardTitle>{card.name}</CardTitle>
                    <CardContent>{card.short_description}</CardContent>
                    {/* <CardPrice>
                      {card.time}
                    </CardPrice> */}
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  );
};

