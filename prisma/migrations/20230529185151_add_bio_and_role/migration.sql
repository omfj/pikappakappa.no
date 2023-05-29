-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "biography" TEXT,
ADD COLUMN     "type" "Role" NOT NULL DEFAULT 'USER';
