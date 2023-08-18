CREATE DATABASE  IF NOT EXISTS `learnershigh` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `learnershigh`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: i9b105.p.ssafy.io    Database: learnershigh
-- ------------------------------------------------------
-- Server version	8.1.0

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
-- Table structure for table `edu_career`
--

DROP TABLE IF EXISTS `edu_career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `edu_career` (
  `edu_career_no` bigint NOT NULL AUTO_INCREMENT,
  `degree` varchar(10) NOT NULL,
  `edu_end_date` varchar(7) NOT NULL,
  `edu_start_date` varchar(7) NOT NULL,
  `major_name` varchar(20) NOT NULL,
  `university_name` varchar(20) NOT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`edu_career_no`),
  KEY `FK8q67ykbul7r7slvowg9swqmux` (`user_no`),
  CONSTRAINT `FK8q67ykbul7r7slvowg9swqmux` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `edu_career`
--

LOCK TABLES `edu_career` WRITE;
/*!40000 ALTER TABLE `edu_career` DISABLE KEYS */;
INSERT INTO `edu_career` VALUES (3,'석사','2019-03','2014-05','경영학',' 고등',3),(4,'박사','2019-06','2014-05','경영학',' 고등',10),(5,'학위1','2022-12','2011-11','전공1','학력1',13),(6,'학위2','2023-01','2022-12','전공2','학력2',13),(7,'학위4','2026-12','2025-01','전공4','학력4',13),(8,'학위3','2025-12','2023-02','전공3','학력3',13),(9,'학사','2017-02','2010-03','수학과','스탠포드',31),(10,'석사','2012-02','2008-03','수학과','KAIST',32),(11,'학사','2008-02','2004-03','수학과','KAIST',32),(12,'학사','2015-02','2011-03','교육학','연세대학교',33),(13,'학사','2015-02','2011-03','국어국문학과','연세대학교',33),(14,'석사','2020-02','2016-03','국어교육','고려대학교',34),(15,'학사','2016-02','2012-03','국어국문학과','동국대학교',34);
/*!40000 ALTER TABLE `edu_career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (50);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_career`
--

DROP TABLE IF EXISTS `job_career`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_career` (
  `job_career_no` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(20) NOT NULL,
  `depart_name` varchar(20) NOT NULL,
  `hire_end_date` varchar(7) NOT NULL,
  `hire_start_date` varchar(7) NOT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`job_career_no`),
  KEY `FK53ykp6w6cysxv4cnjt4ft8kol` (`user_no`),
  CONSTRAINT `FK53ykp6w6cysxv4cnjt4ft8kol` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_career`
--

LOCK TABLES `job_career` WRITE;
/*!40000 ALTER TABLE `job_career` DISABLE KEYS */;
INSERT INTO `job_career` VALUES (3,'송송','인사','2019-06','2014-05',3),(4,'삼성전자','인사','2022-05','2014-05',10),(5,'직장1','부서1','2023-12','2012-12',13),(6,'직장3','부서3','2025-12','2024-12',13),(7,'직장2','부서2','2024-12','2023-12',13),(8,'직장4','부서4','2026-12','2025-12',13),(9,'메가스터디','수학 강사','2023-08','2017-10',31),(10,'대성마이맥','수학 강사','2017-04','2015-12',32),(11,'부산 영재고등학교','책임연구원','2015-11','2013-04',32),(12,'EBSi','수학 강사','2019-12','2017-04',32),(13,'메가스터디','수학 강사','2023-04','2020-01',32),(14,'EBSi','국어 강사','2023-07','2021-04',33),(15,'EBSi','국어 강사','2023-07','2020-05',34);
/*!40000 ALTER TABLE `job_career` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson`
--

