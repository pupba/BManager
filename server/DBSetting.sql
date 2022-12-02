-- phpMyAdmin SQL Dump
-- version 4.0.0
-- http://www.phpmyadmin.net
--
-- 호스트: localhost
-- 처리한 시간: 22-12-02 00:53
-- 서버 버전: 5.1.45-log
-- PHP 버전: 5.2.17p1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 데이터베이스: `happylife7805`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `manager_info_management`
--

CREATE TABLE IF NOT EXISTS `manager_info_management` (
  `m_no` int(11) NOT NULL AUTO_INCREMENT,
  `m_name` varchar(255) NOT NULL,
  `m_depart` varchar(255) NOT NULL,
  `m_wallet_address` varchar(255) NOT NULL,
  PRIMARY KEY (`m_no`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- 테이블 구조 `User_info_management`
--

CREATE TABLE IF NOT EXISTS `User_info_management` (
  `u_no` int(11) NOT NULL AUTO_INCREMENT,
  `u_name` varchar(255) NOT NULL,
  `u_depart` varchar(255) NOT NULL,
  `u_wallet_address` varchar(255) NOT NULL,
  PRIMARY KEY (`u_no`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;