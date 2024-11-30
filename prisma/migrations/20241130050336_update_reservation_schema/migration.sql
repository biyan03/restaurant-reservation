/*
  Warnings:

  - You are about to drop the column `reservationDate` on the `Reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reservedAt,tableId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reservedAt` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Reservation_reservationDate_tableId_key` ON `Reservation`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `reservationDate`,
    ADD COLUMN `reservedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `RestaurantHours` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `day` VARCHAR(191) NOT NULL,
    `openTime` DATETIME(3) NOT NULL,
    `closeTime` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_reservedAt_tableId_key` ON `Reservation`(`reservedAt`, `tableId`);