DROP TABLE IF EXISTS `lesson`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson` (
  `lesson_no` bigint NOT NULL AUTO_INCREMENT,
  `lesson_end_date` date DEFAULT NULL,
  `lesson_info` text,
  `lesson_join_datetime` datetime(6) DEFAULT NULL,
  `lesson_name` varchar(100) NOT NULL,
  `lesson_price` mediumint NOT NULL,
  `lesson_start_date` date DEFAULT NULL,
  `lesson_status` varchar(255) NOT NULL,
  `lesson_thumbnail_img` varchar(255) DEFAULT NULL,
  `lesson_thumbnail_info` varchar(300) DEFAULT NULL,
  `lesson_total_round` tinyint DEFAULT NULL,
  `lesson_view_count` int DEFAULT '0',
  `max_student` tinyint NOT NULL,
  `total_student` tinyint NOT NULL DEFAULT '0',
  `lesson_type_no` int DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`lesson_no`),
  KEY `FKe7443xsy6c5jtqy8m1b4pupry` (`lesson_type_no`),
  KEY `FK8mphu1w78nr0ofp0c6cyj0tmi` (`user_no`),
  CONSTRAINT `FK8mphu1w78nr0ofp0c6cyj0tmi` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKe7443xsy6c5jtqy8m1b4pupry` FOREIGN KEY (`lesson_type_no`) REFERENCES `lesson_type` (`lesson_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson`
--

LOCK TABLES `lesson` WRITE;
/*!40000 ALTER TABLE `lesson` DISABLE KEYS */;
INSERT INTO `lesson` VALUES (1,'2023-08-18','asdf','2023-08-12 07:33:18.000000','2024ver. 양희제의 Killing Camp',2222,'2023-08-12','강의 중',NULL,'asd',7,131,5,3,13,1),(44,'2023-09-06','<figure class=\"table\"><table><tbody><tr><th>강좌 범위</th><td>▣ 수학 ll 전범위<br>&nbsp;</td></tr><tr><th>내용 및 특징</th><td><p><strong>2등급과&nbsp;1등급&nbsp;사이,&nbsp;반드시&nbsp;존재하는&nbsp;훈련!</strong></p><p><strong>2024&nbsp;현우진의&nbsp;약점체크,&nbsp;드릴&nbsp;–&nbsp;수학II (공통)&nbsp;</strong></p><p>&nbsp;</p><p>수학Ⅱ는 공통과목 중에서도 변별력 문항의 출제 가능성 및</p><p>중요도가 높은 과목입니다.</p><p>최근 평가원 시험은 ‘까다로운 준킬러 문항으로 구성되고 있으며,</p><p>이에 따라 준킬러 문항에 대한 꼼꼼하고 탄탄한 대비를 할 수 있어야 합니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>1.&nbsp;변별력 유형,&nbsp;신유형&nbsp;대비&nbsp;심화&nbsp;문제풀이&nbsp;학습을&nbsp;통한&nbsp;실전&nbsp;훈련&nbsp;가능</strong></p><p>드릴 강좌는 수능에 출제 가능한 상황을 훈련하기 위해 제작된</p><p>변별력 유형, 신유형 대비 심화 문제풀이 강좌입니다.</p><p>드릴에서는 뉴런에서 학습했던 실전 개념을 한층 더 구체화시켜</p><p>실전 문제풀이에 적용할 수 있는 훈련을 진행합니다.</p><p>따라서 드릴을 수강하기 전, 현우진 선생님의 뉴런, 수분감을 통해</p><p>개념과 기출 문제에 대한 학습을 전반적으로 진행한 후,</p><p>과목에 대한 이해가 어느정도 갖추어져 있는 상태에서 수강할 것을 추천드립니다</p><p>&nbsp;</p><p>드릴에서는 단원별로 중요하게 다루어지는 필수 주제뿐만 아니라</p><p>아직 출제되지 않았지만 출제될 가능성이 있는 미출제 요소들까지도 대비합니다.</p><p>따라서 다양한 유형과 상황에 대비할 수 있고, 처음 보는 문제를 만났을 때도</p><p>당황하지 않고 풀어낼 수 있는 단단한 실력까지 기를 수 있을 것입니다.</p><p>&nbsp;</p><p><strong>문항별 COMMENT</strong>는 문항에 대한 더욱 확실한 이해를 도와줍니다.</p><p>드릴에 수록된 각 문제 옆에 있는 COMMENT에서는</p><p>문제를 해석하고 풀어나가는 데에 필요한 핵심 개념과</p><p>실전적인 접근 태도에 대한 내용이 담겨 있습니다.</p><p>&nbsp;</p><p>문제를 풀고 난 후, 문항별 COMMENT를 읽어보고</p><p>꼼꼼하고 다양한 풀이를 제시하는 해설강의를 수강하면서</p><p>자신에게 부족했던 부분이 무엇인지 보완하는 기회를 꼭 가지시기 바랍니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>2.&nbsp;다양한&nbsp;상황에&nbsp;대비&nbsp;가능하도록&nbsp;설계된&nbsp;드릴&nbsp;교재&nbsp;문항&nbsp;구성</strong></p><p>최근 수능시험의 경향이 해볼 만한 변별력 문항과</p><p>다수의 까다로운 준킬러 문항을 출제하는 기조를 보이고 있어,</p><p>어려운 문제를 정확하게 풀어낼 수 있는 충분한 훈련을 할 필요가 있습니다.</p><p>드릴은 실전 훈련을 위해 정교하게 설계된 문항을 제공합니다.</p><p>수능에 출제될 수 있는 준킬러 문항들을 단원별로 배치하였고,</p><p>각 단원의 특성을 살린 고퀄리티의 문항으로 문제풀이 학습이 진행됩니다.</p><p>기출문제를 풀어보면서 심화개념에 대한 학습을 잘 진행한 학생이라면,</p><p>드릴 강좌를 통해 기존의 익숙한 아이디어를 체화하는 것과 함께</p><p>아직 출제되지 않은 새로운 요소까지 경험할 수 있을 것입니다.</p><p>&nbsp;</p><p><strong>함수의 극한과 연속</strong></p><p>기본적인 극한에 대한 성질과 계산, 합성함수 및 구간별로 정의된 함수의 연속성,</p><p>극한값의 조건을 통해 함수의 식 결정하기, 연속인 인수 추가하기 등</p><p>극한을 다룰 때 필요한 상황을 경험해볼 수 있도록 다양하게 구성하였습니다.</p><p>&nbsp;</p><p><strong>미분</strong></p><p>주어진 조건을 활용하여 상황 스스로 구성하기,</p><p>함수의 그래프 관찰을 통한 문제 해결, 도함수를 이용하여 원래 함수 추론하기,</p><p>식의 계산과 그래프의 관찰의 선택 및 유기적 연결,</p><p>역시나 중요한 삼차함수, 사차함수의 그래프의 비율 관계 등을 다루는</p><p>출제 가능성 높은 변별력 문항들을 교육과정의 틀에 맞게 구성하였습니다.</p><p>&nbsp;</p><p><strong>적분</strong></p><p>함수의 그래프의 특징을 이용한 정적분, 넓이에 대한 직관적 이해와 관찰,</p><p>부정적분으로 표현된 함수 관찰 및 추론, 다항함수와 넓이 공식 등</p><p>다양한 상황을 경험하고 새로운 문제를 만났을 때</p><p>올바른 접근을 위해 취해야 하는 태도를 배울 수 있는 문항들 위주로 구성하였습니다.&nbsp;</p><p>&nbsp;</p><p>드릴의 경우 해당 과목에 대한 전반적인 개념 학습,</p><p>문제풀이 학습이 한 번 이상 진행된 학생들을 대상으로 하기 때문에,</p><p>극한 단원에서 미분을 이용하거나 설명하실 수 있고</p><p>미분 단원이라고 해서 미분만 다루는 것이 아니라,</p><p>적분과도 관련된 얘기를 함께 해주시는 경우가 있습니다.</p><p>각 단원별로 연계성이 끈끈한 과목인 만큼 연결지어 학습할 필요가 있는 부분들은</p><p>경계의 허물 없이 설명하시기도 한다는 점을 참고해주세요.</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>3.&nbsp;드릴에서&nbsp;배운&nbsp;내용을&nbsp;가장&nbsp;효과적으로&nbsp;복습할&nbsp;수&nbsp;있는&nbsp;워크북</strong></p><p>워크북에서는 단순히 문제풀이에만 초점을 맞춘 것이 아니라</p><p>수능을 준비하면서 충분히 풀어볼 가치가 있는 문제들,</p><p>드릴 강좌에서 다루지 못했지만 꼭 풀어보아야 하는 문제들로</p><p>알차게 구성되어 학습 효과를 극대화할 수 있습니다.</p><p>부교재인 워크북의 경우, 전문항 해설지가 제공되며</p><p>뉴런, 드릴에서 훈련했던 실전 개념을 최대한 녹여 수록하였습니다.</p><p>다양한 해석이 가능한 문제의 해설 하단에는 <strong>[다른 풀이]</strong>가 추가되고</p><p>문제풀이 시 간과할 수 있는 부분을 <strong>[참고]</strong>로 수록해두었으니</p><p>자기 주도 학습 시 이를 적극적으로 활용해보시기 바랍니다.</p><p>&nbsp;</p><p>문제를 풀 때는 어떤 문제가 나와도 풀어낼 수 있다는 자신감을 가지는 것이 좋으며,</p><p>자신감을 갖기 위해서는 확신을 가질 수 있는 학습량이 뒷받침될 수 있어야 합니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></td></tr><tr><th>수강 대상</th><td><p>▣ 심화개념 &amp; 기출문항 분석에 대한 학습을 진행한 수험생</p><p>▣ 문제푸는 실력을 형성하고 싶은 수험생</p></td></tr></tbody></table></figure>','2023-08-16 09:32:33.383923','PRE-SEASON 국어(하)',55000,'2023-08-17','강의 중',NULL,'고등 국어(하)에 대한 완전 기초 개념강좌입니다.',7,37,15,5,6,1),(65,'2023-08-30','<p>떨립니다.</p>','2023-08-17 16:19:28.556427','[수학] 2024 수능대비 QUEL 모의고사 (6월 모평 대비)',15000,'2023-08-23','강의 전','lesson/73/Thumbnail/d0ac12c0-2f77-412b-b471-0501bfea29c3_img-th-ko.png','제발들어가주세요',3,22,10,1,6,1),(68,'2023-10-24','<figure class=\"table\"><table><tbody><tr><td>강좌 범위</td><td>▣ 수학I – 지수함수와 로그함수, 삼각함수, 수열</td></tr><tr><td>내용 및 특징</td><td><p>▣ 교육 과정에 맞는 교과서 내용영역에 충실한 교재 &nbsp;</p><p>▣ 학습목표와 유의점에 따른 목적의식 확립</p><p>▣ 필수예제와 기본, 표준문제로 행동영역 익히기&nbsp;&nbsp;</p></td></tr><tr><td>수강 대상</td><td><p>▣ 처음 개념을 공부하는 학생 (노베이스 극복 가능)</p><p>▣ 교과서 제대로 읽기를 체득하고 싶은 학생</p><p>▣ 수능에 꼭 필요한 개념을 정리하고 싶은 학생</p><p>▣ 본격적인 문제풀이를 위한 기본기를 다지고 싶은 학생</p><p>▣ 개념만으로 수능&amp;평가원 기출이 어떻게 풀리는지 알고 싶은 학생</p><p>▣ 수능에서 꼭 만점 맞고 싶은 학생</p></td></tr></tbody></table></figure>','2023-08-17 21:11:25.448558','CODE 0 : 양승진의 스타트 개념코드 [수학l]',70000,'2023-08-27','강의 전','lesson/68/Thumbnail/7895e806-4575-42ef-ba4b-677bacd633ea_Bookimg_19328_ysj (1).jpg','수학I – 지수함수와 로그함수, 삼각함수, 수열 범위의 수업입니다.',26,4,20,0,7,32),(69,'2023-09-18','<figure class=\"table\"><table><tbody><tr><th>강좌 범위</th><td>▣ 수학 l 전범위<br>&nbsp;</td></tr><tr><th>내용 및 특징</th><td><p><strong>2등급과&nbsp;1등급&nbsp;사이,&nbsp;반드시&nbsp;존재하는&nbsp;훈련!</strong></p><p><strong>2024&nbsp;현우진의&nbsp;약점체크, 드릴&nbsp;–&nbsp;수학l (공통)</strong></p><p>&nbsp;</p><p>수학l은&nbsp;공통과목일&nbsp;뿐만&nbsp;아니라&nbsp;수능에&nbsp;직접&nbsp;출제되는&nbsp;첫&nbsp;번째&nbsp;과목으로&nbsp;</p><p>다루는&nbsp;내용의&nbsp;난이도는&nbsp;어렵지&nbsp;않지만,&nbsp;많은&nbsp;학생들이&nbsp;쉽게&nbsp;간과하는&nbsp;과목입니다.&nbsp;</p><p>특히&nbsp;수학l은 다양한 조건과 상황 제시로 응용 문제가 출제될 수 있으며</p><p>특히&nbsp;단독&nbsp;출제보다는&nbsp;다른&nbsp;과목과&nbsp;연계되어&nbsp;출제될&nbsp;가능성이&nbsp;높은&nbsp;과목입니다.&nbsp;</p><p>따라서&nbsp;더욱이&nbsp;꼼꼼하고&nbsp;탄탄하게&nbsp;학습해야&nbsp;할&nbsp;필요가&nbsp;있습니다.</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>1. 변별력 유형, 신유형 대비 문제풀이 학습을&nbsp;통한&nbsp;실전&nbsp;훈련&nbsp;가능</strong></p><p>드릴&nbsp;강좌는&nbsp;수능에&nbsp;출제&nbsp;가능한 상황을&nbsp;훈련하기&nbsp;위해</p><p>제작된&nbsp;변별력 유형,&nbsp;신유형&nbsp;대비&nbsp;심화&nbsp;문제풀이&nbsp;강좌입니다.</p><p>드릴에서는&nbsp;뉴런에서&nbsp;학습했던&nbsp;실전&nbsp;개념을&nbsp;한층&nbsp;더&nbsp;구체화시켜&nbsp;</p><p>실 문제풀이에&nbsp;적용할&nbsp;수&nbsp;있는&nbsp;훈련을&nbsp;진행합니다,</p><p>따라서&nbsp;드릴을&nbsp;수강하기&nbsp;전,&nbsp;현우진&nbsp;선생님의&nbsp;뉴런,&nbsp;수분감을&nbsp;통해&nbsp;</p><p>개념과&nbsp;기출&nbsp;문제에&nbsp;대한&nbsp;학습을&nbsp;전반적으로&nbsp;진행한&nbsp;후,</p><p>과목에&nbsp;대한&nbsp;이해가&nbsp;어느정도&nbsp;갖추어져&nbsp;있는&nbsp;상태에서&nbsp;수강할&nbsp;것을&nbsp;추천드립니다.</p><p>&nbsp;</p><p>드릴에서는 단원별로&nbsp;중요하게&nbsp;다루어지는&nbsp;필수&nbsp;주제뿐만&nbsp;아니라&nbsp;</p><p>아직&nbsp;출제되지&nbsp;않았지만&nbsp;출제될&nbsp;가능성이&nbsp;있는&nbsp;미출제&nbsp;요소들까지도&nbsp;대비합니다.</p><p>따라서 다양한&nbsp;유형과&nbsp;상황에&nbsp;대비할&nbsp;수&nbsp;있고,&nbsp;처음&nbsp;보는&nbsp;문제를&nbsp;만났을&nbsp;때도</p><p>당황하지&nbsp;않고&nbsp;풀어낼&nbsp;수&nbsp;있는&nbsp;단단한&nbsp;실력까지&nbsp;기를 수 있을 것입니다.</p><p>&nbsp;</p><p><strong>문항별&nbsp;COMMENT</strong>는&nbsp;문항에&nbsp;대한&nbsp;더욱&nbsp;확실한&nbsp;이해를&nbsp;도와줍니다.</p><p>드릴에&nbsp;수록된&nbsp;각&nbsp;문제&nbsp;옆에&nbsp;있는&nbsp;COMMENT에서는</p><p>문제를 해석하고 풀어나가는 데에 필요한 핵심 개념과</p><p>실전적인 접근 태도에 대한 내용이 담겨 있습니다.&nbsp;</p><p>&nbsp;</p><p>문제를 풀고 난 후, COMMENT를 읽어보고</p><p>꼼꼼하고 다양한 풀이를 제시하는 해설 강의를 수강하면서</p><p>자신에게 부족했던 부분이 무엇인지 보완하는 기회를 꼭 가지시길 바랍니다.</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>2.&nbsp;다양한&nbsp;상황에&nbsp;대비&nbsp;가능하도록&nbsp;설계된&nbsp;드릴&nbsp;교재&nbsp;문항&nbsp;구성</strong></p><p>최근&nbsp;수능시험의&nbsp;경향이&nbsp;해볼&nbsp;만한&nbsp;변별력 문항과&nbsp;</p><p>다수의&nbsp;까다로운&nbsp;준킬러&nbsp;문항을&nbsp;출제하는&nbsp;기조를&nbsp;보이고&nbsp;있어,&nbsp;</p><p>수학l에서도&nbsp;어려운&nbsp;문제를&nbsp;풀어낼&nbsp;수&nbsp;있도록&nbsp;충분한&nbsp;훈련을&nbsp;할&nbsp;필요가&nbsp;있습니다.&nbsp;</p><p>드릴은&nbsp;실전&nbsp;훈련을&nbsp;위해&nbsp;정교하게&nbsp;설계된&nbsp;문항을&nbsp;제공합니다.</p><p>수능에&nbsp;출제될&nbsp;수&nbsp;있는&nbsp;준킬러&nbsp;문항들을&nbsp;단원별로&nbsp;배치하였고,</p><p>각&nbsp;단원의&nbsp;특성을&nbsp;살린&nbsp;고퀄리티의&nbsp;문항으로&nbsp;문제풀이&nbsp;학습이&nbsp;진행됩니다.</p><p>기출문제를&nbsp;풀어보면서&nbsp;심화개념에&nbsp;대한&nbsp;학습을&nbsp;잘&nbsp;진행한&nbsp;학생이라면,</p><p>드릴&nbsp;강좌를&nbsp;통해&nbsp;기존의&nbsp;익숙한&nbsp;아이디어를&nbsp;체화하는&nbsp;것과&nbsp;함께&nbsp;</p><p>아직&nbsp;출제되지&nbsp;않은&nbsp;새로운&nbsp;요소까지&nbsp;경험할&nbsp;수&nbsp;있을&nbsp;것입니다.&nbsp;</p><p>&nbsp;</p><p><strong>지수함수와&nbsp;로그함수</strong></p><p>평행이동&nbsp;및&nbsp;대칭이동된&nbsp;함수&nbsp;사이의&nbsp;관계를 다루는 문항,</p><p>그래프 위에 그려지는 도형 관찰을 요구하는 문항,</p><p>지수함수, 로그함수가 등장하는 합답형 문항,</p><p>실수인 거듭제곱근, 지수, 로그를 조작하는 계산 문항까지</p><p>과하지&nbsp;않고&nbsp;부족하지도&nbsp;않게&nbsp;문항을&nbsp;적절히&nbsp;구성하였습니다.&nbsp;</p><p>&nbsp;</p><p><strong>삼각함수</strong></p><p>까다롭게 출제될&nbsp;가능성이&nbsp;있는&nbsp;도형&nbsp;활용&nbsp;문제들을&nbsp;수록하여</p><p>이전&nbsp;도형&nbsp;관련&nbsp;강좌에서&nbsp;배운&nbsp;내용을&nbsp;충분히&nbsp;적용하는&nbsp;연습을&nbsp;함으로써&nbsp;</p><p>변별력 문제에&nbsp;대한&nbsp;대비 학습을&nbsp;함께&nbsp;할&nbsp;수&nbsp;있습니다.</p><p>삼각함수의&nbsp;그래프의&nbsp;대칭성,&nbsp;주기성,&nbsp;비율&nbsp;관계&nbsp;등을&nbsp;이용하여&nbsp;</p><p>해결할&nbsp;수&nbsp;있는&nbsp;문항도&nbsp;다수 수록되어&nbsp;있습니다.</p><p>&nbsp;</p><p><strong>수열</strong></p><p>잘&nbsp;알려진&nbsp;수열&nbsp;및&nbsp;잘&nbsp;알려지지&nbsp;않은&nbsp;수열을&nbsp;다루는&nbsp;태도,&nbsp;</p><p>특정&nbsp;상황에&nbsp;등장하는&nbsp;named&nbsp;수열을&nbsp;다룰&nbsp;때의&nbsp;약속,</p><p>계산 구조를 살려 간단히 다룰 수 있도록 조작하는 문항 등</p><p>여러&nbsp;가지&nbsp;상황에&nbsp;대비할&nbsp;수&nbsp;있도록&nbsp;</p><p>다양한&nbsp;문항들을&nbsp;가감없이&nbsp;교육과정&nbsp;틀에&nbsp;맞게&nbsp;구성해두었습니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>3.&nbsp;드릴에서&nbsp;배운&nbsp;내용을&nbsp;가장&nbsp;효과적으로&nbsp;복습할&nbsp;수&nbsp;있는&nbsp;워크북</strong></p><p>워크북에서는&nbsp;단순히&nbsp;문제풀이에만&nbsp;초점을&nbsp;맞춘&nbsp;것이&nbsp;아니라,</p><p>수능을&nbsp;준비하면서&nbsp;풀어볼&nbsp;가치가&nbsp;충분히&nbsp;있는&nbsp;문제들,</p><p>드릴&nbsp;강좌에서&nbsp;다루지&nbsp;못했지만&nbsp;꼭&nbsp;풀어보아야&nbsp;하는&nbsp;문제들로&nbsp;</p><p>알차게&nbsp;구성되어&nbsp;학습&nbsp;효과를&nbsp;극대화할&nbsp;수&nbsp;있습니다.</p><p>부교재인&nbsp;워크북의 경우, 전 문항 해설지가 제공되며</p><p>뉴런, 드릴에서 훈련했던 실전 개념을 최대한 녹여 수록하였습니다.</p><p>다양한&nbsp;해석이&nbsp;가능한&nbsp;문제의&nbsp;해설&nbsp;하단에는<strong>&nbsp;[다른&nbsp;풀이]</strong>가&nbsp;추가되고</p><p>문제풀이 시 간과할 수 있는 부분을 <strong>[참고]</strong>로 수록해두었으니</p><p>자기 주도 학습 시 이를 적극적으로 활용해보시기 바랍니다.</p><p>&nbsp;</p><p>강좌&nbsp;수강과&nbsp;함께&nbsp;드릴에서&nbsp;학습한&nbsp;내용을&nbsp;바탕으로&nbsp;</p><p>교재에&nbsp;수록된&nbsp;문제들을&nbsp;풀어보는&nbsp;학습을&nbsp;진행한다면&nbsp;</p><p>실제&nbsp;시험장에서&nbsp;처음&nbsp;보는&nbsp;문제를&nbsp;만났을&nbsp;때도&nbsp;자신감&nbsp;있게&nbsp;풀&nbsp;수&nbsp;있을&nbsp;것입니다.</p><p>&nbsp;</p></td></tr><tr><th>수강 대상</th><td><p>▣ 심화개념 &amp; 기출문항 분석에 대한 학습을 진행한 수험생</p><p>▣ 문제푸는 실력을 형성하고 싶은 수험생</p></td></tr></tbody></table></figure>','2023-08-17 21:31:11.002515','2024 현우진의 드릴 - 수학l (공통)',45000,'2023-09-04','강의 전','lesson/69/Thumbnail/45e76f62-b3f6-4d72-8fff-595e9faf5a66_bookimg_21942_hwj (1).jpg','수학 l 전범위의 강의',7,11,20,0,7,31),(70,'2023-09-21','<figure class=\"table\"><table><tbody><tr><th>강좌 범위</th><td>▣ 수학 ll 전범위<br>&nbsp;</td></tr><tr><th>내용 및 특징</th><td><p><strong>2등급과&nbsp;1등급&nbsp;사이,&nbsp;반드시&nbsp;존재하는&nbsp;훈련!</strong></p><p><strong>2024&nbsp;현우진의&nbsp;약점체크,&nbsp;드릴&nbsp;–&nbsp;수학II (공통)&nbsp;</strong></p><p>&nbsp;</p><p>수학Ⅱ는 공통과목 중에서도 변별력 문항의 출제 가능성 및</p><p>중요도가 높은 과목입니다.</p><p>최근 평가원 시험은 ‘까다로운 준킬러 문항으로 구성되고 있으며,</p><p>이에 따라 준킬러 문항에 대한 꼼꼼하고 탄탄한 대비를 할 수 있어야 합니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>1.&nbsp;변별력 유형,&nbsp;신유형&nbsp;대비&nbsp;심화&nbsp;문제풀이&nbsp;학습을&nbsp;통한&nbsp;실전&nbsp;훈련&nbsp;가능</strong></p><p>드릴 강좌는 수능에 출제 가능한 상황을 훈련하기 위해 제작된</p><p>변별력 유형, 신유형 대비 심화 문제풀이 강좌입니다.</p><p>드릴에서는 뉴런에서 학습했던 실전 개념을 한층 더 구체화시켜</p><p>실전 문제풀이에 적용할 수 있는 훈련을 진행합니다.</p><p>따라서 드릴을 수강하기 전, 현우진 선생님의 뉴런, 수분감을 통해</p><p>개념과 기출 문제에 대한 학습을 전반적으로 진행한 후,</p><p>과목에 대한 이해가 어느정도 갖추어져 있는 상태에서 수강할 것을 추천드립니다</p><p>&nbsp;</p><p>드릴에서는 단원별로 중요하게 다루어지는 필수 주제뿐만 아니라</p><p>아직 출제되지 않았지만 출제될 가능성이 있는 미출제 요소들까지도 대비합니다.</p><p>따라서 다양한 유형과 상황에 대비할 수 있고, 처음 보는 문제를 만났을 때도</p><p>당황하지 않고 풀어낼 수 있는 단단한 실력까지 기를 수 있을 것입니다.</p><p>&nbsp;</p><p><strong>문항별 COMMENT</strong>는 문항에 대한 더욱 확실한 이해를 도와줍니다.</p><p>드릴에 수록된 각 문제 옆에 있는 COMMENT에서는</p><p>문제를 해석하고 풀어나가는 데에 필요한 핵심 개념과</p><p>실전적인 접근 태도에 대한 내용이 담겨 있습니다.</p><p>&nbsp;</p><p>문제를 풀고 난 후, 문항별 COMMENT를 읽어보고</p><p>꼼꼼하고 다양한 풀이를 제시하는 해설강의를 수강하면서</p><p>자신에게 부족했던 부분이 무엇인지 보완하는 기회를 꼭 가지시기 바랍니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>2.&nbsp;다양한&nbsp;상황에&nbsp;대비&nbsp;가능하도록&nbsp;설계된&nbsp;드릴&nbsp;교재&nbsp;문항&nbsp;구성</strong></p><p>최근 수능시험의 경향이 해볼 만한 변별력 문항과</p><p>다수의 까다로운 준킬러 문항을 출제하는 기조를 보이고 있어,</p><p>어려운 문제를 정확하게 풀어낼 수 있는 충분한 훈련을 할 필요가 있습니다.</p><p>드릴은 실전 훈련을 위해 정교하게 설계된 문항을 제공합니다.</p><p>수능에 출제될 수 있는 준킬러 문항들을 단원별로 배치하였고,</p><p>각 단원의 특성을 살린 고퀄리티의 문항으로 문제풀이 학습이 진행됩니다.</p><p>기출문제를 풀어보면서 심화개념에 대한 학습을 잘 진행한 학생이라면,</p><p>드릴 강좌를 통해 기존의 익숙한 아이디어를 체화하는 것과 함께</p><p>아직 출제되지 않은 새로운 요소까지 경험할 수 있을 것입니다.</p><p>&nbsp;</p><p><strong>함수의 극한과 연속</strong></p><p>기본적인 극한에 대한 성질과 계산, 합성함수 및 구간별로 정의된 함수의 연속성,</p><p>극한값의 조건을 통해 함수의 식 결정하기, 연속인 인수 추가하기 등</p><p>극한을 다룰 때 필요한 상황을 경험해볼 수 있도록 다양하게 구성하였습니다.</p><p>&nbsp;</p><p><strong>미분</strong></p><p>주어진 조건을 활용하여 상황 스스로 구성하기,</p><p>함수의 그래프 관찰을 통한 문제 해결, 도함수를 이용하여 원래 함수 추론하기,</p><p>식의 계산과 그래프의 관찰의 선택 및 유기적 연결,</p><p>역시나 중요한 삼차함수, 사차함수의 그래프의 비율 관계 등을 다루는</p><p>출제 가능성 높은 변별력 문항들을 교육과정의 틀에 맞게 구성하였습니다.</p><p>&nbsp;</p><p><strong>적분</strong></p><p>함수의 그래프의 특징을 이용한 정적분, 넓이에 대한 직관적 이해와 관찰,</p><p>부정적분으로 표현된 함수 관찰 및 추론, 다항함수와 넓이 공식 등</p><p>다양한 상황을 경험하고 새로운 문제를 만났을 때</p><p>올바른 접근을 위해 취해야 하는 태도를 배울 수 있는 문항들 위주로 구성하였습니다.&nbsp;</p><p>&nbsp;</p><p>드릴의 경우 해당 과목에 대한 전반적인 개념 학습,</p><p>문제풀이 학습이 한 번 이상 진행된 학생들을 대상으로 하기 때문에,</p><p>극한 단원에서 미분을 이용하거나 설명하실 수 있고</p><p>미분 단원이라고 해서 미분만 다루는 것이 아니라,</p><p>적분과도 관련된 얘기를 함께 해주시는 경우가 있습니다.</p><p>각 단원별로 연계성이 끈끈한 과목인 만큼 연결지어 학습할 필요가 있는 부분들은</p><p>경계의 허물 없이 설명하시기도 한다는 점을 참고해주세요.</p><p>&nbsp;</p><p>&nbsp;</p><p><strong>3.&nbsp;드릴에서&nbsp;배운&nbsp;내용을&nbsp;가장&nbsp;효과적으로&nbsp;복습할&nbsp;수&nbsp;있는&nbsp;워크북</strong></p><p>워크북에서는 단순히 문제풀이에만 초점을 맞춘 것이 아니라</p><p>수능을 준비하면서 충분히 풀어볼 가치가 있는 문제들,</p><p>드릴 강좌에서 다루지 못했지만 꼭 풀어보아야 하는 문제들로</p><p>알차게 구성되어 학습 효과를 극대화할 수 있습니다.</p><p>부교재인 워크북의 경우, 전문항 해설지가 제공되며</p><p>뉴런, 드릴에서 훈련했던 실전 개념을 최대한 녹여 수록하였습니다.</p><p>다양한 해석이 가능한 문제의 해설 하단에는 <strong>[다른 풀이]</strong>가 추가되고</p><p>문제풀이 시 간과할 수 있는 부분을 <strong>[참고]</strong>로 수록해두었으니</p><p>자기 주도 학습 시 이를 적극적으로 활용해보시기 바랍니다.</p><p>&nbsp;</p><p>문제를 풀 때는 어떤 문제가 나와도 풀어낼 수 있다는 자신감을 가지는 것이 좋으며,</p><p>자신감을 갖기 위해서는 확신을 가질 수 있는 학습량이 뒷받침될 수 있어야 합니다.&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p></td></tr><tr><th>수강 대상</th><td><p>▣ 심화개념 &amp; 기출문항 분석에 대한 학습을 진행한 수험생</p><p>▣ 문제푸는 실력을 형성하고 싶은 수험생</p></td></tr></tbody></table></figure>','2023-08-17 21:41:13.383381','2024 현우진의 드릴 - 수학ll (공통)',47000,'2023-09-07','강의 전','lesson/70/Thumbnail/eabe9c6d-30cc-4db0-ae98-de5ebedc040e_bookimg_21945_hyj.jpg','수학 ll 전범위의 강의입니다.',7,2,20,0,7,31),(71,'2023-09-07','<figure class=\"table\"><table><tbody><tr><td><strong>과목</strong></td><td>국어종합</td></tr><tr><td><strong>학습단계</strong></td><td>문제풀이</td></tr><tr><td><strong>수준</strong></td><td>발전</td></tr><tr><td><strong>학년</strong></td><td>고3</td></tr><tr><td><strong>교재</strong></td><td><a href=\"javascript:popupBookInfoByBookId(\'LB00000005191\');\">EBS 2024학년도 만점마무리 봉투모의고사 국어영역</a></td></tr><tr><td><strong>관련시리즈</strong></td><td><a href=\"javascript:goGrpSeries(\'PKG_0262\',\'PRO_1736\');\">[고3]&nbsp;2024 만점마무리 봉투모의고사</a></td></tr></tbody></table></figure><p>&nbsp;</p><p>&nbsp;</p>','2023-08-17 21:51:01.403524','[2024 만점마무리] 국어',80000,'2023-08-24','강의 전','lesson/71/Thumbnail/c9067509-b8df-4899-995e-1d262c269fd2_img-th-ko.png','',7,4,15,0,6,33),(73,'2023-09-21','<p>강좌범위</p><p>[2024 수능특강] 독서_내신 대비<br><br>■ 제작 방향<br>(1) 지문 핵심 요약으로 효율성을 잡자. ⇨ 시험에 나올 것만 짚어 주겠다!<br>(2) 선별 선지로 정확성을 잡자. ⇨ 출제 예상 선지만 골라 주겠다!<br><br>■ 강의 특징<br>(1) 직관적인 이해 ⇨ 도표, 그래프, 그림 등으로 쉽게 이해하자.<br>(2) 출제자의 눈 ⇨ 선지 출제 원리를 적용해 예상 선지에 대비하자.<br>(3) 추가 학습 내용 ⇨ 해나 샘이 직접 쓴 구어체 해설서를 읽자.</p><p>강좌특징</p><p>내신에 최적화된 강의<br>72개 지문 완벽 해체 분석<br>&nbsp;</p><p>추천대상</p><p>연계 교재를 한 번 정리한 수강생 강좌<br>수능+내신 모두 대비하고 싶은 수강생 강좌<br>단기간 수강하고 싶은 수강생(3주 완성,최소시간으로 최대효과) 강좌</p>','2023-08-17 22:08:46.025925','[2024 내신만점 수능특강] 차해나의 독서',50000,'2023-09-07','강의 전','lesson/73/Thumbnail/d0ac12c0-2f77-412b-b471-0501bfea29c3_img-th-ko.png','[2024 수능특강] 독서_내신 대비 강의입니다.',5,4,10,0,6,34),(74,'2023-09-20','<p>스프링을 활용한 강의입니다.</p>','2023-08-17 23:06:44.995279','스프링 부트 - 핵심 원리와 활용',99000,'2023-08-18','강의 중','lesson/74/Thumbnail/3163a713-8b0b-44ca-afce-abe85b8ff6f4_330459-eng.png','초급자를 위해 준비한\n[백엔드, 웹 개발] 강의입니다.',11,14,20,1,13,47),(75,'2023-09-27','<p>스프링을 활용한 강의입니다.</p>','2023-08-17 23:18:45.815132','스프링 핵심 원리 - 고급편',121000,'2023-08-29','강의 전','lesson/75/Thumbnail/57f7aebd-d074-477b-8df7-c4bbbf525cc6_327901-eng.png','중급자를 위해 준비한\n[백엔드, 웹 개발] 강의입니다.',14,5,20,0,13,47),(76,'2023-09-09','<p>주가와 재무제표를 활용한 기업 분석/평가, 사업과 재무제표의 연결, 기업가치의 이해에 대해 관심 있는 누구나 비교적 짧은 시간에 쉽고 충실하게 익히고 활용할 수 있는 기본 강좌입니다.</p>','2023-08-17 23:19:58.888493','주가와 재무제표를 활용한 기업분석',110000,'2023-09-07','강의 전','lesson/76/Thumbnail/16f02653-c566-48a1-b9b0-b39789058811_328586-eng.png','입문자를 위해 준비한\n[경영] 강의입니다.',2,1,20,0,15,48),(77,'2023-09-20','<p>네이버와 아마존을 거쳐 현재 Microsoft에서 시니어 소프트웨어 엔지니어가 직접 알려주는 개발자 인터뷰!! 이 강의는 \"코딩 인터뷰\"가 아닌 \"개발자 인터뷰\"에 초점을 맞췄습니다. 개발자를 채용할 때 또는 반대로 이직이나 구직을 하는 경우에 결코 \"코딩 인터뷰\"만이 당락을 결정짓지 않습니다. 이 강의를 통해 어떻게 개발자를 채용하거나 이직 또는 구직을 준비해야 하는지 보다 자세히 학습하시기 바랍니다.</p>','2023-08-17 23:23:09.943662','더 개발자, 인터뷰 가이드',220000,'2023-09-11','강의 전','lesson/77/Thumbnail/b5fb17d4-faf9-4d6a-9291-3e23b1f3e2ab_b5b96d65-dc2f-4275-9397-8235685a7ed9.jpg','초급자를 위해 준비한\n[취업 · 이직, 개발 · 프로그래밍] 강의입니다.',4,8,10,1,16,49),(78,'2023-10-02','<p>핵심을 확실하게 알려주는 강좌<br>쉽게 설명하는 강좌<br>자세한 어휘 설명 강좌</p>','2023-08-17 23:25:32.486394','[2024 수능완성] 정해영의 독일어Ⅰ',70000,'2023-09-07','강의 전','lesson/78/Thumbnail/2619ef24-7412-4931-b620-9947c8d2c859_img-th-sl.png','핵심을 확실하게 알려주는 강좌\n쉽게 설명하는 강좌\n자세한 어휘 설명 강좌',12,12,20,0,11,46),(79,'2023-09-17','<p>스페인어I</p>','2023-08-17 23:27:05.386448','[2024 수능완성] 안주희의 스페인어Ⅰ',80000,'2023-08-23','강의 전','lesson/79/Thumbnail/5640bb90-87f8-418a-a818-9ba8e67d8f96_img-th-sl.png','스페인어I',8,19,15,0,11,45);
/*!40000 ALTER TABLE `lesson` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kyu`@`%`*/ /*!50003 TRIGGER `lesson_AFTER_UPDATE` AFTER UPDATE ON `lesson` FOR EACH ROW BEGIN
-- lesson_status가 '강의 전'에서 '강의 중'으로 변경되었는지 확인
IF NEW.lesson_status = '강의 중' AND OLD.lesson_status = '강의 전' THEN
insert into lesson_attend(lesson_attend_status, lesson_no, lesson_round_no, user_no)
select '결석', NEW.lesson_no, lesson_round_no, user_no from
-- 수업의 라운드 no
(select lesson_round.lesson_round_no from lesson_round where lesson_round.lesson_no = NEW.lesson_no) as round
cross join
-- 수업을 듣는 학생 목록
(select student_lesson_list.user_no from student_lesson_list where student_lesson_list.lesson_no = NEW.lesson_no) as user;
END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `lesson_attend`
--

DROP TABLE IF EXISTS `lesson_attend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_attend` (
  `lesson_attend_no` bigint NOT NULL AUTO_INCREMENT,
  `lesson_attend_datetime` datetime(6) DEFAULT NULL,
  `lesson_attend_status` varchar(255) NOT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `lesson_round_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`lesson_attend_no`),
  KEY `FKru1on5dlcff3444m2ju9e5emf` (`lesson_no`),
  KEY `FKou7udmnurvm654pg54ed3jfyt` (`lesson_round_no`),
  KEY `FKgapfk15imigy192wdecp6n6yo` (`user_no`),
  CONSTRAINT `FKgapfk15imigy192wdecp6n6yo` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKou7udmnurvm654pg54ed3jfyt` FOREIGN KEY (`lesson_round_no`) REFERENCES `lesson_round` (`lesson_round_no`),
  CONSTRAINT `FKru1on5dlcff3444m2ju9e5emf` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_attend`
--

LOCK TABLES `lesson_attend` WRITE;
/*!40000 ALTER TABLE `lesson_attend` DISABLE KEYS */;
INSERT INTO `lesson_attend` VALUES (1,'2023-08-17 01:50:34.015330','출석',1,1,4),(2,'2023-08-17 01:50:34.015330','출석',1,2,4),(3,'2023-08-17 01:50:34.015330','출석',1,3,4),(4,'2023-08-17 01:50:34.015330','출석',1,4,4),(5,'2023-08-16 13:37:23.634590','출석',1,5,4),(6,'2023-08-16 14:08:39.027256','출석',1,6,4),(7,'2023-08-16 13:58:49.743544','결석',1,7,4),(8,'2023-08-17 01:50:34.015330','결석',1,1,6),(9,'2023-08-17 01:50:34.015330','출석',1,2,6),(10,'2023-08-17 01:50:34.015330','출석',1,3,6),(11,'2023-08-17 01:50:34.015330','출석',1,4,6),(12,'2023-08-16 13:34:41.597625','출석',1,5,6),(13,'2023-08-16 22:02:23.231645','출석',1,6,6),(14,'2023-08-17 01:50:34.015330','출석',1,7,6),(15,'2023-08-17 01:50:34.015330','출석',1,1,5),(16,'2023-08-17 01:50:34.015330','출석',1,2,5),(17,'2023-08-17 01:50:34.015330','출석',1,3,5),(18,'2023-08-17 01:50:34.015330','출석',1,4,5),(19,'2023-08-16 13:46:25.790898','결석',1,5,5),(20,'2023-08-17 16:32:40.766548','결석',1,6,5),(21,NULL,'결석',1,7,5),(43,'2023-08-16 13:18:21.829800','출석',44,183,4),(44,'2023-08-17 14:58:14.920641','출석',44,184,4),(45,NULL,'결석',44,185,4),(46,NULL,'결석',44,186,4),(47,NULL,'결석',44,187,4),(48,NULL,'결석',44,188,4),(49,NULL,'결석',44,189,4),(50,'2023-08-16 13:20:06.728245','지각',44,183,5),(51,'2023-08-17 14:58:50.253629','출석',44,184,5),(52,NULL,'결석',44,185,5),(53,NULL,'결석',44,186,5),(54,NULL,'결석',44,187,5),(55,NULL,'결석',44,188,5),(56,NULL,'결석',44,189,5),(57,'2023-08-16 13:18:39.043736','출석',44,183,6),(58,'2023-08-17 14:58:27.045576','출석',44,184,6),(59,NULL,'결석',44,185,6),(60,NULL,'결석',44,186,6),(61,NULL,'결석',44,187,6),(62,NULL,'결석',44,188,6),(63,NULL,'결석',44,189,6),(64,'2023-08-16 13:17:43.790998','출석',44,183,7),(65,'2023-08-17 14:58:27.819347','출석',44,184,7),(66,NULL,'결석',44,185,7),(67,NULL,'결석',44,186,7),(68,NULL,'결석',44,187,7),(69,NULL,'결석',44,188,7),(70,NULL,'결석',44,189,7),(71,'2023-08-16 13:18:05.368783','출석',44,183,8),(72,'2023-08-17 14:58:09.166353','출석',44,184,8),(73,NULL,'결석',44,185,8),(74,NULL,'결석',44,186,8),(75,NULL,'결석',44,187,8),(76,NULL,'결석',44,188,8),(77,NULL,'결석',44,189,8),(122,NULL,'결석',74,304,5),(123,NULL,'결석',74,305,5),(124,NULL,'결석',74,306,5),(125,NULL,'결석',74,307,5),(126,NULL,'결석',74,308,5),(127,NULL,'결석',74,309,5),(128,NULL,'결석',74,310,5),(129,NULL,'결석',74,311,5),(130,NULL,'결석',74,312,5),(131,NULL,'결석',74,313,5),(132,NULL,'결석',74,314,5);
/*!40000 ALTER TABLE `lesson_attend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_homework`
--

DROP TABLE IF EXISTS `lesson_homework`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_homework` (
  `lesson_homework_no` bigint NOT NULL AUTO_INCREMENT,
  `homework_file_name` varchar(255) DEFAULT NULL,
  `homework_file_origin_name` varchar(255) DEFAULT NULL,
  `homework_status` varchar(255) DEFAULT NULL,
  `homework_submission_datetime` datetime(6) DEFAULT NULL,
  `lesson_homework_notice_no` bigint DEFAULT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `lesson_round_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`lesson_homework_no`),
  KEY `FKj8ejxn06p10apr455q48w7qff` (`lesson_homework_notice_no`),
  KEY `FKpj7o0nyh1k7jp2xxa78x1lkht` (`lesson_no`),
  KEY `FKplwmytustn89k84kx7466y1q5` (`lesson_round_no`),
  KEY `FKh4a8d568s9oyx67oi9jib1who` (`user_no`),
  CONSTRAINT `FKh4a8d568s9oyx67oi9jib1who` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKj8ejxn06p10apr455q48w7qff` FOREIGN KEY (`lesson_homework_notice_no`) REFERENCES `lesson_homework_notice` (`lesson_homework_notice_no`),
  CONSTRAINT `FKpj7o0nyh1k7jp2xxa78x1lkht` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`),
  CONSTRAINT `FKplwmytustn89k84kx7466y1q5` FOREIGN KEY (`lesson_round_no`) REFERENCES `lesson_round` (`lesson_round_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_homework`
--

LOCK TABLES `lesson_homework` WRITE;
/*!40000 ALTER TABLE `lesson_homework` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_homework` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_homework_notice`
--

DROP TABLE IF EXISTS `lesson_homework_notice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_homework_notice` (
  `lesson_homework_notice_no` bigint NOT NULL AUTO_INCREMENT,
  `homework_notice_content` varchar(255) DEFAULT NULL,
  `homework_notice_join_datetime` datetime(6) DEFAULT NULL,
  `homework_notice_title` varchar(255) NOT NULL,
  `lesson_round_no` bigint DEFAULT NULL,
  PRIMARY KEY (`lesson_homework_notice_no`),
  KEY `FKi23xqnjwi411vkanxg6ycjug` (`lesson_round_no`),
  CONSTRAINT `FKi23xqnjwi411vkanxg6ycjug` FOREIGN KEY (`lesson_round_no`) REFERENCES `lesson_round` (`lesson_round_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_homework_notice`
--

LOCK TABLES `lesson_homework_notice` WRITE;
/*!40000 ALTER TABLE `lesson_homework_notice` DISABLE KEYS */;
/*!40000 ALTER TABLE `lesson_homework_notice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_round`
--

DROP TABLE IF EXISTS `lesson_round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_round` (
  `lesson_round_no` bigint NOT NULL AUTO_INCREMENT,
  `lesson_round_end_datetime` datetime NOT NULL,
  `lesson_round_file_name` varchar(255) DEFAULT NULL,
  `lesson_round_file_origin_name` varchar(255) DEFAULT NULL,
  `lesson_round_lessonroom` varchar(255) DEFAULT NULL,
  `lesson_round_number` tinyint NOT NULL,
  `lesson_round_start_datetime` datetime NOT NULL,
  `lesson_round_title` varchar(255) NOT NULL,
  `lesson_no` bigint DEFAULT NULL,
  PRIMARY KEY (`lesson_round_no`),
  KEY `FK4yxjm88a1dhee66djo6ttqdp5` (`lesson_no`),
  CONSTRAINT `FK4yxjm88a1dhee66djo6ttqdp5` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`)
) ENGINE=InnoDB AUTO_INCREMENT=355 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_round`
--

LOCK TABLES `lesson_round` WRITE;
/*!40000 ALTER TABLE `lesson_round` DISABLE KEYS */;
INSERT INTO `lesson_round` VALUES (1,'2023-08-12 07:36:33','lesson/1/1/data/e7936fbc-b8db-42cc-a4fe-005b23802ca0_9기 공통 프로젝트 결과물 활용 동의서_대전_B105_신동민.docx','9기 공통 프로젝트 결과물 활용 동의서_대전_B105_신동민.docx',NULL,1,'2023-08-12 07:36:33','asdfa',1),(2,'2023-08-13 07:36:48','lesson/1/2/data/e442a809-69d6-4a6a-b864-d84472726c49','9기 공통 프로젝트 결과물 활용 동의서_대전_B105_신동민.docx',NULL,2,'2023-08-13 07:36:48','asdfa',1),(3,'2023-08-14 07:36:51','lesson/1/3/data/dd6e607a-f1f4-4ef4-9244-b32f5e7328dc','공통pjt 발표대본 1.0.docx',NULL,3,'2023-08-14 07:36:51','asdfa',1),(4,'2023-08-15 07:36:52','lesson/1/4/data/35e3fd9f-794e-4715-94e3-1074f4d23201','230728_출결변경요청서_유혜빈[대전_1반].docx','',4,'2023-08-15 07:36:52','asdfa',1),(5,'2023-08-16 07:36:53',NULL,NULL,NULL,5,'2023-08-16 07:36:53','asdfa',1),(6,'2023-08-17 07:36:55',NULL,NULL,NULL,6,'2023-08-17 07:36:55','asdfa',1),(7,'2023-08-18 16:36:57','lesson/1/7/data/e97f4466-3451-431e-a177-9604827a33e0','01강 독서의 본질, 독서의 방법(1)_9쪽.docx',NULL,7,'2023-08-18 09:40:57','희제 코치님의 코치 세션',1),(183,'2023-08-16 13:30:00','lesson/44/183/data/64f93138-a425-4429-ac83-1c01dc84c3bf_\'1강. [1단원] 문학의 빛깔 -「1단원 이론 정리」\'.docx','\'1강. [1단원] 문학의 빛깔 -「1단원 이론 정리」\'.docx',NULL,1,'2023-08-15 13:20:00','1강. [1단원] 문학의 빛깔 -「1단원 이론 정리」',44),(184,'2023-08-17 15:10:00',NULL,NULL,NULL,2,'2023-08-17 15:00:00','2강. [1단원] 문학의 빛깔 01. 슬픔이 기쁨에게「개관+본문」',44),(185,'2023-08-23 13:10:00',NULL,NULL,NULL,3,'2023-08-23 13:00:00','3강. [1단원] 문학의 빛깔 01. 슬픔이 기쁨에게「학습활동+문제풀이」',44),(186,'2023-08-24 13:10:00',NULL,NULL,NULL,4,'2023-08-24 13:00:00','4강. [1단원] 문학의 빛깔 02. 달밤「개관」',44),(187,'2023-08-30 19:00:01',NULL,NULL,NULL,5,'2023-08-30 18:00:01','5강. [1단원] 문학의 빛깔 02. 달밤「본문①」',44),(188,'2023-08-31 19:00:01',NULL,NULL,NULL,6,'2023-08-31 18:00:01','6강. [1단원] 문학의 빛깔 02. 달밤「본문②」',44),(189,'2023-09-06 19:00:01',NULL,NULL,NULL,7,'2023-09-06 18:00:01','7강. [1단원] 문학의 빛깔 02. 달밤「학습활동+문제풀이」',44),(248,'2023-08-23 17:00:54',NULL,NULL,NULL,1,'2023-08-23 16:30:54','회차제목1',65),(249,'2023-08-28 15:50:54','lesson/65/249/data/3c6bb879-80e7-4783-9dcc-e7facb289d6c_B105_중간발표자료.pdf','B105_중간발표자료.pdf',NULL,2,'2023-08-28 15:20:54','제목 2',65),(250,'2023-08-30 17:00:54','lesson/65/250/data/eec484a7-5e19-4161-b6e6-be3ab6dd7e2c_대본.docx','대본.docx',NULL,3,'2023-08-30 16:30:54','제목 3',65),(251,'2023-08-27 21:00:09','lesson/68/251/data/b0eea906-2990-4d72-ad5e-ef80c651c441_1강. 거듭제곱과 거듭제곱근.pdf','1강. 거듭제곱과 거듭제곱근.pdf',NULL,1,'2023-08-27 20:00:09','1강. 거듭제곱과 거듭제곱근',68),(252,'2023-08-29 21:00:09','lesson/68/252/data/811b9ff4-3040-459f-9323-0054f37adb4e_2강. 거듭제곱근의 성질.pdf','2강. 거듭제곱근의 성질.pdf',NULL,2,'2023-08-29 20:00:09','2강. 거듭제곱근의 성질',68),(253,'2023-09-04 21:00:09','lesson/68/253/data/ce0557f5-7f78-4ace-af3f-078f4723e553_3강. 지수의 확장.pdf','3강. 지수의 확장.pdf',NULL,3,'2023-09-04 20:00:09','3강. 지수의 확장',68),(254,'2023-09-03 21:00:09','lesson/68/254/data/9a417e59-d241-44cf-9dad-b28f6beecc6f_4강. 로그와 상용로그.pdf','4강. 로그와 상용로그.pdf',NULL,4,'2023-09-03 20:00:09','4강. 로그와 상용로그',68),(255,'2023-09-05 21:00:09','lesson/68/255/data/5a5f6ace-6d9f-4550-bf79-c16e3136017f_5강. 1부, 1장, 지수와 로그 문제풀이 (1~13번).pdf','5강. 1부, 1장, 지수와 로그 문제풀이 (1~13번).pdf',NULL,5,'2023-09-05 20:00:09','5강. 1부, 1장, 지수와 로그 문제풀이 (1~13번)',68),(256,'2023-09-11 21:00:09','lesson/68/256/data/4291cd7b-2ee1-42e7-ae96-46bb0e2f2c99_6강. 지수함수와 로그함수.pdf','6강. 지수함수와 로그함수.pdf',NULL,6,'2023-09-11 20:00:09','6강. 지수함수와 로그함수',68),(257,'2023-09-10 21:00:09','lesson/68/257/data/ba2d9601-71bb-4189-82b7-c0afb0440852_7강. 지수함수와 로그함수의 활용.pdf','7강. 지수함수와 로그함수의 활용.pdf',NULL,7,'2023-09-10 20:00:09','7강. 지수함수와 로그함수의 활용',68),(258,'2023-09-12 21:00:09','lesson/68/258/data/3e051178-1b2c-4435-85aa-982d613861fc_8강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (1~6번).pdf','8강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (1~6번).pdf',NULL,8,'2023-09-12 20:00:09','8강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (1~6번)',68),(259,'2023-09-18 21:00:09','lesson/68/259/data/94ac9bfa-6f8a-417d-b48f-e20c08572259_9강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (7~13번).pdf','9강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (7~13번).pdf',NULL,9,'2023-09-18 20:00:09','9강. 1부, 2장, 지수 함수와 로그함수 문제풀이 (7~13번)',68),(260,'2023-09-17 21:00:09','lesson/68/260/data/b0704342-45ee-4178-8495-0101da70ff5b_10강. 일반각과 호도법.pdf','10강. 일반각과 호도법.pdf',NULL,10,'2023-09-17 20:00:09','10강. 일반각과 호도법',68),(261,'2023-09-19 21:00:09','lesson/68/261/data/1713c702-2687-414b-9f9d-20e39f91ea16_11강. 삼각함수.pdf','11강. 삼각함수.pdf',NULL,11,'2023-09-19 20:00:09','11강. 삼각함수',68),(262,'2023-09-25 21:00:09','lesson/68/262/data/c2936bf8-3e72-4842-b3ec-cd87b19f1680_12강. 사인함수, 코사인함수의 그래프.pdf','12강. 사인함수, 코사인함수의 그래프.pdf',NULL,12,'2023-09-25 20:00:09','12강. 사인함수, 코사인함수의 그래프',68),(263,'2023-09-24 21:00:09','lesson/68/263/data/0fa8e3a1-bf36-4dea-a316-87d2bcdf1409_13강. 탄젠트함수의 그래프, 삼각함수의 성질, 삼각방정식과 부등식.pdf','13강. 탄젠트함수의 그래프, 삼각함수의 성질, 삼각방정식과 부등식.pdf',NULL,13,'2023-09-24 20:00:09','13강. 탄젠트함수의 그래프, 삼각함수의 성질, 삼각방정식과 부등식',68),(264,'2023-09-26 21:00:09','lesson/68/264/data/4b943633-92fc-4201-ad2c-e428d526f575_14강. 2부, 1장, 삼각함수 문제풀이 (1~9번).pdf','14강. 2부, 1장, 삼각함수 문제풀이 (1~9번).pdf',NULL,14,'2023-09-26 20:00:09','14강. 2부, 1장, 삼각함수 문제풀이 (1~9번)',68),(265,'2023-10-02 21:00:09','lesson/68/265/data/9349f265-f7de-4320-9bde-ea4e39923c3a_15강. 사인법칙.pdf','15강. 사인법칙.pdf',NULL,15,'2023-10-02 20:00:09','15강. 사인법칙',68),(266,'2023-10-01 21:00:09','lesson/68/266/data/4c084165-8f4e-408e-9b14-a64f850a6e53_16강. 코사인법칙.pdf','16강. 코사인법칙.pdf',NULL,16,'2023-10-01 20:00:09','16강. 코사인법칙',68),(267,'2023-10-03 21:00:09','lesson/68/267/data/87311917-bfeb-4128-bb23-a76f6d685a4d_17강. 2부, 2장, 삼각함수의 활용 문제풀이 (1~9번).pdf','17강. 2부, 2장, 삼각함수의 활용 문제풀이 (1~9번).pdf',NULL,17,'2023-10-03 20:00:09','17강. 2부, 2장, 삼각함수의 활용 문제풀이 (1~9번)',68),(268,'2023-10-09 21:00:09','lesson/68/268/data/169b9a79-2ccc-4a25-b6f8-1f43655b6f2f_18강. 수열.pdf','18강. 수열.pdf',NULL,18,'2023-10-09 20:00:09','18강. 수열',68),(269,'2023-10-08 21:00:09','lesson/68/269/data/d26bb914-285a-4d1b-92a4-fa1f110e6158_19강. 등차수열.pdf','19강. 등차수열.pdf',NULL,19,'2023-10-08 20:00:09','19강. 등차수열',68),(270,'2023-10-10 21:00:09','lesson/68/270/data/f820d0d0-ed51-42a7-ba28-805c7f944c7c_20강. 등차수열의 합, 합과 일반항과의 관계.pdf','20강. 등차수열의 합, 합과 일반항과의 관계.pdf',NULL,20,'2023-10-10 20:00:09','20강. 등차수열의 합, 합과 일반항과의 관계',68),(271,'2023-10-16 21:00:09','lesson/68/271/data/7e1352fa-025c-46c6-911f-1cbd35e97276_21강. 등비수열, 등비수열의 합.pdf','21강. 등비수열, 등비수열의 합.pdf',NULL,21,'2023-10-16 20:00:09','21강. 등비수열, 등비수열의 합',68),(272,'2023-10-15 21:00:09','lesson/68/272/data/c935ebd8-c31e-4af0-8b5b-8d18692cdad9_22강. 3부, 1장, 등차수열과 등비수열 문제풀이 (1~13번).pdf','22강. 3부, 1장, 등차수열과 등비수열 문제풀이 (1~13번).pdf',NULL,22,'2023-10-15 20:00:09','22강. 3부, 1장, 등차수열과 등비수열 문제풀이 (1~13번)',68),(273,'2023-10-17 21:00:09','lesson/68/273/data/ab00b527-d3ee-4f2c-857f-115530e695d9_23강. 합의 기호, 여러가지 수열의 합.pdf','23강. 합의 기호, 여러가지 수열의 합.pdf',NULL,23,'2023-10-17 20:00:09','23강. 합의 기호, 여러가지 수열의 합',68),(274,'2023-10-23 21:00:09','lesson/68/274/data/ae602ae0-e5f8-48ae-8369-76d8ce11a681_24강. 3부, 2장, 수열의 합 문제풀이 (1~9번).pdf','24강. 3부, 2장, 수열의 합 문제풀이 (1~9번).pdf',NULL,24,'2023-10-23 20:00:09','24강. 3부, 2장, 수열의 합 문제풀이 (1~9번)',68),(275,'2023-10-22 21:00:09','lesson/68/275/data/bbb5802e-e819-4019-8584-bb9e6323371b_25강. 수열의 귀납적 정의, 수학적 귀납법.pdf','25강. 수열의 귀납적 정의, 수학적 귀납법.pdf',NULL,25,'2023-10-22 20:00:09','25강. 수열의 귀납적 정의, 수학적 귀납법',68),(276,'2023-10-24 21:00:09','lesson/68/276/data/96db8123-dc72-428e-b7a4-3bd025490529_26강. 3부, 3장, 수학적 귀납법 문제풀이 (1~6번).pdf','26강. 3부, 3장, 수학적 귀납법 문제풀이 (1~6번).pdf',NULL,26,'2023-10-24 20:00:09','26강. 3부, 3장, 수학적 귀납법 문제풀이 (1~6번)',68),(277,'2023-09-04 22:10:09','lesson/69/277/data/115e59d8-e9c0-44b4-9a22-43951bb2f3cd_Chapter 1. 지수함수와 로그함수 ①.docx','Chapter 1. 지수함수와 로그함수 ①.docx',NULL,1,'2023-09-04 21:00:09','Chapter 1. 지수함수와 로그함수 ①',69),(278,'2023-09-05 11:10:09','lesson/69/278/data/8ff17872-c158-449d-a4de-d0bc3f52922d_Chapter 1. 지수함수와 로그함수 ②.docx','Chapter 1. 지수함수와 로그함수 ②.docx',NULL,2,'2023-09-05 10:00:09','Chapter 1. 지수함수와 로그함수 ②',69),(279,'2023-09-06 11:10:09','lesson/69/279/data/04d7d48f-21c1-45ac-a32f-b7fb3be5fa0b_Chapter 2. 삼각함수 ①.docx','Chapter 2. 삼각함수 ①.docx',NULL,3,'2023-09-06 10:00:09','Chapter 2. 삼각함수 ①',69),(280,'2023-09-11 22:10:09','lesson/69/280/data/95f8d988-1600-454f-a44c-42a1d8bc2064_Chapter 2. 삼각함수 ②.docx','Chapter 2. 삼각함수 ②.docx',NULL,4,'2023-09-11 21:00:09','Chapter 2. 삼각함수 ②',69),(281,'2023-09-12 11:10:09','lesson/69/281/data/6b1a85a7-e91c-4dbe-84de-5cab56255213_Chapter 2. 삼각함수 ③.docx','Chapter 2. 삼각함수 ③.docx',NULL,5,'2023-09-12 10:00:09','Chapter 2. 삼각함수 ③',69),(282,'2023-09-13 11:10:09','lesson/69/282/data/655b4c56-feae-49af-ac11-e71bc7ba6921_Chapter 3. 수열 ①.docx','Chapter 3. 수열 ①.docx',NULL,6,'2023-09-13 10:00:09','Chapter 3. 수열 ①',69),(283,'2023-09-18 22:10:09','lesson/69/283/data/0f4f6ebc-e8d2-4a43-aefa-0bedb4176c8e_Chapter 3. 수열 ② ▶완강.docx','Chapter 3. 수열 ② ▶완강.docx',NULL,7,'2023-09-18 21:00:09','Chapter 3. 수열 ② ▶완강',69),(284,'2023-09-07 21:10:20','lesson/70/284/data/191e034f-7d6c-4cf8-a0d2-a72d57101ecd_Chapter 1. 함수의 극한과 연속 ①.docx','Chapter 1. 함수의 극한과 연속 ①.docx',NULL,1,'2023-09-07 20:00:20','Chapter 1. 함수의 극한과 연속 ①',70),(285,'2023-09-08 21:10:20','lesson/70/285/data/68fc0de5-62d6-4e82-aa44-297d5253e5e2_Chapter 1. 함수의 극한과 연속 ②.docx','Chapter 1. 함수의 극한과 연속 ②.docx',NULL,2,'2023-09-08 20:00:20','Chapter 1. 함수의 극한과 연속 ②',70),(286,'2023-09-09 21:10:20','lesson/70/286/data/9a0df11d-1465-4725-a9aa-bf2b85198957_Chapter 2. 미분 ①.docx','Chapter 2. 미분 ①.docx',NULL,3,'2023-09-09 20:00:20','Chapter 2. 미분 ①',70),(287,'2023-09-14 21:10:20',NULL,NULL,NULL,4,'2023-09-14 20:00:20','Chapter 2. 미분 ②',70),(288,'2023-09-15 21:10:20','lesson/70/288/data/8b1b48b6-e8c8-46aa-9cce-0e7461296cde_Chapter 2. 미분 ③.docx','Chapter 2. 미분 ③.docx',NULL,5,'2023-09-15 20:00:20','Chapter 2. 미분 ③',70),(289,'2023-09-16 21:10:20','lesson/70/289/data/ada9df12-5011-4423-b7b9-d2ef031eda0e_Chapter 3. 적분 ①.docx','Chapter 3. 적분 ①.docx',NULL,6,'2023-09-16 20:00:20','Chapter 3. 적분 ①',70),(290,'2023-09-21 21:10:20','lesson/70/290/data/499d8ca4-e3ef-4a97-a62a-9e169cb615e7_Chapter 3. 적분 ② ▶완강.docx','Chapter 3. 적분 ② ▶완강.docx',NULL,7,'2023-09-21 20:00:20','Chapter 3. 적분 ② ▶완강',70),(291,'2023-08-24 20:00:58',NULL,NULL,NULL,1,'2023-08-24 19:00:58','01강 [1회] 독서(01~09)',71),(292,'2023-08-27 20:00:58',NULL,NULL,NULL,2,'2023-08-27 19:00:58','02강 [1회] 독서(10~17)',71),(293,'2023-08-29 21:00:58',NULL,NULL,NULL,3,'2023-08-29 20:00:58','03강 [1회] 문학(18~27)',71),(294,'2023-08-31 20:00:58',NULL,NULL,NULL,4,'2023-08-31 19:00:58','04강 [1회] 문학(28~34)',71),(295,'2023-09-03 20:00:58',NULL,NULL,NULL,5,'2023-09-03 19:00:58','05강 [1회] 화작(35~45)',71),(296,'2023-09-05 21:00:58',NULL,NULL,NULL,6,'2023-09-05 20:00:58','06강 [1회] 언매(35~45)',71),(297,'2023-09-07 20:00:58',NULL,NULL,NULL,7,'2023-09-07 19:00:58','07강 [2회] 독서(01~06)',71),(299,'2023-09-07 22:00:43',NULL,NULL,NULL,1,'2023-09-07 21:00:43','01강 독서의 본질, 독서의 방법(1)_9쪽',73),(300,'2023-09-09 22:00:43',NULL,NULL,NULL,2,'2023-09-09 21:00:43','02강 독서의 방법(2)_20쪽',73),(301,'2023-09-14 22:00:43',NULL,NULL,NULL,3,'2023-09-14 21:00:43','03강 독서의 분야_34쪽',73),(302,'2023-09-16 22:00:43',NULL,NULL,NULL,4,'2023-09-16 21:00:43','04강 독서의 태도, 인문/예술(1)_45쪽',73),(303,'2023-09-21 22:00:43',NULL,NULL,NULL,5,'2023-09-21 21:00:43','05강 인문/예술(2)_58쪽',73),(304,'2023-08-18 18:00:28','lesson/74/304/data/21fd4a54-cde4-4b34-b3bc-13de192d581d','섹션 1. 스프링 부트 소개.docx',NULL,1,'2023-08-18 12:00:28','섹션 1. 스프링 부트 소개',74),(305,'2023-08-30 17:00:28',NULL,NULL,NULL,2,'2023-08-30 16:00:28','2',74),(306,'2023-09-06 17:00:28',NULL,NULL,NULL,3,'2023-09-06 16:00:28','3',74),(307,'2023-09-04 17:00:28',NULL,NULL,NULL,4,'2023-09-04 16:00:28','4',74),(308,'2023-09-06 17:00:28',NULL,NULL,NULL,5,'2023-09-06 16:00:28','5',74),(309,'2023-09-13 17:00:28',NULL,NULL,NULL,6,'2023-09-13 16:00:28','6',74),(310,'2023-09-11 17:00:28',NULL,NULL,NULL,7,'2023-09-11 16:00:28','7',74),(311,'2023-09-13 17:00:28',NULL,NULL,NULL,8,'2023-09-13 16:00:28','8',74),(312,'2023-09-20 17:00:28',NULL,NULL,NULL,9,'2023-09-20 16:00:28','9',74),(313,'2023-09-18 17:00:28',NULL,NULL,NULL,10,'2023-09-18 16:00:28','10',74),(314,'2023-09-20 17:00:28',NULL,NULL,NULL,11,'2023-09-20 16:00:28','11',74),(315,'2023-08-29 13:00:25',NULL,NULL,NULL,1,'2023-08-29 12:00:25','1',75),(316,'2023-09-06 13:00:25',NULL,NULL,NULL,2,'2023-09-06 12:00:25','2',75),(317,'2023-09-07 13:00:25',NULL,NULL,NULL,3,'2023-09-07 12:00:25','3',75),(318,'2023-09-08 13:00:25',NULL,NULL,NULL,4,'2023-09-08 12:00:25','4',75),(319,'2023-09-05 13:00:25',NULL,NULL,NULL,5,'2023-09-05 12:00:25','5',75),(320,'2023-09-13 13:00:25',NULL,NULL,NULL,6,'2023-09-13 12:00:25','6',75),(321,'2023-09-14 13:00:25',NULL,NULL,NULL,7,'2023-09-14 12:00:25','7',75),(322,'2023-09-15 13:00:25',NULL,NULL,NULL,8,'2023-09-15 12:00:25','8',75),(323,'2023-09-12 13:00:25',NULL,NULL,NULL,9,'2023-09-12 12:00:25','9',75),(324,'2023-09-20 13:00:25',NULL,NULL,NULL,10,'2023-09-20 12:00:25','10',75),(325,'2023-09-21 13:00:25',NULL,NULL,NULL,11,'2023-09-21 12:00:25','11',75),(326,'2023-09-22 13:00:25',NULL,NULL,NULL,12,'2023-09-22 12:00:25','12',75),(327,'2023-09-19 13:00:25',NULL,NULL,NULL,13,'2023-09-19 12:00:25','13',75),(328,'2023-09-27 13:00:25',NULL,NULL,NULL,14,'2023-09-27 12:00:25','14',75),(329,'2023-09-07 12:00:55',NULL,NULL,NULL,1,'2023-09-07 11:00:55','1',76),(330,'2023-09-09 12:00:55',NULL,NULL,NULL,2,'2023-09-09 11:00:55','2',76),(331,'2023-09-11 11:20:05',NULL,NULL,NULL,1,'2023-09-11 10:00:05','1',77),(332,'2023-09-13 22:20:05',NULL,NULL,NULL,2,'2023-09-13 21:00:05','2',77),(333,'2023-09-18 11:20:05',NULL,NULL,NULL,3,'2023-09-18 10:00:05','3',77),(334,'2023-09-20 22:20:05',NULL,NULL,NULL,4,'2023-09-20 21:00:05','4',77),(335,'2023-09-07 22:00:17',NULL,NULL,NULL,1,'2023-09-07 21:00:17','1',78),(336,'2023-09-09 22:00:17',NULL,NULL,NULL,2,'2023-09-09 21:00:17','2',78),(337,'2023-09-11 22:00:17',NULL,NULL,NULL,3,'2023-09-11 21:00:17','3',78),(338,'2023-09-14 22:00:17',NULL,NULL,NULL,4,'2023-09-14 21:00:17','4',78),(339,'2023-09-16 22:00:17',NULL,NULL,NULL,5,'2023-09-16 21:00:17','5',78),(340,'2023-09-18 22:00:17',NULL,NULL,NULL,6,'2023-09-18 21:00:17','6',78),(341,'2023-09-21 22:00:17',NULL,NULL,NULL,7,'2023-09-21 21:00:17','7',78),(342,'2023-09-23 22:00:17',NULL,NULL,NULL,8,'2023-09-23 21:00:17','8',78),(343,'2023-09-25 22:00:17',NULL,NULL,NULL,9,'2023-09-25 21:00:17','9',78),(344,'2023-09-28 22:00:17',NULL,NULL,NULL,10,'2023-09-28 21:00:17','10',78),(345,'2023-09-30 22:00:17',NULL,NULL,NULL,11,'2023-09-30 21:00:17','12',78),(346,'2023-10-02 22:00:17',NULL,NULL,NULL,12,'2023-10-02 21:00:17','13',78),(347,'2023-08-23 22:50:56',NULL,NULL,NULL,1,'2023-08-23 22:00:56','1',79),(348,'2023-08-27 22:50:56',NULL,NULL,NULL,2,'2023-08-27 22:00:56','2',79),(349,'2023-08-30 22:50:56',NULL,NULL,NULL,3,'2023-08-30 22:00:56','3',79),(350,'2023-09-03 22:50:56',NULL,NULL,NULL,4,'2023-09-03 22:00:56','4',79),(351,'2023-09-06 22:50:56',NULL,NULL,NULL,5,'2023-09-06 22:00:56','5',79),(352,'2023-09-10 22:50:56',NULL,NULL,NULL,6,'2023-09-10 22:00:56','6',79),(353,'2023-09-13 22:50:56',NULL,NULL,NULL,7,'2023-09-13 22:00:56','7',79),(354,'2023-09-17 22:50:56',NULL,NULL,NULL,8,'2023-09-17 22:00:56','8',79);
/*!40000 ALTER TABLE `lesson_round` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lesson_type`
--

DROP TABLE IF EXISTS `lesson_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lesson_type` (
  `lesson_type_no` int NOT NULL AUTO_INCREMENT,
  `lesson_type_name` varchar(15) NOT NULL,
  PRIMARY KEY (`lesson_type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lesson_type`
--

LOCK TABLES `lesson_type` WRITE;
/*!40000 ALTER TABLE `lesson_type` DISABLE KEYS */;
INSERT INTO `lesson_type` VALUES (6,'국어'),(7,'수학'),(8,'사회'),(9,'과학'),(10,'영어'),(11,'제2외국어'),(12,'한국사'),(13,'IT'),(14,'자격증'),(15,'주식'),(16,'자기개발');
/*!40000 ALTER TABLE `lesson_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `satisfaction`
--

DROP TABLE IF EXISTS `satisfaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `satisfaction` (
  `cast_no` int NOT NULL AUTO_INCREMENT,
  `lesson_csat_datetime` datetime(6) DEFAULT NULL,
  `lesson_round_csat` float NOT NULL,
  `teacher_csat` float NOT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `lesson_round_no` bigint DEFAULT NULL,
  `student_no` bigint DEFAULT NULL,
  `teacher_no` bigint DEFAULT NULL,
  PRIMARY KEY (`cast_no`),
  KEY `FK888lyp7u131ruq3v4t97wg9xu` (`lesson_no`),
  KEY `FKa5wgm8x2ong5kv309pr1lwaci` (`lesson_round_no`),
  KEY `FKd3p55lh62yx6eapj37jakbp86` (`student_no`),
  KEY `FKephuhe90kp1iwj82c8c4gichw` (`teacher_no`),
  CONSTRAINT `FK888lyp7u131ruq3v4t97wg9xu` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`),
  CONSTRAINT `FKa5wgm8x2ong5kv309pr1lwaci` FOREIGN KEY (`lesson_round_no`) REFERENCES `lesson_round` (`lesson_round_no`),
  CONSTRAINT `FKd3p55lh62yx6eapj37jakbp86` FOREIGN KEY (`student_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKephuhe90kp1iwj82c8c4gichw` FOREIGN KEY (`teacher_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `satisfaction`
--

LOCK TABLES `satisfaction` WRITE;
/*!40000 ALTER TABLE `satisfaction` DISABLE KEYS */;
INSERT INTO `satisfaction` VALUES (1,'2023-08-15 17:24:34.709230',5,5,1,1,4,1),(2,'2023-08-15 17:24:34.709230',5,5,1,1,5,1),(3,'2023-08-15 17:24:34.709230',3,3,1,1,6,1),(4,'2023-08-15 17:24:34.709230',4,4,1,1,7,1),(5,'2023-08-15 17:24:34.709230',5,5,1,1,8,1),(6,'2023-08-15 17:24:34.709230',5,5,1,1,5,1),(7,'2023-08-17 15:16:44.567791',5,5,1,6,4,1),(8,'2023-08-17 15:40:09.727292',4,3,1,6,6,1),(9,'2023-08-17 16:38:45.572869',5,5,1,6,5,1),(10,'2023-08-17 23:51:47.000000',5,5,44,183,4,1),(11,'2023-08-17 23:51:47.000000',5,2,44,183,5,1),(12,'2023-08-17 23:51:47.000000',4,5,44,183,6,1),(13,'2023-08-17 23:51:47.000000',1,2,44,183,7,1),(14,'2023-08-17 23:51:47.000000',3,3,44,183,8,1),(15,'2023-08-17 23:51:47.000000',3,5,44,184,4,1),(16,'2023-08-17 23:51:47.000000',5,1,44,184,5,1),(17,'2023-08-17 23:51:47.000000',2,2,44,184,6,1),(18,'2023-08-17 23:51:47.000000',4,5,44,184,7,1),(19,'2023-08-17 23:51:47.000000',5,5,44,184,8,1),(20,'2023-08-17 23:58:31.000000',5,5,1,1,4,1),(21,'2023-08-17 23:58:31.000000',5,4,1,1,4,1),(22,'2023-08-17 23:58:31.000000',5,5,1,3,4,1),(23,'2023-08-17 23:58:31.000000',2,5,1,2,5,1),(24,'2023-08-17 23:58:31.000000',3,3,1,4,5,1),(25,'2023-08-17 23:58:31.000000',5,5,1,5,5,1),(26,'2023-08-17 23:58:31.000000',5,5,1,3,6,1),(27,'2023-08-17 23:58:31.000000',5,3,1,3,6,1),(28,'2023-08-17 23:58:31.000000',5,4,1,2,6,1),(29,'2023-08-17 23:58:31.000000',5,5,1,1,6,1),(30,'2023-08-18 03:35:32.629612',4,2,1,3,6,1),(31,'2023-08-18 03:44:12.423637',3,3,1,3,6,1),(32,'2023-08-18 03:54:09.279389',4,5,1,3,6,1);
/*!40000 ALTER TABLE `satisfaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_lesson_list`
--

DROP TABLE IF EXISTS `student_lesson_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_lesson_list` (
  `student_lesson_list_no` bigint NOT NULL AUTO_INCREMENT,
  `student_lesson_list_datetime` datetime(6) DEFAULT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`student_lesson_list_no`),
  KEY `FKjxkmb725pev9hubu6d4v239td` (`lesson_no`),
  KEY `FKstcdbx59cvrr06pa0dhjmpb00` (`user_no`),
  CONSTRAINT `FKjxkmb725pev9hubu6d4v239td` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`),
  CONSTRAINT `FKstcdbx59cvrr06pa0dhjmpb00` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_lesson_list`
--

LOCK TABLES `student_lesson_list` WRITE;
/*!40000 ALTER TABLE `student_lesson_list` DISABLE KEYS */;
INSERT INTO `student_lesson_list` VALUES (2,'2023-08-12 16:45:43.250210',1,4),(3,'2023-08-12 21:33:58.068735',1,6),(4,'2023-08-13 00:21:58.490380',1,5),(10,'2023-08-16 09:38:21.226160',44,4),(11,'2023-08-16 09:38:26.115108',44,5),(12,'2023-08-16 09:38:29.266934',44,6),(13,'2023-08-16 09:38:31.857376',44,7),(14,'2023-08-16 09:38:34.462937',44,8),(18,'2023-08-17 21:43:13.380120',65,5),(20,'2023-08-17 23:17:31.254651',74,5),(21,'2023-08-18 02:23:31.304881',77,7);
/*!40000 ALTER TABLE `student_lesson_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_wishlist`
--

DROP TABLE IF EXISTS `student_wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_wishlist` (
  `wishlist_no` bigint NOT NULL AUTO_INCREMENT,
  `wishlist_datetime` datetime(6) DEFAULT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`wishlist_no`),
  KEY `FK4v6oq0hkleos9kgbvpv7k0m6p` (`lesson_no`),
  KEY `FKt0djyf6mjjyl16kgtx1qpnwra` (`user_no`),
  CONSTRAINT `FK4v6oq0hkleos9kgbvpv7k0m6p` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`),
  CONSTRAINT `FKt0djyf6mjjyl16kgtx1qpnwra` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_wishlist`
--

LOCK TABLES `student_wishlist` WRITE;
/*!40000 ALTER TABLE `student_wishlist` DISABLE KEYS */;
INSERT INTO `student_wishlist` VALUES (20,'2023-08-17 22:14:34.680760',44,5),(21,'2023-08-17 23:17:02.591947',74,5);
/*!40000 ALTER TABLE `student_wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_no` bigint NOT NULL,
  `is_active` bit(1) DEFAULT NULL,
  `profile_img` varchar(1000) DEFAULT NULL,
  `user_email` varchar(50) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `user_info` varchar(30) DEFAULT NULL,
  `user_join_date` datetime(6) DEFAULT NULL,
  `user_name` varchar(20) NOT NULL,
  `user_password` varchar(60) DEFAULT NULL,
  `user_tel` varchar(20) DEFAULT NULL,
  `user_type` varchar(1) DEFAULT NULL,
  `how_join` varchar(1) NOT NULL,
  PRIMARY KEY (`user_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,_binary '',NULL,'mm@gmail.com','teacher001','asfadf','2023-08-12 16:25:03.720945','양희제','$2a$10$Sgiz103.RI/oLyOq1lxkwOf0FXObIfuO2bR8DrhjjV.hEXNktp6Xu','01011112222','T',''),(2,_binary '','user/5c97adc8-286c-4d96-a255-45dea76a12b5_watch.png','asdfg@dddd.ddd','yoyoyo','안녕하세요? 최선을 다해 가르치겠습니다.','2023-08-12 16:38:34.048636','강사임','$2a$10$qNVqrL7GW465/UjpyZUSc.l7YSrorO3n3DBFd3kYuvjjGq3jq00L2','01021211234','T',''),(3,_binary '','user/4a43e14b-f313-44ee-b2cf-1d5a9c97c8bf_MySQL.png','244@naver.com','testteacher','하 제발','2023-08-12 16:40:12.461063','선생입니다','$2a$10$PbKxmRDFhBdonUVvAAgY3OwWe6mCh5ug698JLspbEzk2om5l.MqjS','01012345678','T',''),(4,_binary '',NULL,'dd@gmail.com','test001','dfdasf','2023-08-12 16:44:29.875026','임규돈','$2a$10$4Nvv8RJPtLwec265uDA5qe6JovBLys5De0eeyFWKFxCJyEJiZzZIC','01012345678','S',''),(5,_binary '',NULL,'asdasdf@asss.sss','hahaha','열심히해야지!','2023-08-12 19:47:12.237088','선다영','$2a$10$hgIrYGtZFO497iqrt55SIePj1/IhwXyU6IoqKkwwOyvy16z7Z0DeW','01021213214','S',''),(6,_binary '',NULL,'ss@gmail.com','test002','fasdfasdf','2023-08-12 21:32:56.213928','신동민','$2a$10$dz4ANRqaVkF/hSA2L67Dn.gajgznDRTEwR50ZeznEmlb48Q7GK.p2','01022224444','S',''),(7,_binary '',NULL,'handal@kakao.com','hyebin','dfadsf^^**','2023-08-13 18:33:31.592398','유혜빈','$2a$10$8EqrvosGaKmgMFobZ4Ogw.oVjL2W8BNyfHlKL8gY2a5MCraYsMIMa','01078965412','S','L'),(8,_binary '',NULL,'dasdas@adsds.coc','temp','하이','2023-08-13 21:49:37.311687','허다은','$2a$10$xwsbnGpmsnjdZHaXBfWVO.4Adsdg9feMZ7cPZH7c9ToAtI8LnF3va','01021231111','S',''),(9,_binary '','user/f54fa0ef-70cf-4615-a3ab-b114d9308e90_Sad_Teacher.png','ghjadmb21@gmail.com','teacher','안녕하세요 양희제입니다','2023-08-14 16:37:41.120037','d','$2a$10$aF7xH.EwLqSw5qAQcSHvuewcupn5yjm4EZSy6U7JdkOC1nLxxKm2W','01012341234','T',''),(10,_binary '','user/f7f299b9-165e-4f5d-92a9-fdb1789a9959_React.png','dsdf@naver.com','teacher003','ㄴㅇㄿㄹㅇㅀ','2023-08-14 20:27:48.100323','선생님3','$2a$10$xOz/pakWqlqJiVE0a//8TeOdn4Qvw2Kqr0ZBheg6v/s9s2Gfe0Sm6','01074223333','T',''),(11,_binary '',NULL,'dsdffg@naver.com','stu12345','안녕 크ㅜㄹ레오 파트라','2023-08-14 20:32:10.663184','선생님3','$2a$10$iPy0T10C53vPYfInvMBNGOt0mGi.QywUBot7wJIaTrUt7//JULvG.','01084535557','S',''),(12,_binary '','user/2947e4ac-e9ae-4808-b264-3be0249eec53_오리.png','dsd@naver.com','daejeon','안녕 클레오 파트라','2023-08-16 01:45:03.663750','학생임다','$2a$10$uyuU0E/RBf7G5nEzYdw8hudUmjrtr86zgSBlaLSEm9OINVcUrhGCa','01099992222','T','L'),(13,_binary '',NULL,'dkssud@dkssud.dkssud','jobedu','경력학력 테스트를 위함','2023-08-16 08:27:30.615754','경력학력','$2a$10$mKZSMM3.g2o9hOKidGxgoekRSca1kjq1YW49DNBKHRT45mWjnVGDy','01010101010','T','L'),(16,_binary '','http://k.kakaocdn.net/dn/0EnvA/btsqCcHu4Mw/sVxlRTs7qhWTM7qEjmyPmk/img_110x110.jpg','k4496k@naver.com','2967142986','전교 1등하기, 다은이보다 1등 앞에 있기','2023-08-16 12:04:35.821257','한민서','$2a$10$XCsap88CyZh/N3Fs1EZT7.3huLn6CCsuAg9.TYtRatWqUv7ge2i4y','01012345678','S','K'),(17,_binary '','http://k.kakaocdn.net/dn/deEbhm/btsp2adi8hh/LqzvXK6qMkWOdWF0He1rqk/img_110x110.jpg','money4857@naver.com','2967194105','유혜빈보다 잘할겁니다.','2023-08-16 12:37:30.191724','임규돈','$2a$10$lsU2JSfbM3Kq3mLeGbyk5.MKoIpzjzIO5XhFqKkTeQ1e7sXicvYmm','01031212749','S','K'),(22,_binary '','http://k.kakaocdn.net/dn/da3LsD/btso7RxIidH/muqAhine23ZvwZCtr7N5G0/img_110x110.jpg','prodigy_min@kakao.com','2953884229','dfadsf^^**','2023-08-16 15:36:46.417950','신동민','$2a$10$5ODku.Q/7aLwjQtFyi31zuWsPXe0iOlLhjzK4H8vuPsZVESD92ef.','01078965412','S','K'),(23,_binary '','http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_110x110.jpg','qor_4@naver.com','2970772218','목표닷@!','2023-08-16 22:16:25.787747','다은','$2a$10$1KlTbKXja0kZs2rg39xngOjM6NPECJf5kqm8hOJ1mX0GJwFzNCixy','01053076356','S','K'),(24,_binary '','http://k.kakaocdn.net/dn/8yl34/btsqYQZHLCU/bgZpQ08Kd2G6eEyQs5RW2K/img_110x110.jpg','dldnr789@naver.com','2971146303',NULL,'2023-08-17 08:42:52.293903','이현욱','$2a$10$LvcOEfQEJjCVf2kjDAZYCeKohJlZ4LJAzj06OIivvnNkwBI0GLiO.',NULL,NULL,'K'),(25,_binary '',NULL,'eunhye2135@naver.com','eunhye2135','열심히 하기!!!','2023-08-17 20:42:58.933925','송은혜','$2a$10$htXmry5.YjzSIzWQlQBNKOWpF6vGghY3A/lN3Wsz9i/lbh1llDkKK','01048756448','S','L'),(26,_binary '',NULL,'parkha_99@naver.com','parkha_99','서울대 가보자고','2023-08-17 20:44:30.212532','박하민','$2a$10$2y/Hn3bIEbf7LZbn8kGUpu2TxUoguymCMVnRC8pMQUZ7gKEh5.cY2','01055784895','S','L'),(27,_binary '',NULL,'hyeee0@naver.com','hyeee0','????','2023-08-17 20:45:23.078335','안혜영','$2a$10$7ZR5P0tP1githJsAUdLZeOakQLKDIVtl3S8u4X7RnJrTBV9zE1aRe','01054879987','S','L'),(28,_binary '',NULL,'seastar7800@naver.com','saestar7800','상상도 못한 정체 ㄴㅇㄱ','2023-08-17 20:47:56.599677','전새별','$2a$10$2.TTsMlALvYwtFujjitKd.2vZYQYs5..i/CtJYo//UMrRjvF0RDp2','01044785789','S','L'),(29,_binary '',NULL,'hyunkkk777@naver.com','hyukkk','오늘도 화이팅!','2023-08-17 20:49:45.017141','노혁','$2a$10$yYJ6HiPUCV7dpuAHxPcSNuUsJQW6dQGkhXjCjYi07Sz3vuRP9CNL2','01047854957','S','L'),(30,_binary '',NULL,'seungheon87@gmail.com','seungheon87','화이티잉\n','2023-08-17 20:54:40.962254','최승헌','$2a$10$s0Y8ovJdWKTzLW9Diqhyi.SBTB45Hk5S1/5eIjNlS375OTPkyGvy2','01078459684','S','L'),(31,_binary '','user/1f89cf5d-23a4-4e95-b82a-2c55988abd5f_sm_woojinmath.png','woojin@gmail.com','woojinssam','시작부터 끝까지 수학은 누구나\n현우진 입니다.','2023-08-17 21:00:50.459747','현우진','$2a$10$.kNKc6jJtJt3y5eD4zRBS.di4qrMthkWDeNL5xc8qDdMOwjmDXWHa','01054879658','T','L'),(32,_binary '','user/f9fc3ef7-0f24-4133-9d7b-9940e25c8485_sm_bulbaiyang1.png','seungjinssam@naver.com','seungjinssam','출제코드를 파헤친다!','2023-08-17 21:07:27.915241','양승진','$2a$10$pd1.Xo7Q0PgxuvLb6r2Daef3N1Uoy7yv7oyGydTmVEhVacxCfZyFS','01054896387','T','L'),(33,_binary '','user/a03bc9bc-3689-40ca-a4ad-96404c0ead12_T0272.png','jihee548@naver.com','jiheessam','귀에 쏙쏙 들어와 마음을 움직이는, 쉽고 재밌는 국어!','2023-08-17 21:46:31.332726','명지희','$2a$10$ojHX2mot/l2p7QcP8nZhPubwBYk2ZKxLNKTjabNn6giV6k1LLCylG','01027894876','T','L'),(34,_binary '','user/029b56c7-4bfd-4da0-84c9-d3f5c1b5c010_T0764.png','heanassam@gmail.com','heanassam','차근차근 해-나가는 국어','2023-08-17 21:56:30.293158','차해나','$2a$10$BOCldfpZHBwG61Han8TovuL8KiHl36ssGS0xVtPqt7APvXWZ2jjd.','01054978732','T','L'),(35,_binary '','','ssafy@gmail.com','string','사회 선생님','2023-08-17 22:55:44.231349','이기상','$2a$10$gN62xg4slkABJypqSsr65OCdA7li5YKy1oN6v7xuUNNKaDJWjj7W2','01011111111','T','L'),(36,_binary '','','ssafy@gmail.com1','string1','사회 선생님','2023-08-17 22:56:13.229257','이다지','$2a$10$k1gB5X4d6rQYYvX4j1dIfummV0CatIcktFqWMVda69Z.25yAof5cG','01011111111','T','L'),(37,_binary '','','ssafy@gmail.com2','string2','사회 선생님','2023-08-17 22:56:29.382927','김종익','$2a$10$h4Ywf1z.IpsclXXLnKsLueMEM0JikMOn6CwsevMqEO6wu8vJc86eu','01011111111','T','L'),(38,_binary '','','ssafy@gmail.com3','string3','과학 선생님','2023-08-17 22:56:46.386555','고석용','$2a$10$zIprEP6xkqMKJegz0YKege2tWcE7/Muh7QikiYRXvC83mXNFsdhZK','01011111111','T','L'),(39,_binary '','','ssafy@gmail.com4','string4','과학 선생님','2023-08-17 22:58:01.923994','정훈구','$2a$10$F9osIgE5sRgmFeHpmW9tdu6nm9wmhNNDzSNd9mzGGP2li2JufWZIO','01011111111','T','L'),(40,_binary '','','ssafy@gmail.com5','string5','한국사 선생님','2023-08-17 22:58:16.340346','김종웅','$2a$10$wpEKYiBUoYEr5lrGOS6IiOhgx5C2LlBfgZCdxyHYGnjjUJt1D0lq.','01011111111','T','L'),(41,_binary '','','ssafy@gmail.com6','string6','한국사 선생님','2023-08-17 22:58:24.479285','고아름','$2a$10$TGHMYK3lOMO0nLUE/OwoEuDQbS5fyTUCkMsygsN5FmKSTJ4mShz3a','01011111111','T','L'),(42,_binary '','','ssafy@gmail.com7','string7','영어 선생님','2023-08-17 22:58:41.664434','김기철','$2a$10$J6r4jpZh1HVtMLCY/TjRBefFxWn5k3t6tDLMmh7ZUq1QU5Gb.bCBm','01011111111','T','L'),(43,_binary '','','ssafy@gmail.com8','string8','영어 선생님','2023-08-17 22:58:49.438224','김지영','$2a$10$ALlPOt/dYWYw6PKWbc087uA/tjhNcrra1gKEuMcn2Xsb0sSVQMTKu','01011111111','T','L'),(44,_binary '','','ssafy@gmail.com9','string9','영어 선생님','2023-08-17 22:59:02.622403','고정재','$2a$10$kKEEY0z/1B4Mx8qAaur8au4Kvhah2dhcNK8mwygOKLsELUUE4FIrO','01011111111','T','L'),(45,_binary '','','ssafy@gmail.com10','string10','제2외국어 선생님','2023-08-17 23:03:02.380097','안주희','$2a$10$JKyXiEQJidH7MCUXZb8Mz.Sj9Us2YHvGSBOv4izRO8CoERQJ5H4Te','01011111111','T','L'),(46,_binary '','','ssafy@gmail.com11','string11','제2외국어 선생님','2023-08-17 23:03:11.668963','정해영','$2a$10$Xgwzd1/YmMqPC.RiGjaTX.9Uyf.IUAtK3vuR904nNqIyMB71aXQnK','01011111111','T','L'),(47,_binary '','','ssafy@gmail.com12','string12','IT 선생님','2023-08-17 23:03:20.211199','김영한','$2a$10$gtLta37sJqgys9tSIsJSm.FCDR6CEB.MfI.2/rDOirugb3HD4UP9.','01011111111','T','L'),(48,_binary '','','string14@naver.com1','string14','주식 선생님','2023-08-17 23:21:22.666414','한국CFO스쿨','$2a$10$c6iKuBU3l7gsZCqGEB1zou.jYip/Auih4oq0DK5j9hlxKpLRdeE02','01054878794','T','L'),(49,_binary '','','string15@naver.com1','string15','자기개발 선생님','2023-08-17 23:23:39.171125','백기선','$2a$10$dnk8jFmL3BzmNJVLxjcG5u2t6ZrKlAs5QPCUbxnnGDA04fMxKUEvm','01054878794','T','L');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `warning`
--

DROP TABLE IF EXISTS `warning`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warning` (
  `warning_no` bigint NOT NULL AUTO_INCREMENT,
  `warning_datetime` datetime(6) DEFAULT NULL,
  `lesson_no` bigint DEFAULT NULL,
  `lesson_round_no` bigint DEFAULT NULL,
  `user_no` bigint DEFAULT NULL,
  PRIMARY KEY (`warning_no`),
  KEY `FKdh1l2k3ru06e3qdu5ne7q6s48` (`lesson_no`),
  KEY `FKnosks7cw8nupxr01wng9bdet5` (`lesson_round_no`),
  KEY `FKgiscjjrbbxyouy4sdrdyinjd5` (`user_no`),
  CONSTRAINT `FKdh1l2k3ru06e3qdu5ne7q6s48` FOREIGN KEY (`lesson_no`) REFERENCES `lesson` (`lesson_no`),
  CONSTRAINT `FKgiscjjrbbxyouy4sdrdyinjd5` FOREIGN KEY (`user_no`) REFERENCES `user` (`user_no`),
  CONSTRAINT `FKnosks7cw8nupxr01wng9bdet5` FOREIGN KEY (`lesson_round_no`) REFERENCES `lesson_round` (`lesson_round_no`)
) ENGINE=InnoDB AUTO_INCREMENT=535 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `warning`
--

LOCK TABLES `warning` WRITE;
/*!40000 ALTER TABLE `warning` DISABLE KEYS */;
INSERT INTO `warning` VALUES (1,'2023-08-14 19:41:10.221516',1,1,4),(2,'2023-08-14 21:03:33.425396',1,7,4),(3,'2023-08-14 21:03:47.206251',1,7,4),(4,'2023-08-14 21:09:40.480163',1,3,4),(5,'2023-08-14 21:10:23.278492',1,3,4),(6,'2023-08-14 21:12:06.621519',1,3,4),(7,'2023-08-14 21:13:24.366363',1,3,4),(8,'2023-08-14 21:13:59.504495',1,3,4),(9,'2023-08-14 21:29:48.052646',1,3,4),(10,'2023-08-14 21:30:18.340737',1,3,4),(11,'2023-08-14 22:20:41.594222',1,3,4),(12,'2023-08-14 22:21:04.711541',1,3,4),(13,'2023-08-14 22:21:06.443938',1,3,4),(14,'2023-08-14 22:21:08.897486',1,3,4),(15,'2023-08-14 22:22:07.926410',1,3,4),(16,'2023-08-14 22:24:20.821233',1,3,4),(17,'2023-08-14 22:24:45.264540',1,3,4),(18,'2023-08-14 22:25:55.924409',1,3,4),(19,'2023-08-14 22:38:21.655888',1,3,4),(20,'2023-08-14 22:57:28.384805',1,3,4),(21,'2023-08-14 22:58:43.939752',1,3,4),(22,'2023-08-14 22:58:48.264157',1,3,4),(23,'2023-08-14 22:58:48.966441',1,3,4),(24,'2023-08-14 22:58:49.264422',1,3,4),(25,'2023-08-14 22:58:49.391299',1,3,4),(26,'2023-08-14 22:58:49.544760',1,3,4),(27,'2023-08-14 22:58:49.970363',1,3,4),(28,'2023-08-14 22:58:50.127000',1,3,4),(29,'2023-08-14 23:00:00.208285',1,3,4),(30,'2023-08-14 23:00:01.746326',1,3,4),(31,'2023-08-14 23:07:47.451047',1,3,4),(32,'2023-08-14 23:08:01.949740',1,3,4),(33,'2023-08-14 23:08:04.280607',1,3,4),(34,'2023-08-14 23:08:04.929171',1,3,4),(35,'2023-08-14 23:08:05.535586',1,3,4),(36,'2023-08-14 23:14:17.657932',1,3,4),(37,'2023-08-14 23:15:33.213717',1,3,4),(38,'2023-08-14 23:15:35.076250',1,3,4),(39,'2023-08-14 23:15:35.870510',1,3,4),(40,'2023-08-14 23:15:36.185992',1,3,4),(41,'2023-08-14 23:15:36.415091',1,3,4),(42,'2023-08-14 23:15:36.747590',1,3,4),(43,'2023-08-14 23:15:36.798698',1,3,4),(44,'2023-08-14 23:15:37.002558',1,3,4),(45,'2023-08-14 23:15:37.188581',1,3,4),(46,'2023-08-14 23:15:37.365635',1,3,4),(47,'2023-08-14 23:15:37.550245',1,3,4),(48,'2023-08-14 23:15:37.782334',1,3,4),(49,'2023-08-14 23:15:37.879546',1,3,4),(50,'2023-08-14 23:15:38.107618',1,3,4),(51,'2023-08-14 23:15:38.164786',1,3,4),(52,'2023-08-14 23:15:38.390252',1,3,4),(53,'2023-08-14 23:15:38.510631',1,3,4),(54,'2023-08-14 23:15:38.780532',1,3,4),(55,'2023-08-14 23:15:38.837571',1,3,4),(56,'2023-08-14 23:15:39.003929',1,3,4),(57,'2023-08-14 23:15:39.194595',1,3,4),(58,'2023-08-14 23:15:39.444776',1,3,4),(59,'2023-08-14 23:15:39.542675',1,3,4),(60,'2023-08-14 23:15:39.719434',1,3,4),(61,'2023-08-14 23:15:39.877806',1,3,4),(62,'2023-08-14 23:15:40.049200',1,3,4),(63,'2023-08-14 23:15:40.236216',1,3,4),(64,'2023-08-14 23:15:40.420467',1,3,4),(65,'2023-08-14 23:15:40.597780',1,3,4),(66,'2023-08-14 23:15:40.790622',1,3,4),(67,'2023-08-14 23:21:15.057726',1,3,4),(68,'2023-08-15 17:09:44.049012',1,4,4),(69,'2023-08-15 17:11:10.446363',1,4,4),(70,'2023-08-15 17:11:33.899400',1,4,4),(71,'2023-08-15 17:12:22.676392',1,4,4),(72,'2023-08-15 17:13:46.797631',1,4,4),(73,'2023-08-15 17:43:39.522423',1,4,4),(74,'2023-08-15 17:43:39.631303',1,4,4),(75,'2023-08-15 17:43:39.769651',1,4,4),(76,'2023-08-15 17:43:39.906207',1,4,4),(77,'2023-08-15 17:43:40.073379',1,4,4),(78,'2023-08-15 17:43:40.172399',1,4,4),(79,'2023-08-15 17:43:40.313596',1,4,4),(80,'2023-08-15 17:43:40.458205',1,4,4),(81,'2023-08-15 17:43:40.596934',1,4,4),(82,'2023-08-15 17:43:40.745904',1,4,4),(83,'2023-08-15 17:43:40.901442',1,4,4),(84,'2023-08-15 17:43:41.071238',1,4,4),(85,'2023-08-15 17:43:41.237186',1,4,4),(86,'2023-08-15 17:43:41.406511',1,4,4),(87,'2023-08-15 17:43:41.589983',1,4,4),(88,'2023-08-15 17:43:41.763577',1,4,4),(89,'2023-08-15 17:43:41.930891',1,4,4),(90,'2023-08-15 17:43:42.086900',1,4,4),(91,'2023-08-15 17:43:42.253384',1,4,4),(92,'2023-08-15 17:43:42.637472',1,4,4),(93,'2023-08-15 17:43:43.212404',1,4,4),(94,'2023-08-16 10:38:30.053466',1,5,4),(95,'2023-08-16 10:38:39.191946',1,5,4),(96,'2023-08-16 10:38:46.843195',1,5,4),(97,'2023-08-16 10:40:08.626733',1,5,4),(98,'2023-08-16 10:49:23.493521',1,5,4),(99,'2023-08-16 10:49:44.519733',1,5,4),(100,'2023-08-16 10:50:05.844515',1,5,4),(101,'2023-08-16 10:50:10.718375',1,5,4),(102,'2023-08-16 10:50:18.404785',1,5,4),(103,'2023-08-16 10:52:21.017236',1,5,4),(104,'2023-08-16 10:52:28.705048',1,5,4),(105,'2023-08-16 10:52:33.332740',1,5,4),(106,'2023-08-16 10:52:34.845119',1,5,4),(107,'2023-08-16 10:52:44.277189',1,5,4),(108,'2023-08-16 10:52:52.281997',1,5,4),(109,'2023-08-16 10:53:19.523979',1,5,4),(110,'2023-08-16 10:53:25.909375',1,5,4),(111,'2023-08-16 11:18:46.220462',1,5,4),(112,'2023-08-16 11:18:59.316573',1,5,4),(113,'2023-08-16 11:19:05.027704',1,5,4),(114,'2023-08-16 11:19:06.736962',1,5,4),(115,'2023-08-16 13:11:56.703535',1,5,6),(116,'2023-08-16 13:17:44.957569',44,183,7),(117,'2023-08-16 13:18:05.702341',44,183,8),(118,'2023-08-16 13:18:05.703823',44,183,7),(119,'2023-08-16 13:18:22.294548',44,183,8),(120,'2023-08-16 13:18:22.298089',44,183,7),(121,'2023-08-16 13:18:22.336404',44,183,4),(122,'2023-08-16 13:18:40.063789',44,183,8),(123,'2023-08-16 13:18:40.065189',44,183,7),(124,'2023-08-16 13:18:40.104399',44,183,6),(125,'2023-08-16 13:18:40.109521',44,183,4),(126,'2023-08-16 13:19:16.636111',44,183,7),(127,'2023-08-16 13:19:16.644866',44,183,6),(128,'2023-08-16 13:19:16.651963',44,183,8),(129,'2023-08-16 13:19:16.655361',44,183,4),(130,'2023-08-16 13:19:21.577815',44,183,6),(131,'2023-08-16 13:19:21.582259',44,183,7),(132,'2023-08-16 13:19:21.582593',44,183,8),(133,'2023-08-16 13:19:21.584674',44,183,4),(134,'2023-08-16 13:20:10.248101',44,183,4),(135,'2023-08-16 13:20:10.251023',44,183,7),(136,'2023-08-16 13:20:10.252654',44,183,8),(137,'2023-08-16 13:20:10.304440',44,183,6),(138,'2023-08-16 13:20:10.306049',44,183,5),(139,'2023-08-16 13:21:52.323875',44,183,8),(140,'2023-08-16 13:21:52.323810',44,183,7),(141,'2023-08-16 13:21:52.328089',44,183,6),(142,'2023-08-16 13:21:52.329033',44,183,4),(143,'2023-08-16 13:21:52.361137',44,183,5),(144,'2023-08-16 13:22:09.727634',44,183,5),(145,'2023-08-16 13:22:09.728929',44,183,8),(146,'2023-08-16 13:22:09.731299',44,183,4),(147,'2023-08-16 13:22:09.732047',44,183,7),(148,'2023-08-16 13:22:09.733253',44,183,6),(149,'2023-08-16 13:22:15.235822',44,183,4),(150,'2023-08-16 13:22:15.239178',44,183,8),(151,'2023-08-16 13:22:15.243059',44,183,7),(152,'2023-08-16 13:22:15.243530',44,183,5),(153,'2023-08-16 13:22:15.245886',44,183,6),(154,'2023-08-16 13:22:15.372376',44,183,5),(155,'2023-08-16 13:22:15.377706',44,183,4),(156,'2023-08-16 13:22:15.384180',44,183,6),(157,'2023-08-16 13:22:15.387734',44,183,7),(158,'2023-08-16 13:22:15.425390',44,183,8),(159,'2023-08-16 13:22:33.792360',44,183,4),(160,'2023-08-16 13:22:33.792972',44,183,6),(161,'2023-08-16 13:22:33.793212',44,183,7),(162,'2023-08-16 13:22:33.795871',44,183,8),(163,'2023-08-16 13:22:33.797851',44,183,5),(164,'2023-08-16 13:23:06.819227',44,183,7),(165,'2023-08-16 13:23:06.819341',44,183,8),(166,'2023-08-16 13:23:06.819980',44,183,4),(167,'2023-08-16 13:23:06.821733',44,183,6),(168,'2023-08-16 13:23:06.872117',44,183,5),(169,'2023-08-16 13:27:04.141045',44,183,4),(170,'2023-08-16 13:27:04.142360',44,183,8),(171,'2023-08-16 13:27:04.143822',44,183,7),(172,'2023-08-16 13:27:04.145095',44,183,5),(173,'2023-08-16 13:27:04.148189',44,183,6),(174,'2023-08-16 13:27:09.631244',44,183,4),(175,'2023-08-16 13:27:09.631440',44,183,6),(176,'2023-08-16 13:27:09.632433',44,183,8),(177,'2023-08-16 13:27:09.634310',44,183,7),(178,'2023-08-16 13:27:09.668140',44,183,5),(179,'2023-08-16 13:27:09.725879',44,183,7),(180,'2023-08-16 13:27:09.745609',44,183,4),(181,'2023-08-16 13:27:09.749077',44,183,8),(182,'2023-08-16 13:27:09.750168',44,183,5),(183,'2023-08-16 13:27:09.756232',44,183,6),(184,'2023-08-16 13:27:19.968385',44,183,7),(185,'2023-08-16 13:27:19.979499',44,183,6),(186,'2023-08-16 13:27:19.982700',44,183,8),(187,'2023-08-16 13:27:19.982698',44,183,5),(188,'2023-08-16 13:27:19.985676',44,183,4),(189,'2023-08-16 13:27:23.539483',44,183,7),(190,'2023-08-16 13:27:23.540895',44,183,4),(191,'2023-08-16 13:27:23.543629',44,183,5),(192,'2023-08-16 13:27:23.543714',44,183,6),(193,'2023-08-16 13:27:23.544320',44,183,8),(194,'2023-08-16 13:27:31.958469',44,183,8),(195,'2023-08-16 13:27:31.960981',44,183,5),(196,'2023-08-16 13:27:31.961365',44,183,4),(197,'2023-08-16 13:27:31.963164',44,183,6),(198,'2023-08-16 13:27:31.966458',44,183,7),(199,'2023-08-16 13:27:32.139564',44,183,7),(200,'2023-08-16 13:27:32.139943',44,183,6),(201,'2023-08-16 13:27:32.143472',44,183,5),(202,'2023-08-16 13:27:32.144981',44,183,4),(203,'2023-08-16 13:27:32.154614',44,183,8),(204,'2023-08-16 13:27:37.550822',44,183,7),(205,'2023-08-16 13:27:37.551119',44,183,5),(206,'2023-08-16 13:27:37.551469',44,183,6),(207,'2023-08-16 13:27:37.554060',44,183,8),(208,'2023-08-16 13:27:37.559589',44,183,4),(209,'2023-08-16 13:27:40.039146',44,183,8),(210,'2023-08-16 13:27:40.038347',44,183,4),(211,'2023-08-16 13:27:40.040334',44,183,7),(212,'2023-08-16 13:27:40.040654',44,183,5),(213,'2023-08-16 13:27:40.055476',44,183,6),(214,'2023-08-16 13:27:42.935553',44,183,5),(215,'2023-08-16 13:27:42.935553',44,183,6),(216,'2023-08-16 13:27:42.936000',44,183,7),(217,'2023-08-16 13:27:42.936259',44,183,8),(218,'2023-08-16 13:27:42.936788',44,183,4),(219,'2023-08-16 13:27:58.288123',44,183,7),(220,'2023-08-16 13:27:58.291651',44,183,5),(221,'2023-08-16 13:27:58.295018',44,183,8),(222,'2023-08-16 13:27:58.298869',44,183,4),(223,'2023-08-16 13:27:58.299373',44,183,6),(224,'2023-08-16 13:27:58.430751',44,183,6),(225,'2023-08-16 13:27:58.431722',44,183,8),(226,'2023-08-16 13:27:58.433988',44,183,4),(227,'2023-08-16 13:27:58.438587',44,183,7),(228,'2023-08-16 13:27:58.439038',44,183,5),(229,'2023-08-16 13:28:22.995955',44,183,6),(230,'2023-08-16 13:28:22.997066',44,183,8),(231,'2023-08-16 13:28:22.997552',44,183,7),(232,'2023-08-16 13:28:23.006550',44,183,4),(233,'2023-08-16 13:28:23.049625',44,183,5),(234,'2023-08-16 13:29:50.517963',44,183,7),(235,'2023-08-16 13:29:50.536367',44,183,8),(236,'2023-08-16 13:29:50.536566',44,183,4),(237,'2023-08-16 13:29:50.537562',44,183,5),(238,'2023-08-16 13:29:50.541948',44,183,6),(239,'2023-08-16 13:30:09.939905',44,183,6),(240,'2023-08-16 13:30:09.942351',44,183,8),(241,'2023-08-16 13:30:09.942610',44,183,7),(242,'2023-08-16 13:30:09.943792',44,183,5),(243,'2023-08-16 13:30:09.945086',44,183,4),(244,'2023-08-16 13:30:11.781600',44,183,4),(245,'2023-08-16 13:30:11.781686',44,183,6),(246,'2023-08-16 13:30:11.783044',44,183,7),(247,'2023-08-16 13:30:11.783051',44,183,8),(248,'2023-08-16 13:30:11.785879',44,183,5),(249,'2023-08-16 13:30:52.887636',44,183,7),(250,'2023-08-16 13:30:52.887635',44,183,6),(251,'2023-08-16 13:30:52.890048',44,183,8),(252,'2023-08-16 13:30:52.890232',44,183,4),(253,'2023-08-16 13:30:52.923843',44,183,5),(254,'2023-08-16 13:30:56.089009',44,183,7),(255,'2023-08-16 13:30:56.091807',44,183,5),(256,'2023-08-16 13:30:56.092256',44,183,6),(257,'2023-08-16 13:30:56.092331',44,183,4),(258,'2023-08-16 13:30:56.093575',44,183,8),(259,'2023-08-16 13:34:42.751166',1,5,6),(260,'2023-08-16 13:35:10.639873',1,5,6),(261,'2023-08-16 13:35:23.549427',1,5,6),(262,'2023-08-16 13:35:28.731418',1,5,6),(263,'2023-08-16 13:36:07.886270',1,5,6),(264,'2023-08-16 13:36:47.214210',1,5,6),(265,'2023-08-16 13:36:47.246017',1,5,6),(266,'2023-08-16 13:36:47.277175',1,5,6),(267,'2023-08-16 13:36:47.277331',1,5,6),(268,'2023-08-16 13:36:47.286208',1,5,6),(269,'2023-08-16 13:39:10.072872',1,5,4),(270,'2023-08-16 13:39:15.367682',1,5,4),(271,'2023-08-16 13:39:15.889074',1,5,4),(272,'2023-08-16 13:39:17.008463',1,5,4),(273,'2023-08-16 13:39:17.440654',1,5,4),(274,'2023-08-16 13:39:17.607100',1,5,4),(275,'2023-08-16 13:39:17.759036',1,5,4),(276,'2023-08-16 13:39:17.905083',1,5,4),(277,'2023-08-16 13:39:18.062633',1,5,4),(278,'2023-08-16 13:39:18.150439',1,5,4),(279,'2023-08-16 13:39:18.270223',1,5,4),(280,'2023-08-16 13:52:24.531765',1,5,5),(281,'2023-08-16 13:52:27.920664',1,5,5),(282,'2023-08-16 13:52:30.442060',1,5,5),(283,'2023-08-16 13:52:30.769625',1,5,5),(284,'2023-08-16 13:52:30.954284',1,5,5),(285,'2023-08-16 13:52:32.369622',1,5,5),(286,'2023-08-16 13:52:32.545873',1,5,5),(287,'2023-08-16 13:52:32.706448',1,5,5),(288,'2023-08-16 13:52:32.873184',1,5,5),(289,'2023-08-16 13:54:48.213677',1,5,5),(290,'2023-08-16 13:54:48.412303',1,5,5),(291,'2023-08-16 13:54:50.965190',1,5,5),(292,'2023-08-16 13:58:52.268008',1,7,4),(293,'2023-08-16 13:59:42.354335',1,7,4),(294,'2023-08-16 14:08:41.515269',1,6,4),(295,'2023-08-16 14:10:27.275673',1,6,4),(296,'2023-08-16 14:11:37.434703',1,6,4),(297,'2023-08-16 14:38:53.631795',1,5,4),(298,'2023-08-16 20:28:17.891998',1,5,4),(299,'2023-08-16 20:28:18.270173',1,5,4),(300,'2023-08-16 21:07:56.460046',1,5,4),(301,'2023-08-16 21:07:57.098133',1,5,4),(302,'2023-08-16 21:23:12.412703',1,5,4),(303,'2023-08-16 21:25:59.626969',1,5,5),(304,'2023-08-16 21:26:04.967731',1,5,5),(305,'2023-08-16 21:26:06.653694',1,5,4),(306,'2023-08-16 21:26:10.146794',1,5,5),(307,'2023-08-16 21:26:28.614181',1,5,5),(308,'2023-08-16 21:26:29.286852',1,5,5),(309,'2023-08-16 22:03:17.697059',1,5,4),(310,'2023-08-16 22:07:05.519460',1,5,4),(311,'2023-08-16 22:08:14.813299',1,5,6),(312,'2023-08-16 23:33:27.802986',1,5,4),(313,'2023-08-16 23:33:28.324413',1,5,4),(314,'2023-08-16 23:34:25.623696',1,5,4),(315,'2023-08-16 23:34:31.083757',1,5,4),(316,'2023-08-16 23:35:07.874661',1,5,6),(317,'2023-08-17 01:10:31.141326',1,6,4),(318,'2023-08-17 01:10:36.543268',1,6,4),(319,'2023-08-17 01:10:36.633945',1,6,4),(320,'2023-08-17 01:10:36.807151',1,6,4),(321,'2023-08-17 01:10:36.871073',1,6,4),(322,'2023-08-17 01:10:37.068169',1,6,4),(323,'2023-08-17 01:10:37.069118',1,6,4),(324,'2023-08-17 01:10:37.071436',1,6,4),(325,'2023-08-17 01:10:37.419864',1,6,4),(326,'2023-08-17 01:10:37.778441',1,6,4),(327,'2023-08-17 01:10:37.865657',1,6,4),(328,'2023-08-17 01:10:37.893404',1,6,4),(329,'2023-08-17 01:10:37.973278',1,6,4),(330,'2023-08-17 01:10:38.044240',1,6,4),(331,'2023-08-17 01:10:38.115654',1,6,4),(332,'2023-08-17 01:10:38.186768',1,6,4),(333,'2023-08-17 01:10:38.324890',1,6,4),(334,'2023-08-17 01:10:38.481890',1,6,4),(335,'2023-08-17 01:10:38.948107',1,6,4),(336,'2023-08-17 01:10:39.124082',1,6,4),(337,'2023-08-17 01:10:39.222427',1,6,4),(338,'2023-08-17 01:10:39.366451',1,6,4),(339,'2023-08-17 01:10:39.481591',1,6,4),(340,'2023-08-17 01:10:39.632716',1,6,4),(341,'2023-08-17 01:10:39.683149',1,6,4),(342,'2023-08-17 01:10:51.417282',1,6,4),(343,'2023-08-17 01:10:52.410696',1,6,4),(344,'2023-08-17 01:10:53.195595',1,6,4),(345,'2023-08-17 01:10:53.501375',1,6,4),(346,'2023-08-17 01:10:53.876172',1,6,4),(347,'2023-08-17 01:10:54.172138',1,6,4),(348,'2023-08-17 01:10:54.360783',1,6,4),(349,'2023-08-17 02:10:54.357899',1,6,4),(350,'2023-08-17 02:10:54.417531',1,6,4),(351,'2023-08-17 14:27:33.941454',1,6,6),(352,'2023-08-17 14:43:17.557568',1,6,6),(353,'2023-08-17 14:43:17.615305',1,6,6),(354,'2023-08-17 14:43:24.062137',1,6,6),(355,'2023-08-17 14:43:24.110605',1,6,6),(356,'2023-08-17 14:43:27.761511',1,6,6),(357,'2023-08-17 14:43:27.807334',1,6,6),(358,'2023-08-17 14:43:31.172735',1,6,6),(359,'2023-08-17 14:43:31.225837',1,6,6),(360,'2023-08-17 14:57:28.744748',1,6,4),(361,'2023-08-17 14:57:28.786368',1,6,4),(362,'2023-08-17 15:00:04.538212',44,184,7),(363,'2023-08-17 15:00:04.577978',44,184,7),(364,'2023-08-17 15:00:14.375573',44,184,6),(365,'2023-08-17 15:00:14.442113',44,184,6),(366,'2023-08-17 15:00:22.583631',44,184,6),(367,'2023-08-17 15:00:22.629505',44,184,6),(368,'2023-08-17 15:03:26.571068',44,184,7),(369,'2023-08-17 15:03:26.617681',44,184,7),(370,'2023-08-17 15:04:15.408685',44,184,6),(371,'2023-08-17 15:04:15.455563',44,184,6),(372,'2023-08-17 15:04:19.147547',44,184,6),(373,'2023-08-17 15:04:19.188053',44,184,6),(374,'2023-08-17 15:04:25.463429',44,184,4),(375,'2023-08-17 15:04:25.509144',44,184,4),(376,'2023-08-17 15:06:14.645613',44,184,8),(377,'2023-08-17 15:37:16.248152',1,6,4),(378,'2023-08-17 15:37:16.300247',1,6,4),(379,'2023-08-17 15:56:50.656899',1,6,4),(380,'2023-08-17 15:56:50.713288',1,6,4),(381,'2023-08-17 15:57:08.376907',1,6,4),(382,'2023-08-17 15:57:08.416708',1,6,4),(383,'2023-08-17 16:34:04.406320',1,6,4),(384,'2023-08-17 16:34:04.449001',1,6,4),(385,'2023-08-17 16:34:07.315178',1,6,4),(386,'2023-08-17 16:34:07.348895',1,6,4),(387,'2023-08-17 16:34:08.337118',1,6,4),(388,'2023-08-17 16:34:08.371331',1,6,4),(389,'2023-08-17 16:34:08.560483',1,6,4),(390,'2023-08-17 16:34:08.592894',1,6,4),(391,'2023-08-17 16:34:08.786137',1,6,4),(392,'2023-08-17 16:34:08.817810',1,6,4),(393,'2023-08-17 16:34:08.977202',1,6,4),(394,'2023-08-17 16:34:09.010085',1,6,4),(395,'2023-08-17 16:34:09.169971',1,6,4),(396,'2023-08-17 16:34:09.203938',1,6,4),(397,'2023-08-17 16:34:09.353109',1,6,4),(398,'2023-08-17 16:34:09.392694',1,6,4),(399,'2023-08-17 16:34:09.539234',1,6,4),(400,'2023-08-17 16:34:09.573382',1,6,4),(401,'2023-08-17 16:34:09.713875',1,6,4),(402,'2023-08-17 16:34:09.749533',1,6,4),(403,'2023-08-17 16:34:09.889547',1,6,4),(404,'2023-08-17 16:34:09.921043',1,6,4),(405,'2023-08-17 16:34:10.097403',1,6,4),(406,'2023-08-17 16:34:10.131714',1,6,4),(407,'2023-08-17 16:34:10.279919',1,6,4),(408,'2023-08-17 16:34:10.313843',1,6,4),(409,'2023-08-17 16:34:10.466043',1,6,4),(410,'2023-08-17 16:34:10.497759',1,6,4),(411,'2023-08-17 16:34:10.656945',1,6,4),(412,'2023-08-17 16:34:10.688955',1,6,4),(413,'2023-08-17 16:34:10.840869',1,6,4),(414,'2023-08-17 16:34:10.876625',1,6,4),(415,'2023-08-17 16:34:11.024997',1,6,4),(416,'2023-08-17 16:34:11.058799',1,6,4),(417,'2023-08-17 16:34:11.249151',1,6,4),(418,'2023-08-17 16:34:11.281190',1,6,4),(419,'2023-08-17 16:34:11.440223',1,6,4),(420,'2023-08-17 16:34:11.474454',1,6,4),(421,'2023-08-17 16:34:11.602286',1,6,4),(422,'2023-08-17 16:34:11.634962',1,6,4),(423,'2023-08-17 16:34:11.769113',1,6,4),(424,'2023-08-17 16:34:11.800980',1,6,4),(425,'2023-08-17 16:34:11.953324',1,6,4),(426,'2023-08-17 16:34:11.984767',1,6,4),(427,'2023-08-17 16:34:12.153937',1,6,4),(428,'2023-08-17 16:34:12.185493',1,6,4),(429,'2023-08-17 16:34:12.344196',1,6,4),(430,'2023-08-17 16:34:12.376862',1,6,4),(431,'2023-08-17 16:34:12.520795',1,6,4),(432,'2023-08-17 16:34:12.552856',1,6,4),(433,'2023-08-17 16:34:12.680093',1,6,4),(434,'2023-08-17 16:34:12.713411',1,6,4),(435,'2023-08-17 16:34:12.936821',1,6,4),(436,'2023-08-17 16:34:12.969993',1,6,4),(437,'2023-08-17 16:34:13.104729',1,6,4),(438,'2023-08-17 16:34:13.137982',1,6,4),(439,'2023-08-17 16:34:13.266038',1,6,4),(440,'2023-08-17 16:34:13.300453',1,6,4),(441,'2023-08-17 16:34:13.433526',1,6,4),(442,'2023-08-17 16:34:13.468108',1,6,4),(443,'2023-08-17 16:34:13.593640',1,6,4),(444,'2023-08-17 16:34:13.626885',1,6,4),(445,'2023-08-17 16:34:13.767941',1,6,4),(446,'2023-08-17 16:34:13.798799',1,6,4),(447,'2023-08-17 16:34:13.945925',1,6,4),(448,'2023-08-17 16:34:13.979408',1,6,4),(449,'2023-08-17 16:34:14.105254',1,6,4),(450,'2023-08-17 16:34:14.136163',1,6,4),(451,'2023-08-17 16:34:15.998806',1,6,4),(452,'2023-08-17 16:34:16.028939',1,6,4),(453,'2023-08-17 16:34:16.181835',1,6,4),(454,'2023-08-17 16:34:16.213677',1,6,4),(455,'2023-08-17 16:34:16.343180',1,6,4),(456,'2023-08-17 16:34:16.373999',1,6,4),(457,'2023-08-17 16:34:16.504572',1,6,4),(458,'2023-08-17 16:34:16.536338',1,6,4),(459,'2023-08-17 16:34:16.664882',1,6,4),(460,'2023-08-17 16:34:16.697822',1,6,4),(461,'2023-08-17 16:34:16.815966',1,6,4),(462,'2023-08-17 16:34:16.847211',1,6,4),(463,'2023-08-17 16:34:16.986596',1,6,4),(464,'2023-08-17 16:34:17.016338',1,6,4),(465,'2023-08-17 16:34:17.120270',1,6,4),(466,'2023-08-17 16:34:17.151790',1,6,4),(467,'2023-08-17 16:34:17.288806',1,6,4),(468,'2023-08-17 16:34:17.321520',1,6,4),(469,'2023-08-17 16:34:17.432662',1,6,4),(470,'2023-08-17 16:34:17.464397',1,6,4),(471,'2023-08-17 16:34:17.584836',1,6,4),(472,'2023-08-17 16:34:17.618723',1,6,4),(473,'2023-08-17 16:34:17.729050',1,6,4),(474,'2023-08-17 16:34:17.760120',1,6,4),(475,'2023-08-17 16:34:17.880176',1,6,4),(476,'2023-08-17 16:34:17.910998',1,6,4),(477,'2023-08-17 16:34:18.008183',1,6,4),(478,'2023-08-17 16:34:18.038079',1,6,4),(479,'2023-08-17 16:35:01.750323',1,6,5),(480,'2023-08-17 16:35:06.471989',1,6,4),(481,'2023-08-17 16:35:06.502539',1,6,4),(482,'2023-08-17 16:35:06.655647',1,6,4),(483,'2023-08-17 16:35:06.737814',1,6,4),(484,'2023-08-17 16:35:06.966217',1,6,4),(485,'2023-08-17 16:35:06.999111',1,6,4),(486,'2023-08-17 16:35:07.176355',1,6,4),(487,'2023-08-17 16:35:07.212184',1,6,4),(488,'2023-08-17 16:35:07.343399',1,6,4),(489,'2023-08-17 16:35:07.380312',1,6,4),(490,'2023-08-17 16:35:07.501998',1,6,4),(491,'2023-08-17 16:35:07.537817',1,6,4),(492,'2023-08-17 16:35:07.656187',1,6,4),(493,'2023-08-17 16:35:07.692667',1,6,4),(494,'2023-08-17 16:35:07.807914',1,6,4),(495,'2023-08-17 16:35:07.840649',1,6,4),(496,'2023-08-17 16:35:07.966528',1,6,4),(497,'2023-08-17 16:35:08.000884',1,6,4),(498,'2023-08-17 16:35:08.134559',1,6,4),(499,'2023-08-17 16:35:08.166383',1,6,4),(500,'2023-08-17 16:35:08.294293',1,6,4),(501,'2023-08-17 16:35:08.324896',1,6,4),(502,'2023-08-17 16:35:08.464202',1,6,4),(503,'2023-08-17 16:35:08.497411',1,6,4),(504,'2023-08-17 16:35:08.599015',1,6,4),(505,'2023-08-17 16:35:08.635652',1,6,4),(506,'2023-08-17 16:40:36.030265',1,6,5),(507,'2023-08-17 16:40:36.063888',1,6,5),(508,'2023-08-17 16:40:36.386209',1,6,5),(509,'2023-08-17 16:40:36.420540',1,6,5),(510,'2023-08-17 16:40:38.385058',1,6,4),(511,'2023-08-17 16:40:38.419385',1,6,4),(512,'2023-08-17 21:56:09.190222',1,6,4),(513,'2023-08-17 21:56:09.239106',1,6,4),(514,'2023-08-17 22:00:23.924348',1,6,4),(515,'2023-08-17 22:00:23.976948',1,6,4),(516,'2023-08-17 22:00:32.892547',1,6,4),(517,'2023-08-17 22:00:32.979072',1,6,4),(518,'2023-08-17 22:00:47.858705',1,6,4),(519,'2023-08-17 22:00:47.904504',1,6,4),(520,'2023-08-17 22:01:02.464483',1,6,4),(521,'2023-08-17 22:01:02.520050',1,6,4),(522,'2023-08-17 22:01:12.805113',1,6,4),(523,'2023-08-17 22:01:12.890299',1,6,4),(524,'2023-08-17 23:25:26.527032',1,6,5),(525,'2023-08-17 23:25:26.571265',1,6,5),(526,'2023-08-18 02:12:10.719416',1,3,4),(527,'2023-08-18 02:15:03.299272',1,7,4),(528,'2023-08-18 03:05:00.127666',1,3,4),(529,'2023-08-18 03:32:13.704414',1,3,6),(530,'2023-08-18 03:34:50.170863',1,3,6),(531,'2023-08-18 03:42:26.628170',1,3,6),(532,'2023-08-18 03:47:34.582809',1,3,6),(533,'2023-08-18 03:53:49.985653',1,3,6),(534,'2023-08-18 05:12:02.384069',1,6,4);
/*!40000 ALTER TABLE `warning` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'learnershigh'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `daily_lesson_status_updater` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`kyu`@`%`*/ /*!50106 EVENT `daily_lesson_status_updater` ON SCHEDULE EVERY 1 DAY STARTS '2023-07-31 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT '매일 00:00:00에 강의 상태 업데이트' DO UPDATE lesson
SET lesson_status = 
    CASE 
        WHEN lesson_status = '강의 전' AND CURDATE() >= lesson_start_date  THEN '강의 중'
        WHEN lesson_status != '강의 완료' AND CURDATE() > lesson_end_date THEN '강의 완료'
        ELSE lesson_status  -- 다른 경우는 기존 상태 유지
    END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'learnershigh'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18  9:28:12
