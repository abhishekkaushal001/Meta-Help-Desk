/*
  Warnings:

  - Added the required column `userEmail` to the `PageData` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `PageData` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `PageData` ADD COLUMN `userEmail` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;
