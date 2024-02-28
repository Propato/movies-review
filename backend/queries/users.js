/*
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
*/

// export async function createUser(name, birthday, email, password){
//     const query = INSERT INTO `Users` (`name`, `birthday`, `email`, `password`) VALUES ("aaa", "2023-10-10", "david@propato.com", "1234");
// }