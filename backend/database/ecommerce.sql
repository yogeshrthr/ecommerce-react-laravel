-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Feb 07, 2026 at 02:15 PM
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
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_11_04_111907_create_personal_access_tokens_table', 1),
(5, '2025_11_05_103828_create_tbl_brands', 1),
(6, '2025_11_05_103852_create_tbl_categories', 1),
(7, '2025_11_09_063135_create_tbl_products', 1),
(8, '2025_11_09_070206_create_tbl_sizes', 2),
(9, '2025_11_09_070613_create_tbl_product_images', 3),
(10, '2025_11_09_071324_create_tbl_product_sizes', 4),
(11, '2025_11_09_072139_create_tbl_temp_images', 5),
(17, '2026_02_02_124048_create_orders_table', 6),
(18, '2026_02_02_124738_create_order_items_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 1, 'token', '42c64fd1edf5cbd9787ba2d383540660d2486829063b48d4c2579a9bdef1c6a0', '[\"*\"]', '2025-11-09 02:00:26', NULL, '2025-11-09 02:00:17', '2025-11-09 02:00:26'),
(2, 'App\\Models\\User', 1, 'token', 'ff2cd74e2ad5cc3b2a35eadafe127819f85bec60905e3b545e74c1c593638e84', '[\"*\"]', '2026-01-24 05:01:21', NULL, '2025-11-09 02:01:41', '2026-01-24 05:01:21'),
(3, 'App\\Models\\User', 1, 'token', '999e81d80bc40b4c29d6f8beb69443d648228871d876ecb4465b642d93f9e474', '[\"*\"]', NULL, NULL, '2025-11-10 06:28:26', '2025-11-10 06:28:26'),
(4, 'App\\Models\\User', 1, 'token', '578a04bc89677489cb80bbd6fa70fb9b361ed76a8eb7ddc752851ceb02253a71', '[\"*\"]', '2025-11-10 07:26:12', NULL, '2025-11-10 06:28:28', '2025-11-10 07:26:12'),
(5, 'App\\Models\\User', 1, 'token', '04b44d2c689a808846f3d5c21c35c06285304ece78bbeac871d176ec31833c86', '[\"*\"]', '2026-01-14 02:44:10', NULL, '2026-01-14 02:43:35', '2026-01-14 02:44:10'),
(6, 'App\\Models\\User', 1, 'token', 'b27de07977776093e65126d592e890e1c0e02af614c3acde6977e90685958270', '[\"*\"]', NULL, NULL, '2026-01-14 03:00:34', '2026-01-14 03:00:34'),
(7, 'App\\Models\\User', 1, 'token', 'f1d322f6c42fbfca934ef0f18206eb37993860f36965f0b578126c0d63ee0a89', '[\"*\"]', '2026-01-14 06:00:43', NULL, '2026-01-14 03:00:34', '2026-01-14 06:00:43'),
(8, 'App\\Models\\User', 1, 'token', 'd3cae41aea5581f79dbe7f62d217dbbde275465e2883956c1c32d52eb04bbcd9', '[\"*\"]', '2026-01-15 06:42:01', NULL, '2026-01-15 04:18:11', '2026-01-15 06:42:01'),
(9, 'App\\Models\\User', 1, 'token', '1337c836209c28f510d7552a9b34b737e64fac5fc234f12b1c71809fe83f284e', '[\"*\"]', '2026-01-16 01:36:15', NULL, '2026-01-16 01:36:12', '2026-01-16 01:36:15'),
(10, 'App\\Models\\User', 1, 'token', '00ed1b7d6e7d985b1b4266a0e815f106445c72050ee6add40b3decf2277c5c1b', '[\"*\"]', '2026-01-21 07:53:51', NULL, '2026-01-21 00:15:56', '2026-01-21 07:53:51'),
(11, 'App\\Models\\User', 1, 'token', '9f04dddd05c0aa6f25b67b1b8731507f27abbb48915249092a66acf72e8eb1a8', '[\"*\"]', NULL, NULL, '2026-01-22 00:12:48', '2026-01-22 00:12:48'),
(12, 'App\\Models\\User', 1, 'token', 'e9f950a9557ff6b125abfd3f87512f4591d95e71bd01350ee3447f4a4305d1c3', '[\"*\"]', '2026-01-22 03:06:53', NULL, '2026-01-22 00:12:50', '2026-01-22 03:06:53'),
(13, 'App\\Models\\User', 1, 'token', '0237f87674ab54105127f857645cb414d923aa23ff3d3c40dcb13ac862c8961a', '[\"*\"]', '2026-01-22 04:54:48', NULL, '2026-01-22 03:45:14', '2026-01-22 04:54:48'),
(14, 'App\\Models\\User', 1, 'token', '0ae5cf493ea906946dab3482406f8824bdfbabaa4d8c791cb4d54fddd20e18eb', '[\"*\"]', '2026-01-23 07:13:48', NULL, '2026-01-23 00:46:03', '2026-01-23 07:13:48'),
(15, 'App\\Models\\User', 1, 'token', '8b023367d0e38670641d1fc8723b63af3752d128af5aab4741a568132fd35c62', '[\"*\"]', '2026-01-24 07:26:25', NULL, '2026-01-24 00:55:13', '2026-01-24 07:26:25'),
(16, 'App\\Models\\User', 1, 'token', '71f0c7308dc16cfab826751d758337f3701619b56a469a3b0e2513311b4be8d8', '[\"*\"]', '2026-01-25 06:04:27', NULL, '2026-01-25 02:06:37', '2026-01-25 06:04:27'),
(17, 'App\\Models\\User', 1, 'token', 'bafa79ad49294914eb91d34babdb0fcd451f137080d530385ff80cbebf69eb4d', '[\"*\"]', '2026-01-26 03:27:24', NULL, '2026-01-26 03:27:17', '2026-01-26 03:27:24'),
(18, 'App\\Models\\User', 1, 'token', '36645a90b7fa3f2770d5e91ecaa5bc66cf54fc7b525d9a19298a161925583703', '[\"*\"]', '2026-01-26 03:33:07', NULL, '2026-01-26 03:27:19', '2026-01-26 03:33:07'),
(19, 'App\\Models\\User', 2, 'token', '0ea2e6f954801fb5198925726030257e4ba3860558339bd09ade7aeb9e16821c', '[\"*\"]', NULL, NULL, '2026-01-26 07:38:38', '2026-01-26 07:38:38'),
(20, 'App\\Models\\User', 2, 'token', '692d68eb9d6e01ab7f14cfee2bb4c7574a7ec7e121f54216c61e6795ff3f8ce7', '[\"*\"]', NULL, NULL, '2026-01-27 00:15:15', '2026-01-27 00:15:15'),
(21, 'App\\Models\\User', 2, 'token', '8f452a3ecdf0af0251f4c2eb31849c5fc1b823fda38afe7e07cddad4be4ce223', '[\"*\"]', NULL, NULL, '2026-01-27 00:15:42', '2026-01-27 00:15:42'),
(22, 'App\\Models\\User', 2, 'token', 'e21a1fd1922ed21ad843ee572ef5acb497014299ca5e323b3ae26a417f480cda', '[\"*\"]', NULL, NULL, '2026-01-27 00:16:05', '2026-01-27 00:16:05'),
(23, 'App\\Models\\User', 2, 'token', '9673226c99244b3bdbe4ac123ad70dc92e6bae12111049a411024a7df6df0308', '[\"*\"]', NULL, NULL, '2026-01-27 00:16:06', '2026-01-27 00:16:06'),
(24, 'App\\Models\\User', 3, 'token', '9d36fe584cb09a19a269d321bfa70199585b7e4583baca1bec25f092a03c92dd', '[\"*\"]', NULL, NULL, '2026-01-27 00:31:04', '2026-01-27 00:31:04'),
(25, 'App\\Models\\User', 3, 'token', '1e85405f060e6ec293da193353d1765d231daa1a993e27eb7743445738918479', '[\"*\"]', NULL, NULL, '2026-01-27 00:32:15', '2026-01-27 00:32:15'),
(26, 'App\\Models\\User', 3, 'token', '3f1ada63916a4441022fc3e2e6f285ec193fd80275d35e989c8533823e5c1e68', '[\"*\"]', NULL, NULL, '2026-01-27 01:23:38', '2026-01-27 01:23:38'),
(27, 'App\\Models\\User', 3, 'token', '181baff6b57c9f6e591e0bea787d32479ace8847eab6474d854ee5185a2610ce', '[\"*\"]', NULL, NULL, '2026-01-27 01:23:40', '2026-01-27 01:23:40'),
(28, 'App\\Models\\User', 1, 'token', '96f2923c2401b562b2690f68c525426fe9fcb7b7b7afb6e65b356fd01c5f725c', '[\"*\"]', NULL, NULL, '2026-01-27 01:43:18', '2026-01-27 01:43:18'),
(29, 'App\\Models\\User', 3, 'token', '321d51aa7da6faf7a87708565ddd25ec0a3b77880c4bedf94e381afed25ce296', '[\"*\"]', NULL, NULL, '2026-01-27 01:50:09', '2026-01-27 01:50:09'),
(30, 'App\\Models\\User', 1, 'token', '6c52241727cc54327a6f807ab1395e9ae2bc66d0648d3dba7a3ccddf98ff1eaf', '[\"*\"]', '2026-02-02 07:55:27', NULL, '2026-02-02 07:54:32', '2026-02-02 07:55:27'),
(31, 'App\\Models\\User', 3, 'token', '568cb6fb117f5e0b2ddcf37cfc20d1454132f2c99249a2fa10b45d205192df9d', '[\"*\"]', NULL, NULL, '2026-02-02 08:25:29', '2026-02-02 08:25:29'),
(32, 'App\\Models\\User', 3, 'token', '248a8c78c808660c874538914af6e22e3dcf8878474265eddd552fe31bd1fc6f', '[\"*\"]', '2026-02-06 04:27:24', NULL, '2026-02-03 07:12:30', '2026-02-06 04:27:24'),
(33, 'App\\Models\\User', 3, 'token', '42796f36f013788c3e512aca1066fbc8e104aa4e6086342481d1d2309851d9c0', '[\"*\"]', '2026-02-06 01:08:29', NULL, '2026-02-03 09:52:31', '2026-02-06 01:08:29'),
(34, 'App\\Models\\User', 3, 'token', '079b65f010ab009bd8b5c3d2c864241c90a8617f2020a4ae2cd2c2c4b19a4e5f', '[\"*\"]', '2026-02-06 06:02:09', NULL, '2026-02-06 01:10:38', '2026-02-06 06:02:09'),
(35, 'App\\Models\\User', 3, 'token', '8e1338b10f94c8f03fff126884606c2e234fe9b844c86379922a9fcb64e65c85', '[\"*\"]', '2026-02-07 06:14:24', NULL, '2026-02-06 05:02:20', '2026-02-07 06:14:24'),
(36, 'App\\Models\\User', 3, 'token', '3672946bcd79235af0e19f281b61e6447ea61ec8a879ec2dfd8d0abf542d32b4', '[\"*\"]', '2026-02-07 06:42:18', NULL, '2026-02-07 00:31:31', '2026-02-07 06:42:18'),
(37, 'App\\Models\\User', 1, 'token', '3c5356489eec748a94ca04ff71a50423843bd5c4e3d3cca751b0595159f139a9', '[\"*\"]', '2026-02-07 07:43:50', NULL, '2026-02-07 00:32:17', '2026-02-07 07:43:50'),
(38, 'App\\Models\\User', 1, 'token', 'f7bed6e961a74477963f992531c05191f728cb5bc198c801ad15d8072fee9f5e', '[\"*\"]', '2026-02-07 06:13:57', NULL, '2026-02-07 01:05:33', '2026-02-07 06:13:57'),
(39, 'App\\Models\\User', 1, 'token', '5d6cba335c074292db36123bb8eae370397e324bde8215d5ea671a6b90a4b6de', '[\"*\"]', NULL, NULL, '2026-02-07 01:06:06', '2026-02-07 01:06:06'),
(40, 'App\\Models\\User', 1, 'token', '5507ec3f426e1ebf494d1ee7261d2cfe902599fb0baa494672a6e1639e51d79c', '[\"*\"]', NULL, NULL, '2026-02-07 01:06:23', '2026-02-07 01:06:23'),
(41, 'App\\Models\\User', 3, 'token', '0c56372a84102751ff5e1531f71cf0c1d9c96895ccaec93550e54fe69309e6a1', '[\"*\"]', '2026-02-07 05:55:54', NULL, '2026-02-07 05:47:27', '2026-02-07 05:55:54'),
(42, 'App\\Models\\User', 1, 'token', 'a9cb0a5279adff7d6292412f55c83269fdf15bb8c989b2212d9c305118d4b3a9', '[\"*\"]', '2026-02-07 07:40:06', NULL, '2026-02-07 05:56:30', '2026-02-07 07:40:06');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('DNovjDWEzvNBxRGO8B7ntSiAeBBEyG7aNHLWEBkD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiN3ZVV3pwaDB2YklmVVF5ZE42YWVVRlYxSEFxRDNXYXoxNFlhZ3c3YSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czoyNzoiZ2VuZXJhdGVkOjprRjlGUGIyNkhDT3lEbkhOIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770038552),
('DQGCR0JMRXNwZRiW7wzOXipd8B5nCuLz55Eq4Ag5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMmxJd0xucDdRdUxvSWRsbVI2bHdyR3NjQkhsY1d3SzRMWm1xQ1hEcCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1770116572),
('eRvP4FO7XDqIoFKGDINftXiFjL6KQM9GR6KYKOqs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieHloaFZRZXRRenZkcEtNRXNTN3RWYk1lQk1HNVZPc2Rxc2JYNTlvMCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768368419),
('P3KgLT8V3M7UE3DPvbjaaeb4lx8Etb1wfwBVlo83', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2Vjdko5YVRQUEN2Rk1MOU91VXV4TXJmT0RRc3FrMFkzTjdpY3EyTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7czoyNzoiZ2VuZXJhdGVkOjo5Y25qenJMa3NrOEQ1SDE2Ijt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1768470488),
('SXHWU2WvJeq9VOK1jFcrVvD4ltzWbVJWCAXB1PCU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYzY5cjFVMXhqemt3RkFKd0RRRnFCb0dSZEVQN3VrWkZRWFJUMjZLTCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1762775810);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_brands`
--

CREATE TABLE `tbl_brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_brands`
--

INSERT INTO `tbl_brands` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Levi\'s', 1, '2025-11-09 02:34:09', '2026-01-24 05:26:21'),
(2, 'Puma', 1, '2026-01-21 05:29:28', '2026-01-21 05:29:28'),
(3, 'Nike', 1, '2026-01-21 05:29:39', '2026-01-24 05:26:33'),
(4, 'Fling Machine', 1, '2026-01-24 05:26:48', '2026-01-24 05:26:48');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_categories`
--

CREATE TABLE `tbl_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_categories`
--

INSERT INTO `tbl_categories` (`id`, `name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kids', 1, '2025-11-09 02:23:40', '2026-01-24 05:27:00'),
(2, 'Men', 1, '2026-01-24 05:27:08', '2026-01-24 05:27:08'),
(3, 'Women', 1, '2026-01-24 05:27:16', '2026-01-24 05:27:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_orders`
--

CREATE TABLE `tbl_orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `sub_total` double NOT NULL,
  `grand_total` double NOT NULL,
  `shipping` double NOT NULL,
  `discount` double DEFAULT NULL,
  `status` enum('pending','shipped','delivered','cancelled') NOT NULL DEFAULT 'pending',
  `payment_status` enum('paid','not_paid') NOT NULL DEFAULT 'not_paid',
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_orders`
--

INSERT INTO `tbl_orders` (`id`, `user_id`, `sub_total`, `grand_total`, `shipping`, `discount`, `status`, `payment_status`, `name`, `email`, `mobile`, `address`, `city`, `zip`, `state`, `created_at`, `updated_at`) VALUES
(14, 3, 1000, 1200, 0, 0, 'pending', 'not_paid', 'John Doe', 'john@example.com', '9876543210', '123 Main Street', 'Los Angeles', '90001', 'California', '2026-02-03 07:54:35', '2026-02-03 07:54:35'),
(15, 3, 1000, 1200, 0, 0, 'pending', 'not_paid', 'John Doe', 'john@example.com', '9876543210', '123 Main Street', 'Los Angeles', '90001', 'California', '2026-02-03 08:05:21', '2026-02-03 08:05:21'),
(16, 3, 10, 10, 0, NULL, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 01:30:04', '2026-02-06 01:30:04'),
(17, 3, 10, 10, 0, NULL, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 01:37:06', '2026-02-06 01:37:06'),
(18, 3, 10, 10, 0, NULL, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 01:46:22', '2026-02-06 01:46:22'),
(19, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'fdsafdsafdsa', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:05:14', '2026-02-06 04:05:14'),
(20, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'fdsafdsafdsa', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:05:26', '2026-02-06 04:05:26'),
(21, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'fdsafdsafdsa', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:12:35', '2026-02-06 04:12:35'),
(22, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'fdsafdsafdsa', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:14:10', '2026-02-06 04:14:10'),
(23, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:15:04', '2026-02-06 04:15:04'),
(24, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:18:37', '2026-02-06 04:18:37'),
(29, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:24:44', '2026-02-06 04:24:44'),
(30, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:25:09', '2026-02-06 04:25:09'),
(31, 3, 10, 10, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 04:29:09', '2026-02-06 04:29:09'),
(32, 3, 33, 33, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 05:54:15', '2026-02-06 05:54:15'),
(33, 3, 33, 33, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 05:55:12', '2026-02-06 05:55:12'),
(34, 3, 33, 33, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 05:57:47', '2026-02-06 05:57:47'),
(35, 3, 99.99, 99.99, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 06:01:23', '2026-02-06 06:01:23'),
(36, 3, 99.99, 99.99, 0, 0, 'pending', 'not_paid', 'Yogesh Rathour', 'rathouryogesh40@gmail.com', '7235019434', 'Shivrajpur', 'Kanpur', '209210', 'Uttar Pradesh', '2026-02-06 06:02:09', '2026-02-06 06:02:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_order_items`
--

CREATE TABLE `tbl_order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `qty` int(11) NOT NULL,
  `price` double NOT NULL,
  `unit_price` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_order_items`
--

INSERT INTO `tbl_order_items` (`id`, `order_id`, `product_id`, `product_name`, `size`, `qty`, `price`, `unit_price`, `created_at`, `updated_at`) VALUES
(5, 17, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 01:37:06', '2026-02-06 01:37:06'),
(6, 18, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 01:46:22', '2026-02-06 01:46:22'),
(7, 19, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:05:14', '2026-02-06 04:05:14'),
(8, 20, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:05:26', '2026-02-06 04:05:26'),
(9, 21, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:12:35', '2026-02-06 04:12:35'),
(10, 22, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:14:10', '2026-02-06 04:14:10'),
(11, 23, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:15:04', '2026-02-06 04:15:04'),
(12, 24, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:18:37', '2026-02-06 04:18:37'),
(13, 29, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:24:44', '2026-02-06 04:24:44'),
(14, 30, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:25:09', '2026-02-06 04:25:09'),
(15, 31, 39, 'fdsafdsa', '4', 5, 100, 2, '2026-02-06 04:29:09', '2026-02-06 04:29:09'),
(16, 32, 45, 'fdsafdsafdsafds', '5', 2, 100, 5, '2026-02-06 05:54:15', '2026-02-06 05:54:15'),
(17, 32, 33, 'fdsfdsaf', '4', 1, 100, 23, '2026-02-06 05:54:15', '2026-02-06 05:54:15'),
(18, 33, 45, 'fdsafdsafdsafds', '5', 2, 100, 5, '2026-02-06 05:55:12', '2026-02-06 05:55:12'),
(19, 33, 33, 'fdsfdsaf', '4', 1, 100, 23, '2026-02-06 05:55:12', '2026-02-06 05:55:12'),
(20, 34, 45, 'fdsafdsafdsafds', '5', 2, 10, 5, '2026-02-06 05:57:47', '2026-02-06 05:57:47'),
(21, 34, 33, 'fdsfdsaf', '4', 1, 23, 23, '2026-02-06 05:57:47', '2026-02-06 05:57:47'),
(22, 35, 13, 'Sample Product Title', '3', 1, 99.99, 99.99, '2026-02-06 06:01:23', '2026-02-06 06:01:23'),
(23, 36, 13, 'Sample Product Title', '3', 1, 99.99, 99.99, '2026-02-06 06:02:09', '2026-02-06 06:02:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_products`
--

CREATE TABLE `tbl_products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `compare_price` double DEFAULT NULL,
  `description` text DEFAULT NULL,
  `short_description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `sku` varchar(255) NOT NULL,
  `barcode` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `is_featured` enum('yes','no') NOT NULL DEFAULT 'no',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_products`
--

INSERT INTO `tbl_products` (`id`, `title`, `price`, `compare_price`, `description`, `short_description`, `image`, `category_id`, `brand_id`, `qty`, `sku`, `barcode`, `status`, `is_featured`, `created_at`, `updated_at`) VALUES
(13, 'Sample Product Title', 99.99, 129.99, 'Thisz is a long description of the sample product, highlighting its key features and benefits.', 'A brief overview of the product.', '13-leHZXVpPR8-1769250465.jfif', 1, 1, 50, 'SP-762-2847000000008', 'test', 1, 'yes', '2025-11-09 04:35:45', '2026-01-25 02:07:17'),
(14, 'Sample Product Title', 99.99, 129.99, 'Thisz is a long description of the sample product, highlighting its key features and benefits.', 'A brief overview of the product.', '14-nCj9NQXcM4-1769326625.jfif', 1, 1, 50, 'SP-762-2847008', 'test', 1, 'yes', '2025-11-09 04:36:13', '2026-01-25 02:07:05'),
(15, 'Sample Product Title', 99.99, 129.99, 'Thisz is a long description of the sample product, highlighting its key features and benefits.', 'A brief overview of the product.', '15-IprFji3oZg-1769250441.jfif', 1, 4, 50, 'SP-762-28470008', 'test', 1, 'yes', '2025-11-09 04:38:09', '2026-01-24 05:50:03'),
(16, 'Sample Product Title', 99.99, 129.99, '<p>Thisz is a long description of the sample product, highlighting its key features and benefits.</p><p style=\"margin-left: 10px;\"><s>gdfsgfdsgf</s><s></s></p>', 'A brief overview of the product.', '16-VdBvmnUIP0-1769250548.jfif', 1, 1, 50, 'SP-762-284700008', 'test', 1, 'yes', '2025-11-09 04:38:27', '2026-01-25 04:40:51'),
(32, 'fdsfdsaf', 23, 20, '<p>sfdsffsfsfsfsdfsafdsfa3e</p>', 'fdsafdsafdsafdsasfdssf', '32-wn1yH33kT2-1769250494.jfif', 1, 1, 23, '234338fdsssssss', '33', 1, 'yes', '2026-01-21 02:21:02', '2026-01-24 05:03:40'),
(33, 'fdsfdsaf', 23, 0, '<p>sfdsffsfsfsfsdfsafdsfa3e</p>', 'fdsafdsafdsafdsasfdssf', '33-BzJ8O70M9W-1769249989.jfif', 1, 1, 23, '234338fdssssss', '33', 1, 'yes', '2026-01-21 02:21:34', '2026-01-24 05:03:49'),
(36, 'fdsafdsafdsafd', 3, 3, '<p><br></p><p>fdsafdsafdsafdsafsdafdsfafdsafdsadas</p><p><br></p>', 'safdsaf', '36-3Pdjb9I2DQ-1769249968.jfif', 1, 1, 3, '3dfsadfasfdsass', '3', 1, 'no', '2026-01-21 02:24:46', '2026-01-24 04:49:28'),
(37, 'fdsafdsafdsafd', 3, 3, '<p><br></p><p>fdsafdsafdsafdsafsdafdsfafdsafdsadas</p>', 'safdsaf', '37-am6rnTx0Po-1769249852.jfif', 2, 3, 3, '3dfsadfasfdsassSs', '3', 1, 'no', '2026-01-21 02:38:49', '2026-01-24 05:46:55'),
(38, 'fdsafdsafdsafd', 3, 3, '<p><br></p><p>fdsafdsafdsafdsafsdafdsfafdsafdsadas</p>', 'safdsaf', '38-BwQUa7UG7a-1769249819.jfif', 1, 1, 3, '3dfsadfasfdsassSss', '3', 1, 'no', '2026-01-21 02:39:38', '2026-01-24 04:46:59'),
(39, 'fdsafdsa', 2, 2, '<p>fdsafasfdsfdsfafdsa</p>', 'fdsafdsafdsafdsafdsa', '39-vrQy4v9GS4-1769250045.jfif', 3, 2, 2, '2fdfdsa', '2', 1, 'no', '2026-01-21 02:41:07', '2026-01-24 05:45:19'),
(42, 'tet produt', 200, 2000, '<p>fdsafdsafdsafdsasdfsfdsfdsafdsafdsafdsasdfsfdsfdsafdsafdsafdsasdfsfds<br>fdsafdsafdsafdsasdfsfds</p>', 'fdsafdsafdsafdsasdfsfds', '42-GTnemb9Ly8-1769337249.jfif', 3, 3, 122, 'fdsafdsafdsafds', 'afdsafdsafdsafds', 1, 'yes', '2026-01-25 03:43:13', '2026-01-25 05:04:09'),
(43, 'teasfdsafdsafdsafd', 500, 234, '<p>fdsfadsfsafdsfadsfasfds</p>', NULL, '43-SxLyVghYsy-1769337230.jfif', 3, 3, 122, 'ffd', 'afdsafdsafdsafds', 1, 'yes', '2026-01-25 03:47:22', '2026-01-25 05:05:50'),
(44, 'fdsafdsafdsa', 500, 3, '<p>afdsafdsafdsa</p>', 'fdsafdsafds', '44-kEv1oT7LDX-1769332763.jfif', 3, 1, 4, 'fdsafdsafdsa', 'fdsafds', 1, 'yes', '2026-01-25 03:49:23', '2026-01-25 05:03:26'),
(45, 'fdsafdsafdsafds', 5, 3, '<p>dsafdsafdsafdsfdsfds</p>', 'dsafdsaf', '45-D381C9xlKf-1769332869.jfif', 2, 4, 4, 'newsku', 'f', 1, 'yes', '2026-01-25 03:51:09', '2026-01-25 05:03:16'),
(46, 'fdsafdsafdsafdsafdsa', 500, 34, '<p style=\"margin-left: 10px;\">dsafdsafdsafdsafdsafdsaf</p>', 'dsafdsafdsfsafdsf', '46-7h1d2likTa-1769333110.jpg', 2, 2, 122, 'fdsafdsaf', 'afdsafdsafdsafds', 1, 'yes', '2026-01-25 03:55:10', '2026-01-25 03:55:11');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_images`
--

CREATE TABLE `tbl_product_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_product_images`
--

INSERT INTO `tbl_product_images` (`id`, `product_id`, `image`, `created_at`, `updated_at`) VALUES
(53, 39, '39-Qn6FziI31x-1769249660.png', '2026-01-24 04:44:20', '2026-01-24 04:44:20'),
(54, 39, '39-GGfFejjkJo-1769249660.png', '2026-01-24 04:44:21', '2026-01-24 04:44:21'),
(55, 38, '38-0yDmIdsAeL-1769249819.jfif', '2026-01-24 04:46:59', '2026-01-24 04:46:59'),
(56, 38, '38-BwQUa7UG7a-1769249819.jfif', '2026-01-24 04:46:59', '2026-01-24 04:46:59'),
(57, 38, '38-rBwgHEBulQ-1769249819.jfif', '2026-01-24 04:46:59', '2026-01-24 04:46:59'),
(58, 37, '37-am6rnTx0Po-1769249852.jfif', '2026-01-24 04:47:32', '2026-01-24 04:47:32'),
(59, 37, '37-qW3gG76YBT-1769249852.jfif', '2026-01-24 04:47:32', '2026-01-24 04:47:32'),
(60, 36, '36-3Pdjb9I2DQ-1769249968.jfif', '2026-01-24 04:49:28', '2026-01-24 04:49:28'),
(61, 36, '36-zi4J3CDEgn-1769249968.jfif', '2026-01-24 04:49:28', '2026-01-24 04:49:28'),
(62, 33, '33-BzJ8O70M9W-1769249989.jfif', '2026-01-24 04:49:49', '2026-01-24 04:49:49'),
(63, 39, '39-vrQy4v9GS4-1769250045.jfif', '2026-01-24 04:50:45', '2026-01-24 04:50:45'),
(64, 15, '15-IprFji3oZg-1769250441.jfif', '2026-01-24 04:57:21', '2026-01-24 04:57:21'),
(65, 13, '13-leHZXVpPR8-1769250465.jfif', '2026-01-24 04:57:45', '2026-01-24 04:57:45'),
(66, 32, '32-wn1yH33kT2-1769250494.jfif', '2026-01-24 04:58:14', '2026-01-24 04:58:14'),
(67, 16, '16-VdBvmnUIP0-1769250548.jfif', '2026-01-24 04:59:08', '2026-01-24 04:59:08'),
(68, 14, '14-nCj9NQXcM4-1769326625.jfif', '2026-01-25 02:07:05', '2026-01-25 02:07:05'),
(69, 15, '15-lBeYEdIm2N-1769329625.jfif', '2026-01-25 02:57:05', '2026-01-25 02:57:05'),
(70, 15, '15-gcKDUwhJqj-1769329625.jfif', '2026-01-25 02:57:05', '2026-01-25 02:57:05'),
(71, 15, '15-cX55iaDeWa-1769329625.jfif', '2026-01-25 02:57:05', '2026-01-25 02:57:05'),
(72, 16, '16-ixcqt3L0LC-1769331974.png', '2026-01-25 03:36:15', '2026-01-25 03:36:15'),
(73, 42, '42-cRq5L6ixuC-1769332393.png', '2026-01-25 03:43:14', '2026-01-25 03:43:14'),
(75, 44, '44-dqdlvFMhZx-1769332763.png', '2026-01-25 03:49:23', '2026-01-25 03:49:23'),
(76, 44, '44-kEv1oT7LDX-1769332763.jfif', '2026-01-25 03:49:23', '2026-01-25 03:49:23'),
(77, 45, '45-D381C9xlKf-1769332869.jfif', '2026-01-25 03:51:09', '2026-01-25 03:51:09'),
(78, 45, '45-pnKgSZyZLP-1769332869.png', '2026-01-25 03:51:09', '2026-01-25 03:51:09'),
(79, 46, '46-7h1d2likTa-1769333110.jpg', '2026-01-25 03:55:11', '2026-01-25 03:55:11'),
(80, 45, '45-knlaQovEFs-1769337196.jfif', '2026-01-25 05:03:16', '2026-01-25 05:03:16'),
(81, 43, '43-SxLyVghYsy-1769337230.jfif', '2026-01-25 05:03:50', '2026-01-25 05:03:50'),
(82, 43, '43-LEIx8DgaUj-1769337230.jfif', '2026-01-25 05:03:51', '2026-01-25 05:03:51'),
(83, 42, '42-GTnemb9Ly8-1769337249.jfif', '2026-01-25 05:04:09', '2026-01-25 05:04:09');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_product_sizes`
--

CREATE TABLE `tbl_product_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `size_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_product_sizes`
--

INSERT INTO `tbl_product_sizes` (`id`, `size_id`, `product_id`, `created_at`, `updated_at`) VALUES
(23, 1, 38, NULL, NULL),
(24, 3, 38, NULL, NULL),
(45, 4, 32, NULL, NULL),
(46, 3, 32, NULL, NULL),
(47, 4, 33, NULL, NULL),
(48, 4, 39, NULL, NULL),
(49, 1, 39, NULL, NULL),
(50, 4, 37, NULL, NULL),
(53, 1, 14, NULL, NULL),
(54, 4, 13, NULL, NULL),
(55, 3, 13, NULL, NULL),
(56, 5, 15, NULL, NULL),
(57, 4, 15, NULL, NULL),
(58, 2, 15, NULL, NULL),
(59, 3, 15, NULL, NULL),
(67, 3, 46, NULL, NULL),
(69, 4, 16, NULL, NULL),
(70, 5, 45, NULL, NULL),
(71, 4, 44, NULL, NULL),
(72, 1, 44, NULL, NULL),
(74, 1, 42, NULL, NULL),
(75, 2, 42, NULL, NULL),
(76, 5, 43, NULL, NULL),
(77, 4, 36, NULL, NULL),
(78, 1, 36, NULL, NULL),
(79, 3, 36, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sizes`
--

CREATE TABLE `tbl_sizes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_sizes`
--

INSERT INTO `tbl_sizes` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'S', NULL, NULL),
(2, 'M', NULL, NULL),
(3, 'L', NULL, NULL),
(4, 'XL', NULL, NULL),
(5, 'XXL', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_temp_images`
--

CREATE TABLE `tbl_temp_images` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_temp_images`
--

INSERT INTO `tbl_temp_images` (`id`, `name`, `created_at`, `updated_at`) VALUES
(16, '2025-11-091762682684.jpg', '2025-11-09 04:34:44', '2025-11-09 04:34:44'),
(17, '2025-11-091762682690.jpg', '2025-11-09 04:34:50', '2025-11-09 04:34:50'),
(18, '2025-11-091762682698.jpg', '2025-11-09 04:34:58', '2025-11-09 04:34:58'),
(19, '2026-01-211768975183.jpg', '2026-01-21 00:29:43', '2026-01-21 00:29:43'),
(20, '2026-01-211768975650.png', '2026-01-21 00:37:30', '2026-01-21 00:37:30'),
(21, '2026-01-211768976760.jpg', '2026-01-21 00:56:00', '2026-01-21 00:56:00'),
(22, '2026-01-211768976771.png', '2026-01-21 00:56:11', '2026-01-21 00:56:11'),
(23, '2026-01-211768977137.png', '2026-01-21 01:02:17', '2026-01-21 01:02:17'),
(24, '2026-01-211768977314.jpg', '2026-01-21 01:05:14', '2026-01-21 01:05:14'),
(25, '2026-01-211768977327.jpeg', '2026-01-21 01:05:27', '2026-01-21 01:05:27'),
(26, '2026-01-211768977348.jpg', '2026-01-21 01:05:48', '2026-01-21 01:05:48'),
(27, '2026-01-211768977362.jpg', '2026-01-21 01:06:02', '2026-01-21 01:06:02'),
(28, '2026-01-211768979714.png', '2026-01-21 01:45:14', '2026-01-21 01:45:14'),
(29, '2026-01-211768979720.jpeg', '2026-01-21 01:45:20', '2026-01-21 01:45:20'),
(30, '2026-01-211768979918.png', '2026-01-21 01:48:38', '2026-01-21 01:48:38'),
(31, '2026-01-211768980581.jpeg', '2026-01-21 01:59:41', '2026-01-21 01:59:41'),
(32, '2026-01-211768980683.jpeg', '2026-01-21 02:01:23', '2026-01-21 02:01:23'),
(33, '2026-01-211768980761.jpeg', '2026-01-21 02:02:41', '2026-01-21 02:02:41'),
(34, '2026-01-211768980784.jpeg', '2026-01-21 02:03:04', '2026-01-21 02:03:04'),
(35, '2026-01-211768980836.jpeg', '2026-01-21 02:03:56', '2026-01-21 02:03:56'),
(36, '2026-01-211768980843.jpg', '2026-01-21 02:04:03', '2026-01-21 02:04:03'),
(37, '2026-01-211768981653.jpeg', '2026-01-21 02:17:33', '2026-01-21 02:17:33'),
(38, '2026-01-211768981961.jpg', '2026-01-21 02:22:41', '2026-01-21 02:22:41'),
(39, '2026-01-211768981966.jpeg', '2026-01-21 02:22:46', '2026-01-21 02:22:46'),
(40, '2026-01-211768983063.jpg', '2026-01-21 02:41:03', '2026-01-21 02:41:03'),
(41, '2026-01-211768983522.jpeg', '2026-01-21 02:48:42', '2026-01-21 02:48:42'),
(42, '2026-01-211768983562.jpeg', '2026-01-21 02:49:22', '2026-01-21 02:49:22'),
(43, '2026-01-211768983601.jpg', '2026-01-21 02:50:01', '2026-01-21 02:50:01'),
(44, '2026-01-211768983633.jpeg', '2026-01-21 02:50:33', '2026-01-21 02:50:33'),
(45, '2026-01-211768987599.jpg', '2026-01-21 03:56:39', '2026-01-21 03:56:39'),
(46, '2026-01-211768987683.jpeg', '2026-01-21 03:58:03', '2026-01-21 03:58:03'),
(47, '2026-01-211768990030.jpg', '2026-01-21 04:37:10', '2026-01-21 04:37:10'),
(48, '2026-01-211768990183.jpeg', '2026-01-21 04:39:43', '2026-01-21 04:39:43'),
(49, '2026-01-211768990283.jpg', '2026-01-21 04:41:23', '2026-01-21 04:41:23'),
(50, '2026-01-211768990396.jpeg', '2026-01-21 04:43:16', '2026-01-21 04:43:16'),
(51, '2026-01-211768990421.jpg', '2026-01-21 04:43:41', '2026-01-21 04:43:41'),
(52, '2026-01-211768990441.jpeg', '2026-01-21 04:44:01', '2026-01-21 04:44:01'),
(53, '2026-01-211768990475.jpeg', '2026-01-21 04:44:35', '2026-01-21 04:44:35'),
(54, '2026-01-211768990589.jpeg', '2026-01-21 04:46:29', '2026-01-21 04:46:29'),
(55, '2026-01-211768991441.jpeg', '2026-01-21 05:00:41', '2026-01-21 05:00:41'),
(56, '2026-01-211768991451.jpeg', '2026-01-21 05:00:51', '2026-01-21 05:00:51'),
(57, '2026-01-211768991482.jpeg', '2026-01-21 05:01:22', '2026-01-21 05:01:22'),
(58, '2026-01-211768991523.png', '2026-01-21 05:02:03', '2026-01-21 05:02:03'),
(59, '2026-01-211768991532.png', '2026-01-21 05:02:12', '2026-01-21 05:02:12'),
(60, '2026-01-211768991778.png', '2026-01-21 05:06:18', '2026-01-21 05:06:18'),
(61, '2026-01-211768991901.png', '2026-01-21 05:08:21', '2026-01-21 05:08:21'),
(62, '2026-01-211768992016.png', '2026-01-21 05:10:16', '2026-01-21 05:10:16'),
(63, '2026-01-211768992212.jpg', '2026-01-21 05:13:32', '2026-01-21 05:13:32'),
(64, '2026-01-211768992225.png', '2026-01-21 05:13:45', '2026-01-21 05:13:45'),
(65, '2026-01-211768992260.png', '2026-01-21 05:14:20', '2026-01-21 05:14:20'),
(66, '2026-01-211768992265.png', '2026-01-21 05:14:25', '2026-01-21 05:14:25'),
(67, '2026-01-211768992271.jpeg', '2026-01-21 05:14:31', '2026-01-21 05:14:31'),
(68, '2026-01-211768992317.png', '2026-01-21 05:15:17', '2026-01-21 05:15:17'),
(69, '2026-01-211768992328.png', '2026-01-21 05:15:28', '2026-01-21 05:15:28'),
(70, '2026-01-211768992338.jpeg', '2026-01-21 05:15:38', '2026-01-21 05:15:38'),
(71, '2026-01-211768992597.jpeg', '2026-01-21 05:19:57', '2026-01-21 05:19:57'),
(72, '2026-01-211768992602.jpg', '2026-01-21 05:20:02', '2026-01-21 05:20:02'),
(73, '2026-01-211768992609.png', '2026-01-21 05:20:09', '2026-01-21 05:20:09'),
(74, '2026-01-221769063291.jpg', '2026-01-22 00:58:11', '2026-01-22 00:58:11'),
(75, '2026-01-221769063321.jpg', '2026-01-22 00:58:41', '2026-01-22 00:58:41'),
(76, '2026-01-221769063382.png', '2026-01-22 00:59:42', '2026-01-22 00:59:42'),
(77, '2026-01-221769063534.jpg', '2026-01-22 01:02:14', '2026-01-22 01:02:14'),
(78, '2026-01-221769063542.jpg', '2026-01-22 01:02:22', '2026-01-22 01:02:22'),
(79, '2026-01-221769063553.jpeg', '2026-01-22 01:02:33', '2026-01-22 01:02:33'),
(80, '2026-01-221769063568.jpeg', '2026-01-22 01:02:48', '2026-01-22 01:02:48'),
(81, '2026-01-221769063625.png', '2026-01-22 01:03:45', '2026-01-22 01:03:45'),
(82, '2026-01-221769063677.png', '2026-01-22 01:04:37', '2026-01-22 01:04:37'),
(83, '2026-01-221769063696.jpg', '2026-01-22 01:04:56', '2026-01-22 01:04:56'),
(84, '2026-01-221769063911.jpeg', '2026-01-22 01:08:31', '2026-01-22 01:08:31'),
(85, '2026-01-221769064089.png', '2026-01-22 01:11:29', '2026-01-22 01:11:29'),
(86, '2026-01-221769064129.jpg', '2026-01-22 01:12:09', '2026-01-22 01:12:09'),
(87, '2026-01-221769064194.jpg', '2026-01-22 01:13:14', '2026-01-22 01:13:14'),
(88, '2026-01-221769064933.png', '2026-01-22 01:25:33', '2026-01-22 01:25:33'),
(89, '2026-01-221769075341.jpg', '2026-01-22 04:19:01', '2026-01-22 04:19:01'),
(90, '2026-01-221769075430.jpg', '2026-01-22 04:20:30', '2026-01-22 04:20:30'),
(91, '2026-01-221769075469.jpg', '2026-01-22 04:21:09', '2026-01-22 04:21:09'),
(92, '2026-01-221769075615.jpeg', '2026-01-22 04:23:35', '2026-01-22 04:23:35'),
(93, '2026-01-231769149854.jpeg', '2026-01-23 01:00:54', '2026-01-23 01:00:54'),
(94, '2026-01-231769150279.png', '2026-01-23 01:07:59', '2026-01-23 01:07:59'),
(95, '2026-01-231769150286.jpg', '2026-01-23 01:08:06', '2026-01-23 01:08:06'),
(96, '2026-01-231769150293.jpeg', '2026-01-23 01:08:13', '2026-01-23 01:08:13'),
(97, '2026-01-231769150305.jpg', '2026-01-23 01:08:25', '2026-01-23 01:08:25'),
(98, '2026-01-231769150983.jpeg', '2026-01-23 01:19:43', '2026-01-23 01:19:43'),
(99, '2026-01-231769152678.jpg', '2026-01-23 01:47:58', '2026-01-23 01:47:58'),
(100, '2026-01-231769153644.jpg', '2026-01-23 02:04:04', '2026-01-23 02:04:04'),
(101, '2026-01-231769153652.jpg', '2026-01-23 02:04:12', '2026-01-23 02:04:12'),
(102, '2026-01-231769153658.jpg', '2026-01-23 02:04:18', '2026-01-23 02:04:18'),
(103, '2026-01-231769154277.png', '2026-01-23 02:14:37', '2026-01-23 02:14:37'),
(104, '2026-01-231769156064.jpeg', '2026-01-23 02:44:24', '2026-01-23 02:44:24'),
(105, '2026-01-231769156129.jpg', '2026-01-23 02:45:29', '2026-01-23 02:45:29'),
(106, '2026-01-231769156134.jpg', '2026-01-23 02:45:34', '2026-01-23 02:45:34'),
(107, '2026-01-231769156407.jpeg', '2026-01-23 02:50:07', '2026-01-23 02:50:07'),
(108, '2026-01-231769156806.png', '2026-01-23 02:56:46', '2026-01-23 02:56:46'),
(109, '2026-01-231769157289.png', '2026-01-23 03:04:49', '2026-01-23 03:04:49'),
(110, '2026-01-231769157341.jpeg', '2026-01-23 03:05:41', '2026-01-23 03:05:41'),
(111, '2026-01-231769164036.jpg', '2026-01-23 04:57:16', '2026-01-23 04:57:16'),
(112, '2026-01-231769164085.jpg', '2026-01-23 04:58:05', '2026-01-23 04:58:05'),
(113, '2026-01-231769164298.png', '2026-01-23 05:01:38', '2026-01-23 05:01:38'),
(114, '2026-01-231769164582.jpg', '2026-01-23 05:06:22', '2026-01-23 05:06:22'),
(115, '2026-01-231769164760.jpg', '2026-01-23 05:09:20', '2026-01-23 05:09:20'),
(116, '2026-01-231769166624.jpg', '2026-01-23 05:40:24', '2026-01-23 05:40:24'),
(117, '2026-01-231769167852.jpg', '2026-01-23 06:00:52', '2026-01-23 06:00:52'),
(118, '2026-01-231769167856.jpeg', '2026-01-23 06:00:56', '2026-01-23 06:00:56'),
(119, '2026-01-231769167913.jpeg', '2026-01-23 06:01:53', '2026-01-23 06:01:53'),
(120, '2026-01-231769168018.jpg', '2026-01-23 06:03:38', '2026-01-23 06:03:38'),
(121, '2026-01-231769168225.jpg', '2026-01-23 06:07:05', '2026-01-23 06:07:05'),
(122, '2026-01-231769168258.jpg', '2026-01-23 06:07:38', '2026-01-23 06:07:38'),
(123, '2026-01-231769168351.png', '2026-01-23 06:09:11', '2026-01-23 06:09:11'),
(124, '2026-01-231769168356.jpg', '2026-01-23 06:09:16', '2026-01-23 06:09:16'),
(125, '2026-01-231769168429.jpeg', '2026-01-23 06:10:29', '2026-01-23 06:10:29'),
(126, '2026-01-231769168511.jpg', '2026-01-23 06:11:51', '2026-01-23 06:11:51'),
(127, '2026-01-231769168692.jpeg', '2026-01-23 06:14:52', '2026-01-23 06:14:52'),
(128, '2026-01-231769168696.jpg', '2026-01-23 06:14:56', '2026-01-23 06:14:56'),
(129, '2026-01-231769169300.jpg', '2026-01-23 06:25:00', '2026-01-23 06:25:00'),
(130, '2026-01-231769169335.jpg', '2026-01-23 06:25:35', '2026-01-23 06:25:35'),
(131, '2026-01-231769169613.jpg', '2026-01-23 06:30:13', '2026-01-23 06:30:13'),
(132, '2026-01-231769169659.jpeg', '2026-01-23 06:30:59', '2026-01-23 06:30:59'),
(133, '2026-01-231769169932.jpg', '2026-01-23 06:35:32', '2026-01-23 06:35:32'),
(134, '2026-01-231769170077.jpg', '2026-01-23 06:37:57', '2026-01-23 06:37:57'),
(135, '2026-01-231769170293.jpg', '2026-01-23 06:41:33', '2026-01-23 06:41:33'),
(136, '2026-01-231769171138.jpg', '2026-01-23 06:55:38', '2026-01-23 06:55:38'),
(137, '2026-01-231769172217.jpg', '2026-01-23 07:13:37', '2026-01-23 07:13:37'),
(139, '2026-01-241769236715.jpg', '2026-01-24 01:08:35', '2026-01-24 01:08:35'),
(140, '2026-01-241769236783.jpeg', '2026-01-24 01:09:43', '2026-01-24 01:09:43'),
(141, '2026-01-241769236882.jpg', '2026-01-24 01:11:22', '2026-01-24 01:11:22'),
(142, '2026-01-241769236950.jpg', '2026-01-24 01:12:30', '2026-01-24 01:12:30'),
(148, '2026-01-241769249694.png', '2026-01-24 04:44:54', '2026-01-24 04:44:54'),
(167, '2026-01-251769332294.png', '2026-01-25 03:41:34', '2026-01-25 03:41:34'),
(169, '2026-01-251769332528.jpg', '2026-01-25 03:45:28', '2026-01-25 03:45:28');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('admin','customer') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@example.com', 'admin', '2025-11-09 01:59:30', '$2y$12$uLVLx5tbsSH1dGcgMFpxSupzXfcwkVPL5agp.VdBEGPJ/hjDsm63G', 'QwZ8JQdpsB', '2025-11-09 01:59:30', '2026-01-14 02:43:35'),
(2, 'user one', 'user@email.com', 'customer', NULL, '$2y$12$AWAkdzF2TxZUea/D2j6l2OTItmMykIfbBl7IxMh5Ycghl/sBeasNK', NULL, NULL, NULL),
(3, 'user', 'usertwo@email.com', 'customer', NULL, '$2y$12$O8bqX9HfHD2wPQKRVAwUZeTIjPkBoiEdhN2Q/1BPNliGFIWaLqYca', NULL, NULL, '2026-02-02 08:25:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tbl_brands`
--
ALTER TABLE `tbl_brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_orders_user_id_foreign` (`user_id`);

--
-- Indexes for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_order_items_order_id_foreign` (`order_id`),
  ADD KEY `tbl_order_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_products_category_id_foreign` (`category_id`),
  ADD KEY `tbl_products_brand_id_foreign` (`brand_id`);

--
-- Indexes for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_product_images_product_id_foreign` (`product_id`);

--
-- Indexes for table `tbl_product_sizes`
--
ALTER TABLE `tbl_product_sizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tbl_product_sizes_size_id_foreign` (`size_id`),
  ADD KEY `tbl_product_sizes_product_id_foreign` (`product_id`);

--
-- Indexes for table `tbl_sizes`
--
ALTER TABLE `tbl_sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_temp_images`
--
ALTER TABLE `tbl_temp_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `tbl_brands`
--
ALTER TABLE `tbl_brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_categories`
--
ALTER TABLE `tbl_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_products`
--
ALTER TABLE `tbl_products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `tbl_product_sizes`
--
ALTER TABLE `tbl_product_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `tbl_sizes`
--
ALTER TABLE `tbl_sizes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tbl_temp_images`
--
ALTER TABLE `tbl_temp_images`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_orders`
--
ALTER TABLE `tbl_orders`
  ADD CONSTRAINT `tbl_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_order_items`
--
ALTER TABLE `tbl_order_items`
  ADD CONSTRAINT `tbl_order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `tbl_orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_products`
--
ALTER TABLE `tbl_products`
  ADD CONSTRAINT `tbl_products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `tbl_brands` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `tbl_categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_product_images`
--
ALTER TABLE `tbl_product_images`
  ADD CONSTRAINT `tbl_product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `tbl_product_sizes`
--
ALTER TABLE `tbl_product_sizes`
  ADD CONSTRAINT `tbl_product_sizes_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `tbl_products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tbl_product_sizes_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `tbl_sizes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
