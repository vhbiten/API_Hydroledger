-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('editor', 'querier');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'querier',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pocos" (
    "id" SERIAL NOT NULL,
    "dataColeta" TIMESTAMP(3) NOT NULL,
    "numero_poco" INTEGER NOT NULL,
    "hidrometro" DOUBLE PRECISION NOT NULL,
    "horimetro" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pocos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "efluentes" (
    "id" SERIAL NOT NULL,
    "dataColeta" TIMESTAMP(3) NOT NULL,
    "vazao1" DOUBLE PRECISION NOT NULL,
    "vazao2" DOUBLE PRECISION NOT NULL,
    "vazao3" DOUBLE PRECISION NOT NULL,
    "ph" DOUBLE PRECISION NOT NULL,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "condutividade" DOUBLE PRECISION NOT NULL,
    "SD30" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "efluentes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cloroResidual" (
    "id" SERIAL NOT NULL,
    "dataColeta" TIMESTAMP(3) NOT NULL,
    "cozinha" DOUBLE PRECISION NOT NULL,
    "saidaTratamento" DOUBLE PRECISION NOT NULL,
    "bebedouro1" DOUBLE PRECISION NOT NULL,
    "bebedouro2" DOUBLE PRECISION NOT NULL,
    "bebedouro3" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cloroResidual_pkey" PRIMARY KEY ("id")
);
