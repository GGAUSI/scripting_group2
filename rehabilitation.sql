-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2023 at 11:52 PM
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
-- Database: `rehabilitation`
--

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `fname` varchar(20) NOT NULL,
  `sname` varchar(20) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `disease` varchar(100) NOT NULL,
  `duration` int(11) NOT NULL,
  `room` varchar(11) NOT NULL,
  `bill` int(11) NOT NULL,
  `bill_status` varchar(11) NOT NULL,
  `check_in_date` date NOT NULL,
  `discharge_status` varchar(20) DEFAULT 'Admitted'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `fname`, `sname`, `gender`, `age`, `email`, `disease`, `duration`, `room`, `bill`, `bill_status`, `check_in_date`, `discharge_status`) VALUES
(12, 'Allan', 'Doe', 'male', 22, 'bis20-ggausi@poly.ac.mw', 'PTSD', 10, 'D4', 120000, 'paid', '2023-10-16', 'discharged'),
(13, 'Nick', 'Smith', 'male', 34, 'bis20-ggausi@poly.ac.mw', 'bipolar', 10, 'D4', 120000, 'unpaid', '2023-10-06', 'Admitted'),
(14, 'Linda', 'Magalasi', 'female', 12, 'bis20-ggausi@poly.ac.mw', 'bipolar', 12, 'D1', 22000, 'unpaid', '2023-10-04', 'Admitted'),
(15, 'Grace', 'Gausi', 'female', 19, 'bis20-ggausi@poly.ac.mw', 'depression', 14, 'D20', 10, 'unpaid', '2023-10-09', 'Admitted');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `room_id` varchar(10) NOT NULL,
  `room_price` int(11) NOT NULL,
  `availability` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`room_id`, `room_price`, `availability`) VALUES
('D1', 10000, 'unavailable'),
('D20', 12000, 'unavailable'),
('D22', 20000, 'available'),
('D33', 10000, 'available'),
('D4', 20000, 'unavailable'),
('D9', 10000, 'available');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`room_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
