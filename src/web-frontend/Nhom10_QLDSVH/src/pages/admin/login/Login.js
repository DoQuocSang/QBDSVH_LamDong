import React, { useState } from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { useNavigate } from "react-router-dom";
import { Container as ContainerBase } from "components/user/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/design-illustration.svg";
import logo from "images/logo1.png";
import googleIconImageSrc from "images/google-icon.png";
import facebookIconImageSrc from "images/facebook-icon.png";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { getUserByUserName } from "../../../services/UserRepository";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

const Container = tw(ContainerBase)`min-h-screen text-white font-medium flex justify-center m-0 bg-purple-300`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow-lg sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const SocialButtonsContainer = tw.div`flex flex-col items-center`;
const SocialButton = styled.a`
  ${tw`w-full max-w-xs font-semibold rounded-lg py-3 border text-gray-900 bg-gray-100 hocus:bg-gray-200 hocus:border-gray-400 flex items-center justify-center transition-all duration-300 focus:outline-none focus:shadow-outline text-sm mt-5 first:mt-0`}
  .iconContainer {
    ${tw`bg-white p-2 rounded-full`}
  }
  .icon {
    ${tw`w-4`}
  }
  .text {
    ${tw`ml-4`}
  }
`;

const DividerTextContainer = tw.div`my-12 border-b text-center relative`;
const DividerText = tw.div`leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform -translate-y-1/2 absolute inset-x-0 top-1/2 bg-transparent`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;
const ErrorText = tw.div`text-red-500 mt-2 font-semibold text-sm`;


export default () => {
  document.title = 'Đăng nhập Admin';

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  localStorage.setItem("loggedInUsername", "");

  const handleLogin = async (event) => {
    event.preventDefault();

    // Kiểm tra xem đã nhập tên đăng nhập và mật khẩu hay chưa
    if (!username) {
      setUsernameError("Vui lòng nhập tên đăng nhập");
      return;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Vui lòng nhập mật khẩu");
      return;
    } else {
      setPasswordError("");
    }

    const user = await getUserByUserName(username);

    if (user && user.password === password && user.permission === 1) {
      // Đăng nhập thành công, chuyển hướng đến trang chủ của admin
      setLoggedInUsername(user.user_name);
      localStorage.setItem("loggedInUsername", user.user_name);

      navigate("/admin/dashboard");
    } else {
      alert("Tên đăng nhập hoặc mật khẩu không chính xác.");
    }
  };

  const handleUsernameFocus = () => {
    setUsernameError("");
  };

  const handlePasswordFocus = () => {
    setPasswordError("");
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href="/">
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>Đăng nhập Admin</Heading>
              <FormContainer>
                <Form onSubmit={handleLogin}>
                  <Input
                    type="text"
                    placeholder="Nhập tên đăng nhập..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={handleUsernameFocus}
                  />
                  {usernameError &&
                    <ErrorText>
                      <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                      {usernameError}
                    </ErrorText>
                  }

                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handlePasswordFocus}
                  />
                  {passwordError &&
                    <ErrorText>
                      <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                      {passwordError}
                    </ErrorText>
                  }
                  <SubmitButton type="submit">
                    <LoginIcon className="icon" />
                    <span className="text">Đăng nhập</span>
                  </SubmitButton>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustration} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
}