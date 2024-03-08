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
  `image_description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  UNIQUE KEY `id` (`id`),
  KEY `heritage_id` (`heritage_id`),
  CONSTRAINT `heritage_paragraphs_ibfk_1` FOREIGN KEY (`heritage_id`) REFERENCES `heritages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `subscribe_day` datetime DEFAULT CURRENT_TIMESTAMP,
  `password` varchar(50) NOT NULL,
  `permission` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(28, 'Trống đồng Hoàng Hạ Trong Văn Hoá', 2, 'Trống đồng Hoàng Hạ được coi là phó bản trong số các trống đồng Đông Sơn. Đây là chiếc trống có vẻ đẹp rất kém về độ đẹp và độ nổi tiếng chỉ sau trống đồng Ngọc Lũ. Thân trống được chia làm 3 đoạn, đường kính mặt 78,5 cm, cao 61,5 cm, trên mặt trống có khắc hình ngôi sao 16 cánh và 15 hình tròn, là đồ trang trí của 14 con chim có mỏ dài. , chân và đuôi mở rộng; con người theo phong cách mang giáo, rìu và ống trong bối cảnh của lễ kỷ niệm sống; 2 ngôi nhà sàn, một ngôi nhà có chim đứng trên mái cong, bên trong ngôi nhà có cảnh 2 người đàn ông đánh trống da và một cặp vợ chồng chơi trò vỗ tay, trong một ngôi nhà khác là cảnh 4 người đàn ông đánh trống đồng, gần đó là một cặp vợ chồng xay lúa; 2 ngôi nhà sàn đối xứng nhau theo kiểu nhà sàn với những con chim đứng trên mái cong.', NULL, '');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(29, 'Hoạ tiết trên trống đồng Hoàng Hạ', 2, 'Đồ trang trí trên thân trống là: 6 chiếc thuyền có họa tiết nam đánh trống, nam đội mũ lông vũ, cầm giáo, tay cầm chèo. Mỗi thuyền có 2 tầng, tầng trên có họa tiết người đàn ông đang nhắm cung, ở tầng dưới có họa tiết trống đồng và một người một tay túm tóc người đàn ông khỏa thân khác, tay kia giơ giáo giống như cảnh giết người bị bắt làm vật tế thần. Giữa thuyền có họa tiết chim và dưới thuyền có họa tiết cá di chuyển. Trên thân trống cũng có họa tiết các chiến binh theo kiểu trang trí lông vũ mang rìu.\r\n<image>\r\nLiên quan đến văn hóa Đông Sơn, các đồ trang trí trên trống đồng Hoàng Hạ là mô tả cảnh thực của cuộc sống. Mỗi loại đồ trang trí đều có một ý nghĩa nhất định mà các học giả trong và ngoài nước đã diễn giải theo nhiều cách khác nhau. Sự hiểu biết về nghệ thuật luôn mơ hồ trong quá khứ và bây giờ.\r\n<image>\r\nNgười đầu tiên coi trống đồng Hoàng Hạ là công cụ lịch của người Việt cổ là nhà nghiên cứu Việt Nam học Bùi Huy Hồng. Theo ý kiến ​​của ông, trống có thể được sử dụng để xác định điểm phân hoặc điểm đông và mùa hè theo các đồ trang trí trên mặt trống. Ông đã cung cấp một thí nghiệm hơn 40 năm trước: đặt trống trên bề mặt ngang và cọc thẳng đứng cao 345 mm ở trung tâm của mặt trống (cọc để đo bóng ánh sáng mặt trời ở thời điểm hiện tại), ông biết rằng điểm phân sẽ xảy ra khi bóng của cây cọc cuối buổi trưa nằm trên giữa vòng cung trang trí của trống. Ông coi trống đồng là vật xem mặt trời và lịch từ thời vua Hùng.\r\n<br>\r\nCách lý giải này của Bùi Huy Hồng đã gây ra nhiều cuộc tranh luận giữa các học giả. Chúng ta không biết chính xác liệu người cổ đại có sử dụng trống làm lịch hay không, nhưng rõ ràng đây là một trong những nỗ lực giải mã đồ trang trí của trống. Người Việt cổ tạo ra những đồ trang sức này không chỉ để làm đẹp, các học giả tin rằng ngôi sao 16 cánh là mặt trời và các chiến binh mang vũ khí xung quanh ngôi sao tham gia vào một nghi lễ lễ hội có lẽ đó là nghi lễ hiến sinh của một con bò đực hoặc một con trâu như được mô tả trong một Đồng Sơn trống đồng cảnh bò tót bị trói chặt và người nâng rìu. Trong trống hội Hoàng Hạ cũng là cảnh hiến sinh trên thuyền được cho là gắn liền với nghi lễ cầu mưa, một nghi lễ phổ biến ở nhiều vùng miền Việt Nam xưa.', 'https://quavangviet24k.vn/pic/News/images/124trong41(2).jpg, https://baotanglichsu.vn/DataFiles/asset/upload/bao-vat-quoc-gia/1_1_1.jpg', 'Hoạ tiết trên trống đồng Hoàng Hạ, Tượng đồng biểu tượng trống đồng Việt Nam');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(31, 'Trống đồng cổ Hoàng Hạ được tìm thấy ở Phú Xuyên', 2, 'Trống đồng Hoàng Hạ còn giúp các nhà nghiên cứu hiểu thêm về vị trí của Hà Nội hiện nay cách đây 2000 năm. Chiếc trống được tìm thấy ở độ sâu 1,5m mặt đất ngày 13/7/1937 khi đang đào kênh dẫn nước tại xã Nội, phường Hoàng Hà, huyện Phú Xuyên. Sự thật đáng kể nhất là chiếc trống được tìm thấy trong lòng đất, bằng chứng rằng chủ nhân của chiếc trống là người địa phương, họ đã sử dụng và chôn cất chiếc trống và chiếc trống không phải do người lạ mang đến đây từ nơi khác, giả thiết này được khẳng định bởi mảnh khuôn trống được tìm thấy cách đây không lâu.\r\n<image>\r\nViệc phát hiện ra trống đồng Hoàng Hạ ở huyện Phú Xuyên giúp các nhà khảo cổ học hiểu thêm về vùng đất này. Khoảng 5000 năm trước, khu vực Hà Nội ngày nay nằm dưới mực nước biển và ngập trong nước, 4000 năm trước biển không còn và vùng đất bằng phẳng dần xuất hiện, người dân từ vùng cao đến đây sinh sống. Một số cộng đồng cổ đại đã để lại di tích của họ trong lòng đất như những dụng cụ bằng đá và đồng. Tuy nhiên, không phải nơi nào người xưa cũng có thể lập nghiệp, ở những vùng đất trũng thuộc 4 huyện ngoại thành Hà Nội hiện nay là Phú Xuyên, Thanh Oai, Ứng Hòa, Mỹ Đức.họ không thể xây dựng nhà cửa, không nơi nương tựa trước thời Đông Sơn, điều này khẳng định sự hiện diện của con người ở đó vào thời đó. Chỉ 2000 năm trước, những vùng đất trũng này đã được phù sa bồi đắp lên cao hơn để người dân đến sinh sống đã gây ra sự bùng nổ nhân khẩu học ở đó, chính họ là tác giả của trống đồng Hoàng Hạ. Có lẽ chiếc trống đã được sử dụng trong các sự kiện lễ kỷ niệm và được chôn cất như một nơi chôn cất người chết. Trống đồng Hoàng Hà trên đất Phú Xuyên là chứng tích của nền văn hóa Đông Sơn mà nhân dân, bằng mồ hôi nước mắt của mình, đã khai khẩn và biến vùng đất chiêm trũng phía Nam Hà Nội thành một vùng đất trù phú như ngày nay.', 'https://quavangviet24k.vn/pic/News/images/05fdcafed3bd3ae363ac.jpg', 'Trống đồng Hoàng Hạ ở huyện Phú Xuyên');
