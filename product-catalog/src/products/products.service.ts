import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './product.schema';
import { Model, Types } from 'mongoose';
import { CreateProductDto, VariantDto, ReviewDto, UpdateProductDto } from '../products/dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private model: Model<ProductDocument>) {}

  async findAll() {
    return this.model.find().exec();
  }

  async findById(id: string) {
    const product = await this.model.findById(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(data: CreateProductDto) {
    return this.model.create(data);
  }

  async update(id: string, data: UpdateProductDto) {
    const updated = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.model.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Product not found');
    return { message: 'Product deleted successfully' };
  }

  // Variants
  async getVariants(productId: string) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Product not found');
    return product.variants;
  }

  async addVariant(productId: string, variant: VariantDto) {
    return this.model.findByIdAndUpdate(
      productId,
      { $push: { variants: variant } },
      { new: true },
    );
  }

  async updateVariant(productId: string, variantId: string, updated: VariantDto) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Product not found');

    const index = (product.variants as any).findIndex((v: any) => v._id?.toString() === variantId);
    if (index === -1) throw new NotFoundException('Variant not found');

    product.variants[index] = { ...product.variants[index], ...updated };
    return product.save();
  }

  async deleteVariant(productId: string, variantId: string) {
    return this.model.findByIdAndUpdate(
      productId,
      { $pull: { variants: { _id: variantId } } },
      { new: true },
    );
  }

  // Media management
  async getImages(productId: string) {
    const product = await this.model.findById(productId);
    return product.media?.images || [];
  }

  async addImage(productId: string, imageUrl: string) {
    return this.model.findByIdAndUpdate(
      productId,
      { $push: { 'media.images': imageUrl } },
      { new: true },
    );
  }

  async deleteImage(productId: string, imageUrl: string) {
    return this.model.findByIdAndUpdate(
      productId,
      { $pull: { 'media.images': imageUrl } },
      { new: true },
    );
  }

  async get3DModel(productId: string) {
    const product = await this.model.findById(productId);
    return product.media?.model3d || null;
  }

  async upload3DModel(productId: string, modelUrl: string) {
    return this.model.findByIdAndUpdate(
      productId,
      { 'media.model3d': modelUrl },
      { new: true },
    );
  }

  // Reviews
  async getReviews(productId: string) {
    const product = await this.model.findById(productId);
    return product.reviews;
  }

  async addReview(productId: string, reviewDto: ReviewDto) {
    const review = {
      ...reviewDto,
      createdAt: new Date(),
      helpfulVotes: reviewDto.helpfulVotes || 0,
      userId: new Types.ObjectId(reviewDto.userId),
    };
    return this.model.findByIdAndUpdate(
      productId,
      { $push: { reviews: review } },
      { new: true },
    );
  }

  async updateReview(productId: string, reviewId: string, data: Partial<ReviewDto>) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Product not found');
  
    const index = (product.reviews as any).findIndex((r: any) => r._id?.toString() === reviewId);
    if (index === -1) throw new NotFoundException('Review not found');
  
    // Construire un nouvel objet de mise à jour, en convertissant userId en ObjectId si nécessaire
    const updatedReview = {
        ...((product.reviews[index] as any).toObject()),
        ...data,
      };
      
  
    if (data.userId) {
      // forcer la conversion userId en ObjectId
      updatedReview.userId = new Types.ObjectId(data.userId);
    }
  
    // Mettre à jour l'élément dans le tableau
    product.reviews[index] = updatedReview;
  
    return product.save();
  }
  

  async deleteReview(productId: string, reviewId: string) {
    return this.model.findByIdAndUpdate(
      productId,
      { $pull: { reviews: { _id: reviewId } } },
      { new: true },
    );
  }


   // Update promotion
   async updatePromotion(id: string, promoted: boolean) {
    const product = await this.model.findByIdAndUpdate(
      id,
      { promoted },
      { new: true },
    );
    if (!product) throw new NotFoundException('Produit non trouvé');
    return product;
  }

  // Update SEO
  async updateSeo(id: string, seoData: { slug?: string; tags?: string[] }) {
    const product = await this.model.findByIdAndUpdate(
      id,
      { $set: seoData },
      { new: true },
    );
    if (!product) throw new NotFoundException('Produit non trouvé');
    return product;
  }

  // Ajouter un tag
  async addTag(id: string, tag: string) {
    const product = await this.model.findById(id);
    if (!product) throw new NotFoundException('Produit non trouvé');

    product.tags = product.tags || [];
    if (!product.tags.includes(tag)) {
      product.tags.push(tag);
    }
    return product.save();
  }

  // Supprimer un tag
  async removeTag(id: string, tagId: string) {
    const product = await this.model.findById(id);
    if (!product) throw new NotFoundException('Produit non trouvé');

    product.tags = product.tags.filter((t) => t !== tagId);
    return product.save();
  }

  // Update stock
  async updateStock(productId: string, quantity: number) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Produit non trouvé');

    product.stockHistory = product.stockHistory || [];
    const oldStock = product.stock ?? 0;

    product.stockHistory.push({
      date: new Date(),
      change: quantity - oldStock,
    });

    product.stock = quantity;
    return product.save();
  }

  // Get stock history
  async getStockHistory(productId: string) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Produit non trouvé');
    return product.stockHistory || [];
  }

  // Get rating breakdown
  async getRatingBreakdown(productId: string) {
    const product = await this.model.findById(productId);
    if (!product) throw new NotFoundException('Produit non trouvé');

    const breakdown = [0, 0, 0, 0, 0]; // index 0 = 1 étoile, ..., index 4 = 5 étoiles

    for (const review of product.reviews || []) {
      if (review.rating >= 1 && review.rating <= 5) {
        breakdown[review.rating - 1]++;
      }
    }

    return breakdown.map((count, index) => ({
      rating: index + 1,
      count,
    }));
  }
}
