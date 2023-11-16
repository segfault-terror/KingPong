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
    ) {
        this.createBucket().catch();
    }

    private readonly bucketName = 'user-profiles';

    get client() {
        return this.minioService.client;
    }

    async createBucket(bucketName: string = this.bucketName) {
        try {
            if (!(await this.client.bucketExists(bucketName))) {
                await this.client.makeBucket(bucketName);
                await this.setBucketPolicy();
            }
        } catch {
            // Bucket already exists
        }
    }

    async setBucketPolicy() {
        const policy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: [
                        's3:ListBucketMultipartUploads',
                        's3:GetBucketLocation',
                        's3:ListBucket',
                    ],
                    Resource: ['arn:aws:s3:::user-profiles'],
                },
                {
                    Effect: 'Allow',
                    Principal: {
                        AWS: ['*'],
                    },
                    Action: ['s3:GetObject'],
                    Resource: ['arn:aws:s3:::user-profiles/*'],
                },
            ],
        };
        this.minioService.client.setBucketPolicy(
            'user-profiles',
            JSON.stringify(policy),
            function (err) {
                if (err) throw err;
            },
        );
    }

    async upload(file: BufferedFile, bucketName: string = this.bucketName) {
        if (!file.mimetype.includes('image')) {
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

        try {
            const bucketExists = await this.client.bucketExists(bucketName);
            if (!bucketExists) {
                await this.client.makeBucket(bucketName);
            }
        } catch {
            // Bucket already exists
        }
        try {
            this.client.putObject(bucketName, fileName, file.buffer, metaData);
        } catch {
            throw new BadRequestException('Error uploading file');
        }

        return {
            url: `/${bucketName}/${fileName}`,
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
