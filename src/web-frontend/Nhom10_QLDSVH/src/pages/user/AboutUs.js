import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import MainFeature1 from "components/user/features/TwoColNormal.js";
import Features from "components/user/features/ThreeColSimple.js";
import TeamCardGrid from "components/user/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  document.title = 'Giới thiệu';

  return (
    <AnimationRevealPage>
      <MainFeature1
        subheading={<Subheading>Di sản văn hóa Việt</Subheading>}
        heading="Chào mừng bạn đến với Di sản văn hóa Lâm Đồng"
        description={"Trang web này được tạo ra với mục đích giới thiệu và tôn vinh di sản văn hóa đặc biệt của tỉnh Lâm Đồng, Việt Nam. Mang trong mình sứ mệnh quảng bá và bảo tồn những giá trị văn hóa độc đáo của quê hương, Di sản văn hóa Lâm Đồng sẽ là cầu nối đưa du khách Việt Nam và quốc tế đến gần hơn với kho tàng văn hóa phong phú của mảnh đất này."}
        imageSrc="https://bcp.cdnchinhphu.vn/334894974524682240/2023/12/29/toan-canh-thanh-pho-da-lat-suong-mu-17038482792911456722988.jpg"
      />
      <MainFeature1
        subheading={<Subheading>Khám phá kho tàng lịch sử và bản sắc độc đáo</Subheading>}
        heading="Cung cấp thông tin di sản cho mọi người"
        description={"Lâm Đồng, mảnh đất được mệnh danh là \"Đà Lạt mộng mơ\", sở hữu kho tàng di sản văn hóa vô cùng phong phú và độc đáo. Du khách đến với Lâm Đồng không chỉ bị thu hút bởi cảnh đẹp thiên nhiên hùng vĩ mà còn bởi những giá trị văn hóa truyền thống được lưu giữ qua bao thế hệ. \n Di sản văn hóa Lâm Đồng là hành trình đưa du khách khám phá những di sản vật thể và phi vật thể quý giá, mang đậm bản sắc văn hóa của các dân tộc thiểu số Tây Nguyên. Mỗi di sản đều ẩn chứa những câu chuyện lịch sử, truyền thuyết, và những giá trị văn hóa độc đáo, góp phần tạo nên bức tranh văn hóa đa sắc màu của Lâm Đồng."}
        textOnLeft={false}
        imageSrc="https://cdn3.ivivu.com/2022/10/Bao-tang-Lam-Dong-03.jpg"
      />
      <Features
        subheading={<Subheading>Phương châm hoạt động</Subheading>}
        heading="Đây là 3 tiêu chí đi đầu của Di sản văn hóa Lâm Đồng"
        description="Di sản văn hóa Lâm Đồng hoạt động dựa trên ba phương châm chính để mang đến trải nghiệm tốt nhất cho người dùng"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Khám phá",
            description: "Di sản văn hóa Lâm Đồng tập trung vào việc khám phá và tìm hiểu về di sản văn hóa độc đáo của Việt Nam"
          },
          {
            imageSrc: ShieldIconImage,
            title: "Bảo tồn",
            description: "Di sản văn hóa Lâm Đồng nhấn mạnh vai trò quan trọng của việc bảo tồn và xây dựng nhận thức cộng đồng về giá trị của di sản văn hóa"
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Trải nghiệm và chia sẻ",
            description: "Khuyến khích người dùng chia sẻ những trải nghiệm, hình ảnh và câu chuyện cá nhân liên quan đến di sản văn hóa"
          },
        ]}
        linkText=""
      />
      <TeamCardGrid 
        subheading={<Subheading>Đội ngũ của chúng tôi</Subheading>}
        heading="Các thành viên chủ chốt của Di sản văn hóa Lâm Đồng"
        description="Dưới đây là những người đã sáng lập nên Di sản văn hóa Lâm Đồng và có những đóng góp to lớn vào sự nghiệp phát triển của công ty"
      />
    </AnimationRevealPage>
  );
};
