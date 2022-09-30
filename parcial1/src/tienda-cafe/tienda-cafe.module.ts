import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from '../cafe/cafe.entity';
import { TiendaEntity } from '../tienda/tienda.entity';
import { TiendaCafeService } from './tienda-cafe.service';

@Module({
  providers: [TiendaCafeService],
  imports: [TypeOrmModule.forFeature([TiendaEntity, CafeEntity])],
 
})

export class TiendaCafeModule {}
