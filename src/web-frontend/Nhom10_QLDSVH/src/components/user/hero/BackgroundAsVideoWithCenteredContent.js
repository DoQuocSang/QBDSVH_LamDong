import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import HomeVideo from "images/home.mp4"

import Header, { NavLink, NavLinks, PrimaryLink as PrimaryLinkBase, LogoLink, NavToggle, DesktopNavLinks } from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-primary-500`}
  }
`;

const PrimaryLink = tw(PrimaryLinkBase)`rounded-full`
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover h-screen min-h-144`}
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-25`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-5xl font-black text-gray-100 leading-snug pt-2 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SubHeading = styled.h1`
  ${tw`text-3xl text-center font-bold text-gray-100 leading-snug -mt-24 sm:mt-0`}
`;

const Description = styled.h1`
  ${tw`text-lg text-center font-semibold text-gray-100 leading-snug pt-5 px-48 sm:mt-0`}
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

const VideoBackground = styled.video`
  ${tw`absolute inset-0`}
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default () => {

  return (
    <Container>
      <VideoBackground autoPlay muted loop>
        <source src={HomeVideo} type="video/mp4" />
      </VideoBackground>
      <OpacityOverlay />
      <HeroContainer>
        <Content>
          <SubHeading>
            Chào mừng bạn đến với
          </SubHeading>
          <Heading>
            VNESCO - DI SẢN VĂN HÓA VIỆT NAM
          </Heading>
          <Description>
          Hãy khám phá vẻ đẹp và giá trị văn hóa độc đáo của Việt Nam qua những di sản tuyệt vời. Tại VNESCO, chúng tôi tự hào giới thiệu cho bạn những di sản có một không hai của đất nước ta. Hãy dạo một vòng quanh trang web để khám phá câu chuyện và giá trị văn hóa của các di tích lịch sử và danh hiệu UNESCO. 
          </Description>
          <PrimaryAction>Khám phá ngay</PrimaryAction>
        </Content>
      </HeroContainer>
    </Container>
  );
};
