-- CreateTable
CREATE TABLE "Product_Images" (
    "id" SERIAL NOT NULL,
    "iamgeURL" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Product_Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product_Images" ADD CONSTRAINT "Product_Images_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
