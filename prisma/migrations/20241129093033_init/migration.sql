-- CreateTable
CREATE TABLE `Customer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Customer_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Table` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `capacity` INTEGER NOT NULL,

    UNIQUE INDEX `Table_number_key`(`number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reservationDate` DATETIME(3) NOT NULL,
    `customerId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    UNIQUE INDEX `Reservation_reservationDate_tableId_key`(`reservationDate`, `tableId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
