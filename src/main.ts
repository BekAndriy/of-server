import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.PORT || 5000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    // validates sender
    origin: (req, callback) => callback(null, true),
  });
  app.use(helmet());
  await app.listen(port);
}
bootstrap();
