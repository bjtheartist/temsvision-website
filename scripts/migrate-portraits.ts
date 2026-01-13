/**
 * Migration script to upload portrait photos to Sanity CMS
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
  projectId: 'ul99syn2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const GALLERY_DIR = path.join(__dirname, '../public/gallery');

// Upload an image to Sanity
async function uploadImage(filename: string): Promise<any> {
  const filePath = path.join(GALLERY_DIR, filename);
  const imageBuffer = fs.readFileSync(filePath);

  console.log(`  Uploading ${filename}...`);

  const asset = await client.assets.upload('image', imageBuffer, {
    filename,
  });

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  };
}

async function migratePortraits() {
  console.log('🚀 Migrating Portraits...\n');

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ SANITY_WRITE_TOKEN required');
    process.exit(1);
  }

  // Get portrait files (singular "portrait-" prefix)
  const files = fs.readdirSync(GALLERY_DIR);
  const portraitFiles = files
    .filter(f => f.startsWith('portrait-') && /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/(\d+)/)?.[1] || '0');
      return numA - numB;
    });

  console.log(`Found ${portraitFiles.length} portrait photos`);

  // Upload cover image (first photo)
  const coverImage = await uploadImage(portraitFiles[0]);

  // Upload all photos
  const photos = [];
  for (const file of portraitFiles) {
    const photo = await uploadImage(file);
    photos.push(photo);
  }

  // Create the category document
  await client.createOrReplace({
    _id: 'gallery-portraits',
    _type: 'galleryCategory',
    title: 'Portraits',
    slug: { _type: 'slug', current: 'portraits' },
    description: 'Creative portrait photography capturing personality and emotion.',
    coverImage,
    photos,
    order: 1,
  });

  console.log(`\n✅ Portraits: ${photos.length} photos uploaded`);
  console.log('📍 View at: https://temsvision.sanity.studio/');
}

migratePortraits();
