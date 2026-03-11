#!/usr/bin/env python3
"""
Bulk Import PDF Insights into MERN CMS
Reads metadata from Excel, uploads PDFs to Cloudinary, and creates MongoDB documents.
"""

import os
import sys
from pathlib import Path
from datetime import datetime
import pandas as pd
import cloudinary
import cloudinary.uploader
from pymongo import MongoClient, errors
from tqdm import tqdm
from dotenv import load_dotenv
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Configuration
MONGODB_URI = os.getenv('MONGODB_URI')
CLOUDINARY_CLOUD_NAME = os.getenv('CLOUDINARY_CLOUD_NAME')
CLOUDINARY_API_KEY = os.getenv('CLOUDINARY_API_KEY')
CLOUDINARY_API_SECRET = os.getenv('CLOUDINARY_API_SECRET')

# Paths
BULK_IMPORT_DIR = Path(__file__).parent / 'bulk_import'
PDFS_DIR = BULK_IMPORT_DIR / 'pdfs'

# Find metadata file (CSV or Excel)
def get_metadata_file():
    """Find metadata file - check for CSV first, then XLSX."""
    csv_file = BULK_IMPORT_DIR / 'metadata.csv'
    xlsx_file = BULK_IMPORT_DIR / 'metadata.xlsx'
    
    if csv_file.exists():
        return csv_file
    elif xlsx_file.exists():
        return xlsx_file
    return None

METADATA_FILE = get_metadata_file()

# Database configuration
DB_NAME = 'uabc'
COLLECTION_NAME = 'insights'


def validate_configuration():
    """Validate that all required environment variables and files exist."""
    errors_list = []
    
    if not MONGODB_URI:
        errors_list.append("❌ MONGODB_URI not set in environment variables")
    
    if not CLOUDINARY_CLOUD_NAME:
        errors_list.append("❌ CLOUDINARY_CLOUD_NAME not set in environment variables")
    if not CLOUDINARY_API_KEY:
        errors_list.append("❌ CLOUDINARY_API_KEY not set in environment variables")
    if not CLOUDINARY_API_SECRET:
        errors_list.append("❌ CLOUDINARY_API_SECRET not set in environment variables")
    
    if not METADATA_FILE:
        errors_list.append(f"❌ Metadata file not found: bulk_import/metadata.csv or bulk_import/metadata.xlsx")
    
    if not PDFS_DIR.exists():
        errors_list.append(f"❌ PDFs directory not found: {PDFS_DIR}")
    
    if errors_list:
        for error in errors_list:
            print(error)
        return False
    
    print("✅ Configuration validated successfully")
    return True


def configure_cloudinary():
    """Configure Cloudinary with credentials."""
    cloudinary.config(
        cloud_name=CLOUDINARY_CLOUD_NAME,
        api_key=CLOUDINARY_API_KEY,
        api_secret=CLOUDINARY_API_SECRET,
        secure=True
    )
    logger.info("✅ Cloudinary configured")


def connect_mongodb():
    """Connect to MongoDB."""
    try:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        # Test connection
        client.admin.command('ping')
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        logger.info("✅ Connected to MongoDB")
        return client, collection
    except Exception as e:
        logger.error(f"❌ Failed to connect to MongoDB: {e}")
        raise


def read_metadata():
    """Read and validate metadata from CSV or Excel file."""
    try:
        if not METADATA_FILE:
            logger.error("❌ Metadata file not found (checked for metadata.csv and metadata.xlsx)")
            return None
        
        # Read based on file extension
        if METADATA_FILE.suffix.lower() == '.csv':
            df = pd.read_csv(METADATA_FILE)
            logger.info(f"📊 Reading CSV: {METADATA_FILE.name}")
        else:
            df = pd.read_excel(METADATA_FILE)
            logger.info(f"📊 Reading Excel: {METADATA_FILE.name}")
        
        # Validate required columns (author is optional)
        required_columns = ['fileName', 'category', 'publishDate']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            logger.error(f"❌ Missing columns in metadata file: {missing_columns}")
            return None
        
        # Add default author if not provided
        if 'author' not in df.columns:
            df['author'] = 'UABC Team'
            logger.info("ℹ️  No 'author' column found, using default: 'UABC Team'")
        
        logger.info(f"📊 Found {len(df)} records in metadata file")
        return df
    except Exception as e:
        logger.error(f"❌ Error reading metadata file: {e}")
        return None


def find_pdf_file(filename):
    """Find PDF file in the pdfs directory structure."""
    # Search recursively in PDFS_DIR
    for pdf_file in PDFS_DIR.rglob(filename):
        if pdf_file.is_file() and pdf_file.suffix.lower() == '.pdf':
            return pdf_file
    
    return None


