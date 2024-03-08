import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/user/misc/Headings.js";
import { SectionDescription } from "components/user/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/user/misc/Layouts.js";
import { ReactComponent as ChevronDownIcon } from "feather-icons/dist/icons/chevron-down.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center mb-20`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;



export default ({
  subheading = "Hỗ trợ",
  heading = "Một vấn đề thường gặp",
  description = "Nếu bạn đăng gặp phải khó khăn trong khi sử dụng trang web VNESCO để xem hoặc quản lý thông tin di sản văn hóa, hãy đọc các ý bên dưới.",
  faqs = [
    {
      question: "VNESCO là trang web gì?",
      answer:
        "VNESCO là một trang web cung cấp thông tin và quản lý di sản văn hóa tại Việt Nam. Trang web này được thiết kế để giúp người dùng khám phá, tìm hiểu và trải nghiệm về các di sản văn hóa độc đáo và quan trọng của nước ta. Bạn có thể tìm thấy thông tin chi tiết về các di sản văn hóa, bao gồm mô tả, hình ảnh, địa điểm và các thông tin liên quan khác. Ngoài ra, VNESCO cũng cung cấp các tính năng cho việc quản lý của admin."
    },
    {
      question: "Làm thế nào để xem thông tin di sản văn hóa ở địa phương của bạn?",
      answer:
        `Để xem di sản văn hóa ở địa phương của bạn, bạn có thể truy cập tab danh mục trên thanh điều hướng và chọn địa phương của mình hoặc bạn có thể tìm địa phương mình ở mục "Danh sách địa điểm" ở trang chủ, sau đó hãy danh sách di sản sẽ hiện ra và bạn có thể chọn một di sản để xem thông tin chi tiết`
    },
    {
      question: "Cách truy cập trang quản lý Admin?",
      answer:
        `Để truy cập trang quản lý admin, từ đường dẫn mặc định của trang web "http://localhost:3000/", hãy thêm "/admin" vào đuôi đường dẫn, bạn sẽ được điều hướng đến trang đăng nhập admin, sau đó bạn cần phải sử dụng tài khoản admin để xác thực và truy cập trang quản lý admin`
    },
    {
      question: "Tôi có thể nhận hỗ trợ ở đâu?",
      answer:
        "Để nhận được sự hỗ trợ hoặc gửi các phản hồi cũng như thắc mắc, hãy liên hệ với bộ phận chăm sóc khách hàng theo số điện thoại 0909.789.789 hoặc gửi thắc mắc vào form ở trang hỗ trợ"
    }
  ]
}) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);

  const toggleQuestion = questionIndex => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };

  return (
    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
          </HeaderContent>
          <FAQSContainer>
            {faqs.map((faq, index) => (
              <FAQ
                key={index}
                onClick={() => {
                  toggleQuestion(index);
                }}
                className="group"
              >
                <Question>
                  <QuestionText>{faq.question}</QuestionText>
                  <QuestionToggleIcon
                    variants={{
                      collapsed: { rotate: 0 },
                      open: { rotate: -180 }
                    }}
                    initial="collapsed"
                    animate={activeQuestionIndex === index ? "open" : "collapsed"}
                    transition={{ duration: 0.02, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <ChevronDownIcon />
                  </QuestionToggleIcon>
                </Question>
                <Answer
                  variants={{
                    open: { opacity: 1, height: "auto", marginTop: "16px" },
                    collapsed: { opacity: 0, height: 0, marginTop: "0px" }
                  }}
                  initial="collapsed"
                  animate={activeQuestionIndex === index ? "open" : "collapsed"}
                  transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  {faq.answer}
                </Answer>
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
  );
};
