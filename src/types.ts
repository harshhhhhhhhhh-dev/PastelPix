export type ElementType = 'image' | 'text' | 'shape' | 'sticker';
export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star';

export interface AlbumElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  content?: string; // For text, image URL, or sticker SVG path
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
  opacity?: number;
  shapeType?: ShapeType;
  borderRadius?: number;
  stroke?: string;
  strokeWidth?: number;
}

export interface AlbumPage {
  id: string;
  elements: AlbumElement[];
  background?: string;
}

export interface Album {
  id: string;
  title: string;
  pages: AlbumPage[];
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  pages: AlbumPage[];
}

export interface PageLayout {
  id: string;
  name: string;
  elements: AlbumElement[];
}

export interface CoverTemplate {
  id: string;
  name: string;
  location: string;
  preview: string;
  elements: AlbumElement[];
  background: string;
}
