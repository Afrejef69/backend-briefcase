import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3001;

  const allowedOrigins = [
    'https://frontend-briefcase.vercel.app/',
    'https://frontend-briefcase-afrejef69s-projects.vercel.app/',
    'https://frontend-briefcase-git-main-afrejef69s-projects.vercel.app/',
    'https://vercel.com/afrejef69s-projects/frontend-briefcase/3ZzKZiErsgpTsDFWB3bHQ1JfthVz',
    'https://frontend-briefcase-9tcvgsvf1-afrejef69s-projects.vercel.app/',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Blog')
    .setDescription(
      'The blog that talks about topics related to software development and topics of my interest.',
    )
    .setVersion('1.0')
    .addTag('Blog')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, '0.0.0.0');
}

bootstrap();
