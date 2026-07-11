/*
  Warnings:

  - You are about to drop the `songs` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "song_type" AS ENUM ('OP', 'ED', 'INSERT', 'OST');

-- CreateEnum
CREATE TYPE "song_status" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "songs" DROP CONSTRAINT "songs_rankinzada_id_fkey";

-- DropTable
DROP TABLE "songs";

-- CreateTable
CREATE TABLE "ranked_songs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "anime" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "status" "song_status" NOT NULL DEFAULT 'PENDING',
    "type" "song_type" NOT NULL,
    "final_score" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "position" INTEGER NOT NULL DEFAULT 0,
    "song_number" INTEGER NOT NULL,
    "suggested_by" INTEGER NOT NULL,
    "rankinzada_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ranked_songs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ranked_songs" ADD CONSTRAINT "ranked_songs_suggested_by_fkey" FOREIGN KEY ("suggested_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ranked_songs" ADD CONSTRAINT "ranked_songs_rankinzada_id_fkey" FOREIGN KEY ("rankinzada_id") REFERENCES "rankinzadas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
