import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root', // ← 네 MySQL 사용자명
      password: '1234', // ← 네 MySQL 비밀번호
      database: 'apt', // ← 사용할 DB 이름 (사전에 생성)
      entities: [Product],
      synchronize: true, // 개발 중엔 true (자동 테이블 생성)
    }),
    ProductsModule,
  ],
})
export class AppModule {}