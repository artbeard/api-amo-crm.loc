import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
