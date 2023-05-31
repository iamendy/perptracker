/*
  Warnings:

  - Made the column `subscriber` on table `Subscriber` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Subscriber_subscriber_key";

-- AlterTable
ALTER TABLE "Subscriber" ALTER COLUMN "subscriber" SET NOT NULL;
