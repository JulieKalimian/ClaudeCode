// Trend content for the Moda trend report.
// To add a trend: add an entry to `trends`, drop its photos into images/ as
// <id>-1.jpg, <id>-2.jpg ..., and add a credit for each photo in credits.js.
window.MODA = {
  updated: "2026-10-05",

  seasons: {
    fw26: {
      label: "Fall/Winter 2026",
      short: "Fall '26",
      intro:
        "The trends from the New York, London, Milan and Paris runways that are reaching stores now.",
      sources: ["coveteur-fw26", "fashion-fw26", "marieclaire-fw26", "marieclaire-outerwear", "wwd-paris", "aol-90s"],
    },
    studio: {
      label: "Studio to Street",
      short: "Studio",
      intro:
        "The silhouettes, colors and details moving fastest in athleisure this fall, from flares to satin track pants.",
      sources: ["trendalytics", "eonline-lulu", "grazia-athleisure"],
    },
    ss27: {
      label: "Spring/Summer 2027",
      short: "Spring '27",
      intro:
        "Early signals from the September shows in Milan and Paris. These reach stores next spring.",
      sources: ["wwww-milan", "dfr-milan", "national-paris", "tfashion-paris"],
    },
  },

  categories: [
    { id: "outerwear", label: "Outerwear", cover: "capes-ponchos-2" },
    { id: "tailoring", label: "Tailoring", cover: "nineties-minimal-1" },
    { id: "color-print", label: "Color & Print", cover: "checks-tartan-1" },
    { id: "romance", label: "Romance", cover: "dark-romance-2" },
    { id: "studio", label: "Studio", cover: "studio-sets-2" },
  ],

  // status: "peak" = everywhere now, "rising" = gaining fast, "early" = first signals
  trends: [
    {
      id: "capes-ponchos",
      name: "Capes & Ponchos",
      season: "fw26",
      category: "outerwear",
      status: "peak",
      images: 3,
      dek: "The season's most dramatic outerwear swaps sleeves for sweep.",
      summary:
        "Designers leaned into theater this season, and the cape became fall's statement coat. Versions ranged from lacquered paillettes to everyday knits, with blanket-like ponchos as the easiest way in.",
      seenAt: [],
      keyPieces: ["Wool blanket cape", "Knit poncho", "Caped trench", "Capelet over tailoring"],
      howToWear: [
        "Keep everything underneath slim: a fine knit, straight trousers or a column skirt.",
        "Belt a poncho at the waist so the shape doesn't swallow you.",
        "Skip the shoulder bag. A top-handle bag or clutch sits better with a cape.",
      ],
      palette: [
        { name: "Charcoal", hex: "#3a3a3c" },
        { name: "Camel", hex: "#b48a5a" },
        { name: "Ivory", hex: "#efe9df" },
      ],
    },
    {
      id: "scarlet",
      name: "Head-to-Toe Scarlet",
      season: "fw26",
      category: "color-print",
      status: "peak",
      images: 2,
      dek: "One fiery red, worn from collar to shoe.",
      summary:
        "Red came back at full saturation, worn as a complete look rather than an accent. Balenciaga, Valentino, Prada, Michael Kors and Celine all sent out head-to-toe scarlet.",
      seenAt: ["Balenciaga", "Valentino", "Prada", "Michael Kors", "Celine"],
      keyPieces: ["Red leather coat", "Satin column gown", "Red knit with matching skirt", "Red pointed pumps"],
      howToWear: [
        "Match the exact shade. Tonal reds look deliberate; near-misses look accidental.",
        "Mix textures within one red: leather with knit, satin with wool.",
        "Keep accessories black or nude and let the red do the work.",
      ],
      palette: [
        { name: "Scarlet", hex: "#b3121f" },
        { name: "Lacquer", hex: "#d7262e" },
        { name: "Cherry", hex: "#7e0e18" },
      ],
    },
    {
      id: "le-smoking",
      name: "Le Smoking",
      season: "fw26",
      category: "tailoring",
      status: "peak",
      images: 3,
      dek: "Tuxedo codes, worn well before evening.",
      summary:
        "Tuxedo dressing ran through the season: satin lapels, cummerbunds, crisp dress shirts and bow ties. It felt fresh rather than formal, with tuxedo jackets worn shirtless with cocktail earrings, silk trousers and collar clips.",
      seenAt: [],
      keyPieces: ["Satin-lapel blazer", "Cummerbund or wide sash", "Bib-front dress shirt", "Silk tuxedo trousers", "Bow tie or collar clip"],
      howToWear: [
        "Wear the jacket buttoned with nothing underneath and add statement earrings.",
        "Swap the trousers for jeans or a slip skirt to wear it in daytime.",
        "One satin detail is enough: a lapel, a side stripe or a sash.",
      ],
      palette: [
        { name: "Tux black", hex: "#141414" },
        { name: "Satin white", hex: "#f2efe9" },
        { name: "Silver", hex: "#b9b8b5" },
      ],
    },
    {
      id: "graphic-dots",
      name: "Graphic Polka Dots",
      season: "fw26",
      category: "color-print",
      status: "rising",
      images: 3,
      dek: "Sharper, moodier spots in black and white.",
      summary:
        "Polka dots came back without the sweetness. Graphic black-and-white palettes, sheer layers and oversized spots were styled with tailoring and dramatic outerwear, which made the print look sophisticated instead of retro.",
      seenAt: [],
      keyPieces: ["Oversized-dot midi skirt", "Sheer dotted blouse", "Dotted silk scarf", "Dot wrap dress"],
      howToWear: [
        "Pair dots with severe tailoring: a black blazer or a long coat.",
        "Go big on spot size. Small dots read vintage.",
        "Layer sheer dots over solid black for depth.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Paper white", hex: "#f7f5f1" },
        { name: "Smoke", hex: "#8a8784" },
      ],
    },
    {
      id: "faux-fur-shearling",
      name: "Faux Fur & Shearling",
      season: "fw26",
      category: "outerwear",
      status: "peak",
      images: 3,
      dek: "Plush texture, plus pile and fringe.",
      summary:
        "Fall runways were full of plush outerwear: faux fur, brushed shearling, pile and fringe. Louise Trotter's second Bottega Veneta collection overflowed with all four, and Miu Miu and Ulla Johnson added shearling for warmth.",
      seenAt: ["Bottega Veneta", "Miu Miu", "Ulla Johnson"],
      keyPieces: ["Shaggy faux-fur coat", "Shearling vest", "Fringed skirt or bag", "Pile-lined jacket"],
      howToWear: [
        "Let one plush piece lead and keep the rest smooth: leather, denim, fine knits.",
        "Throw a shearling vest over a trench for layered texture.",
        "Fringe moves best on a skirt hem or a bag.",
      ],
      palette: [
        { name: "Honey", hex: "#c9a063" },
        { name: "Oat", hex: "#d9cdb8" },
        { name: "Chestnut", hex: "#7a4f30" },
      ],
    },
    {
      id: "checks-tartan",
      name: "Checks, Tartan & Gingham",
      season: "fw26",
      category: "color-print",
      status: "rising",
      images: 2,
      dek: "Paris made plaid the season's pattern.",
      summary:
        "Check prints, tartan and gingham appeared in collection after collection at Paris Fashion Week, from heritage tartans to crisp gingham, often layered or clashed in a single look.",
      seenAt: ["Paris Fashion Week"],
      keyPieces: ["Tartan pleated skirt", "Check wool coat", "Gingham shirt", "Plaid shirt dress"],
      howToWear: [
        "Clash two checks of different scales in the same color family.",
        "Anchor tartan with black boots, tights or a turtleneck.",
        "A belted plaid shirt dress is the easiest place to start.",
      ],
      palette: [
        { name: "Tartan red", hex: "#a3141c" },
        { name: "Forest", hex: "#1f3b2d" },
        { name: "Navy", hex: "#1c2a4a" },
      ],
    },
    {
      id: "dark-romance",
      name: "Dark Romance",
      season: "fw26",
      category: "romance",
      status: "rising",
      images: 3,
      dek: "Moody lace, corsetry and high necks.",
      summary:
        "Several collections explored a darker kind of romance: moody lace, corsetry, asymmetric hems and high necks. Sheer black layers and lace over skin gave evening looks a gothic edge.",
      seenAt: [],
      keyPieces: ["Black lace midi", "Corset or bustier top", "High-neck sheer blouse", "Asymmetric-hem skirt"],
      howToWear: [
        "Wear a corset over a crisp white shirt for daytime.",
        "Balance sheer lace with a heavy coat and boots.",
        "Keep makeup and jewelry dark and minimal.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Oxblood", hex: "#4a1018" },
        { name: "Antique lace", hex: "#d8cbb5" },
      ],
    },
    {
      id: "ruffs-trains",
      name: "Ruffs & Trains",
      season: "fw26",
      category: "romance",
      status: "rising",
      images: 2,
      dek: "Elizabethan collars and hems that trail behind you.",
      summary:
        "Trains showed up from New York to Paris. Kallmeyer cut silk shirts with bias fabric trailing from the hips, and Dior layered tutu skirts with frothy trains. Sheer Elizabethan ruffs dressed up tailored coats, oversized shirts and lace dresses.",
      seenAt: ["Dior", "Kallmeyer"],
      keyPieces: ["Detachable sheer ruff", "Train-back skirt", "Ruffled-collar blouse", "Tiered tulle skirt"],
      howToWear: [
        "Add a sheer ruff to a plain coat or button-down.",
        "Keep the top close-fitting when the hem has volume.",
        "A short train works for day. Save sweeping ones for evening.",
      ],
      palette: [
        { name: "Coral", hex: "#e0503a" },
        { name: "Moss", hex: "#6f7458" },
        { name: "Tulle", hex: "#f4f1ec" },
      ],
    },
    {
      id: "the-trench",
      name: "The Funnel-Neck Trench",
      season: "fw26",
      category: "outerwear",
      status: "peak",
      images: 3,
      dek: "Funnel necks, cropped leather and bright anoraks.",
      summary:
        "Outerwear carried the season. Trenches arrived with funnel necks, leather came cropped or long and glossy, and Prada and Loewe made a case for sporty anoraks in high-impact brights.",
      seenAt: ["Prada", "Loewe"],
      keyPieces: ["Funnel-neck trench", "Glossy leather trench", "Cropped leather jacket", "Bright technical anorak"],
      howToWear: [
        "Wear a long trench open over one color, head to toe.",
        "Cinch a leather trench with its own belt and carry a structured bag.",
        "Make a bright anorak the one loud piece in a neutral outfit.",
      ],
      palette: [
        { name: "Camel", hex: "#b48a5a" },
        { name: "Espresso", hex: "#3b2a22" },
        { name: "Navy", hex: "#1c2a4a" },
      ],
    },
    {
      id: "skirt-suit",
      name: "The Squared-Off Skirt Suit",
      season: "fw26",
      category: "tailoring",
      status: "rising",
      images: 1,
      dek: "Ladylike suiting with broad, built-up shoulders.",
      summary:
        "The skirt suit came back as a power look, with Upper East Side polish at Ferragamo, Tom Ford and Jil Sander. Broad shoulders came with it, from Tory Burch's broad-shouldered knits to Carolina Herrera's accentuated shoulders in animal prints.",
      seenAt: ["Ferragamo", "Tom Ford", "Jil Sander", "Tory Burch", "Carolina Herrera"],
      keyPieces: ["Strong-shoulder blazer", "Pencil skirt", "Matching skirt set", "Slingback pumps"],
      howToWear: [
        "Button the jacket with nothing underneath for a clean line.",
        "Split the suit: blazer with jeans, skirt with a knit.",
        "Keep the shoulders defined. Soft, slouchy blazers miss the point this season.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Bouclé cream", hex: "#ece4d6" },
        { name: "Slate", hex: "#5c6066" },
      ],
    },
    {
      id: "pearls-drop-waist",
      name: "Drop Waists & Pearl Strands",
      season: "fw26",
      category: "romance",
      status: "rising",
      images: 2,
      dek: "A 1920s line with long ropes of pearls.",
      summary:
        "At Chanel, hemlines dropped to the hip, T-bar court heels returned and long strings of pearls were layered on. Belts slung loosely at the hip carried the same low line through other collections.",
      seenAt: ["Chanel"],
      keyPieces: ["Drop-waist dress", "Long pearl rope", "T-bar court heels", "Hip-slung belt"],
      howToWear: [
        "Wrap a long pearl strand twice and let the loops fall unevenly.",
        "Sling a belt low on the hips over a long knit.",
        "Keep drop-waist dresses straight through the body.",
      ],
      palette: [
        { name: "Pearl", hex: "#ece6da" },
        { name: "Black", hex: "#141414" },
        { name: "Champagne", hex: "#d6c3a0" },
      ],
    },
    {
      id: "nineties-minimal",
      name: "'90s Minimalism",
      season: "fw26",
      category: "tailoring",
      status: "peak",
      images: 2,
      dek: "Black, elongated and stripped back.",
      summary:
        "Marc Jacobs opened New York Fashion Week with references to his spring 1998 collection. Across the season black dominated, carried by sculptural coats, glossy leather, oversized shoulders and elongated tailoring.",
      seenAt: ["Marc Jacobs"],
      keyPieces: ["Slip dress", "Column trousers", "Sleeveless jumpsuit", "Long black coat"],
      howToWear: [
        "Build one long, unbroken line with a jumpsuit or matching set.",
        "Wear one piece of jewelry, not three.",
        "Navy and charcoal work as well as black.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Midnight", hex: "#1c2a4a" },
        { name: "Charcoal", hex: "#3a3a3c" },
      ],
    },

    // Studio to Street
    {
      id: "flared-leggings",
      name: "Flared Leggings",
      season: "studio",
      category: "studio",
      status: "rising",
      images: 1,
      dek: "The bootcut yoga pant is back, rebuilt in performance fabric.",
      summary:
        "Flared leggings and bootcut yoga pants are back, made in modern performance fabrics with updated waistlines. The strongest signals style them with crop tops and platform sneakers.",
      seenAt: [],
      keyPieces: ["Flared legging", "V-waist flare", "Fitted crop top", "Platform sneakers"],
      howToWear: [
        "Wear with a fitted crop top and platform sneakers.",
        "Let the hem graze the floor.",
        "Keep the top close to the body to balance the flare.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Espresso", hex: "#3b2a22" },
        { name: "Heather", hex: "#9c9a97" },
      ],
    },
    {
      id: "retro-track",
      name: "Retro Track",
      season: "studio",
      category: "studio",
      status: "peak",
      images: 2,
      dek: "Y2K windbreakers, color-blocked tracksuits and satin track pants.",
      summary:
        "Lululemon's fall collection leans into Y2K with retro windbreakers, color-blocked tracksuits and low-rise waistbands in autumn shades. Satin track pants styled from gym to dinner are the fastest climbers.",
      stats: [
        { value: "+158%", label: "Satin track pants, market adoption" },
        { value: "+100%", label: "Striped track pants, market adoption" },
      ],
      seenAt: ["Lululemon"],
      keyPieces: ["Satin track pant", "Color-block windbreaker", "Side-stripe pants", "Retro runners"],
      howToWear: [
        "Wear satin track pants with a fitted knit and loafers for dinner.",
        "Match the windbreaker to the pants for a full set.",
        "Choose slim retro runners over chunky trainers.",
      ],
      palette: [
        { name: "Track red", hex: "#c8202b" },
        { name: "Navy", hex: "#1c2a4a" },
        { name: "Cream", hex: "#f1ebe0" },
      ],
    },
    {
      id: "studio-sets",
      name: "Mocha Studio Sets",
      season: "studio",
      category: "studio",
      status: "rising",
      images: 2,
      dek: "Matching sets in rich neutrals instead of all-black.",
      summary:
        "Monochrome co-ord sets are among the steadiest performers in activewear. Mocha browns and rich neutrals are replacing all-black, and contrast piping, seam details, double-strap bras, zip-ups and corset seams make a set look like an outfit.",
      stats: [
        { value: "+44%", label: "V-front pants, market adoption" },
        { value: "+38%", label: "V-waist leggings, market adoption" },
        { value: "+74%", label: "Alo Yoga searches, year over year" },
      ],
      seenAt: ["Alo Yoga", "Lululemon", "SKIMS", "Splits59"],
      keyPieces: ["Matching bra and legging", "Zip-up studio jacket", "Double-strap bra", "Corset-seam bodysuit"],
      howToWear: [
        "Buy the set in one shade, top to bottom.",
        "Add a zip-up or oversized knit one shade lighter.",
        "Look for piping or seam details. They make a set look intentional.",
      ],
      palette: [
        { name: "Mocha", hex: "#6b4a3a" },
        { name: "Espresso", hex: "#3b2a22" },
        { name: "Oat", hex: "#d9cdb8" },
      ],
    },

    // Spring/Summer 2027 early read
    {
      id: "skirts-every-way",
      name: "Skirts, Every Way",
      season: "ss27",
      category: "tailoring",
      status: "early",
      images: 3,
      dek: "Prada put a skirt in all 63 looks.",
      summary:
        "Prada sent 63 looks down the Milan runway and every one included a skirt: knee-length, mini, pleated, embellished, sheer-layered and more experimental cuts. Milan as a whole leaned toward expressive dressing.",
      seenAt: ["Prada"],
      keyPieces: ["Pleated knee-length skirt", "Embellished mini", "Sheer layered skirt", "Bubble hem"],
      howToWear: [
        "Wear a skirt where you'd normally wear trousers, with a shirt and blazer.",
        "Layer a sheer skirt over a slip or shorts.",
        "Try a pleated knee-length skirt with flat shoes.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Ivory", hex: "#efe9df" },
        { name: "Burgundy", hex: "#6e1b2a" },
      ],
    },
    {
      id: "sheer-weightless",
      name: "Sheer & Weightless",
      season: "ss27",
      category: "romance",
      status: "early",
      images: 2,
      dek: "Delicate silks, transparency and fluid shapes.",
      summary:
        "Lightness led the spring shows. Delicate silks and transparent fabrics dominated Milan, where bras showed through sheer tops and undone shirts. In Paris, Hermès and Dior were airy and Elie Saab was romantic.",
      seenAt: ["Hermès", "Dior", "Elie Saab"],
      keyPieces: ["Sheer lace top", "Silk pajama set", "Pleated chiffon skirt", "Visible bralette"],
      howToWear: [
        "Layer sheer over a matching bralette rather than a contrasting one.",
        "Pair a silk set with flat sandals to keep it relaxed.",
        "Keep sheer pieces to one per outfit.",
      ],
      palette: [
        { name: "Chalk", hex: "#f2efe9" },
        { name: "Dove", hex: "#a7a29b" },
        { name: "Blush", hex: "#e7c9bd" },
      ],
    },
    {
      id: "sherbet-brights",
      name: "Sherbet Brights",
      season: "ss27",
      category: "color-print",
      status: "early",
      images: 2,
      dek: "Peach, mint and limone.",
      summary:
        "Milan's spring runways were full of candy-colored tones: peach, mint and limone. They read soft rather than neon, often in fluid silks and prints.",
      seenAt: ["Milan Fashion Week"],
      keyPieces: ["Limone silk slip", "Mint knit", "Peach wide-leg trouser", "Pastel print dress"],
      howToWear: [
        "Pair two sherbet shades together instead of adding white.",
        "Use a pastel knit to soften dark denim.",
        "Gold jewelry warms these colors better than silver.",
      ],
      palette: [
        { name: "Peach", hex: "#f2b49b" },
        { name: "Mint", hex: "#b9dcc7" },
        { name: "Limone", hex: "#efe08a" },
      ],
    },
    {
      id: "close-cut-tailoring",
      name: "Close-Cut Tailoring",
      season: "ss27",
      category: "tailoring",
      status: "early",
      images: 1,
      dek: "Oversized suiting is out. Jackets are cinched and close to the body.",
      summary:
        "Spring collections showed very few oversized blazers. Suiting arrived hyper-tailored, close to the body and cinched at the waist. Paris backed it up: blazers and minimalist styling both grew their share of looks.",
      stats: [
        { value: "11.5%", label: "Paris looks with a blazer, up from 8.9%" },
        { value: "27.4%", label: "Paris looks styled minimalist, up from 19.4%" },
      ],
      seenAt: ["Milan Fashion Week", "Paris Fashion Week"],
      keyPieces: ["Cinched single-breasted blazer", "Slim cigarette trouser", "Waist-defining belt", "Drop-shoulder jacket"],
      howToWear: [
        "Size down to the fit you'd have tailored, not the one that's comfortable.",
        "Belt the blazer at the natural waist.",
        "Wear it with a skirt to tie into spring's other big story.",
      ],
      palette: [
        { name: "Black", hex: "#141414" },
        { name: "Navy", hex: "#1c2a4a" },
        { name: "Rose", hex: "#b23a48" },
      ],
    },
  ],

  colors: [
    { name: "Scarlet", hex: "#b3121f", season: "fw26", note: "Head to toe at Balenciaga, Valentino, Prada, Michael Kors and Celine." },
    { name: "Black", hex: "#141414", season: "fw26", note: "The dominant runway color, now 39% of Paris spring looks." },
    { name: "Mocha", hex: "#6b4a3a", season: "studio", note: "Replacing all-black in activewear sets." },
    { name: "Camel", hex: "#b48a5a", season: "fw26", note: "Trenches, capes and plush shearling." },
    { name: "Peach", hex: "#f2b49b", season: "ss27", note: "Milan's softest spring tone." },
    { name: "Mint", hex: "#b9dcc7", season: "ss27", note: "Candy-colored, never neon." },
    { name: "Limone", hex: "#efe08a", season: "ss27", note: "The pale lemon that ran through Milan." },
  ],

  sources: {
    "coveteur-fw26": { outlet: "Coveteur", title: "The Fall/Winter 2026 Runway Trend Report", url: "https://coveteur.com/fall-winter-2026-runway-trends" },
    "fashion-fw26": { outlet: "FASHION Magazine", title: "The Top 10 Trends From the Fall 2026 Runways", url: "https://fashionmagazine.com/style/fall-2026-trends/" },
    "marieclaire-fw26": { outlet: "Marie Claire", title: "The Biggest Fall 2026 Fashion Trends, According to the Runways", url: "https://www.marieclaire.com/fashion/fall-fashion/fall-2026-fashion-trends/" },
    "marieclaire-outerwear": { outlet: "Marie Claire", title: "Fall 2026 Runway-to-Street Outerwear Trends", url: "https://www.marieclaire.com/fashion/fall-fashion/runway-to-street-outerwear/" },
    "wwd-paris": { outlet: "WWD", title: "Paris Fashion Week Fall 2026: Buyers Favor Coats, Corsets & Chanel Buzz", url: "https://wwd.com/business-news/retail/paris-fashion-week-2026-trends-buyers-favorite-collections-1238664563/" },
    "aol-90s": { outlet: "AOL", title: "The Most Unexpected '90s Trend Is Quietly Dominating the Fall 2026 Runways", url: "https://www.aol.com/articles/most-unexpected-90s-trend-quietly-163706397.html" },
    "trendalytics": { outlet: "Trendalytics", title: "Activewear & Athleisure Trends 2026", url: "https://trendalytics.co/trend-insights/activewear-athleisure-trends-2026-us-retail-trends-forecast" },
    "eonline-lulu": { outlet: "E! News", title: "Lululemon's Y2K-Inspired Athleisure Is Here for Fall", url: "https://www.eonline.com/news/1434827/lululemons-y2k-inspired-athleisure-is-here-for-fall" },
    "grazia-athleisure": { outlet: "Grazia", title: "The 2026 Athleisure Trends Taking Us From Street to Studio", url: "https://graziamagazine.com/us/articles/new-year-activewear-2026-trends-alo-nikeskims-splits59/" },
    "wwww-milan": { outlet: "Who What Wear", title: "7 Major Spring 2027 Trends, According to Milan Fashion Week", url: "https://www.whowhatwear.com/fashion/runway/milan-fashion-week-trends-spring-summer-2027" },
    "dfr-milan": { outlet: "Daily Front Row", title: "14 Breakout Trends From Milan Fashion Week Spring 2027", url: "https://fashionweekdaily.com/trends-milan-fashion-week-spring-2027/" },
    "national-paris": { outlet: "The National", title: "Paris Fashion Week: Fourteen shows that defined spring/summer 2027", url: "https://www.thenationalnews.com/magazine/2026/10/05/paris-fashion-week-fourteen-shows-that-defined-springsummer-2027/" },
    "tfashion-paris": { outlet: "TFashion", title: "Paris Fashion Week Spring 2027 Trends", url: "https://tfashion.ai/runway/ss27/paris" },
  },
};
