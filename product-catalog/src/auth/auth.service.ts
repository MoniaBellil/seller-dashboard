import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { AuthRegisterDto } from '../auth/auth-register.dto';
import { InternalServerErrorException } from '@nestjs/common';

import { ConflictException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}


  async register(data: AuthRegisterDto) {
    // Hasher le mot de passe avant de sauvegarder
    const hashedPassword = await bcrypt.hash(data.password, 10);
  
    // Créer l'utilisateur avec le mot de passe hashé
    return this.userService.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });
  }
  
  
 
  async login(data: any) {
    const user = await this.userService.findByEmail(data.email);
    console.log('User from DB:', user);
  
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const passwordMatches = await bcrypt.compare(data.password, user.password);
    console.log('Password match result:', passwordMatches);
  
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = { sub: user._id, email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }
  
  async profile(userId: string) {
    return this.userService.findById(userId);
  }


  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const newAccessToken = this.jwtService.sign({ sub: payload.sub, email: payload.email });
      return { accessToken: newAccessToken };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  
}

