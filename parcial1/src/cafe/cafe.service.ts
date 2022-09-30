import { Injectable } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CafeEntity } from './cafe.entity';


@Injectable()
export class CafeService {
   constructor(
       @InjectRepository(CafeEntity)
       private readonly cafeRepository: Repository<CafeEntity>
   ){}

   async findAll(): Promise<CafeEntity[]> {
       return await this.cafeRepository.find({ relations: ["aeropuertos"] });
   }

   async findOne(id: string): Promise<CafeEntity> {
       const cafe: CafeEntity = await this.cafeRepository.findOne({where: {id}, relations: ["aeropuertos"] } );
       if (!cafe)
         throw new BusinessLogicException("The cafe with the given id was not found", BusinessError.NOT_FOUND);
  
       return cafe;
   }
  
   async create(cafe: CafeEntity): Promise<CafeEntity> {
        const actualDate = new Date();
        if (cafe.precio <= 0 )
            throw new BusinessLogicException("Precio of the cafe, with the given id, should be positive.", BusinessError.NOT_FOUND);

        return await this.cafeRepository.save(cafe);
   }

   async update(id: string, cafe: CafeEntity): Promise<CafeEntity> {
       const persistedCafe: CafeEntity = await this.cafeRepository.findOne({where:{id}});
       const actualDate = new Date();
       if (!persistedCafe)
         throw new BusinessLogicException("The cafe with the given id was not found", BusinessError.NOT_FOUND);
        if (cafe.precio <= 0 )
         throw new BusinessLogicException("Precio of the cafe, with the given id, should be positive.", BusinessError.NOT_FOUND);

       cafe.id = id; 
      
       return await this.cafeRepository.save(cafe);
   }

   async delete(id: string) {
       const cafe: CafeEntity = await this.cafeRepository.findOne({where:{id}});
       if (!cafe)
         throw new BusinessLogicException("The cafe with the given id was not found", BusinessError.NOT_FOUND);
    
       await this.cafeRepository.remove(cafe);
   }
}