/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `audios`;
CREATE TABLE `audios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` longtext,
  `audio_url` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `extension` varchar(255) DEFAULT NULL,
  `is_current_use` tinyint(1) NOT NULL DEFAULT '0',
  `scene_id` int NOT NULL DEFAULT '0',
  `size` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `upload_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `audios` (`id`, `name`, `audio_url`, `extension`, `is_current_use`, `scene_id`, `size`, `user_id`, `upload_date`) VALUES
(14, 'buoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f', 'https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/audios%2Fbuoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f_a80b6c83-b1c3-46d2-9c8b-3b9cfd858f05.mp3?alt=media&token=9b4e3305-4096-42fc-b708-a4d24c041f4e', 'mp3', 0, 103, 255417, 4, '2024-05-15 16:32:13');
INSERT INTO `audios` (`id`, `name`, `audio_url`, `extension`, `is_current_use`, `scene_id`, `size`, `user_id`, `upload_date`) VALUES
(15, 'buoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f', 'https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/audios%2Fbuoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f_6b344d53-db3a-494b-ab94-cc8ca3f50d4b.mp3?alt=media&token=c75d8f5d-8503-48da-9dd0-81257320aeed', 'mp3', 0, 103, 255417, 4, '2024-05-15 16:36:10');
INSERT INTO `audios` (`id`, `name`, `audio_url`, `extension`, `is_current_use`, `scene_id`, `size`, `user_id`, `upload_date`) VALUES
(16, 'buoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f', 'https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/audios%2Fbuoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f_137c9626-2bfa-4f23-a0e7-c478c75dc820.mp3?alt=media&token=7a22e027-81f9-4590-bcfe-bc310559de23', 'mp3', 0, 100, 255417, 4, '2024-05-16 08:21:59');
INSERT INTO `audios` (`id`, `name`, `audio_url`, `extension`, `is_current_use`, `scene_id`, `size`, `user_id`, `upload_date`) VALUES
(17, 'buoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f', 'https://firebasestorage.googleapis.com/v0/b/qbdsvhlamdong.appspot.com/o/audios%2Fbuoc_vao_bao_tang_lam_dong_du_khach_nhu_lac_buoc_6e347358-9cee-4f91-87ec-7c3e16f7e73f_c439a748-82db-4e8c-9b4b-ab995237fa37.mp3?alt=media&token=e0f7d67e-9d31-4f67-9ff2-772d48e6d9ae', 'mp3', 1, 96, 255417, 4, '2024-05-16 08:23:13');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;