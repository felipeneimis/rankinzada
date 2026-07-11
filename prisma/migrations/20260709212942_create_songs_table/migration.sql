/*
  Warnings:

  - You are about to drop the column `creatorId` on the `rankinzadas` table. All the data in the column will be lost.
  - Added the required column `creator_id` to the `rankinzadas` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rankinzadas" DROP CONSTRAINT "rankinzadas_creatorId_fkey";

-- AlterTable
ALTER TABLE "rankinzadas" DROP COLUMN "creatorId",
ADD COLUMN     "creator_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "songs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "rankinzada_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "songs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rankinzadas" ADD CONSTRAINT "rankinzadas_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "songs" ADD CONSTRAINT "songs_rankinzada_id_fkey" FOREIGN KEY ("rankinzada_id") REFERENCES "rankinzadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
