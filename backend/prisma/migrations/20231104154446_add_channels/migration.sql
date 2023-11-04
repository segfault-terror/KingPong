-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('PUBLIC', 'PRIVATE', 'PROTECTED');

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "type" "ChannelType" NOT NULL,
    "password" TEXT,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mute" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChannelMessage" (
    "id" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChannelMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_admin" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_member" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_banned" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_admin_AB_unique" ON "_admin"("A", "B");

-- CreateIndex
CREATE INDEX "_admin_B_index" ON "_admin"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_member_AB_unique" ON "_member"("A", "B");

-- CreateIndex
CREATE INDEX "_member_B_index" ON "_member"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_banned_AB_unique" ON "_banned"("A", "B");

-- CreateIndex
CREATE INDEX "_banned_B_index" ON "_banned"("B");

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mute" ADD CONSTRAINT "Mute_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD CONSTRAINT "ChannelMessage_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_admin" ADD CONSTRAINT "_admin_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD CONSTRAINT "_member_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_member" ADD CONSTRAINT "_member_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_banned" ADD CONSTRAINT "_banned_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_banned" ADD CONSTRAINT "_banned_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
