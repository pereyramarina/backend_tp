import { HttpStatus, Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Res,Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginatorDto, Product,Roles } from '../common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({ status: 200, description: 'The list of products.' })
  async findAll(
    @Query() paginator: PaginatorDto,
    @Res() response: Response,
  ) {
    const result = await this.productsService.findAll(paginator);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Listado de Productos' });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'The found product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this.productsService.findOne(id);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Encontrado' });
  }

  @Get('/search/:name')
  @ApiOperation({ summary: 'Get a product by Name' })
  @ApiParam({ name: 'name', type: 'string', description: 'Product Name ' })
  @ApiResponse({ status: 200, description: 'The found product.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async findByName(@Param('name') name: string, @Res() response: Response) {
    const result = await this.productsService.findByName(name);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Encontrado' });
  }

  @Post()
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      'application/json': {
        value: {
          name: 'Product A',
          description: 'Description of Product A',
          price: 100.0,
          quantity: 50,
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Product successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      'application/json': {
        value: {
          name: 'Updated Product A',
          description: 'Updated description of Product A',
          price: 120.0,
          quantity: 60,
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The product has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
    @Res() response: Response,
  ) {
    const result = await this.productsService.update(id, updateProductDto);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Modificado' });
  }

  @Delete(':id')
  @Roles('admin', 'superadmin')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'The product has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this.productsService.remove(id);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto Eliminado' });
  }
}
