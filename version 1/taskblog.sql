-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- 생성 시간: 24-06-10 14:15
-- 서버 버전: 10.4.32-MariaDB
-- PHP 버전: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `taskblog`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `diaries`
--

CREATE TABLE `diaries` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `weather` varchar(10) NOT NULL,
  `feedback` text NOT NULL,
  `emotion` varchar(10) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `diaries`
--

INSERT INTO `diaries` (`id`, `date`, `weather`, `feedback`, `emotion`, `created_at`, `user_id`) VALUES
(181, '2024-06-09', '비', '오늘의 하루는 참 맑아요!', '좋음', '2024-06-09 22:14:12', 1),
(182, '2024-06-09', '비', '오늘의 하루는 참 맑아요!', '좋음', '2024-06-09 22:14:35', 3),
(183, '2024-06-10', '흐림', '나 천지인 오늘은 쿼티를 배워보려고 한다.', '매우좋음', '2024-06-10 01:41:11', 6),
(184, '2024-06-09', '비', '오늘의 하루는 참 맑아요!', '좋음', '2024-06-09 20:41:33', 8);

-- --------------------------------------------------------

--
-- 테이블 구조 `study`
--

CREATE TABLE `study` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL,
  `minutes` int(11) NOT NULL,
  `seconds` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `study`
--

INSERT INTO `study` (`id`, `user_id`, `user_name`, `hours`, `minutes`, `seconds`, `created_at`, `date`) VALUES
(1, 1, '홍길동', 4, 10, 15, '2024-06-09 20:50:29', '2024-06-10'),
(2, 2, '김첨지', 0, 4, 27, '2024-06-09 20:50:29', NULL),
(3, 3, '후아유', 0, 50, 27, '2024-06-09 20:50:29', '2024-06-10'),
(8, 1, '홍길동', 2, 30, 15, '2024-06-10 00:33:37', '2024-06-01'),
(9, 2, '김첨지', 1, 45, 50, '2024-06-10 00:33:37', '2024-06-02'),
(10, 3, '후아유', 3, 20, 35, '2024-06-10 00:33:37', '2024-06-03'),
(11, 1, '홍길동', 4, 10, 5, '2024-06-10 00:33:37', '2024-06-04'),
(12, 3, '후아유', 0, 50, 25, '2024-06-10 00:33:37', '2024-06-05'),
(13, 6, '천지인', 1, 23, 18, '2024-06-10 00:33:37', '2024-06-07'),
(14, 2, '김첨지', 1, 30, 30, '2024-06-10 00:33:37', '2024-06-07'),
(15, 6, '천지인', 0, 35, 18, '2024-06-10 00:33:37', '2024-06-03'),
(16, 6, '천지인', 2, 15, 41, '2024-06-10 00:52:48', '2024-06-10'),
(17, 8, '', 0, 0, 12, '2024-06-09 20:39:23', '2024-06-09');

-- --------------------------------------------------------

--
-- 테이블 구조 `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `todo_text` varchar(255) NOT NULL,
  `completed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `todos`
--

INSERT INTO `todos` (`id`, `user_id`, `date`, `todo_text`, `completed`, `created_at`) VALUES
(86, 1, '2024-06-10', '출장', 1, '2024-06-09 20:54:03'),
(87, 1, '2024-06-12', '시험!', 1, '2024-06-09 20:54:08'),
(88, 1, '2024-06-10', '부산! 출장!', 1, '2024-06-09 21:08:50'),
(89, 1, '2024-06-10', '부산 출장 가요', 1, '2024-06-09 21:09:24'),
(91, 6, '2024-06-10', '오늘 해외 출장 가는 날', 0, '2024-06-09 21:27:10'),
(92, 6, '2024-06-10', '나 강산 가', 0, '2024-06-09 21:55:02'),
(93, 6, '2024-06-12', '오늘은 시험..', 0, '2024-06-09 21:57:19'),
(94, 3, '2024-06-10', '오늘 과제 끝내자.', 0, '2024-06-09 21:58:41'),
(95, 3, '2024-06-11', '기말시험..', 0, '2024-06-09 21:58:46'),
(96, 3, '2024-06-21', '종강이 다가온다!', 0, '2024-06-09 21:58:51'),
(97, 2, '2024-06-10', '설렁탕 사오기', 0, '2024-06-09 22:00:49'),
(98, 2, '2024-06-13', '불금 즐길 준비하기', 0, '2024-06-09 22:00:56'),
(99, 2, '2024-06-11', '일하러 가자..', 0, '2024-06-09 22:01:01'),
(100, 8, '2024-06-10', '할 일 1 - 월요일 첫째', 1, '2024-06-09 20:39:48'),
(101, 8, '2024-06-11', '할 일 1 - 월요일 거라고 첫번째', 1, '2024-06-09 20:40:04'),
(104, 8, '2024-06-14', '할 일 1 - 금요일', 1, '2024-06-10 07:48:55'),
(105, 8, '2024-06-10', '할 일 2 - 월요일 둘째', 1, '2024-06-10 10:15:53'),
(106, 8, '2024-06-10', '할 일 3 - 월요일 셋째', 0, '2024-06-10 10:45:58'),
(107, 8, '2024-06-15', '오늘 할거!', 0, '2024-06-10 11:10:16'),
(108, 8, '2024-06-13', '야호', 0, '2024-06-10 11:17:04'),
(109, 1, '2024-06-13', '이제 새로고침을 해볼까..', 0, '2024-06-10 11:21:21'),
(110, 1, '2024-06-11', '뭐!', 1, '2024-06-10 11:22:40'),
(111, 1, '2024-06-14', '이거 하느라고', 1, '2024-06-10 11:38:43');

