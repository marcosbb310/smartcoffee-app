# Smart Coffee - Styling Reference

## Current Color Scheme: Napoleon Blue Theme

### Card Gradients
**Perfect Card Gradient** (as confirmed by user):
```css
.card,
[data-slot="card"],
.bg-card {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%) !important;
}
```

**Alternative Card Gradients** (for future reference):
- Indigo Blue: `linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)`
- Light Blue: `linear-gradient(135deg, #dbeafe 0%, #e5e7eb 100%)`
- Warm Beige: `linear-gradient(135deg, #f7f3f0 0%, #ede7e0 100%)`

### Background Gradients
**Main Background** (warm beige):
```css
.main-content,
.dashboard,
.products-page,
.inventory-page,
.pos-page {
  background: linear-gradient(135deg, #f7f3f0 0%, #ede7e0 100%) !important;
}
```

**Landing Page Background**:
```css
.min-h-screen {
  background: linear-gradient(135deg, #f7f3f0 0%, #ede7e0 100%);
}
```

### Color Palette
**Primary Colors:**
- Napoleon Blue: `#2c4170`
- Light Napoleon Blue: `#e6eaf7`
- Warm Beige Start: `#f7f3f0`
- Warm Beige End: `#ede7e0`
- Card White: `#ffffff`
- Card Grey: `#e2e8f0`

**Text Colors:**
- Primary Text: `#000000` (black)
- Muted Text: Uses CSS variables

### Badge Styling
**Secondary Badges:**
```css
.badge,
[data-slot="badge"],
.bg-secondary {
  background-color: #e6eaf7 !important;
  color: #000000 !important;
}
```

**Primary Badges:**
```css
.bg-primary,
[data-slot="primary"] {
  background-color: #2c4170 !important;
  color: #ffffff !important;
}
```

### CSS Variables (from globals.css)
```css
:root {
  --background: oklch(0.99 0.005 0); /* Clean white */
  --foreground: oklch(0.15 0.01 0); /* Dark gray */
  --card: oklch(0.98 0.01 0); /* Light brown gradient start */
  --primary: oklch(0.45 0.15 250); /* Napoleon Blue */
  --secondary: oklch(0.90 0.05 250); /* Light Napoleon Blue */
  --muted: oklch(0.92 0.05 250); /* Very light blue */
  --accent: oklch(0.90 0.05 250); /* Light blue accent */
}
```

## How to Apply These Styles

### 1. For New Cards
Use the standard card classes - they automatically get the perfect gradient:
```jsx
<Card className="text-left">
  <CardHeader>
    <CardTitle>Your Title</CardTitle>
  </CardHeader>
  <CardContent>
    Your content here
  </CardContent>
</Card>
```

### 2. For Custom Elements
Apply the gradient directly:
```css
.your-element {
  background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%) !important;
}
```

### 3. For Backgrounds
Use the warm beige gradient:
```css
.your-background {
  background: linear-gradient(135deg, #f7f3f0 0%, #ede7e0 100%) !important;
}
```

## File Locations
- **Main CSS**: `app/globals.css` (lines 196-211 for card gradients)
- **Color Schemes**: `COLOR_SCHEMES.md`
- **This Reference**: `STYLING_REFERENCE.md`

## Last Updated
- Date: December 2024
- Status: ✅ Perfect - Confirmed by user
- Gradient: White to Light Grey (`#ffffff` to `#e2e8f0`)

## Notes
- All gradients use `135deg` angle for diagonal effect
- `!important` is used to override Tailwind defaults
- Cards automatically inherit the perfect gradient through CSS selectors
- Background maintains warm beige gradient for consistency
