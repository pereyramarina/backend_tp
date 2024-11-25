import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe,Logger } from '@nestjs/common';
import {envs} from './configuration'
import { HttpExceptionFilter } from './common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Logger is used to log messages in the console
  const logger = new Logger('Main')

  app.useGlobalFilters(new HttpExceptionFilter())
  
  // Setea el prefijo para las rutas
  app.setGlobalPrefix('api')

  app.useGlobalPipes(
    new ValidationPipe({
      // Permite solo el ingreso de propiedades seteadas en el DTO
      whitelist:true,
      forbidNonWhitelisted:true
    }
    )
  )

  //Configuracion de Swagger
  const config = new DocumentBuilder()
    .setTitle('API REST Example')
    .setDescription('API REST documentation')
    .setVersion('1.0')
    .addTag('examples')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.port);
  logger.log(`Server listening on port: ${envs.port}`)
}
bootstrap();
