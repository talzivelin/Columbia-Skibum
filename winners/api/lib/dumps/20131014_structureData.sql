-- phpMyAdmin SQL Dump
-- version 3.5.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 15, 2013 at 01:00 AM
-- Server version: 5.5.29
-- PHP Version: 5.4.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `skibum`
--

-- --------------------------------------------------------

--
-- Table structure for table `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(500) NOT NULL,
  `answer1` varchar(500) NOT NULL,
  `answer2` varchar(500) NOT NULL,
  `vote_answer1` int(11) DEFAULT '0',
  `vote_answer2` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=30 ;

--
-- Dumping data for table `questions`
--

INSERT INTO `questions` (`id`, `text`, `answer1`, `answer2`, `vote_answer1`, `vote_answer2`) VALUES
(3, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Tip Cork 540', 'Butter Muffin Top 360', 1, 1),
(4, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Quad Cork Backside 5', 'Lincoln Loop', 6, 0),
(5, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Lincoln Loop', 'Lincoln Log', 3, 3),
(6, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Switch Rail 360', 'Triple Cork Nosebleed Taco', 3, 4),
(7, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Backside 270', '360 Curbstomper', 1, 0),
(8, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Double Cork', 'Pickaxe Barrel Bonk', 3, 3),
(9, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Nose Butter Triple Cork', '360 Mute Pickle', 4, 1),
(10, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', '270 On Off Pretzel', '360 Nurple Drag', 2, 1),
(11, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Switch Double Misty 1260', 'Switch Triple Blazed 9', 1, 0),
(12, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Switch 1080 Japan', '360 Godzilla Grab', 1, 2),
(13, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Nose Butter Triple Cork 1620', 'Switch Money Bellringer 5', 1, 2),
(14, 'Trick or Sh!&? Choose the trick, not the sh#$.\n', 'Double Cork Octograb', '1080 Pucker-Upper', 2, 3),
(15, 'Ski-pourri &mdash; How do you shred?', 'Regular', 'Switch', 3, 3),
(16, 'Ski-pourri &mdash; How do you shred?', 'Air', 'Rail', 6, 2),
(17, 'Ski-pourri &mdash; How do you shred?', 'Groomers', 'Backcountry', 3, 2),
(18, 'Ski-pourri &mdash; How do you shred?', 'Gloves', 'Mittens', 1, 2),
(19, 'Ski-pourri &mdash; How do you shred?', 'Trees', 'Drops', 2, 1),
(20, 'Ski-pourri &mdash; How do you shred?', 'Flow', 'Tech', 1, 3),
(21, 'Ski-pourri &mdash; How do you shred?', 'Drop', 'Jump', 3, 1),
(22, 'Ski-pourri &mdash; How do you shred?', 'Park', 'Pipe', 3, 1),
(23, 'Ski-pourri &mdash; How do you shred?', 'Steep and Deep', 'Park and Pipe', 1, 5),
(24, 'Ski Bum Essentials &mdash; What do you grab first?', 'Toilet paper', 'Beer', 1, 3),
(25, 'Ski Bum Essentials &mdash; What do you grab first?', 'Ski Pants', 'Gloves', 2, 2),
(26, 'Ski Bum Essentials &mdash; What do you grab first?', 'Toothbrush', 'Underwear', 1, 4),
(27, 'Ski Bum Essentials &mdash; What do you grab first?', 'Pants', 'Lift Ticket', 3, 2),
(28, 'Ski Bum Essentials &mdash; What do you grab first?', 'Breakfast', 'Lunch', 2, 2),
(29, 'Ski Bum Essentials &mdash; What do you grab first?', 'ID', 'Credit Card', 2, 4);
