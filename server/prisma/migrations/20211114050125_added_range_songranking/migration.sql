/*
  Warnings:

  - Added the required column `range` to the `SongRanking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `SongRanking` ADD COLUMN `range` VARCHAR(191) NOT NULL;
