-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: jdc_sms_db
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `batches` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `batch_code` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `course_id` bigint NOT NULL,
  `teacher_id` bigint NOT NULL,
  `cohort_level` varchar(50) NOT NULL,
  `enrolled_seats` int NOT NULL,
  `format` varchar(50) NOT NULL,
  `max_seats` int NOT NULL,
  `schedule_info` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKi9rhmcfbg6x29l417eep0u3f5` (`batch_code`),
  KEY `FKfw7md94a64xgsv0otrhnbxh98` (`course_id`),
  KEY `FKdcsqch8i1ks2wr33hsfibusle` (`teacher_id`),
  CONSTRAINT `FKdcsqch8i1ks2wr33hsfibusle` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfw7md94a64xgsv0otrhnbxh98` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batches`
--

LOCK TABLES `batches` WRITE;
/*!40000 ALTER TABLE `batches` DISABLE KEYS */;
INSERT INTO `batches` VALUES (3,'B1-REACT-2026','2026-08-01',1,15,'Intermediate to Advanced',3,'In Person',50,'Sat & Sun (9:00 AM - 12:00 PM)'),(4,'B1-JAVA-2026','2026-08-15',2,15,'Advanced Professional',3,'In Person',50,'Mon & Wed (6:30 PM - 8:30 PM)'),(5,'DCC-2026-B1','2026-08-05',8,29,'Intermediate',1,'Online',30,'Mon, Wed, Fri (09:00 AM - 11:00 AM)'),(6,'PC-2026-B1','2026-07-25',7,15,'Beginner',0,'On Campas',30,'Mon, Wed, Fri (09:00 AM - 11:00 AM)');
/*!40000 ALTER TABLE `batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `course_name` varchar(150) NOT NULL,
  `description` text,
  `duration` varchar(50) NOT NULL,
  `fees` decimal(10,2) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Full-Stack React Store Blueprint','Accelerate your frontend development skills by mastering React from the ground up. This course focuses on modern functional components, advanced React hooks, and clean state management. You will learn to build slick, component-driven user interfaces utilizing Tailwind CSS and CSS variables. We dive deep into client-side routing using React Router DOM to manage complex multi-page applications. You will learn how to efficiently integrate asynchronous API calls using Axios to connect with any backend system. You will also manage global application state with modern lightweight tools like Zustand. This practical guide focuses entirely on the modern React 19 ecosystem to make you a highly proficient frontend engineer.','3 Months',200000.00,'Frontend','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/react-master.png'),(2,'Enterprise Java fullstack course','Master the art of building robust enterprise-grade web applications from scratch. You will learn to architect clean and scalable backends using Java and Spring Boot with secure RESTful APIs. On the frontend, you will build dynamic and highly responsive user interfaces using React, modern TypeScript, and Tailwind CSS. We cover database integration deeply using PostgreSQL and Spring Data JPA for persistent storage. You will implement industry-standard security protocols including JWT authentication and role-based authorization. By the end of this course, you will deploy a complete production-ready full-stack application to the cloud. This program is designed specifically to transform you into an independent, job-ready full-stack developer.','4 Months',300000.00,'Web Development','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/banners/1785001591389_gmrz3gx.png'),(3,'Node.js Full Stack Live Interactive Program','Deep dive into event-driven runtime networks, Express frameworks, real-time engines with Socket.io, and MongoDB data modeling.','3 Months',400000.00,'Fullstack','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/node-js.png'),(4,'AI & ML Professional Engineering Course','Statistical data modeling, deep neural networks using TensorFlow and PyTorch, and deploying automated prediction APIs.','4 Months',600000.00,'Data Science','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/ai-ml.png'),(6,'C++ Full Course','Welcome to the ultimate C++ programming course designed to take you from a complete beginner to a proficient software engineer capable of building high-performance, real-world applications. C++ remains the backbone of system programming, game development engines (Unreal Engine), financial trading systems, and embedded software due to its unmatched speed and low-level resource management.\nThis comprehensive course covers everything from basic syntax to modern C++ standards, deep-dive memory management, advanced data structures, and system-level programming.','14 weeks',3000000.00,'Backend','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/banners/1784909460094_cha23dx.png'),(7,'Python Course (Zero to Hayabuza)','Start your coding journey with Python—the world\'s most popular, beginner-friendly, and versatile programming language. Designed for absolute beginners with no prior coding experience, this course covers core programming fundamentals step-by-step. You will learn to write clean code, solve logical problems, build simple software tools, and set up a solid foundation for careers in Web Development, Data Science, Automation, or Artificial Intelligence.','8 weeks',200000.00,'Backend','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/banners/1784909942073_253erad.png'),(8,'Docker Crash Course','This complete, practical guide is designed to take you from a Docker beginner to an application-containerization expert in record time. Forget complex theory and dry documentation; this course focuses on hands-on, real-world skills that you can use immediately. We cover the entire Docker ecosystem, ensuring you not only understand how to containerize an application but why you should, and how to scale and deploy it efficiently. This is your fast track to streamlined development pipelines and easier software distribution.','8 weeks',200000.00,'Backend','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/course_banner/banners/1784967126073_6gkmb7t.png');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrollment`
--

DROP TABLE IF EXISTS `enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrollment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `enrollment_date` datetime(6) NOT NULL,
  `enrollment_status` enum('APPROVED','DROPPED','PENDING') NOT NULL,
  `batch_id` bigint NOT NULL,
  `student_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3fiqt6gmichytwxs16flqe15r` (`batch_id`),
  KEY `FKl16dtl7cgm3p2kfip5pml5jsh` (`student_id`),
  CONSTRAINT `FK3fiqt6gmichytwxs16flqe15r` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`),
  CONSTRAINT `FKl16dtl7cgm3p2kfip5pml5jsh` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
INSERT INTO `enrollment` VALUES (13,'2026-07-24 00:57:37.013351','APPROVED',4,22),(14,'2026-07-24 00:57:46.951844','APPROVED',3,22),(15,'2026-07-24 01:07:31.314663','APPROVED',3,16),(16,'2026-07-24 09:23:04.987040','APPROVED',4,16),(17,'2026-07-25 15:14:00.057132','APPROVED',3,17),(18,'2026-07-25 17:50:59.407658','APPROVED',5,17),(19,'2026-07-25 22:07:45.800007','APPROVED',4,17);
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `material_url` varchar(150) DEFAULT NULL,
  `module_name` varchar(100) NOT NULL,
  `publish_date` date NOT NULL,
  `recording_url` varchar(150) DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `batch_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mpwowy4dhm071ro9fqkor7fq` (`batch_id`),
  CONSTRAINT `FK1mpwowy4dhm071ro9fqkor7fq` FOREIGN KEY (`batch_id`) REFERENCES `batches` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (10,'https://github.com/Arkarhein-123/student-management-system.git','Module 1: Spring Core & Fundamentals','2026-08-01','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Course Introduction & Environment Setup',4),(11,'https://github.com/Arkarhein-123/student-management-system.git','Module 1: Spring Core & Fundamentals','2026-08-03','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Inversion of Control & Dependency Injection',4),(12,NULL,'Module 1: Spring Core & Fundamentals','2026-08-05','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Spring Bean Lifecycle & Configuration',4),(13,'https://github.com/Arkarhein-123/student-management-system.git','Module 2: Spring Data JPA','2026-08-08','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','JPA Entities & Entity Manager',4),(14,'https://github.com/Arkarhein-123/student-management-system.git','Module 2: Spring Data JPA','2026-08-10','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Spring Data Repositories(Dao) & JPQL Queries',4),(15,'https://github.com/Arkarhein-123/student-management-system.git','Module 2: Spring Data JPA','2026-08-12','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Database Migrations with Flyway',4),(16,'https://github.com/Arkarhein-123/student-management-system.git','Module 3: REST API Development','2026-08-15','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Building RESTful Controllers & DTO Mappings',4),(17,NULL,'Module 3: REST API Development','2026-08-17','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Exception Handling & Custom Error Responses',4),(18,NULL,'Module 3: REST API Development','2026-08-19','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Upcoming Workshop Overview',4),(19,'','Module1: Docker Introduction','2026-07-25','https://drive.google.com/file/d/1gcfWb6zYVzxmD6vGZg5sREAfgGKqcLFM/view?usp=sharing','Introduction to Docker',5),(20,'','Module 1: React Basic','2026-07-25','https://drive.google.com/drive/folders/1s6J5IiFHp2j9GmgjL-EdR3AT-swrmsW5?usp=sharing','Intro to React',3);
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` decimal(12,2) NOT NULL,
  `remarks` text,
  `slip_image_url` varchar(255) NOT NULL,
  `status` enum('APPROVED','DROPPED','PENDING') NOT NULL,
  `submitted_at` datetime(6) NOT NULL,
  `enrollment_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfjrdkottkqojb3nbkdw7b4fxg` (`enrollment_id`),
  CONSTRAINT `FKoajsvk0sjsnpxvkixko9wx2se` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollment` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (5,300000.00,NULL,'https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784831255554_btvby7z.jpg','APPROVED','2026-07-24 00:57:37.036770',13),(6,200000.00,NULL,'https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784831266569_3aacpxi.png','APPROVED','2026-07-24 00:57:46.957504',14),(7,200000.00,NULL,'https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784831850099_bi2247i.jpg','APPROVED','2026-07-24 01:07:31.317672',15),(8,300000.00,NULL,'https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784861584108_fpv1q5q.jpg','APPROVED','2026-07-24 09:23:05.023552',16),(9,200000.00,'testing','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784969038959_w134x9j.jpg','APPROVED','2026-07-25 15:14:00.084769',17),(10,200000.00,'docker crash course payment','https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784978458172_z2s91fp.jpg','APPROVED','2026-07-25 17:50:59.416828',18),(11,300000.00,NULL,'https://egsxmisszjymcdmeoffe.supabase.co/storage/v1/object/public/payment-image/slips/1784993864529_ek7vwm5.jpg','APPROVED','2026-07-25 22:07:45.825271',19);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(150) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(150) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_STUDENT','ROLE_TEACHER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'teacher.core@gmail.com',_binary '','Saya Kyaw Kyaw Lwin Thant','$2a$10$mleLiAS4ERdAv8kJAgQ8R.0oRiDh.041XuHXPbEFbh4OMjovWJo4.','ROLE_TEACHER'),(16,'student1@email.com',_binary '','Alpha Win','$2a$10$.OXKJznKS4bIaCwKORoo4uISLzkSQW6M4N/K7OYG6hReNQskuNLKq','ROLE_STUDENT'),(17,'student2@email.com',_binary '','Beta Kyaw','$2a$10$lbpaQC2Xn3NGvJcQyv4BNOUv.h.mSeRSMr78p1VDGHfGoBQVnbg8C','ROLE_STUDENT'),(18,'student3@email.com',_binary '','Gamma Aung','$2a$10$JPWArnUTlK9gWlN8cO0omegGQ8u7Oc6S5q.av9byTqNjWPwBOH10O','ROLE_STUDENT'),(19,'student4@email.com',_binary '','Delta Soe','$2a$10$FblBSH1T9w2rCSNfJMfpL.DAb6ORco9P44EXwE7hyeHyNJ4CWf.M.','ROLE_STUDENT'),(20,'admin@jdc.edu',_binary '','system_admin','$2a$10$NnEUOrYlYE3EZIzmstdDUu5YCFoTFoafoX8T7eYzDydWWLfmxupku','ROLE_ADMIN'),(21,'betastudent@email.com',_binary '','Beta Test Student','$2a$10$wY6Q6Z8NCkaxdGYnmqVCNOAjNUm8js2LJsW5f3P45SV6Ves2J7gfq','ROLE_STUDENT'),(22,'arkarhein@gmail.com',_binary '','Arkarhein-123','$2a$10$9bUC4rCkVgrD.yYNQFp85OXFrVYhSmgjrsTwFEJinZOnx/SOGkqu.','ROLE_STUDENT'),(29,'sayaminlwin@gmail.com',_binary '','saya-min-lwin','$2a$10$aBU9YCzAmozr159TUwcYGOpEH8eeoHLKibPqVKxxkGRPtPcsQPvyS','ROLE_TEACHER'),(30,'htet@gmail.com',_binary '','HtetHtet','$2a$10$PYcna908xGO2ZGZnz2ovxO0OpxQG7SM1fIrPfriSNHnKATtmrelv2','ROLE_STUDENT');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-26  2:35:15
