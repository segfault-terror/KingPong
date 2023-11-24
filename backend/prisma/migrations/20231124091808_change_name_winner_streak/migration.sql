/*
  Warnings:

  - You are about to drop the column `winnderStreak` on the `Stats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stats" DROP COLUMN "winnderStreak",
ADD COLUMN     "winnerStreak" INTEGER NOT NULL DEFAULT 0;
