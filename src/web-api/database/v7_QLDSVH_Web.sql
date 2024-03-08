/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `heritage_categories`;
CREATE TABLE `heritage_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `description` longtext,
  `urlslug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `heritage_types`;
CREATE TABLE `heritage_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `description` longtext,
  `urlslug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `heritages`;
CREATE TABLE `heritages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `heritage_type_id` int NOT NULL,
  `description` longtext,
  `location_id` int NOT NULL,
  `image_url` longtext,
  `management_unit_id` int NOT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1990',
  `urlslug` varchar(255) NOT NULL,
  `heritage_category_id` int NOT NULL,
  `video_url` longtext,
  `short_description` longtext,
  `image_360_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `view_count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `heritage_type_id` (`heritage_type_id`),
  KEY `management_unit_id` (`management_unit_id`),
  KEY `location` (`location_id`),
  KEY `heritage_category_id` (`heritage_category_id`),
  CONSTRAINT `heritages_ibfk_2` FOREIGN KEY (`management_unit_id`) REFERENCES `management_units` (`id`),
  CONSTRAINT `heritages_ibfk_3` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `heritages_ibfk_5` FOREIGN KEY (`heritage_type_id`) REFERENCES `heritage_types` (`id`),
  CONSTRAINT `heritages_ibfk_6` FOREIGN KEY (`heritage_category_id`) REFERENCES `heritage_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `urlslug` varchar(255) NOT NULL,
  `image_url` longtext,
  `short_description` text,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `management_units`;
