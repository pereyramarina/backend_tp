import {IsDate, IsNotEmpty, IsOptional, IsString, IsNumber,IsPositive} from 'class-validator'
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name:string

    @IsString()
    description:string

    @IsNotEmpty()
    @IsNumber()
    @IsPositive() // Positivo
    @Transform(({ value }) => parseFloat(value)) // Transformar a número
    price:number

    @IsNotEmpty()
    @IsNumber()
    @IsPositive() // Positivo
    @Transform(({ value }) => parseInt(value, 10)) // Transformar a número entero
    quantity:number

    @IsOptional()
    @IsDate()
    deletedAt?: Date
}
