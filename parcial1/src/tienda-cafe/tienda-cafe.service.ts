import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CafeEntity } from '../cafe/cafe.entity';
import { TiendaEntity } from '../tienda/tienda.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class TiendaCafeService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,
     
        @InjectRepository(CafeEntity)
        private readonly cafeRepository: Repository<CafeEntity>
    ) {}

    async addCafeTienda(tiendaId: string, cafeId: string): Promise<TiendaEntity> {
        const cafe: CafeEntity = await this.cafeRepository.findOne({where: {id: cafeId}});
        if (!cafe)
          throw new BusinessLogicException("The cafe with the given id was not found", BusinessError.NOT_FOUND);
       
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}, relations: ["cafes"]}) 
        if (!tienda)
          throw new BusinessLogicException("The tienda with the given id was not found", BusinessError.NOT_FOUND);
     
        tienda.cafes = [...tienda.cafes, cafe];
        return await this.tiendaRepository.save(tienda);
      }
        
}