import React, { useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg";
import CatDefault from "images/cat-404-full-2.png";

const ErrorImage = tw.img`max-w-screen-lg h-auto rounded-lg pt-4 mx-auto`;

export default () => {

  return (
    <Container>
       <ErrorImage src={CatDefault} />
    </Container>
  );
};
