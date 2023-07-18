-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2023 at 10:15 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `winway`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `durations` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `mentor_id` int(11) NOT NULL,
  `features` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `collectionName` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `language` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `name`, `description`, `durations`, `price`, `mentor_id`, `features`, `image`, `collectionName`, `content`, `language`, `level`) VALUES
(5, 'Backend', 'ghvndgckjnjfyrtfiyou[ifgmnnsgbhb', 566, 70, 3, 'dcdxcvxdcvxdcvdxvc', '1689293207116.png', 'Marketing', '', '', ''),
(6, 'Backend', 'ghvndgckjnjfyrtfiyou[ifgmnnsgbhb', 566, 70, 3, 'dcdxcvxdcvxdcvdxvc', '1689489602286.png', 'Marketing', '', '', ''),
(7, 'UI-UX', 'ghvndgckjnjfyrtfiyou[ifgmnnsgbhb', 566, 70, 3, 'dcdxcvxdcvxdcvdxvc', '1689613220713.png', 'Marketing', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `mentor_id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `correct_answer` varchar(255) NOT NULL,
  `incorrect_answers` varchar(255) NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `body` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `courseId`, `studentId`, `body`, `rating`) VALUES
(1, 5, 1, 'hdfbcbcb', 4),
(2, 5, 1, 'hdfbcbcb', 4);

-- --------------------------------------------------------

--
-- Table structure for table `student_courses`
--

CREATE TABLE `student_courses` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `videos_watched` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `country` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `country`, `gender`, `birthday`, `image`) VALUES
(1, 'ali', 'ahmed', 'hmd@yahoo.com', '$2b$10$BNFOlt7R9Qy3g5qW072dpePXpi/UwKLDwPMsJekmw5WLlS5aNlcQG', 0, '', '', '0000-00-00', ''),
(2, 'ali', 'ahmed', 'hmd2@yahoo.com', '$2b$10$Agm9wEsdc7phTYGHdQYcge1Me0olrbCZfCjjCmcPsM27TZm/33yQS', 0, '', '', '0000-00-00', '');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `course_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `time_of_video` int(11) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `time_of_upload` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `course_id`, `name`, `image`, `time_of_video`, `fileName`, `time_of_upload`) VALUES
(1, 5, 'gfcvcmn v', '1689293496412.png', 5, '1689293496412.png', '2023-07-16 09:40:56'),
(2, 5, 'gfcvcmn v', '1689293585306.png', 0, '1689293585307.png', '2023-07-16 09:40:56'),
(3, 5, 'gfcvcmn v', '1689293673291.png', 1433, '1689293673292.png', '2023-07-16 09:40:56'),
(4, 5, 'gfcvcmn v', '1689293799812.png', 1639, '1689293799812.png', '2023-07-16 09:40:56'),
(5, 6, 'intro', '1689491583608.png', 82251, '1689495771658.mp4', '2023-07-16 09:40:56'),
(6, 6, 'gfcvcmn v', '1689492926918.png', 73528, '1689492926919.mp4', '2023-07-16 09:40:56'),
(7, 6, 'gfcvcmn v', '1689512091732.png', 125452, '1689512091733.mp4', '2023-07-16 12:54:52'),
(8, 6, 'gfcvcmn v', '1689512216414.png', 125657, '1689512216416.mp4', '2023-07-16 12:56:57'),
(9, 6, 'gfcvcmn v', '1689513768455.png', 12, '1689513768456.mp4', '2023-07-16 13:22:49'),
(10, 6, 'gfcvcmn v', '1689513842667.png', 12, '1689513842667.mp4', '2023-07-16 13:24:03');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `coursesCon` (`courseId`),
  ADD KEY `studentsCon` (`studentId`);

--
-- Indexes for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses` (`course_id`),
  ADD KEY `students` (`student_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `videos_courses` (`course_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_courses`
--
ALTER TABLE `student_courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `coursesCon` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentsCon` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_courses`
--
ALTER TABLE `student_courses`
  ADD CONSTRAINT `courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `students` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
