-- Definição DDL da estrutura do Banco de Dados.
DROP DATABASE IF EXISTS `db`;
CREATE DATABASE `db`;
USE `db`;

-- Definição da tabela Users.
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    `birthday` DATE NOT NULL,

    `email` VARCHAR(60) NOT NULL,
    `password` VARCHAR(30) NOT NULL,

    CONSTRAINT `usersPK` PRIMARY KEY (`id`),
    UNIQUE (`email`)
) ENGINE=InnoDB;

CREATE INDEX idxLogin
ON Users (`email`, `password`)
USING HASH
;

-- Definição da tabela Reviews.
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
    `movieId` VARCHAR(20) NOT NULL,
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `rate` CHAR(1) NOT NULL,
    `review` VARCHAR(120) NOT NULL,

    CONSTRAINT `reviewsPK` PRIMARY KEY (`movieId`, `userId`),
    CONSTRAINT "reviewsFK" FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idxUserReviews
ON Reviews (`userId` ASC)
USING BTREE
;

-- Definição da tabela MovieList.
DROP TABLE IF EXISTS `MovieList`;
CREATE TABLE `MovieList` (
    `movieId` VARCHAR(20) NOT NULL,
    `userId` MEDIUMINT UNSIGNED NOT NULL,

    CONSTRAINT `reviewsPK` PRIMARY KEY (`movieId`, `userId`),
    CONSTRAINT "reviewsFK" FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE INDEX idxUserList
ON MovieList (`userId` ASC)
USING BTREE
;