INSERT INTO `heritage_paragraphs` (`id`, `title`, `heritage_id`, `description`, `image_url`, `image_description`) VALUES
(32, 'Trống đồng Hoàng Hạ Trong Văn Hoá', 31, 'Trống đồng Hoàng Hạ được coi là phó bản trong số các trống đồng Đông Sơn. Đây là chiếc trống có vẻ đẹp rất kém về độ đẹp và độ nổi tiếng chỉ sau trống đồng Ngọc Lũ. Thân trống được chia làm 3 đoạn, đường kính mặt 78,5 cm, cao 61,5 cm, trên mặt trống có khắc hình ngôi sao 16 cánh và 15 hình tròn, là đồ trang trí của 14 con chim có mỏ dài. , chân và đuôi mở rộng; con người theo phong cách mang giáo, rìu và ống trong bối cảnh của lễ kỷ niệm sống; 2 ngôi nhà sàn, một ngôi nhà có chim đứng trên mái cong, bên trong ngôi nhà có cảnh 2 người đàn ông đánh trống da và một cặp vợ chồng chơi trò vỗ tay, trong một ngôi nhà khác là cảnh 4 người đàn ông đánh trống đồng, gần đó là một cặp vợ chồng xay lúa; 2 ngôi nhà sàn đối xứng nhau theo kiểu nhà sàn với những con chim đứng trên mái cong.', NULL, ''),
(33, 'Hoạ tiết trên trống đồng Hoàng Hạ', 31, 'Đồ trang trí trên thân trống là: 6 chiếc thuyền có họa tiết nam đánh trống, nam đội mũ lông vũ, cầm giáo, tay cầm chèo. Mỗi thuyền có 2 tầng, tầng trên có họa tiết người đàn ông đang nhắm cung, ở tầng dưới có họa tiết trống đồng và một người một tay túm tóc người đàn ông khỏa thân khác, tay kia giơ giáo giống như cảnh giết người bị bắt làm vật tế thần. Giữa thuyền có họa tiết chim và dưới thuyền có họa tiết cá di chuyển. Trên thân trống cũng có họa tiết các chiến binh theo kiểu trang trí lông vũ mang rìu.\r\n<image>\r\nLiên quan đến văn hóa Đông Sơn, các đồ trang trí trên trống đồng Hoàng Hạ là mô tả cảnh thực của cuộc sống. Mỗi loại đồ trang trí đều có một ý nghĩa nhất định mà các học giả trong và ngoài nước đã diễn giải theo nhiều cách khác nhau. Sự hiểu biết về nghệ thuật luôn mơ hồ trong quá khứ và bây giờ.\r\n<image>\r\nNgười đầu tiên coi trống đồng Hoàng Hạ là công cụ lịch của người Việt cổ là nhà nghiên cứu Việt Nam học Bùi Huy Hồng. Theo ý kiến ​​của ông, trống có thể được sử dụng để xác định điểm phân hoặc điểm đông và mùa hè theo các đồ trang trí trên mặt trống. Ông đã cung cấp một thí nghiệm hơn 40 năm trước: đặt trống trên bề mặt ngang và cọc thẳng đứng cao 345 mm ở trung tâm của mặt trống (cọc để đo bóng ánh sáng mặt trời ở thời điểm hiện tại), ông biết rằng điểm phân sẽ xảy ra khi bóng của cây cọc cuối buổi trưa nằm trên giữa vòng cung trang trí của trống. Ông coi trống đồng là vật xem mặt trời và lịch từ thời vua Hùng.\r\n<br>\r\nCách lý giải này của Bùi Huy Hồng đã gây ra nhiều cuộc tranh luận giữa các học giả. Chúng ta không biết chính xác liệu người cổ đại có sử dụng trống làm lịch hay không, nhưng rõ ràng đây là một trong những nỗ lực giải mã đồ trang trí của trống. Người Việt cổ tạo ra những đồ trang sức này không chỉ để làm đẹp, các học giả tin rằng ngôi sao 16 cánh là mặt trời và các chiến binh mang vũ khí xung quanh ngôi sao tham gia vào một nghi lễ lễ hội có lẽ đó là nghi lễ hiến sinh của một con bò đực hoặc một con trâu như được mô tả trong một Đồng Sơn trống đồng cảnh bò tót bị trói chặt và người nâng rìu. Trong trống hội Hoàng Hạ cũng là cảnh hiến sinh trên thuyền được cho là gắn liền với nghi lễ cầu mưa, một nghi lễ phổ biến ở nhiều vùng miền Việt Nam xưa.', 'https://quavangviet24k.vn/pic/News/images/124trong41(2).jpg,https://baotanglichsu.vn/DataFiles/asset/upload/bao-vat-quoc-gia/1_1_1.jpg', 'Hoạ tiết trên trống đồng Hoàng Hạ, Tượng đồng biểu tượng trống đồng Việt Nam'),
(34, 'Trống đồng cổ Hoàng Hạ được tìm thấy ở Phú Xuyên', 31, 'Trống đồng Hoàng Hạ còn giúp các nhà nghiên cứu hiểu thêm về vị trí của Hà Nội hiện nay cách đây 2000 năm. Chiếc trống được tìm thấy ở độ sâu 1,5m mặt đất ngày 13/7/1937 khi đang đào kênh dẫn nước tại xã Nội, phường Hoàng Hà, huyện Phú Xuyên. Sự thật đáng kể nhất là chiếc trống được tìm thấy trong lòng đất, bằng chứng rằng chủ nhân của chiếc trống là người địa phương, họ đã sử dụng và chôn cất chiếc trống và chiếc trống không phải do người lạ mang đến đây từ nơi khác, giả thiết này được khẳng định bởi mảnh khuôn trống được tìm thấy cách đây không lâu.\r\n<image>\r\nViệc phát hiện ra trống đồng Hoàng Hạ ở huyện Phú Xuyên giúp các nhà khảo cổ học hiểu thêm về vùng đất này. Khoảng 5000 năm trước, khu vực Hà Nội ngày nay nằm dưới mực nước biển và ngập trong nước, 4000 năm trước biển không còn và vùng đất bằng phẳng dần xuất hiện, người dân từ vùng cao đến đây sinh sống. Một số cộng đồng cổ đại đã để lại di tích của họ trong lòng đất như những dụng cụ bằng đá và đồng. Tuy nhiên, không phải nơi nào người xưa cũng có thể lập nghiệp, ở những vùng đất trũng thuộc 4 huyện ngoại thành Hà Nội hiện nay là Phú Xuyên, Thanh Oai, Ứng Hòa, Mỹ Đức.họ không thể xây dựng nhà cửa, không nơi nương tựa trước thời Đông Sơn, điều này khẳng định sự hiện diện của con người ở đó vào thời đó. Chỉ 2000 năm trước, những vùng đất trũng này đã được phù sa bồi đắp lên cao hơn để người dân đến sinh sống đã gây ra sự bùng nổ nhân khẩu học ở đó, chính họ là tác giả của trống đồng Hoàng Hạ. Có lẽ chiếc trống đã được sử dụng trong các sự kiện lễ kỷ niệm và được chôn cất như một nơi chôn cất người chết. Trống đồng Hoàng Hà trên đất Phú Xuyên là chứng tích của nền văn hóa Đông Sơn mà nhân dân, bằng mồ hôi nước mắt của mình, đã khai khẩn và biến vùng đất chiêm trũng phía Nam Hà Nội thành một vùng đất trù phú như ngày nay.', 'https://quavangviet24k.vn/pic/News/images/05fdcafed3bd3ae363ac.jpg', 'Trống đồng Hoàng Hạ ở huyện Phú Xuyên');

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
(2, 'Trống đồng Hoàng Hạ', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'trong-dong-hoang-ha', 11, 'Hoàng Hạ là một trong những chiếc trống đồng Đông Sơn có kích thước lớn, có nhiều hoa văn phong phú, hiện được tàng trữ tại Bảo tàng Lịch sử Việt Nam.', '', 123656, 'https://youtu.be/UnGL5g4AHT0');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(3, 'Thạp đồng Đào Thịnh', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'thap-dong-dao-thinh', 11, 'Thạp đồng Đào Thịnh là một hiện vật bằng đồng thuộc nền văn hóa Đông Sơn. Thạp được phát hiện năm 1961, được xác định có niên đại từ 2500 - 2000 năm cách ngày nay', '', 21316, 'https://youtu.be/DezB3hkByeU');
INSERT INTO `heritages` (`id`, `name`, `heritage_type_id`, `location_id`, `management_unit_id`, `time`, `urlslug`, `heritage_category_id`, `short_description`, `image_360_url`, `view_count`, `video_url`) VALUES
(4, 'Tượng đồng hai người cõng nhau thổi khèn', 4, 1, 1, 'Cách ngày nay 2500 - 2000 năm\r\nVăn hóa Đông Sơn', 'tuong-dong-hai-nguoi-cong-nhau-thoi-khen', 12, 'Tượng được công nhận là bảo vật quốc gia từ năm 2012, đang trưng bày cùng nhiều hiện vật tại khu Di tích văn hóa Đông Sơn ở tầng một, Bảo tàng Lịch sử Quốc gia.', '', 45919, 'https://youtu.be/d4IbnlG9TwY'),
(5, 'Cây đèn đồng hình người quỳ', 4, 1, 1, 'Cách ngày nay 2000 - 1700 năm\r\nVăn hóa Đông Sơn', 'cay-den-dong-hinh-nguoi-quy', 11, 'Cây đèn đồng hình người quỳ là một hiện vật độc đáo tiêu biểu vào thời kỳ cuối văn hóa Đông Sơn, nằm trong số 30 bảo vật quốc gia đợt 1, năm 2012 và hiện đang được lưu giữ tại Bảo tàng Lịch sử quốc gia.', '', 1548, 'https://youtu.be/beLEQpx-uuI'),
(6, 'Trống đồng Cảnh Thịnh', 4, 1, 1, 'Năm 1800\r\nThời Tây Sơn', 'trong-dong-canh-thinh', 11, 'Trống đồng Cảnh Thịnh là loại hình hiện vật độc bản có giá trị nghệ thuật cổ tiêu biểu không chỉ cho giai đoạn lịch sử của một triều đại mà giá trị tự thân đã là một bảo vật quốc gia nối mạch cao quý nhiều đời truyền lại.', '', 2566, 'https://youtu.be/SK06pdfh_CU'),
(7, 'Tượng Phật Đồng Dương', 4, 2, 3, 'Thế kỷ VIII-XIX\r\nVăn hóa Chăm Pa', 'tuong-phat-dong-duong', 12, 'Tượng Phật Đồng Dương là pho tượng tạc hình Đức Phật Thích Ca Mâu Ni được tìm thấy bởi nhà khảo cổ học người Pháp Henri Parmentier vào tháng 4-1911 tại Đồng Dương, xã Bình Định, huyện Thăng Bình, tỉnh Quảng Nam.', '', 14910, 'https://youtu.be/1ryTpDtdnfw'),
(8, 'Tượng Nữ Thần Devi (Hương Quế)', 4, 2, 3, 'Thế kỷ X\r\nVăn hóa Chăm Pa', 'tuong-nu-than-devi-huong-que', 12, 'Tượng Nữ thần Devi được tìm thấy ở Hương Quế. Năm 1901, Louis Finot đã phát hiện một pho tượng quý, đó là tượng nữ thần Devi.', '', 30702, ''),
(9, 'Tượng Bồ tát Tara', 4, 3, 5, 'Thế kỷ IX - đầu thế kỉ X\r\nVăn hóa Chăm Pa', 'tuong-bo-tat-tara', 12, 'Tượng Bồ-tát Ta Ra là một trong những pho tượng bằng đồng cổ nhất nước ta, mặc dù đã có tuổi trên 1.300 năm nhưng vẫn còn rất tốt.', '', 140008, ''),
(10, 'Cuốn “Đường Kách mệnh”', 4, 1, 1, 'Năm 1927', 'duong-canh-menh', 11, 'Đường Kách mệnh là tác phẩm ghi lại những bài giảng của Nguyễn Ái Quốc cho các lớp đào tạo cán bộ tại Quảng Châu do Bộ tuyên truyền của \"Hội Liên hiệp các dân tộc bị áp bức ở Á Đông\" phát hành vào đầu năm 1927.', NULL, 101045, 'https://youtu.be/YHGJr-59TUU'),
(11, 'Bản Di chúc của Chủ tịch Hồ Chí Minh', 4, 1, 4, '15/5/1965', 'di-chuc-cua-chu-tich-Ho-Chi-Minh', 11, 'Di chúc của Chủ tịch Hồ Chí Minh là bản di chúc do Chủ tịch nước Việt Nam Dân chủ Cộng hòa Hồ Chí Minh lập, được công bố một phần sau khi ông qua đời.', NULL, 244535, 'https://youtu.be/x3z6Ytf_5ds'),
(12, 'Xe tăng T54B, số hiệu 843', 4, 2, 10, 'Năm 1975', 'xe-tang-843', 11, 'Chiếc xe tăng T54B mang số hiệu 843, một trong những chiếc xe tăng đầu tiên húc vào cổng phụ Dinh Độc Lập vào trưa 30-4-1975, đã được công nhận là Bảo vật Quốc gia và trở thành hiện vật vô cùng quý giá của dân tộc.', NULL, 456456, 'https://youtu.be/WCcVE2jZDy4'),
(13, 'Máy bay Mig 21 F96, số hiệu 5121', 4, 2, 10, 'Năm 1972', 'may-bay-mic-21-f96-so-hieu-5121', 11, ' Máy bay MiG-21 số hiệu 5121 là hiện vật có giá trị đặc biệt liên quan đến chiến dịch đánh bại cuộc tập kích chiến lược bằng B52 của Mỹ', NULL, 45645, 'https://youtu.be/x1ha6E31cT8'),
(14, 'Mộ thuyền Việt Khê', 4, 1, 1, 'Cách ngày nay khoảng 2.500 - 2.000 năm', 'mo-thuyen-viet-khe', 11, 'Mộ thuyền là một trong những táng tục đặc trưng của văn hóa Đông Sơn. Cho đến nay, mộ thuyền đã được phát hiện trong nhiều di tích Đông Sơn, cung cấp những tư liệu quý báu cho chúng ta tìm hiểu về tính chất cũng như các mối quan hệ của văn hóa nổi tiếng này.', NULL, 78324, 'https://youtu.be/PguPsaTwP1w'),
(15, 'Nhã nhạc - Âm nhạc Cung đình Việt Nam', 2, 5, 20, 'Thế kỉ XIII', 'nha-nhac-am-nhac-cung-dinh-Viet-Nam', 4, 'Nhã nhạc cung đình Huế là thể loại nhạc của cung đình thời phong kiến, được biểu diễn vào các dịp lễ hội trong năm của các triều đại nhà Nguyễn của Việt Nam.', NULL, 456543, 'https://youtu.be/YsYaqev7OIE'),
(16, 'Hát Xoan ở Phú Thọ', 2, 6, 20, 'Thế kỉ XV', 'hat-xoan-o-phu-tho', 4, 'Hát Xoan là di sản văn hóa phi vật thể quý báu của vùng Đất Tổ nói riêng và trong kho tàng di sản văn hóa dân tộc Việt Nam nói chung.', NULL, 45664, 'https://youtu.be/FJrX6_25JA8'),
(17, 'Võ cổ truyền Bình Định', 2, 7, 20, 'Năm 1471', 'vo-co-truyen-binh-dinh', 4, 'Võ thuật Bình Định bao gồm nhiều môn võ cổ truyền có xuất xứ từ tỉnh Bình Định hoặc đã từng phổ biến ở tỉnh này sau đó được truyền bá rộng rãi khắp cả Việt Nam và thế giới.', NULL, 85160, 'https://youtu.be/c27MaVknNSM'),
(18, 'Múa rối nước', 2, 8, 20, 'Thời nhà Lý', 'mua-roi-nuoc', 4, 'Múa rối nước là một loại hình nghệ thuật sân khấu dân gian truyền thống ra đời từ nền văn minh lúa nước. Từ một nghệ thuật mang yếu tố dân gian, múa rối nước đã trở thành một nghệ thuật truyền thống, và là một sáng tạo đặc trưng của người Việt Nam.', '', 65469, 'https://youtu.be/UflrbiIQlBA'),
(19, 'Hội Gióng đền Phù Đổng và đền Sóc ', 2, 1, 20, 'Khoảng thế kỉ XI', 'hoi-giong-den-phu-dong-va-den-soc', 5, 'Hội Gióng là một lễ hội truyền thống hàng năm ở nhiều nơi thuộc vùng Hà Nội để tưởng niệm và ca ngợi chiến công của người anh hùng truyền thuyết Thánh Gióng, một trong tứ bất tử của tín ngưỡng dân gian Việt Nam', '', 34558, 'https://youtu.be/ibZDQw-X3-g'),
(20, 'Nghề làm gốm của người Chăm', 2, 9, 20, 'Chưa có dữ liệu', 'nghe-lam-gom-cua-nguoi-cham', 8, 'Gốm Chăm được làm ra nhờ sự khéo léo, uyển chuyển, mềm mại của đôi tay và cơ thể, của sự sáng tạo cá nhân người phụ nữ Chăm.', NULL, 54678, 'https://youtu.be/CRYSQN-aVMA'),
(21, 'Khu Trung tâm Hoàng thành Thăng Long - Hà Nội', 3, 1, 20, 'Năm 1010', 'khu-trung-tam-hoang-thanh-thang-long-ha-noi', 3, 'Hoàng thành Thăng Long Hà Nội là quần thể di tích gắn với các giai đoạn lịch sử của dân tộc và là địa điểm tham quan hấp dẫn khi sở hữu nhiều công trình kiến trúc cổ xưa, đa dạng hoạt động ý nghĩa.', NULL, 213434, 'https://youtu.be/quyFhtMHies'),
(22, 'Quần thể kiến trúc Cố đô Huế', 3, 5, 20, 'Đầu thế kỷ XIX-nửa đầu thế kỷ XX', 'quan-the-kien-truc-co-do-hue', 3, 'Quần thể di tích Cố đô Huế hay Quần thể kiến trúc cố đô Huế là những di tích lịch sử - văn hóa do triều Nguyễn chủ trương xây dựng trong khoảng thời gian từ đầu thế kỷ 19 đến nửa đầu thế kỷ 20 trên địa bàn kinh đô Huế xưa.', NULL, 3245654, 'https://youtu.be/K1ie-Vgss-Q'),
(23, 'Đền Hùng', 3, 6, 20, 'Năm 968-979', 'den-hung', 3, 'Đền Hùng là tên gọi khái quát của Khu di tích lịch sử Đền Hùng - quần thể đền chùa thờ phụng các Vua Hùng và tôn thất của nhà vua trên núi Nghĩa Lĩnh (Việt Trì, Phú Thọ), gắn với Giỗ Tổ Hùng Vương - Lễ hội Đền Hùng được tổ chức tại địa điểm đó hàng năm vào ngày 10 tháng 3 âm lịch.', NULL, 645123, 'https://youtu.be/TWllttEMwvY'),
(24, 'Vườn Quốc gia Phong Nha - Kẻ Bàng', 3, 10, 20, 'Năm 1986', 'vuon-quoc-gia-phong-nha-ke-bang', 3, 'Khu bảo tồn Phong Nha-Kẻ Bàng có diện tích 5000 ha đã được Chính phủ Việt Nam chính thức công bố ngày 9 tháng 8 năm 1986 và đã được mở rộng thành 41.132 ha vào năm 1991', NULL, 45312, 'https://youtu.be/yOtqF9DRI-s'),
(25, 'Thống đồng thời Trần', 4, 11, 18, 'Thế kỉ XIII-XIV', 'thong-dong-thoi-tran', 11, 'Thống đồng thời Trần là một trong năm hiện vật quý của Bảo tàng Quảng Ninh đã được Thủ tướng Chính phủ công nhận Bảo vật Quốc gia ', NULL, 456546, NULL),
(26, 'Hộp vàng Ngọa Vân - Yên Tử', 4, 11, 18, 'Thế kỉ XIV', 'hop-vang-ngoa-van-yen-tu', 11, 'Hộp vàng Ngọa Vân - Yên Tử hay còn gọi là hộp vàng hình Hoa Sen, được xác định có niên đại thời Trần, nửa đầu thế kỷ 14.', NULL, 456451, 'https://youtu.be/kyFCWzHsihs'),
(27, 'Bình gốm Đầu Rằm', 4, 11, 18, 'Cách ngày nay hơn 3000 năm', 'binh-gom-dau-ram', 11, 'Bình gốm Đầu Rằm hay còn gọi là gốm Hoàng Tân được, được xác định có niên đại văn hóa Phùng Nguyên muộn, cách đây hơn 3.000 năm.', NULL, 46793, 'https://youtu.be/5l3S21UCsSs'),
(28, 'Mâm bồng gốm men vẽ nhiều màu', 4, 11, 18, 'Thế kỉ XV', 'mam-bong-gom-men-ve-nhieu-mau', 11, 'Mâm bồng gốm men vẽ nhiều màu là hiện vật bằng gốm, có niên đại khoảng thế kỷ XV, được sử dụng để đặt các lễ vật trong các nghi lễ tín ngưỡng, tôn giáo.', NULL, 78934, 'https://youtu.be/HgvB5ucUdZc'),
(30, 'Tượng Phật Hoàng Trần Nhân Tông', 4, 11, 18, 'Thế kỉ XVII', 'tuong-phat-hoang-tran-nhan-tong', 11, 'Tượng Phật Hoàng Trần Nhân Tông có niên đại thế kỷ 17, hiện được thờ trong tháp Huệ Quang, Khu di tích danh thắng Yên Tử (TP Uông Bí).', NULL, 345345, 'https://youtu.be/bexNuUYPLMg'),
(31, 'Bộ sưu tập trang sức vàng Trà Veo 3 và Lâm Thượng', 4, 12, 19, 'Từ thế kỷ thứ X - XII ', 'bo-suu-tap-trang-suc-vang-tra-veo-3-va-lam-thuong', 15, 'Bộ sưu tập trang sức vàng Trà Veo 3 và Lâm Thượng, gồm 15 hiện vật là nhẫn, khuyên tai, hoa tai. Đây là những hiện vật gốc độc bản duy nhất cho đến thời điểm này', NULL, 31320, 'https://youtu.be/mNaYJOKhqto');

INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(1, 'Hà Nội', 'ha-noi', 'https://congdankhuyenhoc.qltns.mediacdn.vn/thumb_w/840/449484899827462144/2022/11/23/ho-hoan-kiem-3-16691738384281662170345.jpg', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".', 'Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc trăm tuổi và nền văn hóa phong phú với sự ảnh hưởng của khu vực Đông Nam Á, Trung Quốc và Pháp. Trung tâm thành phố là Khu phố cổ nhộn nhịp, nơi các con phố hẹp được mang tên \"hàng\".');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(2, 'TP.Hồ Chí Minh', 'thanh-pho-ho-chi-minh', 'https://nhaf.net.vn/wp-content/uploads/2022/03/thanh-pho-ho-chi-minh-2048x1152.jpg', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ', 'Thành phố Hồ Chí Minh (thường được gọi là Sài Gòn) là một thành phố ở miền nam Việt Nam nổi tiếng với vai trò nòng cốt trong chiến tranh Việt Nam. ');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(3, 'Đà Nẵng', 'da-nang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg/576px-B%E1%BB%9D_%C4%91%C3%B4ng_c%E1%BA%A7u_R%E1%BB%93ng.jpg', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.', 'Đà Nẵng là một thành phố trực thuộc trung ương, nằm trong vùng Duyên hải Nam Trung Bộ. Là thành phố trung tâm và lớn nhất khu vực miền Trung - Tây Nguyên.');
INSERT INTO `locations` (`id`, `name`, `urlslug`, `image_url`, `short_description`, `description`) VALUES
(4, 'Bắc Ninh', 'bac-ninh', 'https://media.vneconomy.vn/w800/images/upload/2022/10/04/bac-ninh.jpeg', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế', 'Bắc Ninh là một tỉnh ở Việt Nam. Đây là tỉnh có diện tích nhỏ nhất cả nước, với vị trí nằm trong Vùng thủ đô Hà Nội, vùng kinh tế trọng điểm Bắc Bộ, thuộc vùng Đồng bằng sông Hồng. Bắc Ninh là trung tâm của xứ Kinh Bắc xưa, với 44 làng quan họ cổ, là cái nôi của Dân ca Quan họ được công nhận là di sản văn hóa phi vật thể đại diện của nhân loại sau nhã nhạc cung đình Huế'),
(5, 'Huế', 'hue', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Meridian_Gate%2C_Hue_%28I%29.jpg/420px-Meridian_Gate%2C_Hue_%28I%29.jpg', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.', 'Huế là thành phố tỉnh lỵ của tỉnh Thừa Thiên Huế, Việt Nam. Huế từng là kinh đô của Việt Nam dưới triều Tây Sơn và triều Nguyễn. Hiện nay, thành phố là một trong những trung tâm về văn hóa – du lịch, y tế chuyên sâu, giáo dục đào tạo, khoa học công nghệ của Miền Trung - Tây Nguyên và cả nước.'),
(6, 'Phú Thọ', 'phu-tho', 'https://images.baodantoc.vn/uploads/2022/Th%C3%A1ng%207/Ng%C3%A0y_15/TRUNG/Ph%C3%BA%20Th%E1%BB%8D/1.jpg', 'Phú Thọ là đất cội nguồn, đất của thế dựng nước và giữ nước, đất của các di tích lịch sử; đất của các danh thắng, của các sản vật thiên nhiên độc đáo.', 'Phú Thọ là đất cội nguồn, đất của thế dựng nước và giữ nước, đất của các di tích lịch sử; đất của các danh thắng, của các sản vật thiên nhiên độc đáo.'),
(7, 'Bình Định', 'binh-dinh', 'https://media.baodautu.vn/Images/chicuong/2021/02/09/Binh_Dinh_-_1_copy.jpg', 'Bình Định là một tỉnh ven biển nằm ở phía bắc khu vực duyên hải Nam Trung Bộ, miền Trung của Việt Nam.', 'Bình Định là một tỉnh ven biển nằm ở phía bắc khu vực duyên hải Nam Trung Bộ, miền Trung của Việt Nam.'),
(8, 'Hải Dương', 'hai-duong', 'https://media.baodautu.vn/Images/chicuong/2021/08/07/19.jpg', 'Hải Dương là thành phố tỉnh lỵ của tỉnh Hải Dương, Việt Nam. Thành phố Hải Dương hiện là đô thị loại I trực thuộc tỉnh Hải Dương.', 'Hải Dương là thành phố tỉnh lỵ của tỉnh Hải Dương, Việt Nam. Thành phố Hải Dương hiện là đô thị loại I trực thuộc tỉnh Hải Dương.'),
(9, 'Bình Thuận', 'binh-thuan', 'https://i.ex-cdn.com/nhadautu.vn/files/content/2020/04/21/tinh-binh-thuan-1735.jpg', 'Bình Thuận là một tỉnh ven biển nằm ở cực nam khu vực duyên hải Nam Trung Bộ, miền Trung của Việt Nam.', 'Bình Thuận là một tỉnh ven biển nằm ở cực nam khu vực duyên hải Nam Trung Bộ, miền Trung của Việt Nam.'),
(10, 'Quảng Bình', 'quang-binh', 'https://ik.imagekit.io/tvlk/blog/2021/09/du-lich-quang-binh-1.jpg?tr=dpr-2,w-675', 'Quảng Bình là một tỉnh ven biển nằm ở phía nam khu vực Bắc Trung Bộ, miền Trung của Việt Nam.', 'Quảng Bình là một tỉnh ven biển nằm ở phía nam khu vực Bắc Trung Bộ, miền Trung của Việt Nam.'),
(11, 'Quảng Ninh', 'quang-ninh', 'https://tuyengiao.vn/Uploads/2021/5/10/29/quang-ninh-lam-theo-loi-bac.jpg', 'Quảng Ninh là tỉnh ven biển thuộc vùng Đông Bắc Bộ Việt Nam Theo quy hoạch phát triển kinh tế, Quảng Ninh vừa thuộc vùng kinh tế trọng điểm phía bắc vừa thuộc Vùng duyên hải Bắc Bộ.', 'Quảng Ninh là tỉnh ven biển thuộc vùng Đông Bắc Bộ Việt Nam Theo quy hoạch phát triển kinh tế, Quảng Ninh vừa thuộc vùng kinh tế trọng điểm phía bắc vừa thuộc Vùng duyên hải Bắc Bộ.'),
(12, 'Quảng Ngãi', 'quang-ngai', 'https://media.vneconomy.vn/w800/images/upload/2021/12/07/quang-ngai-sap-co-to-hop-cham-soc-phuc-hoi-suc-khoe-du-lich-nghi-duong-570-ti-dong-1573897120.jpeg', 'Quảng Ngãi là một tỉnh ven biển nằm ở vùng Duyên hải Nam Trung Bộ, Việt Nam.', 'Quảng Ngãi là một tỉnh ven biển nằm ở vùng Duyên hải Nam Trung Bộ, Việt Nam.'),
(14, 'Điện Biên', 'dien-bien', 'https://file3.qdnd.vn/data/images/0/2023/05/06/tranhang/1a976114930pm.jpg?dpi=150&quality=100&w=870', 'Điện Biên là tỉnh miền núi thuộc vùng Tây Bắc Bộ của Việt Nam, gắn liền với chiến dịch Điện Biên Phủ và lễ hội hoa ban. Tỉnh lỵ của tỉnh là thành phố Điện Biên Phủ.', 'Điện Biên là tỉnh miền núi thuộc vùng Tây Bắc Bộ của Việt Nam, gắn liền với chiến dịch Điện Biên Phủ và lễ hội hoa ban. Tỉnh lỵ của tỉnh là thành phố Điện Biên Phủ.');

INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(1, 'Bảo tàng Lịch sử Quốc gia', 'Bảo tàng Lịch sử Việt Nam, cùng với Bảo tàng Cách mạng Việt Nam là hai bảo tàng đã được sáp nhập thành Bảo tàng Lịch sử quốc gia, tọa lạc ở thành phố Hà Nội.', 'bao-tang-lich-su-quoc-gia', 'http://www.hanoimoi.com.vn/Uploads/images/phananh/2021/11/04/baotang.jpg', '216 Đ. Trần Quang Khải, Tràng Tiền, Hoàn Kiếm, Hà Nội', 'Bảo tàng', 'Bảo tàng Lịch sử Việt Nam, cùng với Bảo tàng Cách mạng Việt Nam là hai bảo tàng đã được sáp nhập thành Bảo tàng Lịch sử quốc gia, tọa lạc ở thành phố Hà Nội.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(2, 'Bảo tàng Hồ Chí Minh', 'Bảo tàng Hồ Chí Minh là bảo tàng ở Hà Nội tập trung chủ yếu vào việc trưng bày những hiện vật, tư liệu về cuộc đời và con người Hồ Chí Minh. Nằm trong khu vực có nhiều di tích như: Lăng Chủ tịch Hồ Chí Minh, Khu di tích Phủ Chủ tịch, Chùa Một Cột,... tạo thành một quần thể các di tích thu hút khách tham quan trong và ngoài nước.', 'bao-tang-ho-chi-minh', 'https://bma.vn/wp-content/uploads/2022/07/bma-bao-tang-ho-chi-minh.jpg', 'Số 01 Nguyễn Tất Thành, phường 12, quận 4, Thành phố Hồ Chí Minh.', 'Bảo tàng', 'Bảo tàng Hồ Chí Minh là bảo tàng ở Hà Nội tập trung chủ yếu vào việc trưng bày những hiện vật, tư liệu về cuộc đời và con người Hồ Chí Minh. Nằm trong khu vực có nhiều di tích như: Lăng Chủ tịch Hồ Chí Minh, Khu di tích Phủ Chủ tịch, Chùa Một Cột,... tạo thành một quần thể các di tích thu hút khách tham quan trong và ngoài nước.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(3, 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.', 'bao-tang-lich-su-thanh-pho-ho-chi-minh', 'https://bocapvang.net/wp-content/uploads/2022/09/bao-tang-lich-su-Viet-Nam-TPHCM-1-2048x1536.jpg', '2 Nguyễn Bỉnh Khiêm, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh', 'Bảo tàng', 'Bảo tàng Lịch sử Thành phố Hồ Chí Minh tọa lạc tại số 2 đường Nguyễn Bỉnh Khiêm, phường Bến Nghé, Quận 1, trong khuôn viên Thảo Cầm Viên Sài Gòn. Đây là nơi bảo tồn và trưng bày hàng chục ngàn hiện vật quý được sưu tầm trong và ngoài nước Việt Nam.');
INSERT INTO `management_units` (`id`, `name`, `description`, `urlslug`, `image_url`, `address`, `note`, `short_description`) VALUES
(4, 'Cục lưu trữ Văn phòng Trung ương Đảng', 'Cục Lưu trữ Văn phòng Trung ương Đảng là tổ chức có vai trò quan trọng trong quản lý di sản của Đảng Cộng sản Việt Nam. Cục này đảm nhận nhiệm vụ thu thập, quản lý và bảo quản các tài liệu, hồ sơ và văn bản liên quan đến hoạt động của Đảng.', 'cuc-luu-tru-van-phong-trung-uong-dang', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/CPV_Central_Committee_Office_%289753420401%29.jpg/375px-CPV_Central_Committee_Office_%289753420401%29.jpg', 'Số 9A Nguyễn Cảnh Chân,, Quận Ba Đình, Hà Nội', 'Tổ chức', 'Cục Lưu trữ Văn phòng Trung ương Đảng là tổ chức có vai trò quan trọng trong quản lý di sản của Đảng Cộng sản Việt Nam. Cục này đảm nhận nhiệm vụ thu thập, quản lý và bảo quản các tài liệu, hồ sơ và văn bản liên quan đến hoạt động của Đảng.'),
(5, 'Bảo tàng Điêu khắc Chăm Đà Nẵng', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng do người Pháp xây dựng, chuyên sưu tập, cất giữ và trưng bày các di vật về nghệ thuật điêu khắc của vương quốc Chăm Pa tìm thấy ở các tháp, thành lũy Chăm tại các tỉnh duyên hải Nam Trung Bộ từ Hà Tĩnh tới Bình Thuận và các tỉnh Tây Nguyên.', 'bao-tang-dieu-khac-cham-da-nang', 'https://images.foody.vn/res/g29/280647/prof/s576x330/foody-mobile-m-cham-jpg-375-636111054731610260.jpg', 'Số 02 Đ. 2 Tháng 9, Bình Hiên, Hải Châu, Đà Nẵng', 'Bảo tàng', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng do người Pháp xây dựng, chuyên sưu tập, cất giữ và trưng bày các di vật về nghệ thuật điêu khắc của vương quốc Chăm Pa tìm thấy ở các tháp, thành lũy Chăm tại các tỉnh duyên hải Nam Trung Bộ từ Hà Tĩnh tới Bình Thuận và các tỉnh Tây Nguyên.'),
(6, 'Bảo tàng Điêu khắc Chăm', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng trưng bày hiện vật Chăm quy mô nhất ở Việt Nam, trực thuộc Bảo tàng Đà Nẵng.', 'bao-tang-dieu-khac-cham', 'https://static.vinwonders.com/2022/04/bao-tang-dieu-khac-cham-3.jpg', 'Số 02 Đ. 2 Tháng 9, Bình Hiên, Hải Châu, Đà Nẵng', 'Bảo tàng', 'Bảo tàng Nghệ thuật Điêu khắc Chăm Đà Nẵng là bảo tàng trưng bày hiện vật Chăm quy mô nhất ở Việt Nam, trực thuộc Bảo tàng Đà Nẵng.'),
(7, 'Chùa Phật Tích', 'Chùa Phật Tích còn gọi là chùa Vạn Phúc là một ngôi chùa nằm ở sườn phía Nam núi Phật Tích, xã Phật Tích, huyện Tiên Du, tỉnh Bắc Ninh. Trong chùa có tượng đức Phật bằng đá thời nhà Lý lớn nhất Việt Nam.', 'chua-phat-tich', 'https://cdn.sgtiepthi.vn/wp-content/uploads/2023/01/chua-phat-tich-dcdd13-1024x667.jpg', 'Thôn Phật Tích, Tiên Du, Bắc Ninh', 'Chùa', 'Chùa Phật Tích còn gọi là chùa Vạn Phúc là một ngôi chùa nằm ở sườn phía Nam núi Phật Tích, xã Phật Tích, huyện Tiên Du, tỉnh Bắc Ninh. Trong chùa có tượng đức Phật bằng đá thời nhà Lý lớn nhất Việt Nam.'),
(8, 'Chùa Bút Tháp', 'Chùa Bút Tháp nằm ở bên đê hữu ngạn sông Đuống, thôn Bút Tháp, xã Đình Tổ, thị xã Thuận Thành, tỉnh Bắc Ninh.', 'chua-but-thap', 'https://disanvanhoathuanthanh.vn/DataFiles/2017/12/News/Thumb/20171208-115619-RleJYueV.jpg', 'Bút Tháp, Thuận Thành, Bắc Ninh', 'Chùa', 'Chùa Bút Tháp nằm ở bên đê hữu ngạn sông Đuống, thôn Bút Tháp, xã Đình Tổ, thị xã Thuận Thành, tỉnh Bắc Ninh.'),
(9, 'Bảo tàng Cổ vật Cung đình Huế', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.', 'bao-tang-co-vat-cung-dinh-hue', 'https://media.mia.vn/uploads/blog-du-lich/bao-tang-co-vat-cung-dinh-hue-nghin-nam-con-do-ve-dep-cua-van-hoa-co-do-1-1637922298.jpg', '03 Lê Trực, Phú Hậu, Thành phố Huế, Thừa Thiên Huế', 'Bảo tàng', 'Bảo tàng Cổ vật Cung đình Huế là một viện bảo tàng trực thuộc sự quản lý của Trung tâm bảo tồn di tích cố đô Huế. Tòa nhà chính của viện bảo tàng bằng gỗ, có 128 cây cột gỗ quý, trên các cột có hình chạm khắc tứ linh: long - li - quy - phụng và hơn 1000 bài thơ bằng chữ Hán.'),
(10, 'Bảo tàng Lịch sử Quân sự Việt Nam', 'Bảo tàng Lịch sử Quân sự Việt Nam là một trong các bảo tàng quốc gia và đứng đầu trong hệ thống Bảo tàng Quân đội, hiện đang lưu giữ, trưng bày hơn 15 vạn tài liệu, hiện vật', 'bao-tang-lich-su-quan-su-Viet-Nam', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Army_Museum_Entrance%2C_Hanoi.jpg/440px-Army_Museum_Entrance%2C_Hanoi.jpg', '28A Điện Biên Phủ, Điện Biên, Ba Đình, Hà Nội', 'Bảo tàng', 'Bảo tàng Lịch sử Quân sự Việt Nam là một trong các bảo tàng quốc gia và đứng đầu trong hệ thống Bảo tàng Quân đội, hiện đang lưu giữ, trưng bày hơn 15 vạn tài liệu, hiện vật'),
(18, 'Bảo tàng tỉnh Quảng Ninh', 'Bảo tàng Quảng Ninh là bảo tàng công lập đầu ngành của tỉnh Quảng Ninh. Bảo tàng Quảng Ninh là đơn vị sự nghiệp trực thuộc Sở Văn hóa và Thể thao tỉnh Quảng Ninh', 'bao-tang-tinh-quang-ninh', 'https://media.quangninh.gov.vn/618ca5c4-79b3-478a-8adb-4184369067f7/Libraries/HinhAnhBaiViet/A%20BAT/Nam%202020/Thang%2012/Tuan%203/ki%E1%BB%87t%20t%C3%A1c%20b%C3%AAn%20b%E1%BB%9D%20di%20%201.jpg', 'Trần Quốc Nghiễn, Hồng Gai, Thành phố Hạ Long, Quảng Ninh', 'Bảo tàng', 'Bảo tàng Quảng Ninh là bảo tàng công lập đầu ngành của tỉnh Quảng Ninh. Bảo tàng Quảng Ninh là đơn vị sự nghiệp trực thuộc Sở Văn hóa và Thể thao tỉnh Quảng Ninh'),
(19, 'Bảo tàng tổng hợp tỉnh Quảng Ngãi', 'Bảo tàng Tổng hợp tỉnh Quảng Ngãi là một địa điểm du lịch nổi tiếng tại khu vực miền Trung. Nằm tại số 02 đường Hùng Vương, thành phố Quảng Ngãi, tỉnh Quảng', 'bao-tang-tong-hop-tinh-quang-ngai', 'https://media.cungphuot.info/2019/03/26098/bao-tang-tinh-quang-ngai.jpg', '99 Lê Trung Đình, Trần Hưng Đạo, Quảng Ngãi, 53106', 'Bảo tàng', 'Bảo tàng Tổng hợp tỉnh Quảng Ngãi là một địa điểm du lịch nổi tiếng tại khu vực miền Trung. Nằm tại số 02 đường Hùng Vương, thành phố Quảng Ngãi, tỉnh Quảng'),
(20, 'Cục Di sản Văn hóa', 'Cục Di sản văn hóa là cơ quan trực thuộc Bộ Văn hóa, Thể thao và Du lịch, có chức năng tham mưu giúp Bộ trưởng thực hiện chức năng quản lý nhà nước về di sản văn hóa', 'cuc-di-san-van-hoa', 'https://baotang.thanhhoa.gov.vn/portal/LinkImage/aa3a60903ddfdccdc%E1%BB%A5c%20di%20s%E1%BA%A3n.jpg', 'Số 51 Ngô Quyền, quận Hoàn Kiếm, thành phố Hà Nội', 'Tổ chức', 'Cục Di sản văn hóa là cơ quan trực thuộc Bộ Văn hóa, Thể thao và Du lịch, có chức năng tham mưu giúp Bộ trưởng thực hiện chức năng quản lý nhà nước về di sản văn hóa');

INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(1, 'cuteo', '2023-04-27 01:52:02', 'teovippro', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(3, 'suongqv', '2023-04-27 01:54:15', 'suongqv', 0);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(4, 'sangadmin', '2023-06-07 19:00:00', 'sang', 1);
INSERT INTO `users` (`id`, `user_name`, `subscribe_day`, `password`, `permission`) VALUES
(5, 'trangadmin', '2023-06-07 19:00:00', 'trang', 1),
(6, 'linhadmin', '2023-06-07 19:00:00', 'linh', 1),
(10, 'tructtt', '2023-06-07 05:34:20', 'truc', 0),
(15, 'quyndn', '2023-06-07 05:34:20', 'quynh', 0),
(16, 'nhattdm', '2023-06-07 19:00:00', 'nhat', 0);


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;