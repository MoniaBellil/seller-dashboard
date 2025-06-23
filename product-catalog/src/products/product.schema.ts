import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ _id: true })
export class Variant {
  @Prop({ required: true })
  name: string;

  @Prop()
  price?: number;

  @Prop()
 

  stock: number;
stockHistory: { date: Date; change: number }[];

}

export const VariantSchema = SchemaFactory.createForClass(Variant);

// Sous-schema Review
@Schema({ _id: true })
export class Review {
  @Prop({ required: true, type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 0, max: 5 })
  rating: number;

  @Prop()
  comment: string;

  @Prop({ default: 0 })
  helpfulVotes: number;

  @Prop([String])
  photoUrls?: string[];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);

// Document Product
export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  category: string;

  @Prop()
  subcategory: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  discount?: number;

  @Prop({ required: true })
  stock: number;

  @Prop({ type: [{ date: Date, change: Number }] })
  stockHistory: { date: Date; change: number }[];

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: Boolean, default: false })
  promoted: boolean;

  @Prop({ type: [{ rating: Number, comment: String }] })
  reviews: { rating: number; comment: string }[];

  @Prop({
    type: {
      images: [String],
      model3d: String,
    },
  })
  media: {
    images: string[];
    model3d?: string;
  };

  @Prop({ type: [VariantSchema], default: [] })
  variants: Variant[];

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true })
  businessId: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);
