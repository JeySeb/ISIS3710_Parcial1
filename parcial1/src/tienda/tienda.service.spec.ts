import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { faker } from '@faker-js/faker';



describe('TiendaService', () => {
 let service: TiendaService;
 let repository: Repository<TiendaEntity>;
 let tiendasList: TiendaEntity[];
 

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [TiendaService],
   }).compile();

   service = module.get<TiendaService>(TiendaService);
   repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
   await seedDatabase();
 });
 
 const seedDatabase = async () => {
  repository.clear();
  tiendasList = [];
  for(let i = 0; i < 5; i++){
      const tienda: TiendaEntity = await repository.save({
      nombre: faker.company.name(),
      direccion: faker.address.direction(),
      telefono: faker.random.alphaNumeric(10),
      })
      tiendasList.push(tienda);
  }
} 


 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 // ----Logic tests-----


it('create should return a new tienda', async () => {
  const tienda: TiendaEntity = {
    id: "",
    nombre: faker.company.name(),
    direccion: faker.address.direction(),
    telefono: faker.random.alphaNumeric(10),
    cafes: []
  }

  const newTienda: TiendaEntity = await service.create(tienda);
  expect(newTienda).not.toBeNull();

  const storedTienda: TiendaEntity = await repository.findOne({where: {id: newTienda.id}})
  expect(tienda).not.toBeNull();
  expect(tienda.nombre).toEqual(storedTienda.nombre)
  expect(tienda.direccion).toEqual(storedTienda.direccion)
  expect(tienda.telefono).toEqual(storedTienda.telefono)
});

it('create should throw an exception for an invalid tienda telefono', async () => {
  const cafe: TiendaEntity = {
    id: "",
    nombre: faker.company.name(),
    direccion: faker.address.direction(),
    telefono: faker.random.alphaNumeric(11),
    cafes: []
  }
  await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "The tienda with the given id should have a telefono with at least 10 characters")
 });

});