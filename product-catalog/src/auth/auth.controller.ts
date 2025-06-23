import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthLoginDto } from '../auth/auth-login.dto';
import { AuthRegisterDto } from '../auth/auth-register.dto';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: AuthRegisterDto })
  @Post('register')
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login user and get JWT tokens' })
  @ApiBody({ type: AuthLoginDto })

  @Post('login')
async login(@Body() dto: AuthLoginDto) {
  try {
    return await this.authService.login(dto);
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
}


  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get user profile (protected)' })
  @Get('profile')
  getProfile(@Request() req) {
    return this.authService.profile(req.user.userId);
  }

  @ApiOperation({ summary: 'Logout user (dummy endpoint)' })
  @Post('logout')
  logout() {
    return { message: 'Logout success (manual)' };
  }

  @ApiOperation({ summary: 'Refresh JWT token' })
  @Post('refresh')
  refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
