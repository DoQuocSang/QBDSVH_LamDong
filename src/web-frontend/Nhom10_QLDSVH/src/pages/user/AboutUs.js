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
        heading="VNESCO - Thế giới Di sản Văn hóa Việt Nam"
        description={"VNESCO là một trang web với mục đích giới thiệu và tôn vinh di sản văn hóa đặc biệt của Việt Nam. Với sứ mệnh quảng bá và bảo tồn di sản văn hóa của đất nước, VNESCO mang đến cho người Việt Nam và du khách quốc tế một cửa sổ thú vị để khám phá, tìm hiểu và trân quý những giá trị văn hóa độc đáo của đất nước này.\n VNESCO mang đến một tập hợp đa dạng của các địa điểm và hiện vật mang tính biểu tượng, lịch sử và văn hóa ở đất nước Việt Nam."}
        imageSrc="http://hoangthanhthanglong.com/store/uploads/2022/11/z3898777482646_c6dc7d692be7f6e40479db5abfcbb239.jpg"
      />
      <MainFeature1
        subheading={<Subheading>SỨ MỆNH CỦA VNESCO</Subheading>}
        heading="Cung cấp thông tin di sản cho mọi người"
        description={"Trang web VNESCO cung cấp thông tin chi tiết về mỗi di sản văn hóa, bao gồm lịch sử, kiến trúc, nghệ thuật, giá trị văn hóa và những câu chuyện đặc biệt xung quanh chúng. Bạn có thể tìm hiểu về các địa điểm như cố đô Huế, thành phố cổ Hội An, vịnh Hạ Long, đền Hùng và rất nhiều điểm đến khác mà Việt Nam tự hào có. \n Hãy khám phá VNESCO ngay hôm nay và truy cập vào thế giới phong phú của di sản văn hóa Việt Nam. Mỗi trang trên VNESCO là một chuyến hành trình đưa bạn đến gần hơn với những nét đẹp và giá trị sâu sắc của di sản văn hóa đặc biệt này"}
        textOnLeft={false}
        imageSrc="http://hoangthanhthanglong.com/store/uploads/2022/11/z3898777484086_f26a17d07f51dfc5f4c668d3184039e1.jpg"
      />
      <Features
        subheading={<Subheading>Phương châm hoạt động</Subheading>}
        heading="Đây là 3 tiêu chí đi đầu của VNESCO"
        description="VNESCO hoạt động dựa trên ba phương châm chính để mang đến trải nghiệm tốt nhất cho người dùng"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Khám phá",
            description: "VNESCO tập trung vào việc khám phá và tìm hiểu về di sản văn hóa độc đáo của Việt Nam"
          },
          {
            imageSrc: ShieldIconImage,
            title: "Bảo tồn",
            description: "VNESCO nhấn mạnh vai trò quan trọng của việc bảo tồn và xây dựng nhận thức cộng đồng về giá trị của di sản văn hóa"
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
        heading="Các thành viên chủ chốt của VNESCO"
        description="Dưới đây là những người đã sáng lập nên VNESCO và có những đóng góp to lớn vào sự nghiệp phát triển của công ty"
      />
    </AnimationRevealPage>
  );
};
