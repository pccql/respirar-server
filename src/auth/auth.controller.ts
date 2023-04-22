import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Response() res) {
    const { access_token, g_token } = await this.authService.googleLogin(
      req.user,
    );

    const redirectUrl = this.configService.get<string>('GOOGLE_REDIRECT_URL');

    res.redirect(
      redirectUrl + `callback?token=${access_token}&g_token=${g_token}`,
    );
    return res;
  }
}
