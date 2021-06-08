import { NestFactory } from '@nestjs/core';
import { environment } from '@utils/commons';
import { enable as enableColors } from 'colors';
import { AppModule } from './app.module';
import { ValidationPipe } from './pipes/validators/validations.pipe';
import overload from './types/globals';

overload();

enableColors();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(
    process.env.PORT || 3000,
    process.env.HOSTNAME || 'localhost',
    () => {
      const server = app.getHttpServer();
      const fullAddress = server.address() as {
        address: string;
        family: string;
        port: number;
      };
      const address = fullAddress['address'];
      const port = fullAddress['port'];
      console.log(
        '\n🔥 Servidor rodando em'.green,
        (address + ':' + port).yellow,
        'no ambiente de'.green,
        environment().yellow,
      );
    },
  );
}
bootstrap();
