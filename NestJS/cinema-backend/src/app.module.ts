import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FilmeModule} from './filme/filme.module';
import { SalaModule } from './sala/sala.module';
import { SessaoModule } from './sessao/sessao.module';
import { VendaModule } from './venda/venda.module';

@Module({
  imports: [PrismaModule, FilmeModule, SalaModule, SessaoModule, VendaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
