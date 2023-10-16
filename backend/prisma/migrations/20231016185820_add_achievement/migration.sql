-- CreateEnum
CREATE TYPE "AchievementType" AS ENUM ('BRONZE', 'SILVER', 'GOLD');

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "AchievementType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AchievementToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_title_key" ON "Achievement"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AchievementToUser_AB_unique" ON "_AchievementToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_AchievementToUser_B_index" ON "_AchievementToUser"("B");

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Achievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AchievementToUser" ADD CONSTRAINT "_AchievementToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
