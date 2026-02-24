import { AlbumPage, AlbumElement, Template, PageLayout, CoverTemplate } from './types';

const generateStandardPages = (contentPageCount: number): AlbumPage[] => {
  const pages: AlbumPage[] = [];
  const totalPages = contentPageCount + 4;
  
  for (let i = 0; i < totalPages; i++) {
    const isFrontCover = i === 0;
    const isBackCover = i === totalPages - 1;
    const isEndPaper = i === 1 || i === totalPages - 2;

    if (isEndPaper) {
      pages.push({
        id: `page-${i}`,
        elements: [],
        background: '#1D3557'
      });
      continue;
    }

    pages.push({
      id: `page-${i}`,
      elements: [
        {
          id: `text-${i}-1`,
          type: 'text',
          x: (isFrontCover || isBackCover) ? 40 : 30,
          y: (isFrontCover || isBackCover) ? 60 : 40,
          width: 340,
          height: (isFrontCover || isBackCover) ? 100 : 40,
          rotation: 0,
          content: isFrontCover ? 'THE ART OF TRAVEL' : (isBackCover ? 'THE END' : `CHAPTER ${i - 1}`),
          fontSize: (isFrontCover || isBackCover) ? 56 : 18,
          fontFamily: 'Cormorant Garamond',
          fill: (isFrontCover || isBackCover) ? '#1D3557' : '#457B9D'
        },
        {
          id: `img-${i}-1`,
          type: 'image',
          x: 20,
          y: (isFrontCover || isBackCover) ? 180 : 100,
          width: 360,
          height: (isFrontCover || isBackCover) ? 300 : 380,
          rotation: 0,
          content: `https://picsum.photos/seed/album-${i}/1200/1600`,
          borderRadius: 8
        },
        {
          id: `text-${i}-2`,
          type: 'text',
          x: 30,
          y: 500,
          width: 340,
          height: 30,
          rotation: 0,
          content: isFrontCover ? 'A COLLECTION OF MOMENTS' : (isBackCover ? 'PASTELPIX EDITIONS' : 'Click to add your story here...'),
          fontSize: isFrontCover ? 14 : 10,
          fontFamily: 'Inter',
          fill: '#1D3557'
        }
      ],
      background: '#FDFCF0'
    });
  }
  return pages;
};

const generateEmptyPages = (contentPageCount: number): AlbumPage[] => {
  const pages: AlbumPage[] = [];
  const totalPages = contentPageCount + 4;
  
  for (let i = 0; i < totalPages; i++) {
    const isFrontCover = i === 0;
    const isBackCover = i === totalPages - 1;
    const isEndPaper = i === 1 || i === totalPages - 2;

    if (isEndPaper) {
      pages.push({
        id: `empty-page-${i}`,
        elements: [],
        background: '#2B2D42'
      });
      continue;
    }

    pages.push({
      id: `empty-page-${i}`,
      elements: isFrontCover ? [
        {
          id: `empty-title-${i}`,
          type: 'text',
          x: 40,
          y: 200,
          width: 320,
          height: 100,
          rotation: 0,
          content: 'MY PHOTO BOOK',
          fontSize: 40,
          fontFamily: 'Cormorant Garamond',
          fill: '#1D3557'
        },
        {
          id: `empty-sub-${i}`,
          type: 'text',
          x: 40,
          y: 280,
          width: 320,
          height: 30,
          rotation: 0,
          content: 'CREATED WITH PASTELPIX',
          fontSize: 12,
          fontFamily: 'Inter',
          fill: '#457B9D'
        }
      ] : (isBackCover ? [
        {
          id: `empty-back-${i}`,
          type: 'text',
          x: 40,
          y: 480,
          width: 320,
          height: 40,
          rotation: 0,
          content: 'MADE WITH LOVE',
          fontSize: 14,
          fontFamily: 'Cormorant Garamond',
          fill: '#1D3557'
        }
      ] : []),
      background: '#FFFFFF'
    });
  }
  return pages;
};

