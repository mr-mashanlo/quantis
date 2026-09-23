/*
  Warnings:

  - You are about to drop the column `createdBy` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Operation` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `createdById` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Operation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Department" DROP CONSTRAINT "Department_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Medication" DROP CONSTRAINT "Medication_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_createdBy_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_createdBy_fkey";

-- DropIndex
DROP INDEX "Department_createdBy_idx";

-- DropIndex
DROP INDEX "Medication_createdBy_idx";

-- DropIndex
DROP INDEX "Operation_createdBy_idx";

-- DropIndex
DROP INDEX "Patient_createdBy_idx";

-- AlterTable
ALTER TABLE "Department" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Operation" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "createdBy",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Department_createdById_idx" ON "Department"("createdById");

-- CreateIndex
CREATE INDEX "Medication_createdById_idx" ON "Medication"("createdById");

-- CreateIndex
CREATE INDEX "Operation_createdById_idx" ON "Operation"("createdById");

-- CreateIndex
CREATE INDEX "Patient_createdById_idx" ON "Patient"("createdById");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Department" ADD CONSTRAINT "Department_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
