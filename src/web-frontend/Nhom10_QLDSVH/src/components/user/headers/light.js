import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../../helpers/useAnimatedNavToggler.js";
import CatDefault from "images/cat-default-nobg.png";
import logo from "images/logo1.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { faBriefcase, faCaretDown, faCaretUp, faComment, faCube, faHeadset, faImage, faLocationDot, faMinusCircle, faPlusCircle, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import catFind from "images/cat-find.png"
import { isEmptyOrSpaces } from "../../utils/Utils";
import { getLocations } from "../../../services/LocationRepository.js";
import { getManagementUnits } from "../../../services/ManagementUnitRepository.js";
import { getHeritageTypes } from "../../../services/HeritageTypeRepository.js";
import { getHeritageCategories } from "../../../services/HeritageCategoryRepository.js";

// import { getAuthors } from "../../../services/AuthorRepository.js";
// import { getCategories } from "../../../services/CategoryRepository.js";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const PaddingContainer = tw.div`py-2`;

export const NavLinks = tw.div`inline-block`;

export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`h-12 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between`;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900 bg-white`}
  ${NavLinks} {
    ${tw`flex flex-col items-center`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export const MenuOnHover = tw.div`invisible py-5 absolute z-50 rounded-md flex bg-gray-100 py-1 px-4 text-gray-800 shadow-xl group-hover:visible`;
export const MenuItem = styled.a(({ isShowMore, isShorten, isNormal }) => [
  tw`px-5 py-3 hover:text-primary-500 transition duration-300`,
  isNormal && tw`text-gray-600`,
  isShowMore && tw`text-teal-400`,
  isShorten && tw`text-red-500`,
]);

export const MenuContainer = styled.div(({ flexCol }) => [
  tw`grid grid-cols-4 grow-0 mb-5`,
  flexCol && tw`flex flex-col`,
])

export const MenuTitle = tw.h2`px-5 font-semibold text-base text-red-500`;
export const MenuSection = styled.div(({ hasBorder }) => [
  tw``,
  hasBorder && tw`border-r-2 border-gray-300 w-64`,
])

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:mx-0`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-4 rounded-full border-2 w-full font-medium focus:outline-none transition duration-300  focus:border-primary-500 hover:border-gray-500`}
  }
  button {
    ${tw`w-full sm:absolute right-0 top-0 bottom-0 bg-primary-500 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-primary-900 transition duration-300`}
  }
`;

export const ImageFinding = tw.img`text-center w-1/2 mx-auto`;
const ErrorImage = tw.img`max-w-xs h-auto rounded-lg pt-4`;


