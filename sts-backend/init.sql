-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: jdc_sms_db
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKi9rhmcfbg6x29l417eep0u3f5` (`batch_code`),
  KEY `FKfw7md94a64xgsv0otrhnbxh98` (`course_id`),
  KEY `FKdcsqch8i1ks2wr33hsfibusle` (`teacher_id`),
  CONSTRAINT `FKdcsqch8i1ks2wr33hsfibusle` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKfw7md94a64xgsv0otrhnbxh98` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `batches`
--

LOCK TABLES `batches` WRITE;
/*!40000 ALTER TABLE `batches` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'Full Stack Developer','Learn Spring Boot 3 & React with Shadcn UI','3 Months',450.00),(2,'Java Developer Course','Learn Java spring boot spring, security','3 Months',600000.00),(3,'Frontend Developer','Learn React, TypeScript, Tailwind CSS, and Shadcn UI','2 Months',300.00),(4,'Backend Developer','Spring Boot, REST API, JWT Authentication, Hibernate','4 Months',750.00),(5,'Mobile App Development','Flutter & Dart for Android and iOS development','3 Months',500.00),(6,'UI/UX Design Course','Figma, Adobe XD, wireframing and prototyping','2 Months',250.00),(7,'Database Mastery','MySQL, PostgreSQL, normalization, indexing, and optimization','1.5 Months',200.00);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrollment`
--

LOCK TABLES `enrollment` WRITE;
/*!40000 ALTER TABLE `enrollment` DISABLE KEYS */;
/*!40000 ALTER TABLE `enrollment` ENABLE KEYS */;
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
  `password` varchar(255) NOT NULL,
  `role` enum('ROLE_ADMIN','ROLE_STUDENT','ROLE_TEACHER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@jdc.edu',_binary '','system_admin','$2a$10$Foxs9MLTumCARAVAuaLv3OVNg.AWAF3oq7u89GDltzdZO7/FxQZZe','ROLE_ADMIN'),(2,'arkar@gmail.com',_binary '','Arkar','$2a$10$UlHuHM7sh5PHbcJVy5w6O..KAdeg/FGjMSPk3ECacqrrNdQXJ6aka','ROLE_STUDENT');
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

-- Dump completed on 2026-07-07  0:19:44
