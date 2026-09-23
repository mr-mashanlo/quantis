/*
  Warnings:

  - You are about to drop the column `departmentId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_patientId_fkey";

-- DropIndex
DROP INDEX "Transaction_medicationId_departmentId_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "departmentId",
DROP COLUMN "patientId";

-- CreateIndex
CREATE INDEX "Transaction_medicationId_idx" ON "Transaction"("medicationId");