export default ({ roundedHeaderButton = false, logoLink, links, className, collapseBreakpointClass = "lg" }) => {
  const [locationList, setLocationList] = useState([]);
  const [heritageTypeList, setHeritageTypeList] = useState([]);
  const [heritageCategoryList, setHeritageCategoryList] = useState([]);
  const [managementUnitList, setManagementUnitList] = useState([]);

  const [categoriesVisible, setCategoriesVisible] = useState(7);
  const onLoadMoreCategoriesClick = () => {
    setCategoriesVisible(v => v + 8);
  };

  const [locationsVisible, setLocationsVisible] = useState(7);
  const onLoadMoreLocationsClick = () => {
    setLocationsVisible(v => v + 8);
  };

  const [managementUnitsVisible, setManagementUnitsVisible] = useState(7);
  const onLoadMoreManagementUnitsVisibleClick = () => {
    setManagementUnitsVisible(v => v + 8);
  };

  useEffect(() => {
    document.title = 'Trang chủ';

    getHeritageTypes(1, 100, "name", "ASC").then(data => {
      if (data) {
        setHeritageTypeList(data.data);
      }
      else {
        setHeritageTypeList([]);
      }
      //console.log(data)
    })

    getLocations(1, 100, "name", "ASC").then(data => {
      if (data) {
        setLocationList(data.data);
      }
      else {
        setLocationList([]);
      }
    })

    getManagementUnits(1, 100, "name", "ASC").then(data => {
      if (data) {
        setManagementUnitList(data.data);
      }
      else {
        setManagementUnitList([]);
      }
    })

    getHeritageCategories(1, 100, "name", "ASC").then(data => {
      if (data) {
        setHeritageCategoryList(data.data);
      }
      else {
        setHeritageCategoryList([]);
      }
    })
  }, []);

  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink className="group" css={tw`cursor-pointer`}>
        <Link to="/all-heritage">
          <FontAwesomeIcon icon={faListUl} css={tw`mr-2 text-base`} />
          Danh mục
        </Link>
        <MenuOnHover>
          <MenuSection hasBorder>
            <MenuTitle>
              <FontAwesomeIcon icon={faBookmark} css={tw`mr-2 text-base`} />
              Loại di sản
            </MenuTitle>
            {heritageTypeList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
            <MenuContainer flexCol>
              {heritageTypeList.map((item, i) => (
                <MenuItem isNormal href={"/all-heritage/"+ "by-heritage-type/" + item.urlslug}>
                  {item.name}
                </MenuItem>
              ))}
            </MenuContainer>
          </MenuSection>

          <MenuSection flexCol>
            <MenuSection>
              <MenuTitle>
                <FontAwesomeIcon icon={faCube} css={tw`mr-2 text-base`} />
                Hình thức di sản
              </MenuTitle>
              {heritageCategoryList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
              <MenuContainer >
                {heritageCategoryList.slice(0, categoriesVisible).map((item, i) => (
                  <MenuItem isNormal href={"/all-heritage/"+ "by-heritage-category/" + item.urlslug}>
                    {item.name}
                  </MenuItem>
                ))}
                {categoriesVisible < heritageCategoryList.length ? (
                  <MenuItem isShowMore onClick={onLoadMoreCategoriesClick}>
                    <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                    Xem thêm
                  </MenuItem>
                )
                  :
                  (
                    heritageCategoryList.length > 7 &&
                    <MenuItem isShorten onClick={() => { setCategoriesVisible(7) }}>
                      <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                      Thu gọn
                    </MenuItem>
                  )
                }
              </MenuContainer>
            </MenuSection>

            <MenuSection>
              <MenuTitle>
                <FontAwesomeIcon icon={faLocationDot} css={tw`mr-2 text-base`} />
                Địa điểm
              </MenuTitle>
              {locationList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
              <MenuContainer >
                {locationList.slice(0, locationsVisible).map((item, i) => (
                  <MenuItem isNormal href={"/all-heritage/"+ "by-location/" + item.urlslug}>
                    {item.name}
                  </MenuItem>
                ))}
                {locationsVisible < locationList.length ? (
                  <MenuItem isShowMore onClick={onLoadMoreLocationsClick}>
                    <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                    Xem thêm
                  </MenuItem>
                )
                  :
                  (
                    locationList.length > 7 &&
                    <MenuItem isShorten onClick={() => { setLocationsVisible(7) }}>
                      <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                      Thu gọn
                    </MenuItem>
                  )
                }
              </MenuContainer>
            </MenuSection>

            <MenuSection>
              <MenuTitle>
                <FontAwesomeIcon icon={faBriefcase} css={tw`mr-2 text-base`} />
                Đơn vị quản lý
              </MenuTitle>
              {managementUnitList.length === 0 ? <ErrorImage src={CatDefault} /> : ""}
              <MenuContainer >
                {managementUnitList.slice(0, managementUnitsVisible).map((item, i) => (
                  <MenuItem isNormal href={"/all-heritage/"+ "by-management-unit/" + item.urlslug}>
                    {item.name}
                  </MenuItem>
                ))}
                {managementUnitsVisible < managementUnitList.length ? (
                  <MenuItem isShowMore onClick={onLoadMoreManagementUnitsVisibleClick}>
                    <FontAwesomeIcon icon={faCaretDown} css={tw`mr-2 text-base`} />
                    Xem thêm
                  </MenuItem>
                )
                  :
                  (
                    managementUnitList.length > 7 &&
                    <MenuItem isShorten onClick={() => { setManagementUnitsVisible(7) }}>
                      <FontAwesomeIcon icon={faCaretUp} css={tw`mr-2 text-base`} />
                      Thu gọn
                    </MenuItem>
                  )
                }
              </MenuContainer>
            </MenuSection>
          </MenuSection>

        </MenuOnHover>
      </NavLink>

      <NavLink className="group" css={tw`cursor-pointer`}>
        <FontAwesomeIcon icon={faMagnifyingGlass} css={tw`mr-2 text-base`} />
        Tìm kiếm
        <MenuOnHover>
          <MenuSection flexCol>
            <ImageFinding src={catFind} />
            <Actions>
              <input type="text" placeholder="Nhập tên sách cần tìm..." />
              <button>Tìm kiếm</button>
            </Actions>
          </MenuSection>
        </MenuOnHover>
      </NavLink>

      <Link to="/about-us">
        <NavLink>
          <FontAwesomeIcon icon={faPeopleRoof} css={tw`mr-2 text-base`} />
          Giới thiệu
        </NavLink>
      </Link>

      <Link to="/contact">
        <NavLink>
          <FontAwesomeIcon icon={faComment} css={tw`mr-2 text-base`} />
          Liên hệ
        </NavLink>
      </Link>

      <Link to="/gallery">
        <NavLink>
          <FontAwesomeIcon icon={faImage} css={tw`mr-2 text-base`} />
          Thư viện
        </NavLink>
      </Link>

      <Link to="/login">
        <NavLink tw="lg:ml-12!">
          Đăng nhập
        </NavLink>
      </Link>

      <Link to="/signup">
        <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
          Đăng ký
        </PrimaryLink>
      </Link>
    </NavLinks>
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <Link to="/">
      <LogoLink>
        <img src={logo} alt="logo" />
      </LogoLink>
    </Link>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <PaddingContainer>
      <Header className={className || "header-light"}>
        <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
          {logoLink}
          {links}
        </DesktopNavLinks>

        <MobileNavLinksContainer css={collapseBreakpointCss.mobileNavLinksContainer}>
          {logoLink}
          <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} css={collapseBreakpointCss.mobileNavLinks}>
            {links}
          </MobileNavLinks>
          <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
            {showNavLinks ? <CloseIcon tw="w-6 h-6" /> : <MenuIcon tw="w-6 h-6" />}
          </NavToggle>
        </MobileNavLinksContainer>
      </Header>
    </PaddingContainer>

  );
};

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`
  }
};
