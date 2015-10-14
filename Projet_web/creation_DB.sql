-- phpMyAdmin SQL Dump
-- version 4.0.5
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Dim 19 Avril 2015 à 18:37
-- Version du serveur: 5.5.41-0ubuntu0.14.10.1
-- Version de PHP: 5.5.12-2ubuntu4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `musicplayer`
--

-- --------------------------------------------------------

--
-- Structure de la table `playlists`
--

CREATE TABLE IF NOT EXISTS `playlists` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `tracks`
--

CREATE TABLE IF NOT EXISTS `tracks` (
  `id` int(11) NOT NULL,
  `titre` text NOT NULL,
  `artiste` text NOT NULL,
  `album` text NOT NULL,
  `cover` text NOT NULL,
  `preview` text NOT NULL,
  `genres` text NOT NULL,
  `releaseDate` text NOT NULL,
  `duration` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `tracks`
--

INSERT INTO `tracks` (`id`, `titre`, `artiste`, `album`, `cover`, `preview`, `genres`, `releaseDate`, `duration`) VALUES
(307143, 'Grind Wit', 'Benighted', 'Icon', 'https://api.deezer.com/artist/10328/image', 'http://cdn-preview-e.deezer.com/stream/ed81a2bdb607dd0e814bebe2dc7b3141-4.mp3', 'Pop, Rock, Metal/HardRock', '2007-10-15', 200),
(663451, 'Superstar (feat. Matthew Santos)', 'Lupe Fiasco', 'Lupe Fiasco''s The Cool', 'http://api.deezer.com/album/80476/image', 'http://cdn-preview-b.deezer.com/stream/b9062449c18946d5ea62ee468045af84-5.mp3', 'Hip Hop', '2007-01-01', 291),
(663452, 'Paris, Tokyo', 'Lupe Fiasco', 'Lupe Fiasco''s The Cool', 'http://api.deezer.com/album/80476/image', 'http://cdn-preview-2.deezer.com/stream/2a501ed4c17a86510dde63a18919ac55-5.mp3', 'Hip Hop', '2007-01-01', 271),
(1109697, 'Place 54', 'Hocus Pocus', 'Place 54', 'http://api.deezer.com/album/119604/image', 'http://cdn-preview-f.deezer.com/stream/f594df0a57abf1d0eb5161176b06f946-4.mp3', 'Hip Hop', '2007-01-01', 301);

-- --------------------------------------------------------

--
-- Structure de la table `tracks_playlists`
--

CREATE TABLE IF NOT EXISTS `tracks_playlists` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `userId` int(255) NOT NULL,
  `playlistId` int(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `login` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
