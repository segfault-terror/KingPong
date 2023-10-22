import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MinioModule } from 'nestjs-minio-client';
import { MinioClientService } from './minio-client.service';

@Module({
    imports: [
        MinioModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                return {
                    endPoint: configService.get('MINIO_ENDPOINT'),
                    port: 9000,
                    useSSL: false,
                    accessKey: configService.get('MINIO_ACCESS_KEY'),
                    secretKey: configService.get('MINIO_SECRET_KEY'),
                };
            },
        }),
    ],
    controllers: [],
    providers: [MinioClientService],
    exports: [MinioClientService],
})
export class MinioClientModule {}
