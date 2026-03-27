/*
  Warnings:

  - You are about to drop the column `name` on the `Harvest` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Harvest` table. All the data in the column will be lost.
  - Added the required column `loggedBy` to the `Harvest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Harvest" DROP COLUMN "name",
DROP COLUMN "notes",
ADD COLUMN     "loggedBy" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "tgId" INTEGER,
    "name" TEXT NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
