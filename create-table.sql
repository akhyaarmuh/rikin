CREATE DATABASE nwpos;

USE nwpos;

CREATE TABLE `users` (
  `id`            INT                             NOT NULL AUTO_INCREMENT,
  `full_name`     VARCHAR(75)                     NOT NULL,
  `email`         VARCHAR(128)                    NOT NULL,
  `password`      VARCHAR(225)                    NOT NULL,
  `role`          ENUM('OWNER','ADMIN','CASHIER') NOT NULL DEFAULT 'CASHIER',
  `status`        BOOLEAN                         NOT NULL DEFAULT 1,
  `refresh_token` VARCHAR(750),
  `shop_id`       INT,
  `created_at`    TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`    TIMESTAMP                       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `email_unique` (`email`),
  UNIQUE KEY `refresh_token_unique` (`refresh_token`)
) ENGINE=InnoDB;

CREATE TABLE `shops` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `name`        VARCHAR(25)  NOT NULL,
  `no_hp`       VARCHAR(13)  NOT NULL,
  `address`     VARCHAR(100) NOT NULL,
  `owner_id`    INT          NOT NULL,
  `license_key` VARCHAR(750),
  `expired_at`  DATETIME     NOT NULL,
  `foot_note`   VARCHAR(100),
  `pole_note`   VARCHAR(100),
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `license_key_unique` (`license_key`),
  UNIQUE KEY `name_address_unique` (`owner_id`, `name`, `address`),
  FOREIGN KEY (`owner_id`) REFERENCES users(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

ALTER TABLE `users`
  ADD FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE;

CREATE TABLE `categories` (
  `id`         INT         NOT NULL AUTO_INCREMENT,
  `shop_id`    INT         NOT NULL,
  `name`       VARCHAR(25) NOT NULL,
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`shop_id`, `name`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `units` (
  `id`         INT         NOT NULL AUTO_INCREMENT,
  `shop_id`    INT         NOT NULL,
  `name`       VARCHAR(25) NOT NULL,
  `created_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`shop_id`, `name`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `products` (
  `id`          INT          NOT NULL AUTO_INCREMENT,
  `shop_id`     INT          NOT NULL,
  `name`        VARCHAR(70)  NOT NULL,
  `category_id` INT          NOT NULL,
  `description` VARCHAR(225),
  `min_stock`   INT,
  `created_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `name_unique` (`shop_id`, `name`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`category_id`) REFERENCES categories(`id`)
) ENGINE=InnoDB;

CREATE TABLE `product_unit_details` (
  `id`         INT         NOT NULL AUTO_INCREMENT,
  `shop_id`    INT         NOT NULL,
  `product_id` INT         NOT NULL,
  `unit_id`    INT         NOT NULL,
  `code`       VARCHAR(30) NOT NULL,
  `quantity`   INT         NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `product_unit_unique` (`product_id`, `unit_id`),
  UNIQUE KEY `code_unique` (`shop_id`, `code`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES products(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`unit_id`) REFERENCES units(`id`)
) ENGINE=InnoDB;

CREATE TABLE `product_price_details` (
  `shop_id`                INT NOT NULL,
  `product_unit_detail_id` INT NOT NULL,
  `price`                  INT NOT NULL,
  `sale_price`             INT NOT NULL DEFAULT 0,

  PRIMARY KEY (`shop_id`, `product_unit_detail_id`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_unit_detail_id`) REFERENCES product_unit_details(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `product_stock_details` (
  `shop_id`    INT NOT NULL,
  `product_id` INT NOT NULL,
  `capital`    INT NOT NULL,
  `stock`      INT NOT NULL,

  PRIMARY KEY (`shop_id`, `product_id`, `capital`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_id`) REFERENCES products(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `customers` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `shop_id`    INT          NOT NULL,
  `full_name`  VARCHAR(70)  NOT NULL,
  `address`    VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_unique` (`shop_id`, `full_name`, `address`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE `suppliers` (
  `id`         INT          NOT NULL AUTO_INCREMENT,
  `shop_id`    INT          NOT NULL,
  `name`       VARCHAR(70)  NOT NULL,
  `address`    VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `supplier_unique` (`shop_id`, `name`, `address`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;





CREATE TABLE `sales` (
  `id`          INT         NOT NULL AUTO_INCREMENT,
  `shop_id`     INT         NOT NULL,
  `customer_id` INT                  DEFAULT NULL,
  `invoice`     VARCHAR(10) NOT NULL,
  `total`       INT         NOT NULL,
  `profit`      INT         NOT NULL,
  `debt`        INT                  DEFAULT NULL,
  `created_at`  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`  TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  FOREIGN KEY (`shop_id`) REFERENCES shops(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`customer_id`) REFERENCES customers(`id`)
) ENGINE=InnoDB;

CREATE TABLE `sales_details` (
  `sales_id`        INT NOT NULL,
  `product_unit_id` INT NOT NULL,
  `quantity`        INT NOT NULL,
  `price`           INT NOT NULL,
  `total`           INT NOT NULL,
  `capital`         INT NOT NULL,
  `profit`          INT NOT NULL,

  PRIMARY KEY (`sales_id`, `product_unit_id`),
  FOREIGN KEY (`sales_id`) REFERENCES sales(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`product_unit_id`) REFERENCES product_unit_details(`id`)
) ENGINE=InnoDB;

CREATE TABLE `sales_payment_details` (
  `sales_id`   INT       NOT NULL,
  `pay`        INT       NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`sales_id`, `created_at`),
  FOREIGN KEY (`sales_id`) REFERENCES sales(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;
