-- CreateEnum
CREATE TYPE "NotifType" AS ENUM ('GAME', 'FRIEND');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "readed" BOOLEAN NOT NULL DEFAULT false,
    "type" "NotifType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_userId_key" ON "Notification"("userId");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
