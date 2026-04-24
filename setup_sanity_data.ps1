# Populate Sanity Data Script for Laval Luxury Motors (Windows Optimized)

Write-Host "Starting data population for Sanity..." -ForegroundColor Gold

function Create-SanityDoc($json) {
    # On Windows PowerShell, we need to be careful with quotes
    # Passing the JSON through a variable often helps
    $cmd = "npx"
    $args = @("sanity", "documents", "create", "--replace", $json)
    & $cmd $args
}

# 1. Categories
Write-Host "Adding Categories..."
Create-SanityDoc '{ "_type": "category", "_id": "cat-hypercar", "title": "Hypercar" }'
Create-SanityDoc '{ "_type": "category", "_id": "cat-supercar", "title": "Supercar" }'
Create-SanityDoc '{ "_type": "category", "_id": "cat-classic", "title": "Classic" }'
Create-SanityDoc '{ "_type": "category", "_id": "cat-luxury", "title": "Luxury" }'
Create-SanityDoc '{ "_type": "category", "_id": "cat-suv", "title": "SUV" }'

# 2. Brands
Write-Host "Adding Brands..."
Create-SanityDoc '{ "_type": "brand", "_id": "brand-ferrari", "name": "Ferrari" }'
Create-SanityDoc '{ "_type": "brand", "_id": "brand-lamborghini", "name": "Lamborghini" }'
Create-SanityDoc '{ "_type": "brand", "_id": "brand-porsche", "name": "Porsche" }'
Create-SanityDoc '{ "_type": "brand", "_id": "brand-bugatti", "name": "Bugatti" }'
Create-SanityDoc '{ "_type": "brand", "_id": "brand-rolls", "name": "Rolls-Royce" }'
Create-SanityDoc '{ "_type": "brand", "_id": "brand-mclaren", "name": "McLaren" }'

# 3. Site Settings
Write-Host "Adding Site Settings..."
Create-SanityDoc '{ "_type": "siteSettings", "_id": "siteSettings", "title": "Laval Luxury Motors", "footerText": "© 2026 LAVAL LUXURY MOTORS" }'

Write-Host "Data population complete! Please refresh your Sanity Studio." -ForegroundColor Green
