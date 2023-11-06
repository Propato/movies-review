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
);

CREATE INDEX idxLogin
ON Users (`email`, `password`)
USING BTREE
;

-- Definição da tabela Reviews.
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
    `movieId` VARCHAR(20) NOT NULL,
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `rate` CHAR(1) NOT NULL,
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
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `name` VARCHAR(30) NOT NULL,

    CONSTRAINT `listPK` PRIMARY KEY (`id`),
    UNIQUE (`userId`, `name`),
    CONSTRAINT `listFK` FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxList
ON List (`userId` ASC)
USING BTREE
;

-- Definição da tabela MovieList.
DROP TABLE IF EXISTS `MovieList`;
CREATE TABLE `MovieList` (
    `movieId` VARCHAR(20) NOT NULL,
    `listId` MEDIUMINT UNSIGNED NOT NULL,

    CONSTRAINT `movieListPK` PRIMARY KEY (`movieId`, `listId`),
    CONSTRAINT `movieListFK` FOREIGN KEY (listId) REFERENCES List(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxUserList
ON MovieList (`listId` ASC)
USING BTREE
;