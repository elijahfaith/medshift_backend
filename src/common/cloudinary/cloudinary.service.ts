import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import * as fs from 'fs';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private isConfigured = false;

  constructor() {
    this.init();
  }

  private init() {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    const cloudinaryUrl = process.env.CLOUDINARY_URL;

    if (cloudinaryUrl) {
      cloudinary.config();
      this.isConfigured = true;
      this.logger.log('Cloudinary successfully initialized via CLOUDINARY_URL.');
    } else if (cloudName && apiKey && apiSecret) {
      cloudinary.config({
        cloud_name: cloudName.trim(),
        api_key: apiKey.trim(),
        api_secret: apiSecret.trim(),
        secure: true,
      });
      this.isConfigured = true;
      this.logger.log(`Cloudinary successfully initialized for cloud: ${cloudName}`);
    } else {
      this.logger.warn(
        'Cloudinary environment variables not detected (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET or CLOUDINARY_URL). Falling back to disk storage.',
      );
    }
  }

  async upload(
    filePath: string,
    folder = 'medshift/general',
    resourceType: 'image' | 'raw' | 'auto' = 'auto',
  ): Promise<string | null> {
    // Re-check configuration dynamically in case env was loaded late
    if (!this.isConfigured) {
      this.init();
    }

    if (!this.isConfigured) {
      return null;
    }

    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
        folder,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
      });

      // Cleanup local temp file after successful remote upload to preserve disk space
      try {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        this.logger.warn(`Could not unlink temp local upload file: ${filePath}`);
      }

      return result.secure_url;
    } catch (error) {
      this.logger.error('Failed to upload file to Cloudinary:', error);
      return null;
    }
  }
}
