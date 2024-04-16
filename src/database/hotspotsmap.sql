/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `hotspotsmap` (
  `id` int NOT NULL AUTO_INCREMENT,
  `top` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `left` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imgaes` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `scene` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `hotspotsmap` (`id`, `top`, `left`, `imgaes`, `scene`) VALUES
(29, '80%', '33%', 'https://console.firebase.google.com/u/1/project/qbdsvhlamdong/storage/qbdsvhlamdong.appspot.com/files/~2Fhotspotsmap', 'insideOne');
INSERT INTO `hotspotsmap` (`id`, `top`, `left`, `imgaes`, `scene`) VALUES
(30, '50%', '20%', 'https://console.firebase.google.com/u/1/project/qbdsvhlamdong/storage/qbdsvhlamdong.appspot.com/files/~2Fhotspotsmap', 'LinhAnTour');
INSERT INTO `hotspotsmap` (`id`, `top`, `left`, `imgaes`, `scene`) VALUES
(31, '20%', '30%', 'https://console.firebase.google.com/u/1/project/qbdsvhlamdong/storage/qbdsvhlamdong.appspot.com/files/~2Fhotspotsmap', 'LinhAnTour_01');
INSERT INTO `hotspotsmap` (`id`, `top`, `left`, `imgaes`, `scene`) VALUES
(32, '11.4%', '50%', 'https://console.firebase.google.com/u/1/project/qbdsvhlamdong/storage/qbdsvhlamdong.appspot.com/files/~2Fhotspotsmap', 'aroundTour'),
(33, '90%', '50.6%', 'https://console.firebase.google.com/u/1/project/qbdsvhlamdong/storage/qbdsvhlamdong.appspot.com/files/~2Fhotspotsmap', 'outsideOne');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;