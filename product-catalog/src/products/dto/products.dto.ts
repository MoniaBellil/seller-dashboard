import {
    IsString,
    IsOptional,
    IsNumber,
    IsArray,
    IsBoolean,
    ValidateNested,
    IsMongoId,
    Min,
    Max,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { PartialType } from '@nestjs/mapped-types';
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
  
  export class VariantDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    price?: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    stock?: number;
  }
  
  export class ReviewDto {
    @ApiProperty()
    @IsMongoId()
    userId: string;
  
    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    comment?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    helpfulVotes?: number;
  
    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    photoUrls?: string[];
  }
  
  export class MediaDto {
    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    images: string[];
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    model3d?: string;
  }
  
  export class CreateProductDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    slug: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    description?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    category?: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    subcategory?: string;
  
    @ApiProperty()
    @IsNumber()
    price: number;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsNumber()
    discount?: number;
  
    @ApiProperty()
    @IsNumber()
    stock: number;
  
    @ApiPropertyOptional({ type: MediaDto })
    @IsOptional()
    @ValidateNested()
    @Type(() => MediaDto)
    media?: MediaDto;
  
    @ApiPropertyOptional({ type: [VariantDto] })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => VariantDto)
    variants?: VariantDto[];
  
    @ApiPropertyOptional({ type: [String] })
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    tags?: string[];
  
    @ApiProperty()
    @IsString()
    businessId: string;
  
    @ApiPropertyOptional()
    @IsOptional()
    @IsBoolean()
    promoted?: boolean;
  }
  
  export class UpdateProductDto extends PartialType(CreateProductDto) {}
  