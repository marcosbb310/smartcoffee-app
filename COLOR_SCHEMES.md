# Smart Coffee Color Schemes

## Current Color Scheme: Napoleon Blue Theme

### Three Main Colors:

1. **Perfect Card Gradient** (Card Backgrounds) ✅ CONFIRMED BY USER
   - Start: `#ffffff` (pure white)
   - End: `#e2e8f0` (light grey)
   - Usage: All card backgrounds, product cards, dashboard cards
   - CSS: `linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)`

2. **Warm Beige Gradient** (Page Backgrounds)
   - Start: `#f7f3f0` (very light warm beige)
   - End: `#ede7e0` (slightly darker warm beige)
   - Usage: Main page backgrounds, dashboard backgrounds

3. **Light Napoleon Blue** (Stat Cards, Badges, Progress Bar Backgrounds)
   - Color: `#e6eaf7` (Light Napoleon Blue)
   - Usage: Small stat cards, badges, unfilled progress bar backgrounds

4. **Napoleon Blue** (Primary Elements, Icons, Progress Bar Fills)
   - Color: `#2c4170` (Napoleon Blue)
   - Usage: Revenue card icons, revenue badges, filled progress bars

### Text Color:
- **Black**: `#000000` for maximum readability

### CSS Classes Applied:
```css
/* Card backgrounds */
.card, [data-slot="card"], .bg-card {
  background: linear-gradient(to bottom right, #f7f3f0, #ede7e0) !important;
}

/* Light Napoleon Blue elements */
.badge, [data-slot="badge"], .bg-secondary {
  background-color: #e6eaf7 !important;
  color: #000000 !important;
}

/* Progress bars and muted elements */
.bg-muted, .bg-accent {
  background-color: #e6eaf7 !important;
}

/* Primary elements */
.bg-primary, [data-slot="primary"] {
  background-color: #2c4170 !important;
  color: #ffffff !important;
}
```

## Alternative Color Schemes (For Easy Testing)

### 1. Amber Theme (Previous)
- Light Brown Gradient: `#f7f3f0` to `#ede7e0`
- Subtle Amber: `#fef3c7` (amber-100)
- Darker Amber: `#f59e0b` (amber-500)

### 2. Orange Theme (Previous)
- Light Brown Gradient: `#f7f3f0` to `#ede7e0`
- Light Orange: `#fed7aa` (orange-100)
- Dark Orange: `#ea580c` (orange-600)

### 3. Original Gray Theme (Previous)
- Light Gray: `#f8f9fa` to `#e9ecef`
- Medium Gray: `#6c757d`
- Dark Gray: `#495057`

## How to Switch Themes

1. **To switch to Amber theme**: Uncomment the amber section and comment out the Napoleon Blue section in `app/globals.css`
2. **To switch to Orange theme**: Uncomment the orange section and comment out the Napoleon Blue section in `app/globals.css`
3. **To switch to Gray theme**: Uncomment the gray section and comment out the Napoleon Blue section in `app/globals.css`

## Files Modified for Color Consistency

- `app/globals.css` - Global CSS variables and overrides
- `app/dashboard/page.tsx` - Dashboard page styling
- `app/products/page.tsx` - Products page styling
- `app/inventory/page.tsx` - Inventory page styling
- `app/pos/page.tsx` - POS integration page styling
- `app/page.tsx` - Main landing page styling
- `app/components/ui/chart-area-interactive.tsx` - Chart colors