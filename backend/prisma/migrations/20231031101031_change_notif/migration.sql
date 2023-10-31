/*
  Warnings:

  - You are about to drop the column `senderId` on the `Notification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Notification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sendToId` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "senderId",
ADD COLUMN     "sendToId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");
