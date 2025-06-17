-- CreateTable
CREATE TABLE "vendas" (
    "id" SERIAL NOT NULL,
    "nome_cliente" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "assento" TEXT NOT NULL,
    "tipo_pagamento" TEXT NOT NULL,
    "sessao_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_sessao_id_fkey" FOREIGN KEY ("sessao_id") REFERENCES "sessoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
