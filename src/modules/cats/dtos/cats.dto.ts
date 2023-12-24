import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumber()
  @Transform(({ value }) => parseInt(value, 10))
  age: number;

  @IsString()
  @IsNotEmpty()
  breed: string;
}
