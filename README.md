# Moda Trend Report

A fashion trend app that lays out the season's trends with photos. The layout borrows from Alo and Lululemon: an announcement bar, a quiet sticky header, a full-bleed hero, category tiles, a filterable 4-up "product" grid, and a product-page-style view for each trend.

## What's inside

- **Fall/Winter 2026**: 12 runway trends, such as capes and ponchos, head-to-toe scarlet, Le Smoking, graphic polka dots, faux fur and shearling, and '90s minimalism.
- **Studio to Street**: 3 athleisure trends (flared leggings, retro track, mocha studio sets), with market-adoption figures from Trendalytics.
- **Spring/Summer 2027 early read**: 4 signals from the September 2026 Milan and Paris shows.
- **Colors of the season**: 7 shades with hex values.
- **Trend pages**: a photo gallery, palette, where the trend was seen, how to wear it, key pieces, sources and photo credits.
- **Save trends**: tap the heart on any trend to add it to "My edit". Saved trends are stored in your browser (`localStorage`).
- **Search** by trend, designer, color or piece. **Filter** by season and category, and **sort** by editor's order, status or A to Z.

Content is current as of **October 5, 2026**.

## Run it

There's no build step and there are no dependencies. Do one of the following:

- Open `index.html` in a browser.
- Or serve the folder: `python3 -m http.server 8000`, then visit <http://localhost:8000>.

## Project layout

```
index.html            Page shell (header, panels, footer mount points)
assets/styles.css     All styles; color and type tokens at the top, light and dark themes
assets/app.js         Rendering, filters, search, saved trends, hash routing (#trend-id)
data/trends.js        Trend content, seasons, categories, colors and sources
data/credits.js       Credit for every photo in images/
images/               Photos, cropped to 4:5 (<trend-id>-<n>.jpg)
scripts/build-artifact.mjs  Builds dist/artifact.html for publishing as a claude.ai Artifact
```

## Adding or updating a trend

1. Add an entry to `trends` in `data/trends.js`. `season` is `fw26`, `studio` or `ss27`. `status` is `peak`, `rising` or `early`. `images` is the number of photos.
2. Add the photos as `images/<id>-1.jpg`, `images/<id>-2.jpg`, and so on, at a 4:5 ratio.
3. Add a credit for each photo to `data/credits.js`.

## Sources

Trend reporting draws on Coveteur, FASHION Magazine, Marie Claire, WWD, AOL, Trendalytics, E! News, Grazia, Who What Wear, Daily Front Row, The National and TFashion. Every source is linked in the app's footer and on each trend page. The Peaking, Rising and Early signal labels are an editorial read.

## Photos and license

The photos illustrate each trend. They were **not** taken at the shows the app describes. All photos come from Google's [Open Images](https://storage.googleapis.com/openimages/web/index.html) dataset, were originally posted to Flickr under [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), and are cropped to fit. Each photo is credited in the app (the "See photo credits" link in the footer, and "About the photos" on every trend page) and in `data/credits.js`.

Photos of named public figures were left out on purpose.
