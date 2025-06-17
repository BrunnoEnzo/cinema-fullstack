-- DropForeignKey
ALTER TABLE "sessoes" DROP CONSTRAINT "sessoes_filme_id_fkey";

-- DropForeignKey
ALTER TABLE "sessoes" DROP CONSTRAINT "sessoes_sala_id_fkey";

-- DropForeignKey
ALTER TABLE "vendas" DROP CONSTRAINT "vendas_sessao_id_fkey";

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "filmes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessoes" ADD CONSTRAINT "sessoes_sala_id_fkey" FOREIGN KEY ("sala_id") REFERENCES "salas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendas" ADD CONSTRAINT "vendas_sessao_id_fkey" FOREIGN KEY ("sessao_id") REFERENCES "sessoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
