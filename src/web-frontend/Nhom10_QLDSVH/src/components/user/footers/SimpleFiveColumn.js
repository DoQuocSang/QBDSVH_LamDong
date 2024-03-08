import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import LogoImage from "images/logo1.png";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import { PaddingContainer } from "components/user/headers/light";

const Container = tw.div`relative bg-gray-200 -mx-8 -mb-8 px-8`;
const FiveColumns = tw.div`max-w-screen-xl mx-auto py-16 lg:py-20 flex flex-wrap justify-between`;

const Column = tw.div`md:w-1/5`;
const WideColumn = tw(Column)`text-center md:text-left w-full md:w-2/5 mb-10 md:mb-0`;

const ColumnHeading = tw.h5`font-bold`;

const LinkList = tw.ul`mt-4 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:text-primary-500 hocus:border-primary-500 pb-1 transition duration-300`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-32`;
const LogoText = tw.h5`ml-2 text-xl font-black text-primary-500`;

const CompanyDescription = tw.p`mt-4 max-w-xs font-medium text-sm mx-auto md:mx-0 md:mr-4 `;

const TextPrimary = tw(CompanyDescription)`mt-2`;

const SocialLinksContainer = tw.div`mt-4 `;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-700 text-gray-100 hover:bg-gray-900 transition duration-300 mr-4`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

export default () => {
  return (
    <PaddingContainer>
      <Container>
        <FiveColumns>
          <WideColumn>
            <LogoContainer>
              <LogoImg src={LogoImage} />
            </LogoContainer>
            <CompanyDescription>
              VNESCO là trang web giới thiệu di sản văn hóa tại Việt Nam.
              Nếu có bất kì thắc mắc nào hãy liên hệ với chúng tôi qua những đường link bên dưới
            </CompanyDescription>

            <TextPrimary>
              <span tw="font-bold">
                <FontAwesomeIcon icon={faPhone} css={tw`mr-2  text-xs`} />
                Số điện thoại:
              </span> 0909.789.789
            </TextPrimary>

            <TextPrimary>
              <span tw="font-bold">
                <FontAwesomeIcon icon={faMapLocationDot} css={tw`mr-2  text-xs`} />
                Địa chỉ:
              </span> 1 Đường Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt, Lâm Đồng
            </TextPrimary>

            <SocialLinksContainer>
              <SocialLink href="/not-found-404">
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="/not-found-404">
                <TwitterIcon />
              </SocialLink>
              <SocialLink href="/not-found-404">
                <YoutubeIcon />
              </SocialLink>
            </SocialLinksContainer>
          </WideColumn>
          <Column>
            <ColumnHeading>Lối tắt</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="/all-product">Danh mục</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Giấy phép</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Hỗ trợ</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/about-us">Giới thiệu</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Tài khoản</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="/login">Đăng nhập</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Chi tiết tài khoản</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Đặt lịch tham quan</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Mục ưa thích</Link>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>Liên hệ</ColumnHeading>
            <LinkList>
              <LinkListItem>
                <Link href="/not-found-404">Hỗ trợ</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Góp ý</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Bản đồ</Link>
              </LinkListItem>
              <LinkListItem>
                <Link href="/not-found-404">Địa chỉ</Link>
              </LinkListItem>
            </LinkList>
          </Column>
        </FiveColumns>
      </Container>
    </PaddingContainer>

  );
};
