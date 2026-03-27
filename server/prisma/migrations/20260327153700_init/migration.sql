-- CreateTable
CREATE TABLE "Harvest" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "quantity" DOUBLE PRECISION,
    "notes" TEXT,

    CONSTRAINT "Harvest_pkey" PRIMARY KEY ("id")
);
