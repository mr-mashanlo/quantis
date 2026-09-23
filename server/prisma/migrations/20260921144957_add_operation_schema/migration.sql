/*
  Warnings:

  - Added the required column `fromDepartmentId` to the `Operation` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'COMPLETED', 'CANCELLED');

-- AlterTable
ALTER TABLE "Operation" ADD COLUMN     "fromDepartmentId" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "toDepartmentId" TEXT,
ADD COLUMN     "toPatientId" TEXT;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_fromDepartmentId_fkey" FOREIGN KEY ("fromDepartmentId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_toDepartmentId_fkey" FOREIGN KEY ("toDepartmentId") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_toPatientId_fkey" FOREIGN KEY ("toPatientId") REFERENCES "Patient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
