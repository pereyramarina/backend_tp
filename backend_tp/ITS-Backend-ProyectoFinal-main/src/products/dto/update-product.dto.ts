import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import {IsNumber,IsOptional,IsPositive} from 'class-validator'
import { Type } from 'class-transformer'

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNumber() //Es un numero
    @IsPositive() // Positivo
    @IsOptional() // Opcional
    @Type(() => Number)
    id?: number;

}
