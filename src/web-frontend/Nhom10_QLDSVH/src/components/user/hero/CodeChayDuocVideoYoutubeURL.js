import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import YouTube from "react-youtube";

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

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-black opacity-75`;

const HeroContainer = tw.div`z-20 relative px-6 sm:px-8 mx-auto h-full flex flex-col`;
const Content = tw.div`px-4 flex flex-1 flex-col justify-center items-center`;

const Heading = styled.h1`
  ${tw`text-3xl text-center sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-snug -mt-24 sm:mt-0`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const PrimaryAction = tw.button`rounded-full px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-gray-100 font-bold shadow transition duration-300 bg-primary-500 text-gray-100 hocus:bg-primary-700 hocus:text-gray-200 focus:outline-none focus:shadow-outline`;

const VideoBackground = styled.video`
  ${tw`absolute inset-0 object-cover w-full h-full`}
`;

export default () => {
  const videoId = "b6Tcm2rSvLc"; // ID video từ URL https://youtu.be/b6Tcm2rSvLc

  useEffect(() => {
    // Tạo một player YouTube khi component được tạo
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      new window.YT.Player("youtube-player", {
        videoId: videoId,
        events: {
          onReady: onPlayerReady,
        },
      });
    };

    // Callback khi player YouTube đã sẵn sàng
    function onPlayerReady(event) {
      event.target.playVideo();
    }

    return () => {
      // Loại bỏ tham chiếu đến đối tượng YT bằng cách gán nó thành undefined
      window.YT = undefined;
      // Xoá các script và event khác khi component bị hủy
      delete window.onYouTubeIframeAPIReady;
    };
  }, [videoId]);

  return (
    <div id="youtube-player">
      <Container>
        <OpacityOverlay />
        <HeroContainer>
          <Content>
            <Heading>
              Book Music & Comedy Events
              <br />
              anywhere in New York
            </Heading>
            <PrimaryAction>Search Events Near Me</PrimaryAction>
          </Content>
        </HeroContainer>
      </Container>
    </div>
  );
};
