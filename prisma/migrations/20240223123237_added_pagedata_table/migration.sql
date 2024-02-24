-- CreateTable
CREATE TABLE `PageData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` VARCHAR(191) NULL,
    `userAccessToken` TEXT NULL,
    `pageName` VARCHAR(191) NULL,
    `pageId` VARCHAR(191) NULL,
    `pageAccessToken` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
