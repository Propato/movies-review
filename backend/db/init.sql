-- Definição DDL da estrutura do Banco de Dados.
DROP DATABASE IF EXISTS `movies-db`;
CREATE DATABASE `movies-db`;
USE `movies-db`;

-- Definição da tabela Users.
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `birthday` DATE,

    `email` VARCHAR(60) NOT NULL,
    `passhash` VARCHAR(30) NOT NULL,
    `passcode` VARCHAR(10) NOT NULL,

    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `usersPK` PRIMARY KEY (`id`)
);

CREATE UNIQUE INDEX idxLogin
ON Users (`email`)
USING BTREE
;

-- Definição da tabela List.
DROP TABLE IF EXISTS `Lists`;
CREATE TABLE `Lists` (
    `listId` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `listName` VARCHAR(30) NOT NULL,
    `description` VARCHAR(120),

    CONSTRAINT `listPK` PRIMARY KEY (`listId`, `userId`),
    UNIQUE (`userId`, `listName`),
    CONSTRAINT `listFK` FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxLists
ON Lists (`userId` ASC)
USING BTREE
;

-- Definição da tabela Reviews.
DROP TABLE IF EXISTS `Reviews`;
CREATE TABLE `Reviews` (
    `userId` MEDIUMINT UNSIGNED NOT NULL,
    `listId` MEDIUMINT UNSIGNED NOT NULL,
    `movieId` VARCHAR(20) NOT NULL,
    `rate` CHAR(3),
    `review` VARCHAR(120),
    
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT `reviewsPK` PRIMARY KEY (`movieId`, `listId`, `userId`),
    CONSTRAINT `reviewsFKUsers` FOREIGN KEY (userId) REFERENCES Users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT `reviewsFKLists` FOREIGN KEY (listId) REFERENCES Lists(listId) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX idxUserReviews
ON Reviews (`userId`, `listId` ASC)
USING BTREE
;

-- EXEMPLO: INSERT INTO `Users` (`name`, `birthday`, `email`, `passhash`, `passcode`) VALUES ('aaa', '2023-10-10', 'david@propato.com', '1234', 'abc');