const generateTravelReadyMade = (contentPageCount: number): AlbumPage[] => {
  const pages: AlbumPage[] = [];
  const totalPages = contentPageCount + 4;
  const placeholderImg = 'https://picsum.photos/seed/placeholder/800/600?blur=10';

  const travelTitles = [
    'MORNING GLOW', 'CITY LIGHTS', 'HIDDEN GEMS', 'OCEAN BREEZE',
    'MOUNTAIN PEAKS', 'STREET FOOD', 'LOCAL CULTURE', 'SUNSET VIBES',
    'ARCHITECTURE', 'WILDLIFE', 'ROAD TRIP', 'MEMORIES'
  ];

  for (let i = 0; i < totalPages; i++) {
    const isFrontCover = i === 0;
    const isBackCover = i === totalPages - 1;
    const isEndPaper = i === 1 || i === totalPages - 2;

    if (isEndPaper) {
      pages.push({
        id: `travel-page-${i}`,
        elements: [],
        background: '#1A1A1A'
      });
      continue;
    }

    if (isFrontCover) {
      pages.push({
        id: `travel-page-${i}`,
        elements: [
          {
            id: `travel-cover-img`,
            type: 'image',
            x: 0,
            y: 0,
            width: 400,
            height: 550,
            rotation: 0,
            content: 'https://picsum.photos/seed/travel-cover-main/1200/1600',
            shapeType: 'rectangle'
          },
          {
            id: `travel-cover-overlay`,
            type: 'text',
            x: 20,
            y: 350,
            width: 360,
            height: 150,
            rotation: 0,
            content: 'WANDERLUST',
            fontSize: 64,
            fontFamily: 'Playfair Display',
            fill: '#FFFFFF'
          },
          {
            id: `travel-cover-sub`,
            type: 'text',
            x: 25,
            y: 440,
            width: 350,
            height: 40,
            rotation: 0,
            content: 'A JOURNEY THROUGH THE UNKNOWN',
            fontSize: 14,
            fontFamily: 'Inter',
            fill: '#FFFFFF'
          }
        ],
        background: '#000000'
      });
      continue;
    }

    if (isBackCover) {
      pages.push({
        id: `travel-page-${i}`,
        elements: [
          {
            id: `travel-back-img`,
            type: 'image',
            x: 100,
            y: 150,
            width: 200,
            height: 200,
            rotation: 0,
            content: 'https://picsum.photos/seed/travel-back/400/400',
            shapeType: 'circle'
          },
          {
            id: `travel-back-text`,
            type: 'text',
            x: 20,
            y: 380,
            width: 360,
            height: 40,
            rotation: 0,
            content: 'UNTIL NEXT TIME',
            fontSize: 24,
            fontFamily: 'Playfair Display',
            fill: '#1D3557'
          }
        ],
        background: '#FFFFFF'
      });
      continue;
    }

    // Content pages with pre-defined layouts but placeholders
    let layoutIdx = (i - 2) % LAYOUTS.length;
    
    // Custom logic for specific pages to make it feel "designed"
    if (i === 2) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-21-editorial-large');
    if (i === 3) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-26-hero-text');
    if (i === 4) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-24-collage-four');
    if (i === 5) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-25-triptych-vertical');
    if (i === 6) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-19-circle-focus');
    if (i === 7) layoutIdx = LAYOUTS.findIndex(l => l.id === 'layout-22-scattered');
    
    const layout = LAYOUTS[layoutIdx] || LAYOUTS[0];
    const title = travelTitles[(i - 2) % travelTitles.length];
    
    const aestheticColors = ['#FDFCF0', '#F5F5F0', '#F0F4F8', '#F8F0F4', '#F0F8F0', '#FFF9F0'];

    pages.push({
      id: `travel-page-${i}`,
      elements: layout.elements.map((el, idx) => {
        if (el.type === 'text' && idx === 0) {
          return { ...el, id: `travel-el-${i}-${el.id}`, content: title, fontFamily: 'Cormorant Garamond', fontSize: el.fontSize ? el.fontSize * 1.2 : 32 };
        }
        // Use the shapeType defined in the layout if it exists, otherwise default
        const shapeType: any = el.shapeType || ((i + idx) % 7 === 0 ? 'circle' : 'rectangle');
        const borderRadius = shapeType === 'rectangle' ? ((i + idx) % 5 === 0 ? 20 : 0) : 0;

        // Add some stickers to content pages
        const stickers: AlbumElement[] = [];
        if (idx === 0 && (i % 3 === 0)) {
           stickers.push({
             id: `travel-sticker-${i}`,
             type: 'sticker',
             x: 320,
             y: 20,
             width: 60,
             height: 60,
             rotation: 15,
             content: STICKERS[Math.floor(Math.random() * STICKERS.length)].path,
             fill: '#457B9D',
             opacity: 0.6
           });
        }

        const baseEl = {
          ...el,
          id: `travel-el-${i}-${el.id}`,
          content: el.type === 'image' ? `https://picsum.photos/seed/travel-${i}-${idx}/800/800` : el.content,
          shapeType: el.type === 'image' ? shapeType : undefined,
          borderRadius: el.type === 'image' ? borderRadius : undefined
        };

        return baseEl;
      }),
      background: aestheticColors[(i - 2) % aestheticColors.length]
    });
  }
  return pages;
};

