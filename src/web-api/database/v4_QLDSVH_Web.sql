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
  `360_image_url` longtext,
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
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `urlslug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `management_units`;
CREATE TABLE `management_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `urlslug` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(11, 'HIện vật', 'HIện vật', 'hien-vat'),
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

INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `360_image_url`) VALUES
(1, 'Trống đồng Ngọc Lũ', 1, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', 1, 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-ngoc-lu', 11, NULL, NULL, NULL);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `360_image_url`) VALUES
(2, 'Trống đồng Hoàng Hạ', 1, 'Hoàng Hạ là một trong những chiếc trống đồng Đông Sơn có kích thước lớn, có nhiều hoa văn phong phú, hiện được tàng trữ tại Bảo tàng Lịch sử Việt Nam.', 1, 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-hoang-ha', 11, NULL, NULL, NULL);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `360_image_url`) VALUES
(3, 'Thạp đồng Đào Thịnh', 1, 'Thạp đồng Đào Thịnh là một hiện vật bằng đồng thuộc nền văn hóa Đông Sơn. Thạp được phát hiện năm 1961, được xác định có niên đại từ 2500 - 2000 năm cách ngày nay. Thạp là một trong những bảo vật quốc gia đầu tiên của Việt Nam được Thủ tướng Chính phủ công nhận năm 2012, hiện đang lưu giữ ở Bảo tàng Lịch sử Quốc gia Việt Nam', 1, 'http://redsvn.net/wp-content/uploads/2016/02/Redsvn-Thap-Dao-Thinh-01.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'thap-dong-dao-thinh', 11, NULL, NULL, NULL);
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location_id`, `image_url`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `video_url`, `short_description`, `360_image_url`) VALUES
(4, 'Tượng đồng hai người cõng nhau thổi khèn', 1, 'Bảo vật quốc gia - Tượng đồng hai người cõng nhau thổi khèn', 1, 'http://redsvn.net/wp-content/uploads/2022/03/Tuong-nguoi-cong-nhau-thoi-khen-01.jpg', 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'tuong-dong-hai-nguoi-cong-nhau-thoi-khen', 12, NULL, NULL, NULL),
(5, 'Cây đèn đồng hình người quỳ', 1, 'Cây đèn hình người quỳ - bảo vật từ ngôi mộ cổ', 1, 'https://www.khanhhoa.gov.vn/Resources/Images/bandocquantam/Nam2017/Thang12/tem.jpg', 1, 'Cách ngày nay 2000 - 1700 năm\r\nVăn hóa Đông Sơn', 'cay-den-dong-hinh-nguoi-quy', 11, NULL, NULL, NULL),
(6, 'Trống đồng Cảnh Thịnh', 1, 'Bảo vật quốc gia - Trống đồng Cảnh Thịnh', 1, 'https://danviet.mediacdn.vn/296231569849192448/2022/11/6/143-16677501482351408682120.jpg', 1, 'Năm 1800\r\nThời Tây Sơn', 'trong-dong-canh-thinh', 11, NULL, NULL, NULL),
(7, 'Tượng Phật Đồng Dương', 1, 'Tượng Phật Đồng Dương', 2, 'http://redsvn.net/wp-content/uploads/2022/03/Tuong-Phat-Dong-Duong-02.jpg', 3, 'Thế kỷ VIII-XIX\r\nVăn hóa Chăm Pa', 'tuong-phat-dong-duong', 12, NULL, NULL, NULL),
(8, 'Tượng Nữ Thần Devi (Hương Quế)', 1, 'Tượng Nữ Thần Devi (Hương Quế)', 2, 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_28_284028673b60cc3e9571.jpg', 3, 'Thế kỷ X\r\nVăn hóa Chăm Pa', 'tuong-nu-than-devi-huong-que', 12, NULL, NULL, NULL),
(9, 'Tượng Bồ tát Tara', 1, 'Tượng Bồ tát Tara', 3, 'https://media-cdn-v2.laodong.vn/Storage/newsportal/2019/3/1/659956/Anh-8.jpg', 5, 'Thế kỷ IX - đầu thế kỉ X\r\nVăn hóa Chăm Pa', 'tuong-bo-tat-tara', 12, NULL, NULL, NULL);

INSERT INTO `locations` (`id`, `name`, `urlslug`) VALUES
(1, 'Hà Nội', 'ha-noi');
INSERT INTO `locations` (`id`, `name`, `urlslug`) VALUES
(2, 'TP.Hồ Chí Minh', 'thanh-pho-ho-chi-minh');
INSERT INTO `locations` (`id`, `name`, `urlslug`) VALUES
(3, 'Đà Nẵng', 'da-nang');
INSERT INTO `locations` (`id`, `name`, `urlslug`) VALUES
(4, 'Bắc Ninh', 'bac-ninh'),
(5, 'Huế', 'hue');

INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`) VALUES
(1, 'Bảo tàng Lịch sử Quốc gia', 'Bảo tàng Lịch sử Quốc gia', 'bao-tang-lich-su-quoc-gia');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`) VALUES
(2, 'Bảo tàng Hồ Chí Minh', 'Bảo tàng Hồ Chí Minh', 'bao-tang-ho-chi-minh');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`) VALUES
(3, 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh', 'bao-tang-lich-su-thanh-pho-ho-chi-minh');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`) VALUES
(4, 'Cục lưu trữ Văn phòng Trung ương Đảng', 'Cục lưu trữ Văn phòng Trung ương Đảng', 'cuc-luu-tru-van-phong-trung-uong-dang'),
(5, 'Bảo tàng Điêu khắc Chăm Đà Nẵng', 'Bảo tàng Điêu khắc Chăm Đà Nẵng', 'bao-tang-dieu-khac-cham-da-nang'),
(6, 'Bảo tàng Điêu khắc Chăm', 'Bảo tàng Điêu khắc Chăm', 'bao-tang-dieu-khac-cham'),
(7, 'Chùa Phật Tích', 'Chùa Phật Tích', 'chua-phat-tich'),
(8, 'Chùa Bút Tháp', 'Chùa Bút Tháp', 'chua-but-thap'),
(9, 'Bảo tàng Cổ vật Cung đình Huế', 'Bảo tàng Cổ vật Cung đình Huế', 'bao-tang-co-vat-cung-dinh-hue');

INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(1, 'cuteo', '2023-04-27 01:52:02', 'teovippro', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(3, 'trandang345', '2023-04-27 01:54:15', 'trangdangkzcx', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(4, 'sangadmin', '2023-06-07 19:00:00', 'sang', 1);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(5, 'trangadmin', '2023-06-07 19:00:00', 'trang', 1),
(6, 'linhadmin', '2023-06-07 19:00:00', 'linh', 1),
(10, 'An Lành', '2023-06-07 05:34:20', 'asd', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;