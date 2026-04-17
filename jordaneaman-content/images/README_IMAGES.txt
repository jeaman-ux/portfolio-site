IMAGES - EXTRACTION NOTES
==========================

CHALLENGE WITH WIX IMAGE EXTRACTION:
Wix websites use dynamic image loading and Content Delivery Networks (CDNs) with obfuscated URLs. Images are often loaded via JavaScript rather than being directly embedded in HTML, making automated extraction complex and potentially incomplete.

RECOMMENDED APPROACH:
The most reliable way to extract all images with proper organization would be through the Wix Editor/Backoffice at:
https://manage.wix.com/dashboard/704ee55f-e816-45fc-95d1-9d62b6fe55a8/home

THROUGH WIX EDITOR YOU CAN:
1. Access the Media Manager which contains all uploaded images
2. Download images with their original filenames
3. See which images are used on which pages
4. Maintain proper organization and quality

ALTERNATIVE AUTOMATED APPROACH:
If you prefer automated extraction, I can:
1. Crawl each page and extract visible image URLs
2. Download images from the Wix CDN
3. Organize them by page/project

However, this approach may:
- Miss some images that are lazy-loaded
- Result in cryptic filenames from CDN
- Not capture the highest quality versions
- Miss images from the gallery pages that failed to load

RECOMMENDATION:
Please advise which approach you prefer:
A) Access Wix Editor for complete, reliable extraction
B) Attempt automated extraction with limitations noted above
C) Combination: automated extraction now + manual review later
