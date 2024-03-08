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

DROP TABLE IF EXISTS `heritage_paragraphs`;
CREATE TABLE `heritage_paragraphs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `heritage_id` int NOT NULL,
  `description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `image_url` longtext,
  `image_description` longtext NOT NULL,
  UNIQUE KEY `id` (`id`),
  KEY `heritage_id` (`heritage_id`),
  CONSTRAINT `heritage_paragraphs_ibfk_1` FOREIGN KEY (`heritage_id`) REFERENCES `heritages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `location_id` int NOT NULL,
  `management_unit_id` int NOT NULL,
  `time` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1990',
  `urlslug` varchar(255) NOT NULL,
  `heritage_category_id` int NOT NULL,
  `short_description` longtext,
  `image_360_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `view_count` int DEFAULT NULL,
  `video_url` longtext,
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
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
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

INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(2, 'What is Lorem Ipsum?', 1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(3, 'Where does it come from?', 1, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(4, 'What is Lorem Ipsum?', 2, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(5, 'Where does it come from?', 3, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(6, 'What is Lorem Ipsum?', 4, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader'),
(7, 'Where does it come from?', 4, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(8, 'What is Lorem Ipsum?', 5, '<image>\r\nLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader'),
(9, 'Where does it come from?', 5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\r\n<image>', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(10, 'What is Lorem Ipsum?', 5, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\r\n<image>\r\nIt has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum\r\n', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader'),
(11, 'Where does it come from?', 6, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(12, 'What is Lorem Ipsum?', 7, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader'),
(13, 'Where does it come from?', 7, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(14, 'What is Lorem Ipsum?', 8, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum', 'https://product.hstatic.net/200000283705/product/trong-dong-40-1_90bae906e72c421f97c8e3db50295152_master.jpg', 'It is a long established fact that a reader'),
(15, 'Where does it come from?', 9, 'ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.', 'https://cdn.phongthuytamnguyen.com/pttn/uploads/images/lg_2021_07_24_z2635695107791_c3487b12e2456b23f6692e8064fedf24.jpg', 'There are many variations of passages'),
(23, 'Tiêu đề mô tả 1', 7, 'Mô tả di sản 1', '', 'Mô tả hình ảnh 1'),
(24, 'Tiêu đề mô tả 2', 7, 'Mô tả di sản 2', 'https://images.unsplash.com/photo-1519955045385-7cdb8e07c76f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVyaXRhZ2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', 'Mô tả hình ảnh 2');

INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(1, 'Di sản văn hóa thiên nhiên', 'Di sản văn hóa thiên nhiên', 'di-san-van-hoa-thien-nhien');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(2, 'Di sản văn hóa phi vật thể', 'Di sản văn hóa phoi vật thể', 'di-san-van-hoa-phi-vat-the');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(3, 'Di tích', 'Di tích', 'di-tich');
INSERT INTO `heritage_types` (`id`, `name`, `description`, `urlslug`) VALUES
(4, 'Bảo vật quốc gia', 'Bảo vật quốc gia', 'bao-vat-quoc-gia');

INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(1, 'Trống đồng Ngọc Lũ', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-ngoc-lu', 11, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 1000006, 'https://youtu.be/uY5pJqzD5y8');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(2, 'Trống đồng Hoàng Hạ', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-hoang-ha', 11, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 123506, 'https://youtu.be/UnGL5g4AHT0');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(3, 'Thạp đồng Đào Thịnh', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'thap-dong-dao-thinh', 11, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 21314, 'https://youtu.be/DezB3hkByeU');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(4, 'Tượng đồng hai người cõng nhau thổi khèn', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'tuong-dong-hai-nguoi-cong-nhau-thoi-khen', 12, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 45919, 'https://youtu.be/d4IbnlG9TwY'),
(5, 'Cây đèn đồng hình người quỳ', 4, 1, 1, 'Cách ngày nay 2000 - 1700 năm\r\nVăn hóa Đông Sơn', 'cay-den-dong-hinh-nguoi-quy', 11, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 1548, 'https://youtu.be/beLEQpx-uuI'),
(6, 'Trống đồng Cảnh Thịnh', 4, 1, 1, 'Năm 1800\r\nThời Tây Sơn', 'trong-dong-canh-thinh', 11, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 2566, 'https://youtu.be/SK06pdfh_CU'),
(7, 'Tượng Phật Đồng Dương', 4, 2, 3, 'Thế kỷ VIII-XIX\r\nVăn hóa Chăm Pa', 'tuong-phat-dong-duong', 12, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 14910, 'https://youtu.be/1ryTpDtdnfw'),
(8, 'Tượng Nữ Thần Devi (Hương Quế)', 4, 2, 3, 'Thế kỷ X\r\nVăn hóa Chăm Pa', 'tuong-nu-than-devi-huong-que', 12, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 30702, ''),
(9, 'Tượng Bồ tát Tara', 4, 3, 5, 'Thế kỷ IX - đầu thế kỉ X\r\nVăn hóa Chăm Pa', 'tuong-bo-tat-tara', 12, 'Ngọc Lũ I là một trong những chiếc trống đồng Đông Sơn có kích thước to lớn, hình dáng cổ kính, tập trung hoa văn phong phú nhất, hiện được trưng bày tại Bảo tàng Lịch sử Việt Nam. Tuổi của trống được xác định vào khoảng 2500 năm.', '', 140008, NULL),
(10, 'Cuốn “Đường Kách mệnh”', 4, 1, 1, 'Năm 1927', 'duong-canh-menh', 11, 'Cuốn “Đường Kách mệnh”', NULL, 101045, NULL),
(11, 'Bản Di chúc của Chủ tịch Hồ Chí Minh', 4, 1, 4, '15/5/1965', 'di-chuc-cua-chu-tich-Ho-Chi-Minh', 11, 'Bản Di chúc của Chủ tịch Hồ Chí Minh', NULL, 244535, NULL),
(12, 'Xe tăng T54B, số hiệu 843', 4, 2, 10, 'Năm 1975', 'xe-tang-843', 11, 'Xe tăng T54B, số hiệu 843, một trong những chiếc xe tăng đầu tiên húc vào cổng phụ Dinh Độc Lập vào trưa 30-4-1975', NULL, 456456, NULL),
(13, 'Máy bay Mic 21 F96, số hiệu 5121', 4, 2, 10, 'Năm 1972', 'may-bay-mic-21-f96-so-hieu-5121', 11, 'Máy bay Mic 21 F96, số hiệu 5121', NULL, 45645, NULL),
(14, 'Mộ thuyền Việt Khê', 4, 1, 1, 'Cách ngày nay khoảng 2.500 - 2.000 năm', 'mo-thuyen-viet-khe', 11, 'Mộ thuyền Việt Khê', NULL, 78324, NULL),
(15, 'Nhã nhạc - Âm nhạc Cung đình Việt Nam', 2, 5, 11, 'Thế kỉ XIII', 'nha-nhac-am-nhac-cung-dinh-Viet-Nam', 4, 'Nhã nhạc - Âm nhạc Cung đình Việt Nam', NULL, 456543, NULL),
(16, 'Hát Xoan ở Phú Thọ', 2, 6, 12, 'Thế kỉ XV', 'hat-xoan-o-phu-tho', 4, 'Hát Xoan ở Phú Thọ', NULL, 45664, NULL),
(18, 'Múa rối nước', 2, 8, 14, 'Thời nhà Lý', 'mua-roi-nuoc', 4, 'Múa rối nước ', NULL, 65465, NULL),
(19, 'Hội Gióng đền Phù Đổng và đền Sóc ', 2, 1, 15, 'Khoảng thế kỉ XI', 'hoi-giong-den-phu-dong-va-den-soc', 5, 'Hội Gióng đền Phù Đổng và đền Sóc ', NULL, 34554, NULL),
(20, 'Nghề làm gốm của người Chăm', 2, 9, 16, 'Chưa có dữ liệu', 'nghe-lam-gom-cua-nguoi-cham', 8, 'Nghề làm gốm của người Chăm ở xã Phan Hiệp, huyện Bắc Bình, tỉnh Bình Thuận', NULL, 54678, NULL),
(21, 'Khu Trung tâm Hoàng thành Thăng Long - Hà Nội', 3, 1, 15, 'Năm 1010', 'khu-trung-tam-hoang-thanh-thang-long-ha-noi', 3, 'Khu Trung tâm Hoàng thành Thăng Long - Hà Nội', NULL, 213434, NULL),
(22, 'Quần thể kiến trúc Cố đô Huế', 3, 5, 11, 'Đầu thế kỷ XIX-nửa đầu thế kỷ XX', 'quan-the-kien-truc-co-do-hue', 3, 'Quần thể kiến trúc Cố đô Huế', NULL, 3245654, NULL),
(23, 'Đền Hùng', 3, 6, 12, 'Năm 968-979', 'den-hung', 3, 'Đền Hùng được xây dựng trên núi Hùng, thuộc đất Phong Châu, vốn là đất đế đô của Nhà nước Văn Lang.', NULL, 645123, NULL),
(24, 'Vườn Quốc gia Phong Nha - Kẻ Bàng', 3, 10, 17, 'Năm 1986', 'vuon-quoc-gia-phong-nha-ke-bang', 3, 'Khu bảo tồn Phong Nha-Kẻ Bàng có diện tích 5000 ha đã được Chính phủ Việt Nam chính thức công bố ngày 9 tháng 8 năm 1986 và đã được mở rộng thành 41.132 ha vào năm 1991', NULL, 45312, NULL),
(25, 'Thống đồng thời Trần', 4, 11, 18, 'Thế kỉ XIII-XIV', 'thong-dong-thoi-tran', 11, 'Thống đồng thời Trần là một trong năm hiện vật quý của Bảo tàng Quảng Ninh đã được Thủ tướng Chính phủ công nhận Bảo vật Quốc gia ', NULL, 456546, NULL),
(26, 'Hộp vàng Ngọa Vân - Yên Tử', 4, 11, 18, 'Thế kỉ XIV', 'hop-vang-ngoa-van-yen-tu', 11, 'Hộp vàng Ngọa Vân - Yên Tử hay còn gọi là hộp vàng hình Hoa Sen, được xác định có niên đại thời Trần, nửa đầu thế kỷ 14.', NULL, 456451, NULL),
(27, 'Bình gốm Đầu Rằm', 4, 11, 18, 'Cách ngày nay hơn 3000 năm', 'binh-gom-dau-ram', 11, 'Bình gốm Đầu Rằm hay còn gọi là gốm Hoàng Tân được, được xác định có niên đại văn hóa Phùng Nguyên muộn, cách đây hơn 3.000 năm.', NULL, 46793, NULL),
(28, 'Mâm bồng gốm men vẽ nhiều màu', 4, 11, 18, 'Thế kỉ XV', 'mam-bong-gom-men-ve-nhieu-mau', 11, 'Mâm bồng gốm men vẽ nhiều màu có niên đại thời Lê sơ, thế kỷ 15.', NULL, 78934, NULL),
(29, 'Bình gốm hoa nâu Kinnari', 4, 11, 18, 'Thế kỉ XI-XII', 'binh-gom-hoa-nau-kinnari', 11, 'Bình gốm hoa nâu Kinnari có niên đại thời Lý, thế kỷ 11-12.', NULL, 45656, NULL),
(30, 'Tượng Phật Hoàng Trần Nhân Tông', 4, 11, 18, 'Thế kỉ XVII', 'tuong-phat-hoang-tran-nhan-tong', 11, 'Tượng Phật Hoàng Trần Nhân Tông có niên đại thế kỷ 17, hiện được thờ trong tháp Huệ Quang, Khu di tích danh thắng Yên Tử (TP Uông Bí).', NULL, 345345, NULL),
(31, 'Bộ sưu tập trang sức vàng Trà Veo 3 và Lâm Thượng', 4, 12, 19, 'Từ thế kỷ thứ X - XII ', 'bo-suu-tap-trang-suc-vang-tra-veo-3-va-lam-thuong', 15, 'Bộ sưu tập trang sức vàng Trà Veo 3 và Lâm Thượng, gồm 15 hiện vật là nhẫn, khuyên tai, hoa tai. Đây là những hiện vật gốc độc bản duy nhất cho đến thời điểm này', NULL, NULL, NULL);

INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(1, 'Hà Nội', 'ha-noi', 'https://congdankhuyenhoc.qltns.mediacdn.vn/thumb_w/840/449484899827462144/2022/11/23/ho-hoan-kiem-3-16691738384281662170345.jpg', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(2, 'TP.Hồ Chí Minh', 'thanh-pho-ho-chi-minh', 'https://nhaf.net.vn/wp-content/uploads/2022/03/thanh-pho-ho-chi-minh-2048x1152.jpg', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(3, 'Đà Nẵng', 'da-nang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg/576px-B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(4, 'Bắc Ninh', 'bac-ninh', 'https://media.vneconomy.vn/w800/images/upload/2022/10/04/bac-ninh.jpeg', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế'),
(5, 'Huế', 'hue', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg/420px-Meridian_Gate%2C_Hue_%28I%29.jpg', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.'),
(6, 'Phú Thọ', 'phu-tho', NULL, NULL, NULL),
(8, 'Hải Dương', 'hai-duong', NULL, NULL, NULL),
(9, 'Bình Thuận', 'binh-thuan', NULL, NULL, NULL),
(10, 'Quảng Bình', 'quang-binh', NULL, NULL, NULL),
(11, 'Quảng Ninh', 'quang-ninh', NULL, NULL, NULL),
(12, 'Quảng Ngãi', 'Quảng Ngãi', NULL, NULL, NULL),
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
(6, 'Bảo tàng Điêu khắc Chăm', 'Bảo tàng Điêu khắc Chăm', 'bao-tang-dieu-khac-cham', NULL, 'none', NULL, NULL),
(7, 'Chùa Phật Tích', 'Chùa Phật Tích', 'chua-phat-tich', NULL, 'none', NULL, NULL),
(8, 'Chùa Bút Tháp', 'Chùa Bút Tháp', 'chua-but-thap', NULL, 'none', NULL, NULL),
(9, 'Bảo tàng Cổ vật Cung đình Huế', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.', 'bao-tang-co-vat-cung-dinh-hue', 'https://media.mia.vn/uploads/blog-du-lich/bao-tang-co-vat-cung-dinh-hue-nghin-nam-con-do-ve-dep-cua-van-hoa-co-do-1-1637922298.jpg', '03 Lê Trực, Phú Hậu, Thành phố Huế, Thừa Thiên Huế', 'Bảo tàng', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.'),
(10, 'Bảo tàng Lịch sử Quân sự Việt Nam', 'Bảo tàng Lịch sử Quân sự Việt Nam', 'bao-tang-lich-su-quan-su-Viet-Nam', NULL, 'none', NULL, NULL),
(11, 'Tỉnh Thừa Thiên Huế', 'Tỉnh Thừa Thiên Huế', 'tinh-thua-thien-hue', NULL, 'none', NULL, NULL),
(12, 'Tỉnh Phú Thọ', 'Tỉnh Phú Thọ', 'tinh-phu-tho', NULL, 'none', NULL, NULL),
(13, 'Tỉnh Bình Định', 'Tỉnh Bình Định', 'tinh-binh-dinh', NULL, 'none', NULL, NULL),
(14, 'Tỉnh Hải Dương', 'Tỉnh Hải Dương', 'tinh-hai-duong', NULL, 'none', NULL, NULL),
(15, 'Hà Nội', 'Hà Nội', 'ha-noi', NULL, 'none', NULL, NULL),
(16, 'Tỉnh Bình Thuận', 'Tỉnh Bình Thuận', 'binh-thuan', NULL, 'none', NULL, NULL),
(17, 'Tỉnh Quảng Bình', 'Tỉnh Quảng Bình', 'quang-binh', NULL, 'none', NULL, NULL),
(18, 'Bảo tàng tỉnh Quảng Ninh', 'Bảo tàng tỉnh Quảng Ninh', 'bao-tang-tinh-quang-ninh', NULL, 'none', NULL, NULL),
(19, 'Bảo tàng tổng hợp tỉnh Quảng Ngãi', 'Bảo tàng tổng hợp tỉnh Quảng Ngãi', 'bao-tang-tong-hop-tinh-quang-ngai', NULL, 'none', NULL, NULL);

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