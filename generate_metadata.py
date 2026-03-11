#!/usr/bin/env python3
"""Auto-generate metadata.csv by scanning PDF folder structure"""

import os
from pathlib import Path
from datetime import datetime
import csv
import re
from dateutil import parser as date_parser


def extract_date_from_filename(filename):
    """Extract publish date from PDF filename.
    
    Handles patterns like:
    - "September 2018"
    - "March 2020"
    - "8th June 2022"
    - "30th June 2023"
    - "31st December 2023"
    """
    try:
        # Remove .pdf extension
        name_without_ext = filename.replace('.pdf', '')
        
        # Pattern 1: "Day[st/nd/rd/th]? Month Year" (e.g., "8th June 2022")
        match = re.search(r'(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]+)\s+(\d{4})', name_without_ext)
        if match:
            day, month, year = match.groups()
            date_str = f"{day} {month} {year}"
            parsed_date = date_parser.parse(date_str)
            return parsed_date.strftime('%d/%m/%Y')
        
        # Pattern 2: "Month Year" (e.g., "September 2018", "March 2020")
        match = re.search(r'([A-Za-z]+)\s+(\d{4})', name_without_ext)
        if match:
            month, year = match.groups()
            # Try to parse as month day year (default to 1st of month)
            date_str = f"1 {month} {year}"
            parsed_date = date_parser.parse(date_str)
            return parsed_date.strftime('%d/%m/%Y')
        
        # Pattern 3: "Month" and "Year" separately in filename
        month_match = re.search(r'(January|February|March|April|May|June|July|August|September|October|November|December)', name_without_ext, re.IGNORECASE)
        year_match = re.search(r'(19|20)\d{2}', name_without_ext)
        
        if month_match and year_match:
            date_str = f"1 {month_match.group(1)} {year_match.group(0)}"
            parsed_date = date_parser.parse(date_str)
            return parsed_date.strftime('%d/%m/%Y')
        
        # If no date found, return today's date
        return datetime.now().strftime('%d/%m/%Y')
        
    except Exception as e:
        print(f"   ⚠️  Could not parse date from '{filename}', using today's date")
        return datetime.now().strftime('%Y-%m-%d')


def generate_metadata_csv():
    """Scan PDFs folder and generate metadata.csv"""
    print("\n" + "="*60)
    print("📋 AUTO-GENERATE METADATA CSV")
    print("="*60 + "\n")

    # Paths
    script_dir = Path(__file__).parent
    bulk_import_dir = script_dir / 'bulk_import'
    pdfs_dir = bulk_import_dir / 'pdfs'
    output_csv = bulk_import_dir / 'metadata.csv'

    # Check if pdfs directory exists
    if not pdfs_dir.exists():
        print(f"❌ PDFs folder not found: {pdfs_dir}")
        print("📁 Create bulk_import/pdfs/ folder and organize PDFs by category")
        return

    # Scan for PDFs
    print(f"🔍 Scanning: {pdfs_dir}\n")

    pdf_data = []
    total_pdfs = 0

    # Walk through directory structure
    for category_dir in sorted(pdfs_dir.iterdir()):
        if not category_dir.is_dir():
            continue

        category_name = category_dir.name
        print(f"📂 Category: {category_name}")

        # Find all PDFs in this category
        pdf_files = sorted(category_dir.glob('*.pdf'))

        if not pdf_files:
            print(f"   ⚠️  No PDFs found")
            continue

        for pdf_file in pdf_files:
            total_pdfs += 1
            print(f"   ✅ {pdf_file.name}")

            # Extract date from filename
            publish_date = extract_date_from_filename(pdf_file.name)

            # Create default entry (no author - will use default in import script)
            entry = {
                'fileName': pdf_file.name,
                'category': category_name,
                'publishDate': publish_date,
            }
            pdf_data.append(entry)

        print()

    if not pdf_data:
        print("❌ No PDFs found in bulk_import/pdfs/")
        return

    # Write to CSV
    try:
        with open(output_csv, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(
                f, fieldnames=['fileName', 'category', 'publishDate'])
            writer.writeheader()
            writer.writerows(pdf_data)

        print("="*60)
        print(f"✅ SUCCESS!")
        print("="*60)
        print(f"📄 Created: {output_csv.name}")
        print(f"📊 Total PDFs: {total_pdfs}")
        print(f"\n✨ Publish dates auto-extracted from filenames!")
        print(f"\n💡 Author will be set to 'UABC Team' by default during import")
        print(f"\n→ Run: python bulk_import_insights.py")

    except Exception as e:
        print(f"❌ Error creating CSV: {e}")


if __name__ == '__main__':
    generate_metadata_csv()
