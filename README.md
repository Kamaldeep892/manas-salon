# Manna's Salon

A single-page website for Manna's Salon, a beauty salon in Wireless Park, Kolkata. It has a hero, about, service categories, gallery with lightbox, review summary, appointment enquiry form (opens a prefilled WhatsApp message) and a contact section with a map.

## Tech stack

- React 19 (JSX)
- Tailwind CSS v4
- Motion (`motion/react`) for animations
- Lucide React for icons
- Vite

## Run locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev
```

Open the link printed in the terminal, usually http://localhost:5173.

## Build for production

```bash
npm run build
npm run preview
```

The production files are created in the `dist` folder.

## Deploy on Vercel

1. Push this project to GitHub.
2. On vercel.com, choose **Add New > Project** and import the repository.
3. Use these settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Every `git push` to `main` redeploys the site.

## Project structure

```
├── index.html          # Page title, SEO and Open Graph tags, LocalBusiness schema
├── public/             # Images, favicon, robots.txt
├── src/
│   ├── App.jsx         # All sections and animations
│   ├── index.css       # Tailwind, colour variables, base styles
│   └── main.jsx        # App entry point
└── vite.config.js
```

## Editing content

Business details are at the top of `src/App.jsx`:

- `address`: salon address, used for directions and the map
- `phoneNumber`: used for the call links
- `serviceCategories`: service names, descriptions and images
- `galleryImages`: gallery photos and captions

To change the WhatsApp number, search for `wa.me/` in `src/App.jsx` (international format without `+`, for example `919038275845`).

Images live in `public/images/`. Replace them with your own photos, keeping the same file names or updating the paths in `App.jsx`.

The service categories are suggestions only. Confirm them with the salon before publishing them as an actual service menu.

## Colours

| Name | Hex |
| --- | --- |
| Plum | `#542344` |
| Blush | `#E8BFC7` |
| Ivory | `#FFF9F5` |
| Champagne gold | `#C6A46C` |
| Charcoal | `#29252A` |
| Beige | `#F3E9E2` |

## Animation

Animations use Motion and respect the visitor's reduced-motion setting (`MotionConfig reducedMotion="user"`).
