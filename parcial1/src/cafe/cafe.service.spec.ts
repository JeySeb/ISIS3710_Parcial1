import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeEntity } from './cafe.entity';
import { CafeService } from './cafe.service';
import { faker } from '@faker-js/faker';



describe('CafeService', () => {
 let service: CafeService;
 let repository: Repository<CafeEntity>;
 let cafesList: CafeEntity[];
 

 beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
     imports: [...TypeOrmTestingConfig()],
     providers: [CafeService],
   }).compile();

   service = module.get<CafeService>(CafeService);
   repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
   await seedDatabase();
 });
 
 const seedDatabase = async () => {
  repository.clear();
  cafesList = [];
  for(let i = 0; i < 5; i++){
      const cafe: CafeEntity = await repository.save({
      nombre: faker.company.name(),
      descripcion: faker.lorem.sentence(),
      precio: parseFloat(faker.random.numeric(5)),
      })
      cafesList.push(cafe);
  }
} 


 it('should be defined', () => {
   expect(service).toBeDefined();
 });

 // ----Logic tests-----

it('create should return a new cafe', async () => {
  const cafe: CafeEntity = {
    id: "",
    nombre: faker.company.name(),
    descripcion: faker.lorem.sentence(),
    precio: parseFloat(faker.random.numeric(5)),
    tiendas: []
  }

  const newCafe: CafeEntity = await service.create(cafe);
  expect(newCafe).not.toBeNull();

  const storedCafe: CafeEntity = await repository.findOne({where: {id: newCafe.id}})
  expect(cafe).not.toBeNull();
  expect(cafe.nombre).toEqual(storedCafe.nombre)
  expect(cafe.precio).toEqual(storedCafe.precio)
  expect(cafe.descripcion).toEqual(storedCafe.descripcion)
});

it('create should throw an exception for an invalid cafe precio', async () => {
  const cafe: CafeEntity = {
    id: "",
    nombre: faker.company.name(),
    descripcion: faker.lorem.sentence(),
    precio: -parseFloat(faker.random.numeric(5)),
    tiendas: []
  }
  await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "Precio of the cafe, with the given id, should be positive.")
 });


});