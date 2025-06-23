import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}



   create(data: any) {
    const user = new this.userModel(data);
    return user.save();
  }
  


  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();  
  }
  

  findById(id: string) {
    return this.userModel.findById(id);
  }
}

