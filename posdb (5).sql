-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2025 at 08:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `posdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `A_Id` int(11) NOT NULL,
  `F_Name` text NOT NULL,
  `U_Name` text NOT NULL,
  `Passwd` text NOT NULL,
  `Email` text NOT NULL,
  `ContactNo` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`A_Id`, `F_Name`, `U_Name`, `Passwd`, `Email`, `ContactNo`, `Created_At`, `Updated_At`) VALUES
(1, 'Azima Haji', 'Azima', '123456', 'azima@gmail.com', '6356927413', '2025-02-17 08:46:17', '2025-02-17 08:46:17'),
(2, 'Sobiya Patel', 'Sobiya', '562589', 'Sobiya@gmail.com', '6596789658', '2025-02-17 14:26:13', '2025-02-17 14:26:13'),
(5, 'Manju Rawat', 'Manju Rawat', '456789', 'manju35@gmail.com', '9626396458', '2025-02-17 15:17:33', '2025-02-17 15:17:33');

-- --------------------------------------------------------

--
-- Table structure for table `billpayment`
--

CREATE TABLE `billpayment` (
  `Payment_Id` int(11) NOT NULL,
  `Purchase_Id` int(11) NOT NULL,
  `Amount` double NOT NULL,
  `Payment_Mode` text NOT NULL,
  `Ref_No` text DEFAULT NULL,
  `Payment_Date` date NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `billpayment`
--

INSERT INTO `billpayment` (`Payment_Id`, `Purchase_Id`, `Amount`, `Payment_Mode`, `Ref_No`, `Payment_Date`, `Created_At`, `Updated_At`) VALUES
(5, 1, 10000, 'Cash', '455', '2025-02-12', '2025-02-18 09:02:15', '2025-02-18 09:02:15'),
(6, 1, 12000, 'Debit Card', 'ACF52', '2025-03-14', '2025-03-08 08:39:07', '2025-03-08 08:39:07'),
(7, 1, 12000, 'Debit Card', 'ACF52', '2025-03-14', '2025-03-08 08:39:07', '2025-03-08 08:39:07'),
(8, 1, 300, 'Credit Card', 'ACF52', '2025-03-08', '2025-03-08 14:11:50', '2025-03-08 14:11:50'),
(9, 1, 7700, 'Debit Card', 'EF45G', '2025-03-08', '2025-03-08 14:17:42', '2025-03-08 14:17:42'),
(10, 1, 100, 'Debit Card', 'EF45G', '2025-03-08', '2025-03-08 16:17:44', '2025-03-08 16:17:44'),
(11, 3, 300, 'UPI', 'RF45F', '2025-03-10', '2025-03-10 04:38:59', '2025-03-10 04:38:59'),
(12, 5, 2000, 'Cheque', 'EF45G', '2025-03-11', '2025-03-10 04:41:19', '2025-03-10 04:41:19'),
(13, 5, 60000, 'Net Banking', 'PJ687', '2025-03-09', '2025-03-10 04:42:17', '2025-03-10 04:42:17'),
(14, 3, 700, 'Net Banking', 'RF45F', '2025-03-10', '2025-03-10 05:09:23', '2025-03-10 05:09:23'),
(15, 3, 5000, 'Debit Card', 'DR456', '2025-03-09', '2025-03-10 05:10:55', '2025-03-10 05:10:55'),
(16, 7, 700, 'Debit Card', 'EF45G', '2025-03-09', '2025-03-10 06:02:50', '2025-03-10 06:02:50'),
(17, 6, 9000, 'Cash', 'ACF52', '2025-03-09', '2025-03-10 06:23:07', '2025-03-10 06:23:07'),
(18, 6, 9000, 'Cash', 'ACF52', '2025-03-09', '2025-03-10 06:23:12', '2025-03-10 06:23:12'),
(19, 7, 1000, 'Cash', NULL, '2025-03-09', '2025-03-10 06:24:50', '2025-03-10 06:24:50'),
(20, 1, 100, 'Cash', NULL, '2025-03-10', '2025-03-10 06:25:24', '2025-03-10 06:25:24'),
(21, 7, 600, 'Cash', NULL, '2025-03-10', '2025-03-10 14:20:04', '2025-03-10 14:20:04'),
(22, 7, 400, 'Credit Card', 'DR456', '2025-03-10', '2025-03-10 14:37:53', '2025-03-10 14:37:53'),
(23, 7, 500, 'Credit Card', 'EF45G', '2025-03-12', '2025-03-12 04:18:50', '2025-03-12 04:18:50'),
(24, 7, 500, 'Credit Card', 'EF45G', '2025-03-12', '2025-03-12 04:18:50', '2025-03-12 04:18:50'),
(25, 7, 4000, 'Credit Card', '125347869532', '2025-03-27', '2025-03-27 15:12:46', '2025-03-27 15:12:46'),
(26, 8, 800, 'Cash', NULL, '2025-03-28', '2025-03-28 04:46:39', '2025-03-28 04:46:39'),
(30, 10, 700, 'Cash', NULL, '2025-04-04', '2025-04-04 10:13:12', '2025-04-04 10:13:12'),
(31, 9, 300, 'Credit Card', 'EF45G', '2025-04-07', '2025-04-07 09:54:24', '2025-04-07 09:54:24'),
(32, 8, 200, 'Cash', NULL, '2025-04-08', '2025-04-08 06:00:54', '2025-04-08 06:00:54'),
(33, 8, 200, 'Cash', NULL, '2025-04-08', '2025-04-08 06:00:55', '2025-04-08 06:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `customer_mst`
--

CREATE TABLE `customer_mst` (
  `C_Id` int(11) NOT NULL,
  `Customer_Name` text NOT NULL,
  `Email` text NOT NULL,
  `ContactNo` text NOT NULL,
  `GST_No` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer_mst`
