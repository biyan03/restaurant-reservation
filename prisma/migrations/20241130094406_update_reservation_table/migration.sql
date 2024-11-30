/*
  Warnings:

  - Added the required column `reservedEnd` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `reservedEnd` DATETIME(3) NOT NULL;
