-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `displayName` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `followers` INTEGER NOT NULL,
    `isPremium` BOOLEAN NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `expires_in` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
