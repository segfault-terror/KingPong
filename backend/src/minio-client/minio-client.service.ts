import { BadRequestException, Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import { BufferedFile } from './file.model';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
    constructor(
        private readonly minioService: MinioService,
        private readonly configService: ConfigService,
    ) {}

    private readonly bucketName = 'user-profiles';

    get client() {
        return this.minioService.client;
    }

    async upload(file: BufferedFile, bucketName: string = this.bucketName) {
        if (
            !(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))
        ) {
            throw new BadRequestException('File type not supported');
        }
        const timestamp = Date.now().toString();
        const hashedFileName = crypto
            .createHash('md5')
            .update(timestamp)
            .digest('hex');

        const extension = file.originalname.substring(
            file.originalname.lastIndexOf('.'),
            file.originalname.length,
        );

        const metaData = {
            'Content-Type': file.mimetype,
        };

        const fileName = hashedFileName + extension;

        this.client.putObject(
            bucketName,
            fileName,
            file.buffer,
            metaData,
            function (err) {
                if (err) {
                    throw new BadRequestException('Error uploading file');
                }
            },
        );

        return {
            url: `${this.configService.get(
                'MINIO_ENDPOINT',
            )}:9000/${bucketName}/${fileName}`,
        };
    }

    async delete(fileName: string, bucketName: string = this.bucketName) {
        this.client.removeObject(bucketName, fileName, function (err) {
            if (err) {
                throw new BadRequestException('Error deleting file');
            }
        });
    }
}
