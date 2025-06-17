-- CreateTable
CREATE TABLE "sessoes" (
    "id" SERIAL NOT NULL,
    "data_hora" TIMESTAMP(3) NOT NULL,
    "preco" DECIMAL(10,2) NOT NULL,
    "idioma" TEXT NOT NULL,
    "formato" TEXT NOT NULL,
    "filme_id" INTEGER NOT NULL,
    "sala_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessoes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_sala_id_fkey" FOREIGN KEY ("sala_id") REFERENCES "salas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
