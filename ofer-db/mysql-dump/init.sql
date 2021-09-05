    
    DROP DATABASE IF EXISTS `testDB`;
    CREATE DATABASE `testDB`;
    USE `testDB`;

    
    CREATE TABLE `roles`  (
    `Id` int(11) NOT NULL AUTO_INCREMENT,
    `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    PRIMARY KEY (`Id`) USING BTREE
    ) ENGINE = InnoDB;



    -- ----------------------------

    -- Records of roles

    -- ----------------------------

    INSERT INTO `roles` VALUES (1, 'Manager');
    INSERT INTO `roles` VALUES (2, 'Waiter');
    INSERT INTO `roles` VALUES (3, 'Programmer');
    INSERT INTO `roles` VALUES (4, 'developer');


    -- ----------------------------

    -- Table structure for employees

    -- ----------------------------

    CREATE TABLE `employees`  (
    `Id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
    PRIMARY KEY (`Id`) USING BTREE
    ) ENGINE = InnoDB;



    -- ----------------------------

    -- Records of employees

    -- ----------------------------

    INSERT INTO `employees` VALUES (1, 'User1');
    INSERT INTO `employees` VALUES (2, 'User2');
    INSERT INTO `employees` VALUES (3, 'User3');

    CREATE TABLE `employees_roles` (
            employeeId   int(11)  NOT NULL,
            roleId  int(11)  NOT NULL,
            enabled		boolean NOT NULL DEFAULT false,     
            actionTime datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,       

            PRIMARY KEY (employeeId, roleId),                     -- uniqueness
            
            FOREIGN KEY (employeeId)  REFERENCES employees  (Id),
            FOREIGN KEY (roleId) REFERENCES roles (Id)

            ) ENGINE = InnoDB;

    

    insert into employees_roles (employeeId,roleId, enabled, actionTime) VALUES(1, 1,true, '2018-01-01 20:00:19');
    insert into employees_roles (employeeId,roleId, enabled, actionTime) VALUES(1, 2,false,  '2018-01-01 20:00:19');
    insert into employees_roles (employeeId,roleId, enabled, actionTime) VALUES(2, 1,true,  '2018-01-01 20:00:19');
    insert into employees_roles (employeeId,roleId, enabled, actionTime) VALUES(2, 2,true,  '2018-01-01 20:00:19');
