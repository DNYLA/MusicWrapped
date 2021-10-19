/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `followers` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isPremium` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `followers`,
    DROP COLUMN `isPremium`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
