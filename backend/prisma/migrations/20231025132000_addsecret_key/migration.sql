/*
  Warnings:

  - Made the column `twoFactorSecret` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "twoFactorSecret" SET NOT NULL,
ALTER COLUMN "twoFactorSecret" SET DEFAULT '';