CREATE TABLE `management_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `urlslug` varchar(255) NOT NULL,
  `image_url` longtext,
  `address` text NOT NULL,
  `note` text,
  `short_description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subscribe_day` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(50) NOT NULL,
  `permission` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `heritage_categories` (`id`, `name`, `description`, `urlslug`) VALUES
(1, 'Di sản văn hóa thế giới', 'Di sản văn hóa thế giới', 'di-san-van-hoa-the-gioi');
INSERT INTO `heritage_categories` (`id`, `name`, `description`, `urlslug`) VALUES
(2, 'Di sản hỗn hợp', 'Di sản hỗn hợp', 'di-san-hon-hop');
INSERT INTO `heritage_categories` (`id`, `name`, `description`, `urlslug`) VALUES
(3, 'Di tích quốc gia', 'Di tích quốc gia', 'di-tich-quoc-gia');
INSERT INTO `heritage_categories` (`id`, `name`, `description`, `urlslug`) VALUES
(4, 'Nghệ thuật trình diễn dân gian', 'Nghệ thuật trình diễn dân gian', 'nghe-thuat-trinh-dien-dan-gian'),
(5, 'Lễ hội truyền thống', 'Lễ hội truyền thống', 'le-hoi-truyen-thong'),
(6, 'Tập quán xã hội và tín ngưỡng', 'Tập quán xã hội và tín ngưỡng', 'tap-quan-xa-hoi-va-tin-nguong'),
(7, 'Tiếng nói, chữ viết', 'Tiếng nói, chữ viết', 'tieng-noi-chu-viet'),
(8, 'Nghề thủ công truyền thống', 'Nghề thủ công truyền thống', 'nghe-thu-cong-truyen-thong'),
(9, 'Tri thức dân gian', 'Tri thức dân gian', 'tri-thuc-dan-gian'),
(10, 'Ngữ văn dân gian', 'Ngữ văn dân gian', 'ngu-van-dan-gian'),
(11, 'Hiện vật', 'Hiện vật', 'hien-vat'),
(12, 'Tượng', 'Tượng', 'tuong'),
(13, 'Phương tiện', 'Phương tiện', 'phuong-tien'),
(14, 'Vũ khí', 'Vũ khí', 'vu-khi'),
(15, 'Trang sức', 'Trang sức', 'trang-suc'),
(16, 'Công trình', 'Công trình', 'cong-trinh'),
(17, 'Khác', 'Khác', 'khac');

INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(1, 'Di sản văn hóa thiên nhiên', 'Di sản văn hóa thiên nhiên', 'di-san-van-hoa-thien-nhien');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(2, 'Di sản văn hóa phi vật thể', 'Di sản văn hóa phoi vật thể', 'di-san-van-hoa-phi-vat-the');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(3, 'Di tích', 'Di tích', 'di-tich');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(4, 'Bảo vật quốc gia', 'Bảo vật quốc gia', 'bao-vat-quoc-gia');

INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `image_360_url`, `view_count`) VALUES
(1, 'Trống đồng Ngọc Lũ', 4, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', 1, 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-ngoc-lu', 11, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 1000000);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `image_360_url`, `view_count`) VALUES
(2, 'Trống đồng Hoàng Hạ', 4, 'Hoàng Hạ là một trong những chiếc trống đồng Đông Sơn có kích thước lớn, có nhiều hoa văn phong phú, hiện được tàng trữ tại Bảo tàng Lịch sử Việt Nam.', 1, 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-hoang-ha', 11, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 123500);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `image_360_url`, `view_count`) VALUES
(3, 'Thạp đồng Đào Thịnh', 4, 'Thạp đồng Đào Thịnh là một hiện vật bằng đồng thuộc nền văn hóa Đông Sơn. Thạp được phát hiện năm 1961, được xác định có niên đại từ 2500 - 2000 năm cách ngày nay. Thạp là một trong những bảo vật quốc gia đầu tiên của Việt Nam được Thủ tướng Chính phủ công nhận năm 2012, hiện đang lưu giữ ở Bảo tàng Lịch sử Quốc gia Việt Nam', 1, 'http://redsvn.net/wp-content/uploads/2016/02/Redsvn-Thap-Dao-Thinh-01.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'thap-dong-dao-thinh', 11, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 21300);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `image_360_url`, `view_count`) VALUES
(4, 'Tượng đồng hai người cõng nhau thổi khèn', 4, 'Bảo vật quốc gia - Tượng đồng hai người cõng nhau thổi khèn', 1, 'http://redsvn.net/wp-content/uploads/2022/03/Tuong-nguoi-cong-nhau-thoi-khen-01.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'tuong-dong-hai-nguoi-cong-nhau-thoi-khen', 12, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 45897),
(5, 'Cây đèn đồng hình người quỳ', 4, 'Cây đèn hình người quỳ - bảo vật từ ngôi mộ cổ', 1, 'https://www.khanhhoa.gov.vn/Resources/Images/bandocquantam/Nam2017/Thang12/tem.jpg', 1, 'Cách ngày nay 2000 - 1700 năm\r\nVăn hóa Đông Sơn', 'cay-den-dong-hinh-nguoi-quy', 11, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 1230),
(6, 'Trống đồng Cảnh Thịnh', 4, 'Bảo vật quốc gia - Trống đồng Cảnh Thịnh', 1, 'https://danviet.mediacdn.vn/296231569849192448/2022/11/6/143-16677501482351408682120.jpg', 1, 'Năm 1800\r\nThời Tây Sơn', 'trong-dong-canh-thinh', 11, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 2536),
(7, 'Tượng Phật Đồng Dương', 4, 'Tượng Phật Đồng Dương', 2, 'http://redsvn.net/wp-content/uploads/2022/03/Tuong-Phat-Dong-Duong-02.jpg', 3, 'Thế kỷ VIII-XIX\r\nVăn hóa Chăm Pa', 'tuong-phat-dong-duong', 12, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 14899),
(8, 'Tượng Nữ Thần Devi (Hương Quế)', 4, 'Tượng Nữ Thần Devi (Hương Quế)', 2, 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_28_284028673b60cc3e9571.jpg, https://media-cdn-v2.laodong.vn/Storage/newsportal/2019/3/1/659956/Anh-8.jpg, https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2021/01/04/tuongBotatTARA3.jpg, https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2021/01/04/tuongBotatTARA1.jpg', 3, 'Thế kỷ X\r\nVăn hóa Chăm Pa', 'tuong-nu-than-devi-huong-que', 12, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 30560),
(9, 'Tượng Bồ tát Tara', 4, 'Tượng Bồ tát Tara', 3, 'https://media-cdn-v2.laodong.vn/Storage/newsportal/2019/3/1/659956/Anh-8.jpg, https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2021/01/04/tuongBotatTARA3.jpg, https://media.doanhnghiepvn.vn/Images/Uploaded/Share/2021/01/04/tuongBotatTARA1.jpg', 5, 'Thế kỷ IX - đầu thế kỉ X\r\nVăn hóa Chăm Pa', 'tuong-bo-tat-tara', 12, NULL, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', NULL, 140000),
(50, 'Updated', 1, 'Updated', 1, '', 1, 'Updated', 'Updated', 1, '', 'Updated', '', 100);

INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(1, 'Hà Nội', 'ha-noi', 'https://congdankhuyenhoc.qltns.mediacdn.vn/thumb_w/840/449484899827462144/2022/11/23/ho-hoan-kiem-3-16691738384281662170345.jpg', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(2, 'TP.Hồ Chí Minh', 'thanh-pho-ho-chi-minh', 'https://nhaf.net.vn/wp-content/uploads/2022/03/thanh-pho-ho-chi-minh-2048x1152.jpg', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(3, 'Đà Nẵng', 'da-nang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg/576px-B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(4, 'Bắc Ninh', 'bac-ninh', 'https://media.vneconomy.vn/w800/images/upload/2022/10/04/bac-ninh.jpeg', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế'),
(5, 'Huế', 'hue', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg/420px-Meridian_Gate%2C_Hue_%28I%29.jpg', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.'),
(13, 'Phú Thọ', 'phu-tho', 'https://scontent.iocvnpt.com/resources/portal/Images/PTO/adminportal/den_viet_nam_bat_dau_thu_phu_tho_1_630026803.jpg', 'Phú Thọ là một tỉnh nằm ở phía bắc Việt Nam, thuộc vùng đồng bằng sông Hồng. Tỉnh Phú Thọ giáp các tỉnh: Hòa Bình về phía tây bắc, Vĩnh Phúc về phía đông, Hà Giang và Tuyên Quang về phía đông bắc, Thái Nguyên và Yên Bái về phía tây nam.', 'Phú Thọ là một tỉnh nằm ở phía bắc Việt Nam, thuộc vùng đồng bằng sông Hồng. Tỉnh Phú Thọ giáp các tỉnh: Hòa Bình về phía tây bắc, Vĩnh Phúc về phía đông, Hà Giang và Tuyên Quang về phía đông bắc, Thái Nguyên và Yên Bái về phía tây nam.'),
(14, 'Điện Biên', 'dien-bien', 'https://file3.qdnd.vn/data/images/0/2023/05/06/tranhang/1a976114930pm.jpg?dpi=150&quality=100&w=870', 'Điện Biên là tỉnh miền núi thuộc vùng Tây Bắc Bộ của Việt Nam, gắn liền với chiến dịch Điện Biên Phủ và lễ hội hoa ban. Tỉnh lỵ của tỉnh là thành phố Điện Biên Phủ.', 'Điện Biên là tỉnh miền núi thuộc vùng Tây Bắc Bộ của Việt Nam, gắn liền với chiến dịch Điện Biên Phủ và lễ hội hoa ban. Tỉnh lỵ của tỉnh là thành phố Điện Biên Phủ.');

INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(1, 'Bảo tàng Lịch sử Quốc gia', 'Bảo tàng Lịch sử Việt Nam, cùng với Bảo tàng Cách mạng Việt Nam là hai bảo tàng đã được sáp nhập thành Bảo tàng Lịch sử quốc gia, tọa lạc ở thành phố Hà Nội.', 'bao-tang-lich-su-quoc-gia', 'http://www.hanoimoi.com.vn/Uploads/images/phananh/2021/11/04/baotang.jpg', '216 Đ. Trần Quang Khải, Tràng Tiền, Hoàn Kiếm, Hà Nội', 'Bảo tàng', 'Bảo tàng Lịch sử Việt Nam, cùng với Bảo tàng Cách mạng Việt Nam là hai bảo tàng đã được sáp nhập thành Bảo tàng Lịch sử quốc gia, tọa lạc ở thành phố Hà Nội.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(2, 'Bảo tàng Hồ Chí Minh', 'Bảo tàng Hồ Chí Minh là bảo tàng ở Hà Nội tập trung chủ yếu vào việc trưng bày những hiện vật, tư liệu về cuộc đời và con người Hồ Chí Minh. Nằm trong khu vực có nhiều di tích như: Lăng Chủ tịch Hồ Chí Minh, Khu di tích Phủ Chủ tịch, Chùa Một Cột,... tạo thành một quần thể các di tích thu hút khách tham quan trong và ngoài nước.', 'bao-tang-ho-chi-minh', 'https://bma.vn/wp-content/uploads/2022/07/bma-bao-tang-ho-chi-minh.jpg', 'Số 01 Nguyễn Tất Thành, phường 12, quận 4, Thành phố Hồ Chí Minh.', 'Bảo tàng', 'Bảo tàng Hồ Chí Minh là bảo tàng ở Hà Nội tập trung chủ yếu vào việc trưng bày những hiện vật, tư liệu về cuộc đời và con người Hồ Chí Minh. Nằm trong khu vực có nhiều di tích như: Lăng Chủ tịch Hồ Chí Minh, Khu di tích Phủ Chủ tịch, Chùa Một Cột,... tạo thành một quần thể các di tích thu hút khách tham quan trong và ngoài nước.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(3, 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.', 'bao-tang-lich-su-thanh-pho-ho-chi-minh', 'https://bocapvang.net/wp-content/uploads/2022/09/bao-tang-lich-su-Viet-Nam-TPHCM-1-2048x1536.jpg', '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'Bảo tàng', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(4, 'Cục lưu trữ Văn phòng Trung ương Đảng', 'Cục Lưu trữ Văn phòng Trung ương Đảng là tổ chức có vai trò quan trọng trong quản lý di sản của Đảng Cộng sản Việt Nam. Cục này đảm nhận nhiệm vụ thu thập, quản lý và bảo quản các tài liệu, hồ sơ và văn bản liên quan đến hoạt động của Đảng.', 'cuc-luu-tru-van-phong-trung-uong-dang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/CPV_Central_Committee_Office_%289753420401%29.jpg/375px-CPV_Central_Committee_Office_%289753420401%29.jpg', 'Số 9A Nguyễn Cảnh Chân,, Quận Ba Đình, Hà Nội', 'Tổ chức', 'Cục Lưu trữ Văn phòng Trung ương Đảng là tổ chức có vai trò quan trọng trong quản lý di sản của Đảng Cộng sản Việt Nam. Cục này đảm nhận nhiệm vụ thu thập, quản lý và bảo quản các tài liệu, hồ sơ và văn bản liên quan đến hoạt động của Đảng.'),
(5, 'Bảo tàng Điêu khắc Chăm Đà Nẵng', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng do người Pháp xây dựng, chuyên sưu tập, cất giữ và trưng bày các di vật về nghệ thuật điêu khắc của vương quốc Chăm Pa tìm thấy ở các tháp, thành lũy Chăm tại các tỉnh duyên hải Nam Trung Bộ từ Hà Tĩnh tới Bình Thuận và các tỉnh Tây Nguyên.', 'bao-tang-dieu-khac-cham-da-nang', 'https://static.vinwonders.com/2022/04/bao-tang-dieu-khac-cham-3.jpg', 'Số 02 Đ. 2 Tháng 9, Bình Hiên, Hải Châu, Đà Nẵng', 'Bảo tàng', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng do người Pháp xây dựng, chuyên sưu tập, cất giữ và trưng bày các di vật về nghệ thuật điêu khắc của vương quốc Chăm Pa tìm thấy ở các tháp, thành lũy Chăm tại các tỉnh duyên hải Nam Trung Bộ từ Hà Tĩnh tới Bình Thuận và các tỉnh Tây Nguyên.'),
(9, 'Bảo tàng Cổ vật Cung đình Huế', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.', 'bao-tang-co-vat-cung-dinh-hue', 'https://media.mia.vn/uploads/blog-du-lich/bao-tang-co-vat-cung-dinh-hue-nghin-nam-con-do-ve-dep-cua-van-hoa-co-do-1-1637922298.jpg', '03 Lê Trực, Phú Hậu, Thành phố Huế, Thừa Thiên Huế', 'Bảo tàng', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.');

INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(3, 'trandang345', '2023-04-27 01:54:15', 'trangdangkzcx', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(4, 'sangadmin', '2023-06-07 19:00:00', 'sang', 1);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(5, 'trangadmin', '2023-06-07 19:00:00', 'trang', 1);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(6, 'linhadmin', '2023-06-07 19:00:00', 'linh', 1),
(10, 'An Lành', '2023-06-07 05:34:20', 'asd', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;