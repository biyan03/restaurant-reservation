/*
  Warnings:

  - You are about to drop the column `done` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `done`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
