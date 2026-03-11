#!/usr/bin/env python3
"""
Setup utility for bulk import script
Creates the required folder structure and generates a sample .env file
"""

import os
from pathlib import Path

def setup_bulk_import():
    """Set up the bulk import directory structure."""
    print("\n" + "="*60)
    print("🛠️  BULK IMPORT SETUP")
    print("="*60 + "\n")
    
    # Get the script directory
    script_dir = Path(__file__).parent
    bulk_import_dir = script_dir / 'bulk_import'
    pdfs_dir = bulk_import_dir / 'pdfs'
    
    # Create directories
    print("📁 Creating directory structure...")
    
    (pdfs_dir / 'Research Papers').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Research Papers/")
    
    (pdfs_dir / 'Reports').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Reports/")
    
    (pdfs_dir / 'Case Studies').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Case Studies/")
    
    (pdfs_dir / 'Market Analysis').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Market Analysis/")
    
    (pdfs_dir / 'Regulatory').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Regulatory/")
    
    (pdfs_dir / 'Risk Management').mkdir(parents=True, exist_ok=True)
    print("  ✅ Created: bulk_import/pdfs/Risk Management/")
    
    # Check for .env file
    env_file = script_dir / '.env'
    print("\n🔐 Environment Configuration...")
    
    if env_file.exists():
        print("  ⚠️  .env file already exists")
    else:
        print("  📝 Creating sample .env file...")
        
        env_content = """# MongoDB Configuration
# Get your MongoDB Atlas connection string from https://www.mongodb.com/cloud/atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uabc?retryWrites=true&w=majority

# Cloudinary Configuration
# Get your credentials from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
"""
        
        with open(env_file, 'w') as f:
            f.write(env_content)
        print("  ✅ Created: .env (please fill in your credentials)")
    
    # Check for metadata.xlsx
    print("\n📊 Metadata File...")
    metadata_file = bulk_import_dir / 'metadata.xlsx'
    
    if not metadata_file.exists():
        print("  ⚠️  metadata.xlsx not found")
        print("  📝 Please create:", metadata_file)
        print("  💡 Use metadata_sample.csv as a reference")
        print("  💡 Columns required: fileName, category, publishDate, author")
    else:
        print("  ✅ Found: metadata.xlsx")
    
    # Check for sample data
    print("\n📋 Sample Data Files...")
    sample_csv = script_dir / 'metadata_sample.csv'
    if sample_csv.exists():
        print("  ✅ Found: metadata_sample.csv (reference template)")
    
    print("\n" + "="*60)
    print("✅ SETUP COMPLETE!")
    print("="*60)
    print("\nNext steps:")
    print("1. Edit .env file with your MongoDB and Cloudinary credentials")
    print("2. Create/place your metadata.xlsx in bulk_import/")
    print("3. Organize your PDFs in bulk_import/pdfs/[Category]/")
    print("4. Run: python bulk_import_insights.py")
    print("\n💡 For help, see: BULK_IMPORT_README.md\n")

if __name__ == '__main__':
    setup_bulk_import()
