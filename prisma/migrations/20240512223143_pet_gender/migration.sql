/*
  Warnings:

  - Added the required column `gender` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetGender" AS ENUM ('FEMALE', 'MALE');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "gender" "PetGender" NOT NULL;
