import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, ParseArrayPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, VariantDto, ReviewDto } from '../products/dto/products.dto';

@Controller('products')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }

  // Variants
  @Get(':id/variants')
  getVariants(@Param('id') id: string) {
    return this.productsService.getVariants(id);
  }

  @Post(':id/variants')
  addVariant(@Param('id') id: string, @Body() variant: VariantDto) {
    return this.productsService.addVariant(id, variant);
  }

  @Put(':id/variants/:variantId')
  updateVariant(@Param('id') id: string, @Param('variantId') variantId: string, @Body() variant: VariantDto) {
    return this.productsService.updateVariant(id, variantId, variant);
  }

  @Delete(':id/variants/:variantId')
  deleteVariant(@Param('id') id: string, @Param('variantId') variantId: string) {
    return this.productsService.deleteVariant(id, variantId);
  }

  // Media images
  @Get(':id/gallery')
  getImages(@Param('id') id: string) {
    return this.productsService.getImages(id);
  }

  @Post(':id/gallery')
  addImage(@Param('id') id: string, @Body('imageUrl') imageUrl: string) {
    return this.productsService.addImage(id, imageUrl);
  }

 
  @Delete(':id/gallery/:imageId')
deleteImage(@Param('id') id: string, @Param('imageId') imageId: string) {
  return this.productsService.deleteImage(id, imageId);
}


@Put(':id/stock')
updateStock(@Param('id') id: string, @Body() data: { stock: number }) {
  return this.productsService.updateStock(id, data.stock);
}

@Get(':id/stock/history')
getStockHistory(@Param('id') id: string) {
  return this.productsService.getStockHistory(id);
}



  // 3D model
  @Get(':id/3dmodel')
  get3DModel(@Param('id') id: string) {
    return this.productsService.get3DModel(id);
  }

  @Post(':id/3dmodel')
  upload3DModel(@Param('id') id: string, @Body('modelUrl') modelUrl: string) {
    return this.productsService.upload3DModel(id, modelUrl);
  }

  // Reviews
  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.productsService.getReviews(id);
  }

  @Post(':id/reviews')
  addReview(@Param('id') id: string, @Body() review: ReviewDto) {
    return this.productsService.addReview(id, review);
  }

  @Put(':id/reviews/:reviewId')
  updateReview(@Param('id') id: string, @Param('reviewId') reviewId: string, @Body() review: ReviewDto) {
    return this.productsService.updateReview(id, reviewId, review);
  }

  @Delete(':id/reviews/:reviewId')
  deleteReview(@Param('id') id: string, @Param('reviewId') reviewId: string) {
    return this.productsService.deleteReview(id, reviewId);
  }

 

  @Get(':id/rating-breakdown')
  getRatingBreakdown(@Param('id') id: string) {
    return this.productsService.getRatingBreakdown(id);
  }

  @Put(':id/promotion')
  updatePromotion(@Param('id') id: string, @Body() data: { promoted: boolean }) {
    return this.productsService.updatePromotion(id, data.promoted);
  }

  @Put(':id/seo')
  updateSeo(
    @Param('id') id: string,
    @Body() seoData: { slug?: string; tags?: string[] },
  ) {
    return this.productsService.updateSeo(id, seoData);
  }

  @Post(':id/tag')
  addTag(@Param('id') id: string, @Body('tag') tag: string) {
    return this.productsService.addTag(id, tag);
  }

  @Delete(':id/tag/:tagId')
  removeTag(@Param('id') id: string, @Param('tagId') tagId: string) {
    return this.productsService.removeTag(id, tagId);
  }

  @Put(':id/stock')
  updateStocks(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.productsService.updateStock(id, quantity);
  }

  @Get(':id/stock-history')
  getStockHistories(@Param('id') id: string) {
    return this.productsService.getStockHistory(id);
  }

}
