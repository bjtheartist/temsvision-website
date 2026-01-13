/**
 * Migration script to upload existing photos to Sanity CMS
 * Run with: npx ts-node scripts/migrate-to-sanity.ts
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Sanity client with write access
const client = createClient({
  projectId: 'ul99syn2',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

// Gallery categories configuration
const CATEGORIES = [
  {
    id: 'portraits',
    title: 'Portraits',
    description: 'Creative portrait photography capturing personality and emotion.',
    order: 1,
  },
  {
    id: 'sports',
    title: 'Sports',
    description: 'Dynamic sports photography capturing athletes in motion.',
    order: 2,
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'Vibrant lifestyle photography capturing authentic moments.',
    order: 3,
  },
  {
    id: 'fashion',
    title: 'Fashion',
    description: 'High-end editorial and fashion photography with refined style.',
    order: 4,
  },
  {
    id: 'maternity',
    title: 'Maternity & Family',
    description: 'Beautiful maternity photography celebrating new beginnings.',
    order: 5,
  },
];

const GALLERY_DIR = path.join(__dirname, '../public/gallery');

// Get all photos for a category
function getPhotosForCategory(categoryId: string): string[] {
  const files = fs.readdirSync(GALLERY_DIR);
  return files
    .filter(f => f.startsWith(`${categoryId}-`) && /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)/)?.[1] || '0');
      const numB = parseInt(b.match(/(\d+)/)?.[1] || '0');
      return numA - numB;
    });
}

// Get hero images
function getHeroImages(): string[] {
  return ['hero-1.jpg', 'hero-2.jpg', 'hero-3.jpg'].filter(f =>
    fs.existsSync(path.join(GALLERY_DIR, f))
  );
}

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

// Create hero slideshow
async function createHeroSlideshow() {
  console.log('\n📸 Creating Hero Slideshow...');

  const heroFiles = getHeroImages();
  const images = [];

  for (const file of heroFiles) {
    const image = await uploadImage(file);
    images.push(image);
  }

  await client.createOrReplace({
    _id: 'heroSlideshow',
    _type: 'heroSlideshow',
    title: 'Hero Slideshow',
    images,
    interval: 5,
  });

  console.log(`✅ Hero slideshow created with ${images.length} images`);
}

// Create gallery categories
async function createGalleryCategories() {
  console.log('\n🖼️  Creating Gallery Categories...\n');

  for (const category of CATEGORIES) {
    console.log(`\n📁 ${category.title}`);

    const photoFiles = getPhotosForCategory(category.id);
    console.log(`  Found ${photoFiles.length} photos`);

    if (photoFiles.length === 0) {
      console.log(`  ⚠️  No photos found for ${category.id}, skipping...`);
      continue;
    }

    // Upload cover image (first photo)
    const coverImage = await uploadImage(photoFiles[0]);

    // Upload all photos
    const photos = [];
    for (const file of photoFiles) {
      const photo = await uploadImage(file);
      photos.push(photo);
    }

    // Create the category document
    await client.createOrReplace({
      _id: `gallery-${category.id}`,
      _type: 'galleryCategory',
      title: category.title,
      slug: { _type: 'slug', current: category.id },
      description: category.description,
      coverImage,
      photos,
      order: category.order,
    });

    console.log(`✅ ${category.title}: ${photos.length} photos uploaded`);
  }
}

// Main migration function
async function migrate() {
  console.log('🚀 Starting migration to Sanity...\n');

  if (!process.env.SANITY_WRITE_TOKEN) {
    console.error('❌ Error: SANITY_WRITE_TOKEN environment variable is required');
    console.log('\nTo get a token:');
    console.log('1. Go to https://www.sanity.io/manage/project/ul99syn2/api');
    console.log('2. Click "Add API token"');
    console.log('3. Name it "Migration" and select "Editor" permissions');
    console.log('4. Copy the token and run:');
    console.log('   SANITY_WRITE_TOKEN=your_token npx ts-node scripts/migrate-to-sanity.ts');
    process.exit(1);
  }

  try {
    await createHeroSlideshow();
    await createGalleryCategories();

    console.log('\n\n✨ Migration complete!');
    console.log('📍 View your content at: https://temsvision.sanity.studio/');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();
