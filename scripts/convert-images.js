import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, parse } from 'path';

const projectsDir = 'public/assets/projects';

async function convertImages() {
  try {
    const files = await readdir(projectsDir);
    
    for (const file of files) {
      const filePath = join(projectsDir, file);
      const { name, ext } = parse(file);
      
      // Skip if already WebP
      if (ext === '.webp') {
        console.log(`Skipping ${file} - already WebP`);
        continue;
      }
      
      // Skip non-image files
      if (!['.png', '.jpg', '.jpeg'].includes(ext.toLowerCase())) {
        console.log(`Skipping ${file} - not an image`);
        continue;
      }
      
      console.log(`Converting ${file}...`);
      
      // Convert to WebP (desktop version)
      await sharp(filePath)
        .webp({ quality: 85 })
        .toFile(join(projectsDir, `${name}.webp`));
      
      console.log(`✓ Created ${name}.webp`);
      
      // Create mobile-optimized version (max width 800px)
      await sharp(filePath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(join(projectsDir, `${name}-mobile.webp`));
      
      console.log(`✓ Created ${name}-mobile.webp`);
    }
    
    console.log('\n✅ Image conversion complete!');
  } catch (error) {
    console.error('Error converting images:', error);
    process.exit(1);
  }
}

convertImages();
