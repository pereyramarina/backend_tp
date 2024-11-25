import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtGuard,GUARD_KEY } from './common';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [PrismaModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService,
    {provide: GUARD_KEY,
      useClass: JwtGuard,
    }
  ],
})
export class AppModule {}