export const COVER_TEMPLATES: CoverTemplate[] = [
  {
    id: 'cover-goa',
    name: 'Goa Vibes',
    location: 'Goa',
    preview: 'https://picsum.photos/seed/goa-cover/400/300',
    background: '#FFF9F0',
    elements: [
      { id: 'c-goa-1', type: 'image', x: 0, y: 0, width: 400, height: 400, rotation: 0, content: 'https://picsum.photos/seed/goa-main/800/800', shapeType: 'rectangle' },
      { id: 'c-goa-2', type: 'sticker', x: 300, y: 320, width: 80, height: 80, rotation: 15, content: 'M 50 90 Q 10 70 20 30 Q 50 10 80 30 Q 90 70 50 90', fill: '#F4A261' },
      { id: 'c-goa-3', type: 'text', x: 20, y: 420, width: 360, height: 60, rotation: 0, content: 'GOA', fontSize: 72, fontFamily: 'Cormorant Garamond', fill: '#264653' },
      { id: 'c-goa-4', type: 'text', x: 25, y: 500, width: 350, height: 30, rotation: 0, content: 'SUNSET & SERENITY', fontSize: 14, fontFamily: 'Inter', fill: '#2A9D8F' }
    ]
  },
  {
    id: 'cover-tokyo',
    name: 'Tokyo Neon',
    location: 'Tokyo',
    preview: 'https://picsum.photos/seed/tokyo-cover/400/300',
    background: '#0A0A0A',
    elements: [
      { id: 'c-tokyo-1', type: 'image', x: 20, y: 20, width: 360, height: 360, rotation: 0, content: 'https://picsum.photos/seed/tokyo-main/800/800', shapeType: 'rectangle', stroke: '#FF0055', strokeWidth: 2 },
      { id: 'c-tokyo-2', type: 'text', x: 20, y: 400, width: 360, height: 80, rotation: 0, content: 'TOKYO', fontSize: 80, fontFamily: 'Inter', fill: '#FF0055' },
      { id: 'c-tokyo-3', type: 'text', x: 20, y: 490, width: 360, height: 30, rotation: 0, content: 'CITY OF LIGHTS', fontSize: 16, fontFamily: 'Inter', fill: '#00F2FF' },
      { id: 'c-tokyo-4', type: 'sticker', x: 320, y: 20, width: 60, height: 60, rotation: 0, content: 'M 50 20 A 30 30 0 1 1 50 80 A 30 30 0 1 1 50 20', fill: '#FF0055' }
    ]
  },
  {
    id: 'cover-dubai',
    name: 'Dubai Luxury',
    location: 'Dubai',
    preview: 'https://picsum.photos/seed/dubai-cover/400/300',
    background: '#FDFCF0',
    elements: [
      { id: 'c-dubai-1', type: 'image', x: 50, y: 50, width: 300, height: 300, rotation: 0, content: 'https://picsum.photos/seed/dubai-main/600/600', shapeType: 'circle', stroke: '#D4AF37', strokeWidth: 4 },
      { id: 'c-dubai-2', type: 'text', x: 20, y: 380, width: 360, height: 60, rotation: 0, content: 'DUBAI', fontSize: 64, fontFamily: 'Cormorant Garamond', fill: '#D4AF37' },
      { id: 'c-dubai-3', type: 'text', x: 20, y: 460, width: 360, height: 30, rotation: 0, content: 'THE GOLDEN CITY', fontSize: 14, fontFamily: 'Inter', fill: '#1D3557' }
    ]
  },
  {
    id: 'cover-japan',
    name: 'Japan Zen',
    location: 'Japan',
    preview: 'https://picsum.photos/seed/japan-cover/400/300',
    background: '#FFFFFF',
    elements: [
      { id: 'c-japan-1', type: 'image', x: 0, y: 0, width: 400, height: 550, rotation: 0, content: 'https://picsum.photos/seed/japan-main/1200/1600', shapeType: 'rectangle', opacity: 0.8 },
      { id: 'c-japan-2', type: 'sticker', x: 150, y: 150, width: 100, height: 100, rotation: 0, content: 'M 50 20 A 30 30 0 1 1 50 80 A 30 30 0 1 1 50 20', fill: '#BC002D' },
      { id: 'c-japan-3', type: 'text', x: 20, y: 350, width: 360, height: 100, rotation: 0, content: 'JAPAN', fontSize: 90, fontFamily: 'Cormorant Garamond', fill: '#000000' },
      { id: 'c-japan-4', type: 'text', x: 25, y: 450, width: 350, height: 40, rotation: 0, content: 'TRADITION & MODERNITY', fontSize: 12, fontFamily: 'Inter', fill: '#000000' }
    ]
  },
  {
    id: 'cover-paris',
    name: 'Paris Romance',
    location: 'Paris',
    preview: 'https://picsum.photos/seed/paris-cover/400/300',
    background: '#FFF5F5',
    elements: [
      { id: 'c-paris-1', type: 'image', x: 20, y: 20, width: 360, height: 360, rotation: 0, content: 'https://picsum.photos/seed/paris-main/800/800', shapeType: 'rectangle', borderRadius: 20 },
      { id: 'c-paris-2', type: 'text', x: 20, y: 400, width: 360, height: 60, rotation: 0, content: 'PARIS', fontSize: 64, fontFamily: 'Cormorant Garamond', fill: '#8E5D5D' },
      { id: 'c-paris-3', type: 'text', x: 20, y: 470, width: 360, height: 30, rotation: 0, content: 'CITY OF LOVE', fontSize: 14, fontFamily: 'Inter', fill: '#A68B8B' },
      { id: 'c-paris-4', type: 'sticker', x: 300, y: 380, width: 60, height: 60, rotation: -10, content: 'M 50 90 Q 10 70 20 30 Q 50 10 80 30 Q 90 70 50 90', fill: '#FFB7B7' }
    ]
  },
  {
    id: 'cover-london',
    name: 'London Fog',
    location: 'London',
    preview: 'https://picsum.photos/seed/london-cover/400/300',
    background: '#E5E5E5',
    elements: [
      { id: 'c-lon-1', type: 'image', x: 20, y: 20, width: 360, height: 400, rotation: 0, content: 'https://picsum.photos/seed/london-main/800/1000', shapeType: 'rectangle', borderRadius: 10 },
      { id: 'c-lon-2', type: 'text', x: 20, y: 440, width: 360, height: 60, rotation: 0, content: 'LONDON', fontSize: 64, fontFamily: 'Cormorant Garamond', fill: '#2B2D42' },
      { id: 'c-lon-3', type: 'text', x: 20, y: 510, width: 360, height: 20, rotation: 0, content: 'STREETS & STORIES', fontSize: 12, fontFamily: 'Inter', fill: '#8D99AE' }
    ]
  },
  {
    id: 'cover-bali',
    name: 'Bali Tropical',
    location: 'Bali',
    preview: 'https://picsum.photos/seed/bali-cover/400/300',
    background: '#F0F4F0',
    elements: [
      { id: 'c-bali-1', type: 'image', x: 0, y: 0, width: 400, height: 350, rotation: 0, content: 'https://picsum.photos/seed/bali-main/800/600', shapeType: 'rectangle' },
      { id: 'c-bali-2', type: 'text', x: 20, y: 380, width: 360, height: 80, rotation: 0, content: 'BALI', fontSize: 80, fontFamily: 'Cormorant Garamond', fill: '#2D6A4F' },
      { id: 'c-bali-3', type: 'sticker', x: 300, y: 350, width: 80, height: 80, rotation: -20, content: 'M 50 90 Q 20 50 50 10 Q 80 50 50 90 M 50 90 L 50 100', fill: '#40916C' }
    ]
  }
];


