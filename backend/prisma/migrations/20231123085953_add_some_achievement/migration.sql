-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "cleanSheets" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "winnderStreak" INTEGER NOT NULL DEFAULT 0;