-- --------------------------------------------------------

--
-- 테이블 구조 `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `regist_day` date DEFAULT NULL,
  `profile_picture` longtext DEFAULT 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMDlfMTQy%2FMDAxNjczMjcyMzM5NDc1.LP3PP6iznm9ouaShogNlQfdptnJIZDSz1CzuG_Xz5QEg.hG18t11MaUqpvB_ENad1dqreuEaZZO4yUeeHxQklAicg.JPEG.omytak%2FIMG_7643.JPG&type=a340',
  `inform` varchar(255) DEFAULT '자기소개를 작성해주세요.'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 테이블의 덤프 데이터 `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `password`, `regist_day`, `profile_picture`, `inform`) VALUES
(1, '홍길동', 'honggildong@gmail.com', 'asdf', '2024-06-09', 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.namu.wiki%2Fi%2FzkJqIWPidcqHAmOTLda13CnvLs8UZJGVx4C-Y2pa1jDdAx6GwX3t7buyuw-9vB3u7GN0tTIX2c8iXE7o_djj9w.webp&type=a340', '너네 축지법 쓸 줄 아냐?'),
(2, '김첨지', 'kimchum@naver.com', 'fdsa', '2024-06-09', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA1MDhfMTI4%2FMDAxNjgzNTM5NTU0Nzcw.GdL9PHfG7_AF_u1o_UHni5QGlvMLxc0ShWPKxCAj4aog.n77fOdPxvBGYKEJNt634W0GKtP1U4pWlareBxe8WoJIg.PNG.orangewolf563%2Fimage.png&type=a340', '설렁탕 사왔는데.. 왜 .. 먹지를.. 못하니..'),
(3, '후아유', 'whoareyou@daum.net', '1234', '2024-06-09', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAxOTAzMTZfNzgg%2FMDAxNTUyNzQ1NzM2NzIy.cQ-JQT4Rz-NLSJBJctZJmUs1iVLZJ-CkkdGVMVbCVQIg.lm0s65MZBaYgdoy2eqG4G8-mXvI21Z5scD3J4O7juF8g.JPEG.rightroute11%2F2.jpg&type=a340', '내가 누구겡'),
(6, '천지인', 'skyground@gmail.com', '4321', '2024-06-09', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzA2MThfMTc4%2FMDAxNjg3MDg5NjI2ODg3.z7LQjjNlKKDCJyDOl7Rr54wZiVmkoNVxDRx5cMILrSQg.tk2KkrwnVW9giMW1sBjF5kwzsWcLnwBFH3dy94ZgTfAg.JPEG.mps36162%2FScreenshot%25A3%25DF20230618%25A3%25AD205959%25A3%25DFNAVER.jpg&type=a340', '너네 천지인이라고 써봤닝!'),
(8, '가나다', 'ganada@gmail.com', '12321', '2024-06-09', 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMzAxMDlfMTQy%2FMDAxNjczMjcyMzM5NDc1.LP3PP6iznm9ouaShogNlQfdptnJIZDSz1CzuG_Xz5QEg.hG18t11MaUqpvB_ENad1dqreuEaZZO4yUeeHxQklAicg.JPEG.omytak%2FIMG_7643.JPG&type=a340', '자기소개를 작성해주세요.');

--
-- 덤프된 테이블의 인덱스
--

--
-- 테이블의 인덱스 `diaries`
--
ALTER TABLE `diaries`
  ADD PRIMARY KEY (`id`);

--
-- 테이블의 인덱스 `study`
--
ALTER TABLE `study`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- 테이블의 인덱스 `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- 테이블의 인덱스 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- 덤프된 테이블의 AUTO_INCREMENT
--

--
-- 테이블의 AUTO_INCREMENT `diaries`
--
ALTER TABLE `diaries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=185;

--
-- 테이블의 AUTO_INCREMENT `study`
--
ALTER TABLE `study`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- 테이블의 AUTO_INCREMENT `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- 테이블의 AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 덤프된 테이블의 제약사항
--

--
-- 테이블의 제약사항 `study`
--
ALTER TABLE `study`
  ADD CONSTRAINT `study_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- 테이블의 제약사항 `todos`
--
ALTER TABLE `todos`
  ADD CONSTRAINT `todos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
