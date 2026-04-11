CREATE DATABASE IF NOT EXISTS ums;

CREATE USER IF NOT EXISTS 'ums_app'@'localhost' IDENTIFIED BY 'change_me_ums';
GRANT ALL PRIVILEGES ON ums.* TO 'ums_app'@'localhost';

FLUSH PRIVILEGES;
