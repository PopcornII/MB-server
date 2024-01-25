-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 18, 2024 at 05:02 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `product`
--

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `ItemID` int(11) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(10,2) NOT NULL,
  `ImageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`ItemID`, `ItemName`, `Description`, `Price`, `ImageURL`) VALUES
(1, 'Espresso', 'Strong coffee made by forcing hot water through finely-ground coffee beans.', 2.99, 'espresso.jpg'),
(2, 'Cappuccino', 'Espresso mixed with steamed milk and topped with frothy foam.', 3.99, 'cappuccino.jpg'),
(3, 'Latte', 'Espresso mixed with steamed milk.', 4.49, 'latte.jpg'),
(4, 'Muffin', 'Blueberry muffin with a soft, moist texture.', 2.49, 'muffin.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `orderitems`
--

CREATE TABLE `orderitems` (
  `OrderItemID` int(11) NOT NULL,
  `OrderID` int(11) DEFAULT NULL,
  `ItemID` int(11) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Subtotal` decimal(10,2) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderitems`
--

INSERT INTO `orderitems` (`OrderItemID`, `OrderID`, `ItemID`, `Quantity`, `Subtotal`, `user_id`) VALUES
(1, 1, 1, 2, 5.98, NULL),
(2, 1, 3, 1, 4.49, NULL),
(3, 2, 2, 1, 3.99, NULL),
(4, 2, 4, 2, 4.98, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `OrderDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `TotalAmount` decimal(10,2) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `CustomerName`, `OrderDate`, `TotalAmount`, `user_id`) VALUES
(1, 'John Doe', '2024-01-15 15:33:03', 8.98, NULL),
(2, 'Jane Smith', '2024-01-15 15:33:03', 7.48, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `profiles`
--

CREATE TABLE `profiles` (
  `profile_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `profiles`
--

INSERT INTO `profiles` (`profile_id`, `user_id`, `full_name`, `bio`, `avatar_url`) VALUES
(1, 1, 'Sok Rithy', 'admin1', 'admin.jpg'),
(2, 2, 'SoK Thida', 'client1', 'client.jpg'),
(3, 3, 'Sombath', 'admin2', 'cool-profile.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'client',
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'admin1', 'rithy@gmail.com', '$2b$10$g0hD3bkX4JG8JxNQGLQ.CeEr9MXqBD87UKFaO/1E1nEA22TGeE9Qe', 'admin', '2024-01-15 23:02:25.000000'),
(2, 'client1', 'client@gmail.com', '$2b$10$g0hD3bkX4JG8JxNQGLQ.CeEr9MXqBD87UKFaO/1E1nEA22TGeE9Qe', 'client', '2024-01-15 23:02:16.000000'),
(3, 'admin2', 'admin2@gmail.com', '$2b$10$g0hD3bkX4JG8JxNQGLQ.CeEr9MXqBD87UKFaO/1E1nEA22TGeE9Qe', 'admin', '2024-01-01 23:02:04.000000'),
(4, 'client3', 'client3@gmail.com', '$2b$10$g0hD3bkX4JG8JxNQGLQ.CeEr9MXqBD87UKFaO/1E1nEA22TGeE9Qe', 'client', '2024-01-16 11:36:28.116265'),
(5, 'client3', 'client3@gmail.com', '$2b$10$H0h26Vp/RIikVoNPby4VV.DW4OW2Fahrj.dQJkL5e9mltzPTIx4jm', 'client', '2024-01-16 11:37:52.069354'),
(6, 'client3', 'client3@gmail.com', '$2b$10$SlWHGSBKjs3KbsPUf/9j8exJgtXPWfUfzdahHHJqzKZsQ3A9Lyy6.', 'client', '2024-01-16 11:40:03.984956'),
(7, 'client3', 'client3@gmail.com', '$2b$10$0fJaYQoUEsrBBoIeiwqMTOKf7l1OS6JhRtAltI6l4yPACoTpGiUDi', 'client', '2024-01-16 11:43:54.407231'),
(8, 'client3', 'client3@gmail.com', '$2b$10$1c9Q2XW.fNtb1yjvadpXQ.KcDxiFJ49zqwOSsA8OCkX8xfxIrRcUe', 'client', '2024-01-16 11:51:11.493234'),
(9, 'client3', 'client3@gmail.com', '$2b$10$CvRSWvP2R892ytkglQzWuemaPWPmfJKGbRGZiisSJ71M1e3Uajiyy', 'client', '2024-01-16 11:52:14.466791'),
(10, 'client3', 'client3@gmail.com', '$2b$10$uEvlFVGIqsLDmnOZZEzLFeawCCp1VezS8OD3Oyu2h1QTxlLWGhCTK', 'client', '2024-01-16 11:53:11.898972'),
(11, 'client3', 'client3@gmail.com', '$2b$10$xCFiwN5q9b4cws43KxuW4.jHfR/.rVfbJVnAotk.9Xlhb3Ytt5PYa', 'client', '2024-01-16 11:55:48.528799'),
(12, 'client3', 'client3@gmail.com', '$2b$10$AYvHrQn9YGI1t3uUU4iHuuEqx2b7lUYvMui4HxDusT4pVIQQacaJS', 'client', '2024-01-16 11:55:52.385493'),
(13, 'client3', 'client3@gmail.com', '$2b$10$Poo2QjdDHNYJtOkdM.PCf.XTGyTZFTMcVj8JMQpr2fZKKV7NuN1zS', 'client', '2024-01-16 20:40:17.325108'),
(14, 'client3', 'client3@gmail.com', '$2b$10$esGk5zZOSfMaG/P5OnSJou8VDxQnGsvdMVzZw0K2cc.oamDGtLLp2', 'client', '2024-01-16 20:40:58.311594'),
(15, 'admin5', 'admin5@gmail.com', '$2b$10$KlL2gv3c6sDOgCcg/2S6c.9a22/rfc5zZvlD1z6shh3UVEILFNswq', 'admin', '2024-01-16 21:07:33.485658'),
(16, 'admin6', 'admin6@gmail.com', '$2b$10$Bnsx3MLx2ZjEFhtpDDzvcO5KUQCCPeAKWYwORjIRrXGyToWXBaoBm', 'client', '2024-01-16 23:42:13.314722');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`ItemID`);

--
-- Indexes for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD PRIMARY KEY (`OrderItemID`),
  ADD KEY `OrderID` (`OrderID`),
  ADD KEY `ItemID` (`ItemID`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`profile_id`),
  ADD UNIQUE KEY `userpf_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `profiles`
--
ALTER TABLE `profiles`
  MODIFY `profile_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderitems`
--
ALTER TABLE `orderitems`
  ADD CONSTRAINT `orderitems_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`),
  ADD CONSTRAINT `orderitems_ibfk_2` FOREIGN KEY (`ItemID`) REFERENCES `menu` (`ItemID`),
  ADD CONSTRAINT `orderitems_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `profiles`
--
ALTER TABLE `profiles`
  ADD CONSTRAINT `profiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
