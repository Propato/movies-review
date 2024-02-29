-- Definição DDL da estrutura do Banco de Dados.
DROP DATABASE IF EXISTS `db`;
CREATE DATABASE `db`;
USE `db`;

-- Definição da tabela Users.
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `birthday` DATE NOT NULL,

    `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(30) NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `usersPK` PRIMARY KEY (`id`),
    UNIQUE (`email`)
);

CREATE INDEX idxLogin
ON Users (`email`, `password`)
USING BTREE
;

-- Definição da tabela Reviews.
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `movieId` VARCHAR(20) NOT NULL,
    `rate` CHAR(3) NOT NULL,
    `review` VARCHAR(120) NOT NULL,

    CONSTRAINT `reviewsPK` PRIMARY KEY (`movieId`, `userId`),
    CONSTRAINT `reviewsFK` FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxUserReviews
ON Reviews (`userId` ASC)
USING BTREE
;

DROP TABLE IF EXISTS `List`;
CREATE TABLE `List` (
    `listId` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `listName` VARCHAR(30) NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `listPK` PRIMARY KEY (`listId`),
    UNIQUE (`userId`, `listName`),
    CONSTRAINT `listFK` FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxList
ON List (`userId` ASC)
USING BTREE
;

-- Definição da tabela MovieList.
DROP TABLE IF EXISTS `MovieFromList`;
CREATE TABLE `MovieFromList` (
    `movieId` VARCHAR(20) NOT NULL,
    `listId` MEDIUMINT UNSIGNED NOT NULL,

    CONSTRAINT `movieListPK` PRIMARY KEY (`movieId`, `listId`),
    CONSTRAINT `movieListFK` FOREIGN KEY (listId) REFERENCES List(listId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxUserList
ON MovieFromList (`listId` ASC)
USING BTREE
;

-- EXEMPLO: INSERT INTO `Users` (`name`, `birthday`, `email`, `password`) VALUES ('aaa', '2023-10-10', 'david@propato.com', '1234');