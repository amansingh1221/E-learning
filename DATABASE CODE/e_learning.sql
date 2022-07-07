CREATE DATABASE  IF NOT EXISTS `e_learning` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `e_learning`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: e_learning
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `user_password` int NOT NULL,
  `user_name` varchar(50) NOT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (12345,'abhishek121'),(98765,'aman121'),(123456,'amit121'),(12345,'aryan121'),(12345,'atul121'),(56789,'ay796'),(12345,'ayush121'),(12345,'durga121'),(12345,'haja121'),(192837,'naveen123'),(12345,'pragati121'),(98765,'rectifier'),(12345,'sushil121');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_name` varchar(50) NOT NULL,
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `account` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('atul',1,'atul121'),('pragati',2,'pragati121'),('amit',3,'amit121'),('ayush',5,'ay796');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificate`
--

DROP TABLE IF EXISTS `certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `certificate` (
  `Certificate_id` int NOT NULL,
  `Issue_date` date NOT NULL,
  `stu_id` int NOT NULL,
  PRIMARY KEY (`Certificate_id`),
  KEY `stu_id` (`stu_id`),
  CONSTRAINT `certificate_ibfk_1` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificate`
--

LOCK TABLES `certificate` WRITE;
/*!40000 ALTER TABLE `certificate` DISABLE KEYS */;
INSERT INTO `certificate` VALUES (2011,'2022-10-12',3),(2021,'2020-09-11',6),(2022,'2021-08-25',2),(2041,'2021-11-12',5),(2061,'2021-01-23',4),(2062,'2021-05-22',4);
/*!40000 ALTER TABLE `certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course`
--

DROP TABLE IF EXISTS `course`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course` (
  `course_id` varchar(50) NOT NULL,
  `course_name` varchar(50) NOT NULL,
  `course_fees` int NOT NULL,
  `course_desc` varchar(300) DEFAULT NULL,
  `course_image` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course`
--

LOCK TABLES `course` WRITE;
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` VALUES ('AI201','Artificial Intelligence',999,'This course provides you depth knowledge about artificial intelligence.','choice-1650210944073.jpg'),('C01','C programming',699,'This course provides you depth knowledge about C. It include all concept of pointer and dynamic memory allocation.','choice-1650108083672.png'),('CS202','System Software',299,'This course provides you depth knowledge about system software.','CS202.jpg'),('CS203','Data Structure',1299,'This course provides you depth knowledge about data structure including advance data structure.','CS203.png'),('CS204','Database',899,'This course provides you depth knowledge about mysql database.','CS204.png'),('EC206','Digital Circuit',399,'This course provides you depth knowledge about digital circuits.','EC206.png'),('MA201','Numerical Techniques',499,'This course provides you depth knowledge about numerical techniques.','MA201.png'),('PY201','Python',799,'This course provides you depth knowledge about python.','choice-1650132883717.png');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enrolls`
--

DROP TABLE IF EXISTS `enrolls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enrolls` (
  `stu_id` int NOT NULL,
  `course_id` varchar(50) NOT NULL,
  PRIMARY KEY (`stu_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrolls_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `enrolls_ibfk_3` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enrolls`
--

LOCK TABLES `enrolls` WRITE;
/*!40000 ALTER TABLE `enrolls` DISABLE KEYS */;
INSERT INTO `enrolls` VALUES (2,'CS202'),(3,'CS202'),(6,'CS202'),(1,'CS204'),(5,'CS204'),(1,'EC206'),(4,'EC206'),(3,'MA201'),(5,'MA201');
/*!40000 ALTER TABLE `enrolls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `feedback` varchar(250) NOT NULL,
  `feedback_id` int NOT NULL,
  `stu_id` int NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `stu_id` (`stu_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`),
  CONSTRAINT `feedback_ibfk_4` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES ('quiz related query',11,1,3),('course related query',12,1,1),('other queries',13,1,1),('fees related query',14,1,2),('other queries',21,2,1),('quiz related query',41,4,3),('fees queries',42,4,3),('other queries',61,6,3),('course related query',71,7,1);
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `givequiz`
--

DROP TABLE IF EXISTS `givequiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `givequiz` (
  `stu_id` int NOT NULL,
  `Quiz_id` int NOT NULL,
  `marks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`stu_id`,`Quiz_id`),
  KEY `Quiz_id` (`Quiz_id`),
  CONSTRAINT `givequiz_ibfk_2` FOREIGN KEY (`Quiz_id`) REFERENCES `quiz` (`Quiz_id`),
  CONSTRAINT `givequiz_ibfk_3` FOREIGN KEY (`stu_id`) REFERENCES `student` (`stu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `givequiz`
--

LOCK TABLES `givequiz` WRITE;
/*!40000 ALTER TABLE `givequiz` DISABLE KEYS */;
INSERT INTO `givequiz` VALUES (1,2041,''),(1,2062,'47'),(2,2022,'83'),(3,2011,'44'),(3,2021,'55'),(3,2022,'98'),(4,2061,'65'),(4,2062,'76'),(5,2011,'59'),(5,2041,'99'),(6,2021,'77');
/*!40000 ALTER TABLE `givequiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `Quiz_id` int NOT NULL,
  `Marks` int NOT NULL,
  `course_id` varchar(50) NOT NULL,
  `Certificate_id` int NOT NULL,
  PRIMARY KEY (`Quiz_id`),
  KEY `course_id` (`course_id`),
  KEY `Certificate_id` (`Certificate_id`),
  CONSTRAINT `quiz_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`),
  CONSTRAINT `quiz_ibfk_2` FOREIGN KEY (`Certificate_id`) REFERENCES `certificate` (`Certificate_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (2011,100,'MA201',2011),(2021,100,'CS202',2021),(2022,100,'CS202',2022),(2041,100,'CS204',2041),(2061,100,'EC206',2061),(2062,100,'EC206',2062);
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `stu_id` int NOT NULL AUTO_INCREMENT,
  `stu_name` varchar(50) NOT NULL,
  `contact_no` char(10) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  PRIMARY KEY (`stu_id`),
  KEY `user_name` (`user_name`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `account` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'abhishek','9683619021','abhishek121'),(2,'aman','7923455677','aman121'),(3,'aryan','8543645742','aryan121'),(4,'ayush','9145645734','ayush121'),(5,'durga','9475745643','durga121'),(6,'haja','8964533236','haja121'),(7,'sushil','8645234667','sushil121'),(8,'Ayush Singh','9919165803','rectifier'),(9,'Naveen Dahiya','8295594124','naveen123');
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `support`
--

DROP TABLE IF EXISTS `support`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `support` (
  `support` varchar(50) NOT NULL,
  `support_id` int NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`support_id`,`admin_id`),
  KEY `admin_id` (`admin_id`),
  CONSTRAINT `support_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `support`
--

LOCK TABLES `support` WRITE;
/*!40000 ALTER TABLE `support` DISABLE KEYS */;
INSERT INTO `support` VALUES ('course related support',11,1),('Other queries',12,1),('fees related query',21,2),('quiz related support',31,3);
/*!40000 ALTER TABLE `support` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-28 22:10:51
