import { Module } from '@nestjs/common';
import { CafeEntity } from './cafe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeService } from './cafe.service';

@Module({
    imports:[TypeOrmModule.forFeature([CafeEntity])],
    providers: [CafeService]

})
export class CafeModule {}