--

INSERT INTO `customer_mst` (`C_Id`, `Customer_Name`, `Email`, `ContactNo`, `GST_No`) VALUES
(6, 'Saima Patel', 'saima9904@gmail.com', '9876543211', '27BB33611CB2Z'),
(7, 'Rounak Sharma', 'rounak34@gmail.com', '6356859674', '37CCC2222C3Z7'),
(8, 'Sana Patel', 'sana23@gmail.com', '6589745896', '19DDD43333D4Z'),
(9, 'Salman Patel', 'salman56@gmail.com', '9356927413', '22AAAA000A1Z'),
(10, 'Fatima Patel', 'fatima203@gmail.com', '6356896352', '22RRAA000A1Y');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `invoice_payment`
--

CREATE TABLE `invoice_payment` (
  `ID` int(11) NOT NULL,
  `Invoice_Id` int(11) NOT NULL,
  `Amount` double NOT NULL,
  `Payment_Mode` text NOT NULL,
  `Ref_No` text NOT NULL,
  `Payment_Date` date NOT NULL,
  `C_Id` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `invoice_payment`
--

INSERT INTO `invoice_payment` (`ID`, `Invoice_Id`, `Amount`, `Payment_Mode`, `Ref_No`, `Payment_Date`, `C_Id`, `Created_At`, `Updated_At`) VALUES
(22, 31, 626.5, 'Debit Card', 'REF20240323001', '2025-03-26', 8, '2025-03-26 00:32:19', '2025-03-26 00:32:19'),
(23, 32, 535, 'Credit Card', 'REF20240323002', '2025-03-26', 7, '2025-03-26 00:33:19', '2025-03-26 00:33:19'),
(24, 33, 378, 'Net Banking', 'REF20240323003', '2025-03-25', 6, '2025-03-26 00:34:22', '2025-03-26 00:34:22'),
(25, 34, 315, 'Net Banking', 'REF20240323004', '2025-03-28', 7, '2025-03-28 02:11:09', '2025-03-28 02:11:09'),
(26, 35, 475.5, 'Credit Card', 'REF20240323003', '2025-04-02', 7, '2025-04-01 22:52:56', '2025-04-01 22:52:56'),
(27, 36, 252, 'Credit Card', 'REF20240323001', '2025-04-04', 7, '2025-04-04 02:01:37', '2025-04-04 02:01:37'),
(28, 37, 63, 'Credit Card', 'REF20240323002', '2025-04-07', 6, '2025-04-07 04:41:39', '2025-04-07 04:41:39'),
(29, 38, 63, 'Credit Card', 'REF20240323002', '2025-04-07', 6, '2025-04-07 04:41:41', '2025-04-07 04:41:41'),
(30, 39, 126, 'Credit Card', 'REF20240323003', '2025-04-08', 7, '2025-04-08 00:37:28', '2025-04-08 00:37:28'),
(31, 40, 126, 'Credit Card', 'REF20240323002', '2025-04-08', 7, '2025-04-08 02:24:24', '2025-04-08 02:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `load_stock`
--

CREATE TABLE `load_stock` (
  `LoadStock_Id` int(11) NOT NULL,
  `Stock_Id` int(11) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Trip_Id` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `load_stock`
--

INSERT INTO `load_stock` (`LoadStock_Id`, `Stock_Id`, `Qty`, `Trip_Id`, `Created_At`, `Updated_At`) VALUES
(80, 10, 5, 9, '2025-03-20 05:52:02', '2025-03-20 05:52:02'),
(81, 8, 10, 9, '2025-03-20 05:52:03', '2025-03-20 05:52:03'),
(82, 10, 15, 1, '2025-03-26 14:01:07', '2025-03-26 14:01:07'),
(84, 8, 20, 1, '2025-03-26 14:01:07', '2025-03-26 14:01:07'),
(85, 11, 25, 1, '2025-03-26 14:01:07', '2025-03-26 14:01:07'),
(86, 12, 10, 1, '2025-03-26 14:01:07', '2025-03-26 14:01:07'),
(87, 10, 10, 7, '2025-03-26 14:02:04', '2025-03-26 14:02:04'),
(88, 9, 5, 7, '2025-03-26 14:02:04', '2025-03-26 14:02:04'),
(89, 8, 5, 7, '2025-03-26 14:02:04', '2025-03-26 14:02:04'),
(90, 11, 10, 7, '2025-03-26 14:02:04', '2025-03-26 14:02:04'),
(91, 12, 15, 7, '2025-03-26 14:02:04', '2025-03-26 14:02:04'),
(93, 9, 5, 1, '2025-03-28 06:26:24', '2025-03-28 06:26:24');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(10, '2014_10_12_000000_create_users_table', 1),
(11, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(12, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(13, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(14, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(15, '2016_06_01_000004_create_oauth_clients_table', 1),
(16, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(17, '2019_08_19_000000_create_failed_jobs_table', 1),
(18, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(19, '2025_03_18_051540_create_password_resets_table', 1),
(20, '2025_03_18_074832_add_password_and_verified_to_staff_table', 2),
(21, '2025_03_18_080842_create_password_resets_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(100) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect` text NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) NOT NULL,
  `access_token_id` varchar(100) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orderassign`
--

CREATE TABLE `orderassign` (
  `OrderAssign_Id` int(11) NOT NULL,
  `OrderProduct_Id` int(11) NOT NULL,
  `Trip_Id` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderassign`
--

INSERT INTO `orderassign` (`OrderAssign_Id`, `OrderProduct_Id`, `Trip_Id`, `Created_At`) VALUES
(1, 3, 9, '2025-04-03 09:09:18'),
(2, 17, 9, '2025-04-03 09:16:15'),
(5, 15, 9, '2025-04-03 09:21:51'),
(12, 23, 9, '2025-04-04 06:47:57'),
(13, 19, 11, '2025-04-04 07:17:30'),
(16, 22, 9, '2025-04-04 09:07:59'),
(17, 18, 9, '2025-04-07 10:04:11'),
(18, 24, 9, '2025-04-08 06:03:53'),
(19, 27, 9, '2025-04-08 07:49:51');

-- --------------------------------------------------------

--
-- Table structure for table `ordermst`
--

CREATE TABLE `ordermst` (
  `Order_Id` int(11) NOT NULL,
  `C_Id` int(11) NOT NULL,
  `Order_Date` date DEFAULT NULL,
  `Advance_Payment` float DEFAULT NULL,
  `Ref_No` text DEFAULT NULL,
  `Payment_Mode` text DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ordermst`
--

INSERT INTO `ordermst` (`Order_Id`, `C_Id`, `Order_Date`, `Advance_Payment`, `Ref_No`, `Payment_Mode`, `Created_At`, `Updated_At`) VALUES
(1, 0, '2025-02-18', 0, '', '', '2025-02-18 15:39:30', '2025-02-18 15:39:30'),
(4, 2, '2025-03-24', 189, 'DF46', 'Cash', '2025-03-24 05:24:50', '2025-03-24 05:24:50'),
(5, 2, '2025-03-24', 189, 'DF46', 'Cash', '2025-03-24 05:44:51', '2025-03-24 05:44:51'),
(6, 2, '2025-03-24', 189, 'DF46', 'Cash', '2025-03-24 05:45:36', '2025-03-24 05:45:36'),
(7, 5, '2025-03-24', 189, 'DF456', 'Cash', '2025-03-24 05:49:23', '2025-03-24 05:49:23'),
(8, 5, '2025-03-24', 189, 'DF456', 'Cash', '2025-03-24 05:50:58', '2025-03-24 05:50:58'),
(9, 5, '2025-03-24', 189, 'DF456', 'Cash', '2025-03-24 06:47:37', '2025-03-24 06:47:37'),
(10, 5, '2025-03-24', 315, 'GF456', 'Cash', '2025-03-24 06:54:55', '2025-03-24 06:54:55'),
(11, 5, '2025-03-24', 378, 'FG567', 'Cash', '2025-03-24 07:03:28', '2025-03-24 07:03:28'),
(12, 5, NULL, 0, NULL, 'Cash', '2025-03-24 07:08:14', '2025-03-24 07:08:14'),
(13, 5, NULL, 0, NULL, 'Cash', '2025-03-24 07:53:52', '2025-03-24 07:53:52'),
(14, 5, NULL, 0, NULL, 'Cash', '2025-03-25 06:24:01', '2025-03-25 06:24:01'),
(15, 10, '2025-03-25', 582.5, 'REF20240323004', 'Cheque', '2025-03-26 06:06:37', '2025-03-26 06:06:37'),
(16, 10, '2025-03-25', 252, 'REF20240323004', 'Cheque', '2025-03-26 06:09:43', '2025-03-26 06:09:43'),
(17, 6, '2025-03-28', 200, NULL, 'Cash', '2025-03-28 07:46:01', '2025-03-28 07:46:01'),
(18, 6, '2025-03-28', 321, NULL, 'Cash', '2025-03-28 07:53:34', '2025-03-28 07:53:34'),
(19, 6, NULL, NULL, NULL, NULL, '2025-03-29 04:05:19', '2025-03-29 04:05:19'),
(20, 7, '2025-04-02', 160.5, NULL, 'Cash', '2025-03-29 04:32:38', '2025-03-29 04:32:38'),
(21, 9, NULL, NULL, NULL, NULL, '2025-03-29 14:08:27', '2025-03-29 14:08:27'),
(22, 10, NULL, NULL, NULL, NULL, '2025-03-29 14:12:22', '2025-03-29 14:12:22'),
(23, 10, '2025-03-29', 252, NULL, 'Cash', '2025-03-29 14:16:12', '2025-03-29 14:16:12'),
(24, 7, '2025-04-05', 441, NULL, 'Cash', '2025-04-05 04:10:19', '2025-04-05 04:10:19'),
(25, 7, '2025-04-05', 441, NULL, 'Cash', '2025-04-05 04:58:51', '2025-04-05 04:58:51'),
(26, 7, '2025-04-07', 107, NULL, 'Cash', '2025-04-07 10:13:14', '2025-04-07 10:13:14'),
(27, 6, NULL, NULL, NULL, NULL, '2025-04-08 06:08:16', '2025-04-08 06:08:16');

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `OrderProduct_Id` int(11) NOT NULL,
  `P_Id` int(11) NOT NULL,
  `Qty` int(11) NOT NULL,
  `Order_Id` int(11) NOT NULL,
  `Delivery_Date` date DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`OrderProduct_Id`, `P_Id`, `Qty`, `Order_Id`, `Delivery_Date`, `Created_At`, `Updated_At`) VALUES
(3, 11, 3, 4, '2025-04-08', '2025-03-24 05:24:50', '2025-03-24 05:24:50'),
(4, 11, 3, 5, '2025-04-08', '2025-03-24 05:44:51', '2025-03-24 05:44:51'),
(5, 11, 3, 6, '2025-04-08', '2025-03-24 05:45:36', '2025-03-24 05:45:36'),
(6, 11, 3, 7, '2025-04-08', '2025-03-24 05:49:23', '2025-03-24 05:49:23'),
(7, 11, 3, 8, '2025-04-08', '2025-03-24 05:50:58', '2025-03-24 05:50:58'),
(8, 11, 3, 9, '2025-04-08', '2025-03-24 06:47:37', '2025-03-24 06:47:37'),
(9, 11, 5, 10, '2025-04-08', '2025-03-24 06:54:55', '2025-03-24 06:54:55'),
(10, 11, 6, 11, '2025-04-08', '2025-03-24 07:03:28', '2025-03-24 07:03:28'),
(11, 11, 4, 12, '2025-04-08', '2025-03-24 07:08:14', '2025-03-24 07:08:14'),
(12, 13, 4, 13, '2025-04-08', '2025-03-24 07:53:52', '2025-03-24 07:53:52'),
(13, 11, 6, 14, '2025-04-08', '2025-03-25 06:24:01', '2025-03-25 06:24:01'),
(14, 11, 5, 15, '2025-04-08', '2025-03-26 06:06:37', '2025-03-26 06:06:37'),
(15, 13, 5, 15, '2025-04-08', '2025-03-26 06:06:37', '2025-03-26 06:06:37'),
(16, 11, 4, 16, '2025-04-08', '2025-03-26 06:09:43', '2025-03-26 06:09:43'),
(17, 13, 5, 17, '2025-04-08', '2025-03-28 07:46:01', '2025-03-28 07:46:01'),
(18, 13, 6, 18, '2025-04-08', '2025-03-28 07:53:34', '2025-03-28 07:53:34'),
(19, 18, 3, 19, '2025-04-08', '2025-03-29 04:05:19', '2025-03-29 04:05:19'),
(20, 13, 3, 20, '2025-04-08', '2025-03-29 04:32:38', '2025-03-29 04:32:38'),
(21, 13, 5, 21, '2025-04-08', '2025-03-29 14:08:27', '2025-03-29 14:08:27'),
(22, 11, 6, 22, '2025-04-08', '2025-03-29 14:12:22', '2025-03-29 14:12:22'),
(23, 11, 4, 23, '2025-04-08', '2025-03-29 14:16:12', '2025-03-29 14:16:12'),
(24, 11, 7, 24, NULL, '2025-04-05 04:10:19', '2025-04-05 04:10:19'),
(25, 11, 7, 25, NULL, '2025-04-05 04:58:51', '2025-04-05 04:58:51'),
(26, 13, 2, 26, NULL, '2025-04-07 10:13:15', '2025-04-07 10:13:15'),
(27, 11, 1, 27, NULL, '2025-04-08 06:08:16', '2025-04-08 06:08:16');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `created_at`) VALUES
(3, 'rounaksharma2021@gmail.com', 'fMLkJkemehxQ1NmKTdG8CvLxMUiKlnlumTzMf5Bh9EvSJUQuevMzkhTdAzuy0bLu', '2025-03-18 03:57:11'),
(6, 'patelrehnuma2114@gmail.com', 'wCPTRJNHIgydvUgpfvxaFU2NkXQt87SiZ6HmowwYxTsRhGg8KE9CdD5BdKWegyWg', '2025-03-18 23:05:17'),
(18, 'riyaz9956@gmail.com', 'kKPI8gSEkYkq2Af5d2DKgx00QI5EdmhxQbR5fnMSWb5Nnu8UzOT38emP0crTGXAW', '2025-03-29 09:04:48'),
(20, 'patelazima1907@gmail.com', 'XnrRpqWtk8uj4g5CgtyVSmCnUzw43eqdkCL9LggupRve5tjzDaX0sITYiK9b5KBS', '2025-04-08 00:34:44');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productmst`
--

CREATE TABLE `productmst` (
  `P_Id` int(11) NOT NULL,
  `Name` text NOT NULL,
  `Weight` float NOT NULL,
  `Unit` text NOT NULL,
  `Price` int(11) NOT NULL,
  `Net_Qty` text NOT NULL,
  `FSSAI` text NOT NULL,
  `Barcode` text NOT NULL,
  `Brand` text NOT NULL,
  `HSN` text NOT NULL,
  `GST` float NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productmst`
--

INSERT INTO `productmst` (`P_Id`, `Name`, `Weight`, `Unit`, `Price`, `Net_Qty`, `FSSAI`, `Barcode`, `Brand`, `HSN`, `GST`, `Created_At`, `Updated_At`) VALUES
(11, 'KURKURES', 35, 'grms', 60, '52', '11517014000659', '8909872543210', 'BALAJI', '1063010', 5, '2025-02-21 10:10:24', '2025-02-21 10:10:24'),
(13, 'WAFER', 50, 'grms', 50, '20', '10712011000241', '8907654321098', 'LAYS', '18069010', 7, '2025-02-21 11:51:02', '2025-02-21 11:51:02'),
(17, 'MAGIC MASALA', 30, 'grms', 45, '60', '10712011000241', '8907654321098', 'BINGO', '18866010', 7, '2025-03-26 13:24:04', '2025-03-26 13:24:04'),
(18, 'Classic Salted', 35, 'grms', 50, '35', '10018811000232', '9956204667890', 'LAYS', '14090022', 5, '2025-03-26 13:57:46', '2025-03-26 13:57:46');

-- --------------------------------------------------------

--
-- Table structure for table `purchasemst`
--

CREATE TABLE `purchasemst` (
  `Purchase_Id` int(11) NOT NULL,
  `Bill_No` int(11) NOT NULL,
  `V_Id` int(11) NOT NULL,
  `GrossAmt` double NOT NULL,
  `TotalAmt` double NOT NULL,
  `GST_Type` text NOT NULL,
  `Bill_Date` date NOT NULL,
  `Total` double NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `purchasemst`
--

INSERT INTO `purchasemst` (`Purchase_Id`, `Bill_No`, `V_Id`, `GrossAmt`, `TotalAmt`, `GST_Type`, `Bill_Date`, `Total`, `Created_At`, `Updated_At`) VALUES
(1, 1, 3, 40000, 200, 'IGST', '2025-02-12', 40200, '2025-02-18 09:00:40', '2025-02-18 09:00:40'),
(3, 2, 1, 5000, 1000, 'CGST & SGST', '2025-02-01', 6000, '2025-02-18 10:52:51', '2025-02-18 10:52:51'),
(5, 3, 3, 60000, 2000, 'CGST & SGST', '2025-03-10', 62000, '2025-03-10 04:40:29', '2025-03-10 04:40:29'),
(6, 4, 3, 7000, 2000, 'IGST', '2025-03-07', 9000, '2025-03-10 05:12:51', '2025-03-10 05:12:51'),
(7, 5, 1, 7000, 700, 'CGST', '2025-03-09', 7700, '2025-03-10 06:00:39', '2025-03-10 06:00:39'),
(8, 6, 3, 6000, 2000, 'CGST & SGST', '2025-03-13', 8000, '2025-03-13 07:14:14', '2025-03-13 07:14:14'),
(9, 6, 3, 6000, 300, 'IGST', '2025-03-26', 6300, '2025-03-26 13:48:37', '2025-03-26 13:48:37'),
(10, 6, 1, 5500, 200, 'CGST & SGST', '2025-03-26', 5700, '2025-03-26 13:58:39', '2025-03-26 13:58:39');

-- --------------------------------------------------------

--
-- Table structure for table `receiptmst`
--

CREATE TABLE `receiptmst` (
  `Invoice_Id` int(11) NOT NULL,
  `C_Id` int(11) NOT NULL,
  `Total_Gross` double NOT NULL,
  `GST` float NOT NULL,
  `GST_Type` text NOT NULL,
  `Grand_Total` double NOT NULL,
  `Rec_Date` date NOT NULL,
  `Trip_Id` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `receiptmst`
--

INSERT INTO `receiptmst` (`Invoice_Id`, `C_Id`, `Total_Gross`, `GST`, `GST_Type`, `Grand_Total`, `Rec_Date`, `Trip_Id`, `Created_At`, `Updated_At`) VALUES
(31, 8, 590, 36.5, 'CGST & SGST', 626.5, '2025-03-26', 9, '2025-03-26 00:32:19', '2025-03-26 00:32:19'),
(32, 7, 500, 35, 'IGST', 535, '2025-03-26', 9, '2025-03-26 00:33:19', '2025-03-26 00:33:19'),
(33, 6, 360, 18, 'CGST & SGST', 378, '2025-02-26', 9, '2025-02-05 00:34:22', '2025-03-26 00:34:22'),
(34, 7, 300, 15, 'CGST & SGST', 315, '2025-02-28', 9, '2025-01-07 02:11:09', '2025-03-28 02:11:09'),
(35, 7, 450, 25.5, 'CGST & SGST', 475.5, '2025-04-02', 9, '2025-04-01 22:52:56', '2025-04-01 22:52:56'),
(36, 7, 240, 12, 'CGST & SGST', 252, '2025-04-04', 9, '2025-04-04 02:01:37', '2025-04-04 02:01:37'),
(37, 6, 60, 3, 'IGST', 63, '2025-04-07', 9, '2025-04-07 04:41:39', '2025-04-07 04:41:39'),
(38, 6, 60, 3, 'IGST', 63, '2025-04-07', 9, '2025-04-07 04:41:41', '2025-04-07 04:41:41'),
(39, 7, 120, 6, 'CGST & SGST', 126, '2025-04-08', 9, '2025-04-08 00:37:28', '2025-04-08 00:37:28'),
(40, 7, 120, 6, 'CGST & SGST', 126, '2025-04-08', 9, '2025-04-08 02:24:24', '2025-04-08 02:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `rec_detail`
--

CREATE TABLE `rec_detail` (
  `ID` int(11) NOT NULL,
  `Invoice_Id` int(11) NOT NULL,
  `Qty` text NOT NULL,
  `Rate` text NOT NULL,
  `GST` float NOT NULL,
  `Amt` double NOT NULL,
  `Total` double NOT NULL,
  `LoadStock_Id` int(11) NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rec_detail`
--

INSERT INTO `rec_detail` (`ID`, `Invoice_Id`, `Qty`, `Rate`, `GST`, `Amt`, `Total`, `LoadStock_Id`, `Created_At`, `Updated_At`) VALUES
(29, 31, '4', '55', 5, 60, 240, 80, '2025-03-26 00:32:19', '2025-03-26 00:32:19'),
(30, 31, '7', '43', 7, 50, 350, 81, '2025-03-26 00:32:19', '2025-03-26 00:32:19'),
(31, 32, '10', '43', 7, 50, 500, 81, '2025-03-26 00:33:19', '2025-03-26 00:33:19'),
(32, 33, '6', '55', 5, 60, 360, 80, '2025-03-26 00:34:22', '2025-03-26 00:34:22'),
(33, 34, '5', '55', 5, 60, 300, 80, '2025-03-28 02:11:09', '2025-03-28 02:11:09'),
(34, 35, '5', '55', 5, 60, 300, 80, '2025-04-01 22:52:56', '2025-04-01 22:52:56'),
(35, 35, '3', '43', 7, 50, 150, 81, '2025-04-01 22:52:56', '2025-04-01 22:52:56'),
(36, 36, '4', '55', 5, 60, 240, 80, '2025-04-04 02:01:37', '2025-04-04 02:01:37'),
(37, 37, '1', '55', 5, 60, 60, 80, '2025-04-07 04:41:39', '2025-04-07 04:41:39'),
(38, 38, '1', '55', 5, 60, 60, 80, '2025-04-07 04:41:41', '2025-04-07 04:41:41'),
(39, 39, '2', '55', 5, 60, 120, 80, '2025-04-08 00:37:28', '2025-04-08 00:37:28'),
(40, 40, '2', '55', 5, 60, 120, 80, '2025-04-08 02:24:24', '2025-04-08 02:24:24');

-- --------------------------------------------------------

--
-- Table structure for table `staff_mst`
--

CREATE TABLE `staff_mst` (
  `Staff_Id` int(11) NOT NULL,
  `F_Name` text NOT NULL,
  `Gender` text NOT NULL,
  `DOB` date NOT NULL,
  `ContactNo` text NOT NULL,
  `Address` text NOT NULL,
  `Adhar_No` text NOT NULL,
  `Driving_Licence` text NOT NULL,
  `DOJ` date NOT NULL,
  `Email` text NOT NULL,
  `Passwrd` text DEFAULT NULL,
  `Status` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_mst`
--

INSERT INTO `staff_mst` (`Staff_Id`, `F_Name`, `Gender`, `DOB`, `ContactNo`, `Address`, `Adhar_No`, `Driving_Licence`, `DOJ`, `Email`, `Passwrd`, `Status`, `Created_At`, `Updated_At`, `verified`) VALUES
(1, 'Almas Haji', 'Male', '1990-05-15', '9876543210', 'BHARUCH', '123456789012', 'DL-123456789', '2024-02-18', 'almas98@gmail.com', '123456', 'Not-Active', '2025-02-18 15:12:13', '2025-02-18 15:12:13', 0),
(5, 'Ayaz Patel', 'Male', '2025-02-18', '6356896355', 'BHARUCH', '234567890123', 'WB14 20191234567', '2025-02-12', 'ayaz9907@gmail.com', '123456', 'Active', '2025-02-24 10:02:54', '2025-02-24 10:02:54', 0),
(9, 'Manju Rawat', 'Female', '2003-09-27', '7689632563', 'KIM', '345678901234', 'DL08 20181098765', '2025-03-01', 'manju345@gmail.com', '123456', 'Active', '2025-03-05 08:37:44', '2025-03-05 08:37:44', 0),
(39, 'Azima Haji', 'Female', '2025-02-26', '6356927412', 'KOLVANA', '456789012348', 'TS09 20171567890', '2025-03-07', 'patelazima1907@gmail.com', '123456', 'Active', '2025-03-20 04:59:06', '2025-04-07 22:11:49', 1);

-- --------------------------------------------------------

--
-- Table structure for table `stockmst`
--

CREATE TABLE `stockmst` (
  `Stock_Id` int(11) NOT NULL,
  `P_Id` int(11) NOT NULL,
  `MFG_Date` date NOT NULL,
  `Exp_Date` date NOT NULL,
  `No_Of_Stock` text NOT NULL,
  `Cost_Price` double NOT NULL,
  `Inword_Date` date NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Purchase_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stockmst`
--

INSERT INTO `stockmst` (`Stock_Id`, `P_Id`, `MFG_Date`, `Exp_Date`, `No_Of_Stock`, `Cost_Price`, `Inword_Date`, `Created_At`, `Updated_At`, `Purchase_Id`) VALUES
(8, 13, '2025-03-10', '2025-03-19', '50', 60, '2025-03-12', '2025-03-12 08:15:50', '2025-03-12 08:15:50', 7),
(9, 11, '2025-03-04', '2025-03-13', '30', 30, '2025-03-12', '2025-03-12 09:03:23', '2025-03-12 09:03:23', 5),
(10, 11, '2025-03-01', '2025-03-31', '50', 300, '2025-03-13', '2025-03-13 07:42:08', '2025-03-13 07:42:08', 3),
(11, 17, '2025-03-01', '2026-03-26', '75', 45, '2025-03-26', '2025-03-26 13:50:31', '2025-03-26 13:50:31', 1),
(12, 18, '2025-02-25', '2026-02-26', '65', 30, '2025-03-26', '2025-03-26 13:59:32', '2025-03-26 13:59:32', 3);

-- --------------------------------------------------------

--
-- Table structure for table `stockoutword`
--

CREATE TABLE `stockoutword` (
  `StockOutWord_Id` int(11) NOT NULL,
  `Stock_Id` int(11) NOT NULL,
  `ReasonOutWord` text NOT NULL,
  `Qty` int(11) NOT NULL,
  `OutWord_Date` date NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `trip_mst`
--

CREATE TABLE `trip_mst` (
  `Trip_Id` int(11) NOT NULL,
  `Vehicle_Id` int(11) NOT NULL,
  `Staff_Id` int(11) NOT NULL,
  `Start_Date` date NOT NULL,
  `Finish_Date` date DEFAULT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trip_mst`
--

INSERT INTO `trip_mst` (`Trip_Id`, `Vehicle_Id`, `Staff_Id`, `Start_Date`, `Finish_Date`, `Created_At`, `Updated_At`) VALUES
(1, 1, 1, '2025-04-05', NULL, '2025-02-19 05:12:06', '2025-02-19 05:12:06'),
(7, 1, 1, '2025-03-28', NULL, '2025-03-19 06:55:43', '2025-03-19 06:55:43'),
(9, 1, 39, '2025-04-09', NULL, '2025-03-20 05:33:52', '2025-03-20 05:33:52'),
(11, 7, 9, '2025-04-02', NULL, '2025-04-02 04:35:45', '2025-04-02 04:35:45'),
(12, 2, 5, '2025-04-03', NULL, '2025-04-03 04:38:58', '2025-04-03 04:38:58');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vehiclemst`
--

CREATE TABLE `vehiclemst` (
  `Vehicle_Id` int(11) NOT NULL,
  `Driver_Name` text NOT NULL,
  `PUC_No` text NOT NULL,
  `PUC_Expiry` date NOT NULL,
  `Vehicle_No` text NOT NULL,
  `Vehicle_Name` text NOT NULL,
  `Fual_Type` text NOT NULL,
  `Driving_Licences_No` text NOT NULL,
  `Status` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vehiclemst`
--

INSERT INTO `vehiclemst` (`Vehicle_Id`, `Driver_Name`, `PUC_No`, `PUC_Expiry`, `Vehicle_No`, `Vehicle_Name`, `Fual_Type`, `Driving_Licences_No`, `Status`, `Created_At`, `updated_at`) VALUES
(1, 'Saad Patel', 'PUC123456', '2027-02-13', 'MH12AB1234', 'Tata Ace', 'CNG', 'DL123456789013', 'Active', '2025-02-18 05:50:46', '2025-02-18 05:50:46'),
(2, 'Jayesh Mali', 'PUC789012', '2028-02-13', 'DL10XY5678', 'Mahindra Bolero', 'CNG', 'DL987654321098', 'Active', '2025-03-11 04:31:14', '2025-03-11 04:31:14'),
(7, 'Almas Patel', 'PUC345678', '2028-11-30', 'KA03CD9101', 'Ashok Leyland Dost', 'Diesel', 'DL567890123456', 'Active', '2025-03-26 05:55:03', '2025-03-26 05:55:03'),
(8, 'Umar Haji', 'PUC901234', '2026-10-13', 'TN05EF1122', 'Maruti Suzuki Eeco', 'Petrol', 'DL345678901234', 'Not-Active', '2025-03-26 05:56:32', '2025-03-26 05:56:32');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `V_Id` int(11) NOT NULL,
  `Business_Name` text NOT NULL,
  `Contact_Person` text NOT NULL,
  `Address` text NOT NULL,
  `ContactNo` text NOT NULL,
  `Alter_ContactNo` text NOT NULL,
  `GST_In` text NOT NULL,
  `Created_At` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated_At` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`V_Id`, `Business_Name`, `Contact_Person`, `Address`, `ContactNo`, `Alter_ContactNo`, `GST_In`, `Created_At`, `Updated_At`) VALUES
(1, 'MNO Traders', 'Umar Patel', '956 Tech Park, Bharuch', '6252896358', '9289632582', '27GLO1234D5E6Z3', '2025-02-18 08:20:49', '2025-02-18 08:20:49'),
(3, 'ABC Enterprises', 'Amin Patel', '210 Anna Salai, Surat', '9365896323', '6356895236', '29ABCDE1234F1Z5', '2025-03-10 04:18:12', '2025-03-10 04:18:12'),
(4, 'Metro Supplies Co.', 'Rohit Mehra', 'Plot 7, Industrial Area, Baroda', '9012345678', '9023456789', '77MSC9876F4Z323', '2025-04-05 07:55:08', '2025-04-05 07:55:08');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`A_Id`);

--
-- Indexes for table `billpayment`
--
ALTER TABLE `billpayment`
  ADD PRIMARY KEY (`Payment_Id`),
  ADD KEY `PayPur` (`Purchase_Id`);

--
-- Indexes for table `customer_mst`
--
ALTER TABLE `customer_mst`
  ADD PRIMARY KEY (`C_Id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `invoice_payment`
--
ALTER TABLE `invoice_payment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `InvoiceRec` (`Invoice_Id`),
  ADD KEY `InvCus` (`C_Id`);

--
-- Indexes for table `load_stock`
--
ALTER TABLE `load_stock`
  ADD PRIMARY KEY (`LoadStock_Id`),
  ADD KEY `LoadStock` (`Stock_Id`),
  ADD KEY `TripLoad` (`Trip_Id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Indexes for table `orderassign`
--
ALTER TABLE `orderassign`
  ADD PRIMARY KEY (`OrderAssign_Id`),
  ADD KEY `TripOrderAssign` (`Trip_Id`),
  ADD KEY `AssignOrder` (`OrderProduct_Id`);

--
-- Indexes for table `ordermst`
--
ALTER TABLE `ordermst`
  ADD PRIMARY KEY (`Order_Id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`OrderProduct_Id`),
  ADD KEY `OrderPro` (`P_Id`),
  ADD KEY `OrderProduct` (`Order_Id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `password_resets_email_unique` (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `productmst`
--
ALTER TABLE `productmst`
  ADD PRIMARY KEY (`P_Id`);

--
-- Indexes for table `purchasemst`
--
ALTER TABLE `purchasemst`
  ADD PRIMARY KEY (`Purchase_Id`),
  ADD KEY `PurVen` (`V_Id`);

--
-- Indexes for table `receiptmst`
--
ALTER TABLE `receiptmst`
  ADD PRIMARY KEY (`Invoice_Id`);

--
-- Indexes for table `rec_detail`
--
ALTER TABLE `rec_detail`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `RecInvo` (`Invoice_Id`),
  ADD KEY `LoadRec` (`LoadStock_Id`);

--
-- Indexes for table `staff_mst`
--
ALTER TABLE `staff_mst`
  ADD PRIMARY KEY (`Staff_Id`);

--
-- Indexes for table `stockmst`
--
ALTER TABLE `stockmst`
  ADD PRIMARY KEY (`Stock_Id`),
  ADD KEY `StockPro` (`P_Id`),
  ADD KEY `Purchase_Id` (`Purchase_Id`);

--
-- Indexes for table `stockoutword`
--
ALTER TABLE `stockoutword`
  ADD PRIMARY KEY (`StockOutWord_Id`),
  ADD KEY `StockOutWord` (`Stock_Id`);

--
-- Indexes for table `trip_mst`
--
ALTER TABLE `trip_mst`
  ADD PRIMARY KEY (`Trip_Id`),
  ADD KEY `TripVeh` (`Vehicle_Id`),
  ADD KEY `TripStaff` (`Staff_Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vehiclemst`
--
ALTER TABLE `vehiclemst`
  ADD PRIMARY KEY (`Vehicle_Id`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`V_Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `A_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `billpayment`
--
ALTER TABLE `billpayment`
  MODIFY `Payment_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `customer_mst`
--
ALTER TABLE `customer_mst`
  MODIFY `C_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice_payment`
--
ALTER TABLE `invoice_payment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `load_stock`
--
ALTER TABLE `load_stock`
  MODIFY `LoadStock_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orderassign`
--
ALTER TABLE `orderassign`
  MODIFY `OrderAssign_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `ordermst`
--
ALTER TABLE `ordermst`
  MODIFY `Order_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `OrderProduct_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `productmst`
--
ALTER TABLE `productmst`
  MODIFY `P_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `purchasemst`
--
ALTER TABLE `purchasemst`
  MODIFY `Purchase_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `receiptmst`
--
ALTER TABLE `receiptmst`
  MODIFY `Invoice_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `rec_detail`
--
ALTER TABLE `rec_detail`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `staff_mst`
--
ALTER TABLE `staff_mst`
  MODIFY `Staff_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `stockmst`
--
ALTER TABLE `stockmst`
  MODIFY `Stock_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `stockoutword`
--
ALTER TABLE `stockoutword`
  MODIFY `StockOutWord_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `trip_mst`
--
ALTER TABLE `trip_mst`
  MODIFY `Trip_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vehiclemst`
--
ALTER TABLE `vehiclemst`
  MODIFY `Vehicle_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `V_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `billpayment`
--
ALTER TABLE `billpayment`
  ADD CONSTRAINT `PayPur` FOREIGN KEY (`Purchase_Id`) REFERENCES `purchasemst` (`Purchase_Id`) ON DELETE CASCADE;

--
-- Constraints for table `invoice_payment`
--
ALTER TABLE `invoice_payment`
  ADD CONSTRAINT `InvCus` FOREIGN KEY (`C_Id`) REFERENCES `customer_mst` (`C_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `InvoiceRec` FOREIGN KEY (`Invoice_Id`) REFERENCES `receiptmst` (`Invoice_Id`) ON DELETE CASCADE;

--
-- Constraints for table `load_stock`
--
ALTER TABLE `load_stock`
  ADD CONSTRAINT `LoadStock` FOREIGN KEY (`Stock_Id`) REFERENCES `stockmst` (`Stock_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `TripLoad` FOREIGN KEY (`Trip_Id`) REFERENCES `trip_mst` (`Trip_Id`) ON DELETE CASCADE;

--
-- Constraints for table `orderassign`
--
ALTER TABLE `orderassign`
  ADD CONSTRAINT `AssignOrder` FOREIGN KEY (`OrderProduct_Id`) REFERENCES `order_product` (`OrderProduct_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `TripOrderAssign` FOREIGN KEY (`Trip_Id`) REFERENCES `trip_mst` (`Trip_Id`) ON DELETE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `OrderPro` FOREIGN KEY (`P_Id`) REFERENCES `productmst` (`P_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `OrderProduct` FOREIGN KEY (`Order_Id`) REFERENCES `ordermst` (`Order_Id`) ON DELETE CASCADE;

--
-- Constraints for table `purchasemst`
--
ALTER TABLE `purchasemst`
  ADD CONSTRAINT `PurVen` FOREIGN KEY (`V_Id`) REFERENCES `vendors` (`V_Id`) ON DELETE CASCADE;

--
-- Constraints for table `rec_detail`
--
ALTER TABLE `rec_detail`
  ADD CONSTRAINT `LoadRec` FOREIGN KEY (`LoadStock_Id`) REFERENCES `load_stock` (`LoadStock_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `RecInvo` FOREIGN KEY (`Invoice_Id`) REFERENCES `receiptmst` (`Invoice_Id`) ON DELETE CASCADE;

--
-- Constraints for table `stockmst`
--
ALTER TABLE `stockmst`
  ADD CONSTRAINT `Purchase_Id` FOREIGN KEY (`Purchase_Id`) REFERENCES `purchasemst` (`Purchase_Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `stockoutword`
--
ALTER TABLE `stockoutword`
  ADD CONSTRAINT `StockOutWord` FOREIGN KEY (`Stock_Id`) REFERENCES `stockmst` (`Stock_Id`) ON DELETE CASCADE;

--
-- Constraints for table `trip_mst`
--
ALTER TABLE `trip_mst`
  ADD CONSTRAINT `TripStaff` FOREIGN KEY (`Staff_Id`) REFERENCES `staff_mst` (`Staff_Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `TripVeh` FOREIGN KEY (`Vehicle_Id`) REFERENCES `vehiclemst` (`Vehicle_Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