export const LAYOUTS: PageLayout[] = [
  {
    id: 'layout-1-full',
    name: 'Single Image',
    elements: [
      {
        id: 'l1-e1',
        type: 'image',
        x: 20,
        y: 20,
        width: 360,
        height: 440,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout1/800/1000'
      },
      {
        id: 'l1-e2',
        type: 'text',
        x: 20,
        y: 480,
        width: 360,
        height: 50,
        rotation: 0,
        content: 'A beautiful memory',
        fontSize: 24,
        fontFamily: 'Playfair Display',
        fill: '#1D3557'
      }
    ]
  },
  {
    id: 'layout-2-two-vertical',
    name: 'Two Vertical',
    elements: [
      {
        id: 'l2-e1',
        type: 'image',
        x: 20,
        y: 20,
        width: 360,
        height: 245,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout2a/800/600'
      },
      {
        id: 'l2-e2',
        type: 'image',
        x: 20,
        y: 285,
        width: 360,
        height: 245,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout2b/800/600'
      }
    ]
  },
  {
    id: 'layout-3-collage',
    name: '3 Image Collage',
    elements: [
      {
        id: 'l3-e1',
        type: 'image',
        x: 20,
        y: 20,
        width: 360,
        height: 260,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout3a/800/600'
      },
      {
        id: 'l3-e2',
        type: 'image',
        x: 20,
        y: 300,
        width: 170,
        height: 230,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout3b/400/600'
      },
      {
        id: 'l3-e3',
        type: 'image',
        x: 210,
        y: 300,
        width: 170,
        height: 230,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout3c/400/600'
      }
    ]
  },
  {
    id: 'layout-4-polaroid',
    name: 'Polaroid Style',
    elements: [
      {
        id: 'l4-e1',
        type: 'image',
        x: 30,
        y: 30,
        width: 340,
        height: 340,
        rotation: 0,
        content: 'https://picsum.photos/seed/layout4/800/800'
      },
      {
        id: 'l4-e2',
        type: 'text',
        x: 30,
        y: 400,
        width: 340,
        height: 80,
        rotation: 0,
        content: 'Captured Moments',
        fontSize: 28,
        fontFamily: 'Cormorant Garamond',
        fill: '#1D3557'
      }
    ]
  },
  {
    id: 'layout-5-three-vertical',
    name: '3 Vertical Strip',
    elements: [
      {
        id: 'l5-e1',
        type: 'image',
        x: 15,
        y: 15,
        width: 110,
        height: 520,
        rotation: 0,
        content: 'https://picsum.photos/seed/l5a/400/1200'
      },
      {
        id: 'l5-e2',
        type: 'image',
        x: 145,
        y: 15,
        width: 110,
        height: 520,
        rotation: 0,
        content: 'https://picsum.photos/seed/l5b/400/1200'
      },
      {
        id: 'l5-e3',
        type: 'image',
        x: 275,
        y: 15,
        width: 110,
        height: 520,
        rotation: 0,
        content: 'https://picsum.photos/seed/l5c/400/1200'
      }
    ]
  },
  {
    id: 'layout-6-modern-text',
    name: 'Modern Text Focus',
    elements: [
      {
        id: 'l6-e1',
        type: 'text',
        x: 20,
        y: 40,
        width: 360,
        height: 80,
        rotation: 0,
        content: 'THE JOURNEY',
        fontSize: 48,
        fontFamily: 'Playfair Display',
        fill: '#1D3557'
      },
      {
        id: 'l6-e2',
        type: 'image',
        x: 20,
        y: 140,
        width: 360,
        height: 280,
        rotation: 0,
        content: 'https://picsum.photos/seed/l6/800/600'
      },
      {
        id: 'l6-e3',
        type: 'text',
        x: 20,
        y: 440,
        width: 360,
        height: 80,
        rotation: 0,
        content: 'Every step taken was a memory made. This is where the story begins.',
        fontSize: 16,
        fontFamily: 'Inter',
        fill: '#457B9D'
      }
    ]
  },
  {
    id: 'layout-7-four-grid',
    name: '4 Image Square',
    elements: [
      { id: 'l7-e1', type: 'image', x: 15, y: 15, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l7a/400/600' },
      { id: 'l7-e2', type: 'image', x: 210, y: 15, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l7b/400/600' },
      { id: 'l7-e3', type: 'image', x: 15, y: 285, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l7c/400/600' },
      { id: 'l7-e4', type: 'image', x: 210, y: 285, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l7d/400/600' }
    ]
  },
  {
    id: 'layout-8-cinematic',
    name: 'Cinematic Wide',
    elements: [
      { id: 'l8-e1', type: 'image', x: 0, y: 80, width: 400, height: 300, rotation: 0, content: 'https://picsum.photos/seed/l8/1200/600' },
      { id: 'l8-e2', type: 'text', x: 20, y: 400, width: 360, height: 50, rotation: 0, content: 'A MOMENT IN TIME', fontSize: 32, fontFamily: 'Playfair Display', fill: '#1D3557' },
      { id: 'l8-e3', type: 'text', x: 20, y: 460, width: 360, height: 30, rotation: 0, content: 'SEPTEMBER 2023', fontSize: 14, fontFamily: 'Inter', fill: '#457B9D' }
    ]
  },
  {
    id: 'layout-9-nine-grid',
    name: '3x3 Mini Grid',
    elements: [
      { id: 'l9-e1', type: 'image', x: 15, y: 15, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9a/400/600' },
      { id: 'l9-e2', type: 'image', x: 145, y: 15, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9b/400/600' },
      { id: 'l9-e3', type: 'image', x: 275, y: 15, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9c/400/600' },
      { id: 'l9-e4', type: 'image', x: 15, y: 195, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9d/400/600' },
      { id: 'l9-e5', type: 'image', x: 145, y: 195, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9e/400/600' },
      { id: 'l9-e6', type: 'image', x: 275, y: 195, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9f/400/600' },
      { id: 'l9-e7', type: 'image', x: 15, y: 375, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9g/400/600' },
      { id: 'l9-e8', type: 'image', x: 145, y: 375, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9h/400/600' },
      { id: 'l9-e9', type: 'image', x: 275, y: 375, width: 110, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l9i/400/600' }
    ]
  },
  {
    id: 'layout-11-triptych',
    name: 'Triptych Focus',
    elements: [
      { id: 'l11-e1', type: 'image', x: 10, y: 10, width: 120, height: 530, rotation: 0, content: 'https://picsum.photos/seed/l11a/400/1200' },
      { id: 'l11-e2', type: 'image', x: 140, y: 10, width: 250, height: 530, rotation: 0, content: 'https://picsum.photos/seed/l11b/800/1200' },
      { id: 'l11-e3', type: 'text', x: 150, y: 450, width: 230, height: 60, rotation: 0, content: 'THE CENTERPIECE', fontSize: 24, fontFamily: 'Playfair Display', fill: '#FFFFFF' }
    ]
  },
  {
    id: 'layout-12-magazine',
    name: 'Magazine Spread',
    elements: [
      { id: 'l12-e1', type: 'image', x: 0, y: 0, width: 400, height: 350, rotation: 0, content: 'https://picsum.photos/seed/l12/1200/800' },
      { id: 'l12-e2', type: 'text', x: 20, y: 370, width: 360, height: 40, rotation: 0, content: 'EDITORIAL', fontSize: 12, fontFamily: 'Inter', fill: '#457B9D' },
      { id: 'l12-e3', type: 'text', x: 20, y: 400, width: 360, height: 60, rotation: 0, content: 'A Story Worth Telling', fontSize: 36, fontFamily: 'Playfair Display', fill: '#1D3557' },
      { id: 'l12-e4', type: 'text', x: 20, y: 470, width: 360, height: 60, rotation: 0, content: 'LOREM IPSUM DOLOR SIT AMET CONSECTETUR ADIPISCING ELIT.', fontSize: 10, fontFamily: 'Inter', fill: '#1D3557' }
    ]
  },
  {
    id: 'layout-14-asymmetric',
    name: 'Asymmetric Pair',
    elements: [
      { id: 'l14-e1', type: 'image', x: 20, y: 20, width: 240, height: 320, rotation: 0, content: 'https://picsum.photos/seed/l14a/600/800' },
      { id: 'l14-e2', type: 'image', x: 140, y: 200, width: 240, height: 320, rotation: 0, content: 'https://picsum.photos/seed/l14b/600/800' },
      { id: 'l14-e3', type: 'text', x: 20, y: 480, width: 360, height: 40, rotation: 0, content: 'CONTRAST', fontSize: 24, fontFamily: 'Playfair Display', fill: '#1D3557' }
    ]
  },
  {
    id: 'layout-15-panorama',
    name: 'Panorama Focus',
    elements: [
      { id: 'l15-e1', type: 'image', x: 0, y: 150, width: 400, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l15/1200/600' },
      { id: 'l15-e2', type: 'text', x: 20, y: 420, width: 360, height: 60, rotation: 0, content: 'The horizon calls...', fontSize: 18, fontFamily: 'Cormorant Garamond', fill: '#457B9D' }
    ]
  },
  {
    id: 'layout-16-grid-six',
    name: '6-Image Grid',
    elements: [
      { id: 'l16-e1', type: 'image', x: 20, y: 20, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16a/400/400' },
      { id: 'l16-e2', type: 'image', x: 210, y: 20, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16b/400/400' },
      { id: 'l16-e3', type: 'image', x: 20, y: 195, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16c/400/400' },
      { id: 'l16-e4', type: 'image', x: 210, y: 195, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16d/400/400' },
      { id: 'l16-e5', type: 'image', x: 20, y: 370, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16e/400/400' },
      { id: 'l16-e6', type: 'image', x: 210, y: 370, width: 170, height: 160, rotation: 0, content: 'https://picsum.photos/seed/l16f/400/400' }
    ]
  },
  {
    id: 'layout-17-overlap',
    name: 'Overlapping Trio',
    elements: [
      { id: 'l17-e1', type: 'image', x: 20, y: 20, width: 250, height: 350, rotation: -5, content: 'https://picsum.photos/seed/l17a/600/800' },
      { id: 'l17-e2', type: 'image', x: 130, y: 100, width: 250, height: 350, rotation: 5, content: 'https://picsum.photos/seed/l17b/600/800' },
      { id: 'l17-e3', type: 'text', x: 50, y: 480, width: 300, height: 40, rotation: 0, content: 'LAYERS OF LIFE', fontSize: 20, fontFamily: 'Playfair Display', fill: '#1D3557' }
    ]
  },
  {
    id: 'layout-18-vertical-split',
    name: 'Vertical Split',
    elements: [
      { id: 'l18-e1', type: 'image', x: 0, y: 0, width: 200, height: 550, rotation: 0, content: 'https://picsum.photos/seed/l18a/400/1200' },
      { id: 'l18-e2', type: 'text', x: 220, y: 100, width: 160, height: 100, rotation: 0, content: 'SIDE BY SIDE', fontSize: 30, fontFamily: 'Playfair Display', fill: '#1D3557' },
      { id: 'l18-e3', type: 'image', x: 220, y: 220, width: 160, height: 310, rotation: 0, content: 'https://picsum.photos/seed/l18b/400/800' }
    ]
  },
  {
    id: 'layout-19-circle-focus',
    name: 'Circle Trio',
    elements: [
      { id: 'l19-e1', type: 'image', x: 50, y: 50, width: 140, height: 140, rotation: 0, content: 'https://picsum.photos/seed/l19a/400/400', shapeType: 'circle' },
      { id: 'l19-e2', type: 'image', x: 210, y: 120, width: 140, height: 140, rotation: 0, content: 'https://picsum.photos/seed/l19b/400/400', shapeType: 'circle' },
      { id: 'l19-e3', type: 'image', x: 80, y: 250, width: 240, height: 240, rotation: 0, content: 'https://picsum.photos/seed/l19c/600/600', shapeType: 'circle' }
    ]
  },
  {
    id: 'layout-20-geometric',
    name: 'Geometric Mix',
    elements: [
      { id: 'l20-e1', type: 'image', x: 20, y: 20, width: 360, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l20a/800/600', shapeType: 'triangle' },
      { id: 'l20-e2', type: 'image', x: 20, y: 280, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l20b/400/600', shapeType: 'star' },
      { id: 'l20-e3', type: 'image', x: 205, y: 280, width: 175, height: 250, rotation: 0, content: 'https://picsum.photos/seed/l20c/400/600', shapeType: 'circle' }
    ]
  },
  {
    id: 'layout-21-editorial-large',
    name: 'Editorial Large',
    elements: [
      { id: 'l21-e1', type: 'image', x: 20, y: 20, width: 360, height: 400, rotation: 0, content: 'https://picsum.photos/seed/l21/800/800' },
      { id: 'l21-e2', type: 'text', x: 20, y: 440, width: 360, height: 80, rotation: 0, content: 'THE ART OF TRAVEL', fontSize: 36, fontFamily: 'Playfair Display', fill: '#1D3557' }
    ]
  },
  {
    id: 'layout-22-scattered',
    name: 'Scattered Polaroids',
    elements: [
      { id: 'l22-e1', type: 'image', x: 30, y: 30, width: 160, height: 200, rotation: -5, content: 'https://picsum.photos/seed/l22a/400/500', stroke: '#FFFFFF', strokeWidth: 10 },
      { id: 'l22-e2', type: 'image', x: 210, y: 50, width: 160, height: 200, rotation: 8, content: 'https://picsum.photos/seed/l22b/400/500', stroke: '#FFFFFF', strokeWidth: 10 },
      { id: 'l22-e3', type: 'image', x: 120, y: 250, width: 160, height: 200, rotation: -2, content: 'https://picsum.photos/seed/l22c/400/500', stroke: '#FFFFFF', strokeWidth: 10 }
    ]
  },
  {
    id: 'layout-24-collage-four',
    name: 'Dynamic Collage',
    elements: [
      { id: 'l24-e1', type: 'image', x: 20, y: 20, width: 175, height: 250, rotation: -2, content: 'https://picsum.photos/seed/l24a/400/600', borderRadius: 10 },
      { id: 'l24-e2', type: 'image', x: 205, y: 40, width: 175, height: 250, rotation: 3, content: 'https://picsum.photos/seed/l24b/400/600', borderRadius: 10 },
      { id: 'l24-e3', type: 'image', x: 30, y: 280, width: 175, height: 250, rotation: 1, content: 'https://picsum.photos/seed/l24c/400/600', borderRadius: 10 },
      { id: 'l24-e4', type: 'image', x: 200, y: 300, width: 175, height: 230, rotation: -4, content: 'https://picsum.photos/seed/l24d/400/600', borderRadius: 10 }
    ]
  },
  {
    id: 'layout-25-triptych-vertical',
    name: 'Vertical Triptych',
    elements: [
      { id: 'l25-e1', type: 'image', x: 10, y: 10, width: 120, height: 530, rotation: 0, content: 'https://picsum.photos/seed/l25a/400/1200' },
      { id: 'l25-e2', type: 'image', x: 140, y: 10, width: 120, height: 530, rotation: 0, content: 'https://picsum.photos/seed/l25b/400/1200' },
      { id: 'l25-e3', type: 'image', x: 270, y: 10, width: 120, height: 530, rotation: 0, content: 'https://picsum.photos/seed/l25c/400/1200' }
    ]
  },
  {
    id: 'layout-26-hero-text',
    name: 'Hero Text Overlay',
    elements: [
      { id: 'l26-e1', type: 'image', x: 0, y: 0, width: 400, height: 550, rotation: 0, content: 'https://picsum.photos/seed/l26/1200/1600' },
      { id: 'l26-e2', type: 'text', x: 20, y: 200, width: 360, height: 150, rotation: 0, content: 'ADVENTURE', fontSize: 48, fontFamily: 'Playfair Display', fill: '#FFFFFF', stroke: '#000000', strokeWidth: 1 }
    ]
  }
];

export const STICKERS = [
  // Animals
  { id: 'a1', name: 'Cat', category: 'animals', path: 'M 50 20 C 40 20 35 30 35 40 C 35 50 45 60 50 60 C 55 60 65 50 65 40 C 65 30 60 20 50 20 Z M 30 30 L 20 10 L 40 25 Z M 70 30 L 80 10 L 60 25 Z' },
  { id: 'a2', name: 'Bird', category: 'animals', path: 'M 20 50 Q 50 20 80 50 Q 50 80 20 50 M 80 50 L 90 45 L 85 55 Z' },
  { id: 'a3', name: 'Butterfly', category: 'animals', path: 'M 50 50 L 30 20 Q 10 20 10 40 Q 10 60 30 60 L 50 50 L 70 60 Q 90 60 90 40 Q 90 20 70 20 Z' },
  { id: 'a4', name: 'Fish', category: 'animals', path: 'M 10 50 Q 40 20 70 50 Q 40 80 10 50 M 70 50 L 90 30 L 90 70 Z' },
  // Travel
  { id: 't1', name: 'Mountain', category: 'travel', path: 'M 10 90 L 50 20 L 90 90 Z M 40 40 L 50 55 L 60 40' },
  { id: 't2', name: 'Sun', category: 'travel', path: 'M 50 20 A 30 30 0 1 1 50 80 A 30 30 0 1 1 50 20 M 50 10 L 50 0 M 50 90 L 50 100 M 10 50 L 0 50 M 90 50 L 100 50' },
  { id: 't3', name: 'Plane', category: 'travel', path: 'M 10 50 L 40 50 L 50 20 L 60 50 L 90 50 L 60 60 L 50 90 L 40 60 Z' },
  { id: 't4', name: 'Compass', category: 'travel', path: 'M 50 10 L 60 40 L 90 50 L 60 60 L 50 90 L 40 60 L 10 50 L 40 40 Z' },
  // Nature
  { id: 'n1', name: 'Leaf', category: 'nature', path: 'M 50 90 Q 20 50 50 10 Q 80 50 50 90 M 50 90 L 50 100' },
  { id: 'n2', name: 'Cloud', category: 'nature', path: 'M 25 70 A 15 15 0 0 1 25 40 A 20 20 0 0 1 60 30 A 20 20 0 0 1 85 50 A 15 15 0 0 1 75 80 Z' },
  { id: 'n3', name: 'Flower', category: 'nature', path: 'M 50 50 M 50 30 A 10 10 0 1 1 50 10 A 10 10 0 1 1 50 30 M 70 50 A 10 10 0 1 1 90 50 A 10 10 0 1 1 70 50 M 50 70 A 10 10 0 1 1 50 90 A 10 10 0 1 1 50 70 M 30 50 A 10 10 0 1 1 10 50 A 10 10 0 1 1 30 50' },
  { id: 'n4', name: 'Tree', category: 'nature', path: 'M 50 10 L 20 60 L 80 60 Z M 40 60 L 40 90 L 60 90 L 60 60' },
  // Beaches
  { id: 'b1', name: 'Shell', category: 'beaches', path: 'M 50 90 Q 10 70 20 30 Q 50 10 80 30 Q 90 70 50 90' },
  { id: 'b2', name: 'Wave', category: 'beaches', path: 'M 0 70 Q 25 50 50 70 Q 75 90 100 70' },
  { id: 'b3', name: 'Palm', category: 'beaches', path: 'M 50 90 L 50 40 M 50 40 Q 20 20 10 50 M 50 40 Q 80 20 90 50 M 50 40 Q 50 10 50 0' },
  { id: 'b4', name: 'Anchor', category: 'beaches', path: 'M 50 10 L 50 80 M 20 60 Q 50 90 80 60' },
  // Emojis
  { id: 'e1', name: 'Heart', category: 'emojis', path: 'M 50 30 C 30 10 10 30 10 50 C 10 70 50 90 50 90 C 50 90 90 70 90 50 C 90 30 70 10 50 30 Z' },
  { id: 'e2', name: 'Star', category: 'emojis', path: 'M 50 10 L 61 38 L 91 38 L 67 56 L 76 84 L 50 67 L 24 84 L 33 56 L 9 38 L 39 38 Z' },
  { id: 'e3', name: 'Smile', category: 'emojis', path: 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 M 35 40 A 5 5 0 1 1 35 30 A 5 5 0 1 1 35 40 M 65 40 A 5 5 0 1 1 65 30 A 5 5 0 1 1 65 40 M 30 65 Q 50 85 70 65' },
  { id: 'e4', name: 'Sparkle', category: 'emojis', path: 'M 50 10 L 55 45 L 90 50 L 55 55 L 50 90 L 45 55 L 10 50 L 45 45 Z' },
  // Aesthetic / Decorative
  { id: 'd1', name: 'Brush 1', category: 'aesthetic', path: 'M 10 50 Q 30 40 50 50 T 90 50 L 90 60 Q 70 70 50 60 T 10 60 Z' },
  { id: 'd2', name: 'Tape', category: 'aesthetic', path: 'M 20 40 L 80 40 L 80 60 L 20 60 Z M 25 45 L 75 45 L 75 55 L 25 55 Z' },
  { id: 'd3', name: 'Corner', category: 'aesthetic', path: 'M 10 10 L 40 10 L 40 20 L 20 20 L 20 40 L 10 40 Z' },
  { id: 'd4', name: 'Circle Frame', category: 'aesthetic', path: 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 M 50 20 A 30 30 0 1 0 50 80 A 30 30 0 1 0 50 20' },
  { id: 'd5', name: 'Washi Tape', category: 'aesthetic', path: 'M 10 40 L 90 40 L 90 60 L 10 60 Z M 15 45 L 85 45 L 85 55 L 15 55 Z' },
  { id: 'd6', name: 'Star Burst', category: 'aesthetic', path: 'M 50 0 L 55 45 L 100 50 L 55 55 L 50 100 L 45 55 L 0 50 L 45 45 Z' },
  { id: 'd7', name: 'Leaf Branch', category: 'aesthetic', path: 'M 50 100 Q 50 50 50 0 M 50 80 Q 30 70 20 80 M 50 60 Q 70 50 80 60 M 50 40 Q 30 30 20 40 M 50 20 Q 70 10 80 20' },
  { id: 'd8', name: 'Double Circle', category: 'aesthetic', path: 'M 50 10 A 40 40 0 1 1 50 90 A 40 40 0 1 1 50 10 M 50 15 A 35 35 0 1 1 50 85 A 35 35 0 1 1 50 15' },
  { id: 'd9', name: 'Squiggle', category: 'aesthetic', path: 'M 10 50 Q 20 20 30 50 T 50 50 T 70 50 T 90 50' },
  { id: 'd10', name: 'Diamond', category: 'aesthetic', path: 'M 50 10 L 90 50 L 50 90 L 10 50 Z' },
  { id: 'd11', name: 'Dashed Line', category: 'aesthetic', path: 'M 10 50 L 25 50 M 35 50 L 50 50 M 60 50 L 75 50 M 85 50 L 100 50' },
  { id: 'd12', name: 'Arrow Thin', category: 'aesthetic', path: 'M 10 50 L 90 50 M 70 30 L 90 50 L 70 70' }
];

export const TEMPLATES: Template[] = [
  {
    id: 'start-from-scratch',
    name: 'Start from Scratch',
    preview: 'https://picsum.photos/seed/scratch/400/300',
    pages: generateEmptyPages(12)
  },
  {
    id: 'ready-made-travel',
    name: 'Ready-made Travel',
    preview: 'https://picsum.photos/seed/travel-ready/400/300',
    pages: generateTravelReadyMade(12)
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream (12 Pages)',
    preview: 'https://picsum.photos/seed/pastel-preview/400/300',
    pages: generateStandardPages(12)
  }
];

