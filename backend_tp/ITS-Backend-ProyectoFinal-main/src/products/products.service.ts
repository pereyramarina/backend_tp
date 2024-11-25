import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto,UpdateProductDto } from './dto';
import { PaginatorDto } from '../common'
//import { AuthService } from './auth/auth.service';
import { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class ProductsService {

  constructor(
    private readonly prismaService: PrismaService,
    //private readonly auth: AuthService
  ){}


  async findAll(paginator:PaginatorDto) {
    const {page, perPage} = paginator || {}
    let metadata;

    const totalPages = await this.prismaService.product.count()
    const lastPage = Math.ceil(totalPages / perPage)

    if (page && perPage)
      metadata = {
        page, //Numero de Pagina
        totalPages, // Total
        lastPage //Ultima Pagina
      }
    const data = await this.prismaService.product.findMany({
      // en caso de que no exstas estos datos traer todo
      skip: page? (page-1) * perPage:undefined,
      take: perPage?perPage:undefined
    })
    return {
      data, //registros      
      metadata // informacion del paginado
    }
  }
  async  findOne(id: number) {
    const product = await this.prismaService.product.findFirst({where: {id}})
    if (!product) throw new NotFoundException('Producto Inexistente')
    return product
  }


  async findByName(name: string) {
    const products = await this.prismaService.product.findMany({
      where: {
        name: {
          startsWith: name
        },
      },
    });
  
    if (products.length === 0) throw new NotFoundException('Producto Inexistente');
    return products;
  }

  async create(createProduct: CreateProductDto) {
    // Desestructuramos el Objeto
    const {name} = createProduct
    // Buscamos el usuario
    const product = await this.prismaService.product.findFirst({where: {name}})
    if (product) throw new BadRequestException('Ya existe un producto con el mismo nombre.')
    const newProduct = await this.prismaService.product.create({data: createProduct})
    return newProduct
  }

  async update(id: number, 
               updateProduct: UpdateProductDto) {
    const product = await this.prismaService.product.findFirst({where: {id}})
    if (!product) throw new NotFoundException('Producto Inexistente')
    const result = await this.prismaService.product.update(
                              {where:{id},
                              data: updateProduct})
    return result

  }

  async remove(id: number) {
    const result = await this.prismaService.product.delete({where: {id}})
    return result
  }
}
