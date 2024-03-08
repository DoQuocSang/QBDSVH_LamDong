/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `heritage_types`;
CREATE TABLE `heritage_types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `description` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `heritages`;
CREATE TABLE `heritages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `heritage_type_id` int NOT NULL,
  `description` longtext,
  `location` int NOT NULL,
  `image_url` longtext,
  `management_unit_id` int NOT NULL,
  `time` varchar(255) NOT NULL DEFAULT '1990',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `heritage_type_id` (`heritage_type_id`),
  KEY `management_unit_id` (`management_unit_id`),
  KEY `location` (`location`),
  CONSTRAINT `heritages_ibfk_1` FOREIGN KEY (`heritage_type_id`) REFERENCES `heritage_types` (`id`),
  CONSTRAINT `heritages_ibfk_2` FOREIGN KEY (`management_unit_id`) REFERENCES `management_units` (`id`),
  CONSTRAINT `heritages_ibfk_3` FOREIGN KEY (`location`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `locations`;
CREATE TABLE `locations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `management_units`;
CREATE TABLE `management_units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subscribe_day` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(50) NOT NULL,
  `permission` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `heritage_types` (`id`, `name`, `description`) VALUES
(1, 'Dụng cụ đời sống', 'Dụng cụ đời sống');
INSERT INTO `heritage_types` (`id`, `name`, `description`) VALUES
(2, 'Tượng', 'Tượng');
INSERT INTO `heritage_types` (`id`, `name`, `description`) VALUES
(3, 'Văn bản', 'Văn bản');
INSERT INTO `heritage_types` (`id`, `name`, `description`) VALUES
(4, 'Vũ khí', 'Vũ khí'),
(5, 'Trang sức', 'Trang sức'),
(6, 'Gốm sứ', 'Gốm sứ'),
(7, 'Khác', 'Khác');

INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location`, `image_url`, `management_unit_id`, `time`) VALUES
(1, 'Trống đồng Ngọc Lũ', 1, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', 1, NULL, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location`, `image_url`, `management_unit_id`, `time`) VALUES
(2, 'Trống đồng Hoàng Hạ', 1, 'Hoàng Hạ là một trong những chiếc trống đồng Đông Sơn có kích thước lớn, có nhiều hoa văn phong phú, hiện được tàng trữ tại Bảo tàng Lịch sử Việt Nam.', 1, NULL, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location`, `image_url`, `management_unit_id`, `time`) VALUES
(3, 'Thạp đồng Đào Thịnh', 1, 'Thạp đồng Đào Thịnh là một hiện vật bằng đồng thuộc nền văn hóa Đông Sơn. Thạp được phát hiện năm 1961, được xác định có niên đại từ 2500 - 2000 năm cách ngày nay. Thạp là một trong những bảo vật quốc gia đầu tiên của Việt Nam được Thủ tướng Chính phủ công nhận năm 2012, hiện đang lưu giữ ở Bảo tàng Lịch sử Quốc gia Việt Nam', 1, NULL, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `description`, `location`, `image_url`, `management_unit_id`, `time`) VALUES
(4, 'Tượng đồng hai người cõng nhau thổi khèn', 2, 'Bảo vật quốc gia - Tượng đồng hai người cõng nhau thổi khèn', 1, NULL, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn'),
(5, 'Cây đèn đồng hình người quỳ', 1, 'Cây đèn hình người quỳ - bảo vật từ ngôi mộ cổ', 1, NULL, 1, 'Cách ngày nay 2000 - 1700 năm\r\nVăn hóa Đông Sơn'),
(6, 'Trống đồng Cảnh Thịnh', 1, 'Bảo vật quốc gia - Trống đồng Cảnh Thịnh', 1, NULL, 1, 'Năm 1800\r\nThời Tây Sơn'),
(7, 'Tượng Phật Đồng Dương', 2, 'Tượng Phật Đồng Dương', 2, NULL, 3, 'Thế kỷ VIII-XIX\r\nVăn hóa Chăm Pa'),
(8, 'Tượng Nữ Thần Devi (Hương Quế)', 2, 'Tượng Nữ Thần Devi (Hương Quế)', 2, NULL, 3, 'Thế kỷ X\r\nVăn hóa Chăm Pa'),
(9, 'Tượng Bồ tát Tara', 2, 'Tượng Bồ tát Tara', 3, NULL, 5, 'Thế kỷ IX - đầu thế kỉ X\r\nVăn hóa Chăm Pa'),
(10, 'Bộ Cửu vị thần công', 4, 'Cửu vị thần công (chữ Hán: 九位神仰) là tên gọi 9 khẩu thần công thời nhà Nguyễn được các nghệ nhân Huế đúc năm Gia Long thứ hai (1803). Chín khẩu thần công này được đánh giá là lớn nhất của Việt Nam,[1] và là một trong những tác phẩm nghệ thuật bằng đồng có giá trị cao. Cửu vị thần công xưa được đặt dưới chân Hoàng Thành, trước cửa Ngọ Môn của kinh thành Huế. Đến năm 1917 đời vua Khải Định, các cỗ súng này được chuyển ra vị trí Kỳ đài như ngày nay. Năm 2012, Cửu vị thần công được công nhận là Bảo vật quốc gia của Việt Nam.', 5, NULL, 9, '1803 - 1804\r\nThời Nguyễn');

INSERT INTO `locations` (`id`, `name`) VALUES
(1, 'Hà Nội');
INSERT INTO `locations` (`id`, `name`) VALUES
(2, 'Thành phố Hồ Chí Minh');
INSERT INTO `locations` (`id`, `name`) VALUES
(3, 'Đà Nẵng');
INSERT INTO `locations` (`id`, `name`) VALUES
(4, 'Bắc Ninh'),
(5, 'Huế');

INSERT INTO `management_units` (`id`, `name`, `description`) VALUES
(1, 'Bảo tàng Lịch sử Quốc gia', 'Bảo tàng Lịch sử Quốc gia');
INSERT INTO `management_units` (`id`, `name`, `description`) VALUES
(2, 'Bảo tàng Hồ Chí Minh', 'Bảo tàng Hồ Chí Minh');
INSERT INTO `management_units` (`id`, `name`, `description`) VALUES
(3, 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh');
INSERT INTO `management_units` (`id`, `name`, `description`) VALUES
(4, 'Cục lưu trữ Văn phòng Trung ương Đảng', 'Cục lưu trữ Văn phòng Trung ương Đảng'),
(5, 'Bảo tàng Điêu khắc Chăm Đà Nẵng', 'Bảo tàng Điêu khắc Chăm Đà Nẵng'),
(6, 'Bảo tàng Điêu khắc Chăm', 'Bảo tàng Điêu khắc Chăm'),
(7, 'Chùa Phật Tích', 'Chùa Phật Tích'),
(8, 'Chùa Bút Tháp', 'Chùa Bút Tháp'),
(9, 'Bảo tàng Cổ vật Cung đình Huế', 'Bảo tàng Cổ vật Cung đình Huế');

INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(1, 'admin', '2023-04-27 01:52:02', '0', 1);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(2, 'anhpham12', '2023-04-27 01:53:43', '0', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(3, 'trandang345', '2023-04-27 01:54:15', '0', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;