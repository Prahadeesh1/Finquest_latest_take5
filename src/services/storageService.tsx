// src/services/storageService.ts
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

export class StorageService {
  // Upload image to Firebase Storage
  static async uploadPostImage(file: File, userId: string): Promise<string> {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        throw new Error('Image size must be less than 5MB');
      }

      // Create unique filename
      const timestamp = Date.now();
      const filename = `${timestamp}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const imagePath = `posts/${userId}/${filename}`;

      // Create storage reference
      const imageRef = storageRef(storage, imagePath);

      // Upload file
      await uploadBytes(imageRef, file, {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000'
      });

      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  // Delete image from Firebase Storage
  static async deletePostImage(imageUrl: string): Promise<void> {
    try {
      // Extract path from URL
      const imagePath = imageUrl.split('/o/')[1]?.split('?')[0];
      if (!imagePath) {
        throw new Error('Invalid image URL');
      }

      const decodedPath = decodeURIComponent(imagePath);
      const imageRef = storageRef(storage, decodedPath);

      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  }

  // Upload profile picture
  static async uploadProfilePicture(file: File, userId: string): Promise<string> {
    try {
      if (!file.type.startsWith('image/')) {
        throw new Error('File must be an image');
      }

      const maxSize = 2 * 1024 * 1024; // 2MB for profile pics
      if (file.size > maxSize) {
        throw new Error('Profile picture must be less than 2MB');
      }

      const filename = `profile_${Date.now()}.${file.name.split('.').pop()}`;
      const imagePath = `profiles/${userId}/${filename}`;

      const imageRef = storageRef(storage, imagePath);
      await uploadBytes(imageRef, file, {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000'
      });

      const downloadURL = await getDownloadURL(imageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }
}