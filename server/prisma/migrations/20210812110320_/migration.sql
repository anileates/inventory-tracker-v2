/*
  Warnings:

  - You are about to drop the column `unitPrice` on the `product` table. All the data in the column will be lost.
  - Added the required column `unitPurchasePrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unitSalePrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `unitPrice`,
    ADD COLUMN `unitPurchasePrice` DOUBLE NOT NULL,
    ADD COLUMN `unitSalePrice` DOUBLE NOT NULL;
