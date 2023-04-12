/*
  Warnings:

  - You are about to drop the column `comfort_shows` on the `Interest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "comfort_shows",
ADD COLUMN     "confort_shows" TEXT[];
