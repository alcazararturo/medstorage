import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ZodValidationPipe } from "nestjs-zod";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Activamos la validación automática global con Zod
  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix("api");
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
