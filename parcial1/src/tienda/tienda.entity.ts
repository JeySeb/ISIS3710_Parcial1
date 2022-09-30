import { CafeEntity } from '../cafe/cafe.entity';
import { Column, Entity, ManyToMany,JoinTable, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TiendaEntity {
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @Column()
   nombre: string;
   @Column()
   direccion: string;
   @Column()
   telefono: string;

   @ManyToMany(() => CafeEntity, cafe => cafe.tiendas)
   @JoinTable()
   cafes: CafeEntity[];

}

