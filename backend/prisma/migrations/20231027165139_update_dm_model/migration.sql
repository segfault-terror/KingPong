/*
  Warnings:

  - You are about to drop the `DirectMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_receiver_id_fkey";

-- DropForeignKey
ALTER TABLE "DirectMessage" DROP CONSTRAINT "DirectMessage_sender_id_fkey";

-- DropTable
DROP TABLE "DirectMessage";

-- CreateTable
CREATE TABLE "DM" (
    "id" TEXT NOT NULL,
    "user1Id" TEXT NOT NULL,
    "user2Id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DM_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "dm_id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DM_user1Id_key" ON "DM"("user1Id");

-- CreateIndex
CREATE UNIQUE INDEX "DM_user2Id_key" ON "DM"("user2Id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_dm_id_key" ON "Message"("dm_id");

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_user1Id_fkey" FOREIGN KEY ("user1Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DM" ADD CONSTRAINT "DM_user2Id_fkey" FOREIGN KEY ("user2Id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_dm_id_fkey" FOREIGN KEY ("dm_id") REFERENCES "DM"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
