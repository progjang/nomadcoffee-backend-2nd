/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `CoffeeShopPhoto` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `CoffeeShopPhoto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoffeeShopPhoto" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CoffeeShopPhoto.url_unique" ON "CoffeeShopPhoto"("url");