def upload_to_cloudinary(pdf_path):
    """Upload PDF to Cloudinary and return secure URL."""
    try:
        filename = pdf_path.stem  # Get filename without extension
        
        # Sanitize filename for Cloudinary public_id
        # Replace special characters and spaces with underscores
        safe_filename = filename
        safe_filename = safe_filename.replace('&', 'and')  # Replace & with 'and'
        safe_filename = safe_filename.replace(' ', '_')  # Replace spaces with underscores
        safe_filename = safe_filename.replace(',', '')  # Remove commas
        safe_filename = safe_filename.replace('(', '')  # Remove parentheses
        safe_filename = safe_filename.replace(')', '')  # Remove parentheses
        safe_filename = ''.join(c for c in safe_filename if c.isalnum() or c in '_-.')  # Keep only safe chars
        safe_filename = safe_filename.strip('_-.')  # Remove leading/trailing special chars
        
        result = cloudinary.uploader.upload(
            str(pdf_path),
            resource_type='raw',
            folder='insights-pdfs',
            public_id=safe_filename,
            overwrite=False,
            unique_filename=True,
            invalidate=True
        )
        
        secure_url = result.get('secure_url')
        logger.info(f"✅ Uploaded: {pdf_path.name} → {secure_url}")
        return secure_url
    except Exception as e:
        logger.error(f"❌ Failed to upload {pdf_path.name}: {e}")
        return None


def generate_title_from_filename(filename):
    """Generate a readable title from PDF filename."""
    # Remove extension and convert underscores/hyphens to spaces
    title = filename.replace('.pdf', '').replace('_', ' ').replace('-', ' ')
    # Capitalize each word
    title = ' '.join(word.capitalize() for word in title.split())
    return title


def document_exists(collection, pdf_url, title):
    """Check if document already exists in MongoDB."""
    try:
        existing = collection.find_one({
            '$or': [
                {'pdfUrl': pdf_url},
                {'title': title}
            ]
        })
        return existing is not None
    except Exception as e:
        logger.warning(f"⚠️  Error checking for duplicates: {e}")
        return False


def create_insight_document(row, pdf_url):
    """Create an insight document for MongoDB."""
    # Parse publish date (handles DD/MM/YYYY format from metadata)
    try:
        # Try parsing as DD/MM/YYYY first
        publish_date = pd.to_datetime(row['publishDate'], format='%d/%m/%Y').to_pydatetime()
    except:
        try:
            # Fallback to flexible parsing
            publish_date = pd.Timestamp(row['publishDate']).to_pydatetime()
        except:
            publish_date = datetime.now()
    
    # Generate title from filename if not provided
    title = generate_title_from_filename(row['fileName'])
    
    document = {
        'title': title,
        'excerpt': f"{row['category']} - {row.get('author', 'Unknown Author')}",
        'author': row.get('author', 'Unknown Author'),
        'category': row['category'],
        'pdfUrl': pdf_url,
        'pdfFilename': row['fileName'],
        'publishDate': publish_date,
        'published': True,
        'featured': False,
        'content': '',
        'tags': [row['category']],
        'createdAt': datetime.now(),
        'updatedAt': datetime.now(),
        'views': 0,
        'likes': 0,
        'featuredImage': f"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300",
        'readTime': 5
    }
    
    return document


def bulk_import_insights():
    """Main function to perform bulk import."""
    print("\n" + "="*60)
    print("🚀 BULK IMPORT PDF INSIGHTS - MERN CMS")
    print("="*60 + "\n")
    
    # Validate configuration
    if not validate_configuration():
        sys.exit(1)
    
    # Configure Cloudinary
    configure_cloudinary()
    
    # Read metadata
    df = read_metadata()
    if df is None:
        sys.exit(1)
    
    # Connect to MongoDB
    try:
        client, collection = connect_mongodb()
    except:
        sys.exit(1)
    
    # Initialize counters
    total = len(df)
    successful = 0
    skipped = 0
    duplicates = 0
    errors = 0
    
    # Process each row with progress bar
    print(f"\n📁 Processing {total} PDF records...\n")
    
    for idx, row in tqdm(df.iterrows(), total=total, desc="Progress", unit="PDF"):
        filename = row['fileName']
        category = row['category']
        
        try:
            # Find PDF file
            pdf_path = find_pdf_file(filename)
            if not pdf_path:
                logger.warning(f"⚠️  PDF file not found: {filename} (Category: {category})")
                skipped += 1
                continue
            
            # Upload to Cloudinary
            pdf_url = upload_to_cloudinary(pdf_path)
            if not pdf_url:
                errors += 1
                continue
            
            # Check for duplicates
            title = generate_title_from_filename(filename)
            if document_exists(collection, pdf_url, title):
                logger.warning(f"⏭️  Duplicate found: {filename} - Skipping")
                duplicates += 1
                continue
            
            # Create and insert document
            doc = create_insight_document(row, pdf_url)
            result = collection.insert_one(doc)
            
            if result.inserted_id:
                logger.info(f"✅ Document created: {title}")
                successful += 1
            else:
                errors += 1
        
        except Exception as e:
            logger.error(f"❌ Error processing {filename}: {e}")
            errors += 1
    
    # Close MongoDB connection
    client.close()
    
    # Print summary
    print("\n" + "="*60)
    print("📊 IMPORT SUMMARY")
    print("="*60)
    print(f"Total PDFs Processed:     {total}")
    print(f"✅ Successful Imports:    {successful}")
    print(f"⏭️  Duplicates Skipped:    {duplicates}")
    print(f"⚠️  Files Not Found:       {skipped}")
    print(f"❌ Errors:                {errors}")
    print("="*60 + "\n")
    
    if successful > 0:
        print(f"🎉 Successfully imported {successful} PDF insights!")
    else:
        print("❌ No PDFs were imported. Please check the logs above.")


if __name__ == '__main__':
    bulk_import_insights()
