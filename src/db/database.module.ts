import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        synchronize: true,
        autoLoadEntities: true,
        ...configService.get('database'),
      }),
    }),
  ],
})
export class DatabaseModule {}
