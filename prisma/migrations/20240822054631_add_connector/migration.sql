-- CreateTable
CREATE TABLE "Connector" (
    "id" TEXT NOT NULL,
    "ChatBotBuilderAccountId" TEXT NOT NULL,
    "highLevelLocationId" TEXT NOT NULL,
    "highLevelAccessToken" TEXT NOT NULL,
    "highLevelRefreshToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connector_pkey" PRIMARY KEY ("id")
);
