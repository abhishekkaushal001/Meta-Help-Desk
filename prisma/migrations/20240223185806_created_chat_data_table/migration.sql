-- CreateTable
CREATE TABLE `ChatData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageId` VARCHAR(191) NOT NULL,
    `senderId` VARCHAR(191) NOT NULL,
    `sendBy` ENUM('ME', 'USER') NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
