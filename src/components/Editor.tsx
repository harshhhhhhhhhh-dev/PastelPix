import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Type, 
  Image as ImageIcon, 
  Layout as LayoutIcon, 
  Download, 
  Save,
  Trash2,
  X,
  RefreshCw,
  Undo2,
  Redo2,
  History,
  Settings,
  Settings2,
  Play,
  Cloud,
  ShoppingBag,
  PlayCircle,
  Eye,
  Smartphone,
  Monitor,
  Library,
  Square,
  Circle,
  Copy,
  PlusSquare,
  Maximize2,
  Minimize2,
  Search,
  Triangle,
  Star,
  Sticker
} from 'lucide-react';
import { Album, AlbumPage, AlbumElement, ElementType, ShapeType, Template, PageLayout, CoverTemplate } from '../types';
import { AlbumCanvas } from './Canvas';
import { TEMPLATES, LAYOUTS, STICKERS, COVER_TEMPLATES } from '../constants';
import { useDropzone } from 'react-dropzone';

interface EditorProps {
  initialTemplate: Template;
  onBack: () => void;
}

export const Editor: React.FC<EditorProps> = ({ initialTemplate, onBack }) => {
  const [album, setAlbum] = useState<Album>({
    id: 'new-album',
    title: 'My Pastel Story',
    pages: initialTemplate.pages
  });
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // 0 is cover, 1 is spread 1 (pages 1-2), etc.
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'images' | 'templates' | 'layouts' | 'backgrounds' | 'stickers' | 'tools'>('images');
  const [stickerCategory, setStickerCategory] = useState<'emojis' | 'travel' | 'nature' | 'animals' | 'beaches' | 'aesthetic'>('emojis');
  const [viewMode, setViewMode] = useState<'spread' | 'grid'>('spread');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);
  const [zoom, setZoom] = useState(75);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [templateTab, setTemplateTab] = useState<'albums' | 'covers'>('albums');

  const isPageEditable = (pageId: string | null) => {
    if (!pageId) return false;
    const pageIndex = album.pages.findIndex(p => p.id === pageId);
    // End papers are non-editable. They are at index 1 and index length - 2
    if (pageIndex === 1 || pageIndex === album.pages.length - 2) return false;
    return true;
  };

  useEffect(() => {
    if (album.pages.length > 0) {
      const spread = getSpreadPages(currentPageIndex);
      setActivePageId(spread[1]?.id || spread[0]?.id || null);
    }
  }, [currentPageIndex]);
  useEffect(() => {
    if (showSaveSuccess) {
      const timer = setTimeout(() => setShowSaveSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSaveSuccess]);

  useEffect(() => {
    setAlbum({
      id: 'new-album',
      title: 'My Pastel Story',
      pages: initialTemplate.pages
    });
    setCurrentPageIndex(0);
    setSelectedId(null);
  }, [initialTemplate]);

  const getSpreadPages = (index: number) => {
    if (index === 0) {
      // Cover spread: [Back Cover, Front Cover]
      return [album.pages[album.pages.length - 1] || null, album.pages[0] || null];
    }
    const page1Idx = index * 2 - 1;
    const page2Idx = index * 2;
    return [album.pages[page1Idx] || null, album.pages[page2Idx] || null];
  };

  const spreadPages = getSpreadPages(currentPageIndex);

  const updateElementInPage = (pageId: string, elementId: string, newAttrs: AlbumElement) => {
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      pages: prevAlbum.pages.map(page => 
        page.id === pageId 
          ? { ...page, elements: page.elements.map(el => el.id === elementId ? newAttrs : el) }
          : page
      )
    }));
  };

  const addElementToPage = (pageId: string, type: ElementType, content?: string, x?: number, y?: number, extraProps?: Partial<AlbumElement>) => {
    if (!isPageEditable(pageId)) return;
    
    let finalExtraProps = { ...extraProps };
    let finalContent = content;

    // Handle JSON data for shapes
    if (type === 'shape' && content && content.startsWith('{')) {
      try {
        const parsed = JSON.parse(content);
        finalExtraProps = { ...finalExtraProps, ...parsed };
        finalContent = undefined;
      } catch (e) {
        console.error('Failed to parse shape data', e);
      }
    }

    const newElement: AlbumElement = {
      id: `el-${Math.random().toString(36).substr(2, 9)}`,
      type,
      x: x || 100,
      y: y || 100,
      width: type === 'image' ? 200 : (type === 'text' ? 250 : 100),
      height: type === 'image' ? 150 : (type === 'text' ? 50 : 100),
      rotation: 0,
      content: finalContent || (type === 'text' ? 'New Text' : (type === 'image' ? 'https://picsum.photos/seed/new/400/300' : '')),
      fontSize: type === 'text' ? 20 : undefined,
      fontFamily: type === 'text' ? 'Playfair Display' : undefined,
      fill: type === 'text' ? '#1D3557' : (type === 'shape' ? '#E5E7EB' : undefined),
      ...finalExtraProps
    };

    setAlbum(prevAlbum => ({
      ...prevAlbum,
      pages: prevAlbum.pages.map(page => 
        page.id === pageId 
          ? { ...page, elements: [...page.elements, newElement] }
          : page
      )
    }));
    setTimeout(() => setSelectedId(newElement.id), 50);
  };

  const applyCoverTemplate = (coverTemplate: CoverTemplate) => {
    setAlbum(prev => ({
      ...prev,
      pages: prev.pages.map((p, i) => {
        if (i === 0) { // Front cover
          return {
            ...p,
            background: coverTemplate.background,
            elements: coverTemplate.elements.map(el => ({
              ...el,
              id: `cover-${coverTemplate.id}-${el.id}-${Math.random().toString(36).substr(2, 5)}`
            }))
          };
        }
        return p;
      })
    }));
    setCurrentPageIndex(0);
  };

  const handleDragStart = (e: React.DragEvent, type: string, data: string) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ type, data }));
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      pages: prevAlbum.pages.map(page => ({
        ...page,
        elements: page.elements.filter(el => el.id !== selectedId)
      }))
    }));
    setSelectedId(null);
  };

  const selectedElement = album.pages.flatMap(p => p.elements).find(el => el.id === selectedId);

  const handleReplaceImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && selectedId && selectedElement) {
      const reader = new FileReader();
      reader.onload = () => {
        const pageId = album.pages.find(p => p.elements.some(el => el.id === selectedId))?.id;
        if (pageId) {
          updateElementInPage(pageId, selectedId, { ...selectedElement, content: reader.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const targetPage = spreadPages[1] || spreadPages[0];
        if (targetPage) {
          addElementToPage(targetPage.id, 'image', reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const applyLayoutToPage = (pageId: string, layout: PageLayout) => {
    if (!isPageEditable(pageId)) return;
    setAlbum(prevAlbum => ({
      ...prevAlbum,
      pages: prevAlbum.pages.map(page => 
        page.id === pageId 
          ? { ...page, elements: layout.elements.map(el => ({ ...el, id: `el-${Math.random().toString(36).substr(2, 9)}` })) }
          : page
      )
    }));
  };

  const addPages = () => {
    // Max 12 content pages + 2 covers + 2 end papers = 16 pages total
    if (album.pages.length >= 16) {
      alert("Maximum of 12 content pages reached.");
      return;
    }
    const newPage1: AlbumPage = { id: `page-${Date.now()}-1`, elements: [], background: '#FFFFFF' };
    const newPage2: AlbumPage = { id: `page-${Date.now()}-2`, elements: [], background: '#FFFFFF' };
    
    setAlbum(prev => {
      const updatedPages = [...prev.pages];
      // Insert before the back end paper (which is at length - 2)
      updatedPages.splice(updatedPages.length - 2, 0, newPage1, newPage2);
      return { ...prev, pages: updatedPages };
    });
    setCurrentPageIndex(prev => prev + 1);
  };

  const duplicateSpread = () => {
    const currentSpread = getSpreadPages(currentPageIndex);
    const newPages: AlbumPage[] = [];
    
    currentSpread.forEach(p => {
      if (p) {
        newPages.push({
          ...p,
          id: `page-${Date.now()}-${Math.random()}`,
          elements: p.elements.map(el => ({ ...el, id: `el-${Math.random()}` }))
        });
      }
    });

    setAlbum(prev => {
      const updatedPages = [...prev.pages];
      // Insert after current spread
      const insertIdx = currentPageIndex === 0 ? 1 : currentPageIndex * 2 + 1;
      updatedPages.splice(insertIdx, 0, ...newPages);
      return { ...prev, pages: updatedPages };
    });
  };

  const removeSpread = () => {
    if (currentPageIndex === 0) return; // Don't remove cover
    // Don't remove spreads that contain end papers (Spread 1 and Last Spread)
    if (currentPageIndex === 1 || currentPageIndex === Math.floor((album.pages.length - 2) / 2)) {
      alert("This spread contains non-removable end papers.");
      return;
    }
    setAlbum(prev => {
      const updatedPages = [...prev.pages];
      const startIdx = currentPageIndex * 2 - 1;
      updatedPages.splice(startIdx, 2);
      return { ...prev, pages: updatedPages };
    });
    setCurrentPageIndex(prev => Math.max(0, prev - 1));
  };

  const clearPage = () => {
    if (!activePageId || !isPageEditable(activePageId)) return;
    setAlbum(prev => ({
      ...prev,
      pages: prev.pages.map(p => p.id === activePageId ? { ...p, elements: [], background: '#FFFFFF' } : p)
    }));
  };

  const handleSave = () => {
    setShowSaveSuccess(true);
    // In a real app, this would call an API
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] } });

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA] text-[#333] overflow-hidden font-sans">
      <input 
        type="file" 
        ref={replaceInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleReplaceImage}
      />
      
      {/* Top Bar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tighter text-brand-ink">PastelPix</span>
          </div>
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <input 
            type="text"
            value={album.title}
            onChange={(e) => setAlbum({ ...album, title: e.target.value })}
            className="bg-transparent border-none focus:outline-none font-bold text-sm text-brand-ink/80 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
          />
          <div className="h-6 w-px bg-gray-200 mx-2" />
          <div className="flex items-center gap-1">
            <TopBarButton icon={<Undo2 className="w-4 h-4" />} label="Undo" />
            <TopBarButton icon={<Redo2 className="w-4 h-4" />} label="Redo" />
            <TopBarButton icon={<History className="w-4 h-4" />} label="History" />
            <TopBarButton icon={<Settings2 className="w-4 h-4" />} label="Project" />
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <button className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition-all shadow-lg">
            <Play className="w-4 h-4 fill-current" />
            Video Tutorial
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={handleSave} className="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors group">
            <div className="text-gray-600 group-hover:text-black"><Cloud className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">Save</span>
          </button>
          <button onClick={() => setIsPreviewOpen(true)} className="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors group">
            <div className="text-gray-600 group-hover:text-black"><Eye className="w-5 h-5" /></div>
            <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">Preview</span>
          </button>
          <button className="flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition-all shadow-xl">
            <ShoppingBag className="w-5 h-5" />
            Order
          </button>
        </div>
      </header>

      {/* Save Success Notification */}
      <AnimatePresence>
        {showSaveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 bg-emerald-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span className="text-sm font-bold">Project saved successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Main Tabs */}
        <aside className="w-16 bg-[#1D2129] flex flex-col items-center py-4 gap-4 z-40">
          <MainSidebarTab 
            icon={<ImageIcon className="w-6 h-6" />} 
            label="Images" 
            active={activeTab === 'images'} 
            onClick={() => setActiveTab('images')} 
          />
          <MainSidebarTab 
            icon={<Library className="w-6 h-6" />} 
            label="Templates" 
            active={activeTab === 'templates'} 
            onClick={() => setActiveTab('templates')} 
          />
          <MainSidebarTab 
            icon={<LayoutIcon className="w-6 h-6" />} 
            label="Layouts" 
            active={activeTab === 'layouts'} 
            onClick={() => setActiveTab('layouts')} 
          />
          <MainSidebarTab 
            icon={<Square className="w-6 h-6" />} 
            label="Tools" 
            active={activeTab === 'tools'} 
            onClick={() => setActiveTab('tools')} 
          />
          <MainSidebarTab 
            icon={<Monitor className="w-6 h-6" />} 
            label="Background" 
            active={activeTab === 'backgrounds'} 
            onClick={() => setActiveTab('backgrounds')} 
          />
          <MainSidebarTab 
            icon={<Plus className="w-6 h-6" />} 
            label="Stickers" 
            active={activeTab === 'stickers'} 
            onClick={() => setActiveTab('stickers')} 
          />
        </aside>

        {/* Secondary Sidebar - Contextual Content */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-30 overflow-y-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'images' && (
              <motion.div
                key="images"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex flex-col h-full"
              >
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 text-center">Choose source to</h3>
                <h2 className="text-xl font-bold text-center mb-8">Add photos</h2>
                
                <div className="space-y-3">
                  <SourceButton 
                    icon={<Monitor className="w-5 h-5" />} 
                    label="Computer" 
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = 'image/*';
                      input.multiple = true;
                      input.onchange = (e) => {
                        const files = (e.target as HTMLInputElement).files;
                        if (files) onDrop(Array.from(files));
                      };
                      input.click();
                    }}
                  />
                  <SourceButton icon={<Smartphone className="w-5 h-5" />} label="Add from your phone" />
                  <SourceButton 
                    icon={<PlusSquare className="w-5 h-5" />} 
                    label="Add Photo Placeholder" 
                    onClick={() => {
                      if (activePageId) addElementToPage(activePageId, 'image');
                    }}
                  />
                  <SourceButton 
                    icon={<Type className="w-5 h-5" />} 
                    label="Add Text Box" 
                    onClick={() => {
                      if (activePageId) addElementToPage(activePageId, 'text');
                    }}
                  />
                </div>

                <div className="mt-8 grid grid-cols-2 gap-2 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/img${i}/200/200`}
                      alt="Sample"
                      className="w-full aspect-square object-cover rounded-lg cursor-move hover:ring-2 hover:ring-brand-primary transition-all shadow-sm"
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'image', `https://picsum.photos/seed/img${i}/800/800`)}
                    />
                  ))}
                </div>

                <div 
                  {...getRootProps()}
                  className={`mt-4 flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-all cursor-pointer ${isDragActive ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' : 'border-gray-200 text-gray-400 hover:border-brand-primary hover:bg-gray-50'}`}
                >
                  <input {...getInputProps()} />
                  <p className="text-sm font-medium">or</p>
                  <p className="text-lg font-bold">Drag & drop</p>
                </div>
              </motion.div>
            )}
            {activeTab === 'templates' && (
              <motion.div
                key="templates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex flex-col h-full"
              >
                <h2 className="text-xl font-bold mb-6">Templates</h2>
                
                <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
                  <button 
                    onClick={() => setTemplateTab('albums')}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${templateTab === 'albums' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Full Albums
                  </button>
                  <button 
                    onClick={() => setTemplateTab('covers')}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-all ${templateTab === 'covers' ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Custom Covers
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                  {templateTab === 'albums' ? (
                    <div className="grid grid-cols-1 gap-4">
                      {TEMPLATES.map(t => (
                        <div 
                          key={t.id}
                          onClick={() => setAlbum({ ...album, pages: t.pages })}
                          className="group cursor-pointer rounded-xl overflow-hidden border border-gray-100 hover:border-brand-primary transition-all shadow-sm"
                        >
                          <div className="relative aspect-video overflow-hidden">
                            <img src={t.preview} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          </div>
                          <div className="p-3 bg-white">
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-ink">{t.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6">
                      {COVER_TEMPLATES.map(ct => (
                        <div 
                          key={ct.id}
                          onClick={() => applyCoverTemplate(ct)}
                          className="group cursor-pointer rounded-xl overflow-hidden border border-gray-100 hover:border-brand-primary transition-all shadow-sm"
                        >
                          <div className="relative aspect-[4/5] overflow-hidden">
                            <img src={ct.preview} alt={ct.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                              <span className="text-[10px] font-black uppercase tracking-widest text-brand-ink">{ct.location}</span>
                            </div>
                          </div>
                          <div className="p-4 bg-white">
                            <p className="text-sm font-bold text-brand-ink mb-1">{ct.name}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Aesthetic Design</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
            {activeTab === 'layouts' && (
              <motion.div
                key="layouts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold mb-6">Layouts</h2>
                <div className="grid grid-cols-1 gap-4">
                  {LAYOUTS.map(layout => (
                    <div 
                      key={layout.id} 
                      onClick={() => {
                        if (activePageId) applyLayoutToPage(activePageId, layout);
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center group-hover:border-brand-primary group-hover:bg-brand-primary/5 transition-all relative overflow-hidden">
                        <div className="grid grid-cols-2 gap-1 p-4 w-full h-full opacity-40">
                          {layout.elements.map((el, i) => (
                            <div key={i} className={`bg-gray-300 rounded ${el.type === 'text' ? 'h-2' : 'h-full'}`} />
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">Apply</span>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-2 text-center">{layout.name}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'tools' && (
              <motion.div
                key="tools"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold mb-6">Tools & Shapes</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'text', 'New Text')}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'text')}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-blue-50 text-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Type className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Add Text</span>
                  </button>
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'image', 'https://picsum.photos/seed/new/800/600')}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'image')}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-emerald-50 text-emerald-500 rounded-lg group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Add Photo</span>
                  </button>
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'shape', JSON.stringify({ shapeType: 'rectangle' }))}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'shape', undefined, 150, 225, { shapeType: 'rectangle' })}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-purple-50 text-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Square className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Rectangle</span>
                  </button>
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'shape', JSON.stringify({ shapeType: 'circle' }))}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'shape', undefined, 150, 225, { shapeType: 'circle' })}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-orange-50 text-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Circle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Circle</span>
                  </button>
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'shape', JSON.stringify({ shapeType: 'triangle' }))}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'shape', undefined, 150, 225, { shapeType: 'triangle' })}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-red-50 text-red-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Triangle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Triangle</span>
                  </button>
                  <button 
                    draggable
                    onDragStart={(e) => handleDragStart(e, 'shape', JSON.stringify({ shapeType: 'star' }))}
                    onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'shape', undefined, 150, 225, { shapeType: 'star' })}
                    className="flex flex-col items-center gap-3 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group cursor-move"
                  >
                    <div className="p-3 bg-yellow-50 text-yellow-500 rounded-lg group-hover:scale-110 transition-transform">
                      <Star className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest">Star</span>
                  </button>
                </div>

                <div className="mt-8 p-4 bg-brand-cream rounded-xl border border-brand-primary/10">
                  <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] mb-2">Pro Tip</p>
                  <p className="text-xs text-brand-ink/60 leading-relaxed">
                    Double click any image on the canvas to quickly replace it with a new one from your computer.
                  </p>
                </div>
              </motion.div>
            )}
            {activeTab === 'backgrounds' && (
              <motion.div
                key="backgrounds"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <h2 className="text-xl font-bold mb-6">Backgrounds</h2>
                <div className="grid grid-cols-4 gap-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
                  {[
                    '#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', 
                    '#CED4DA', '#ADB5BD', '#FAD0C4', '#FFD1FF', 
                    '#D4FC79', '#96E6A1', '#84FAB0', '#8FD3F4',
                    '#A1C4FD', '#C2E9FB', '#FBC2EB', '#A6C1EE',
                    '#F6D365', '#FDA085', '#FF9A9E', '#FAD0C4',
                    '#A18CD1', '#FBC2EB', '#84FAB0', '#8FD3F4'
                  ].map(color => (
                    <div 
                      key={color}
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'color', color)}
                      onClick={() => {
                        if (activePageId) {
                          setAlbum(prev => ({
                            ...prev,
                            pages: prev.pages.map(p => p.id === activePageId ? { ...p, background: color } : p)
                          }));
                        }
                      }}
                      className="aspect-square rounded-lg cursor-move border border-gray-200 hover:scale-110 transition-transform shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
            {activeTab === 'stickers' && (
              <motion.div
                key="stickers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 flex flex-col h-full"
              >
                <h2 className="text-xl font-bold mb-6">Stickers</h2>
                
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 custom-scrollbar">
                  {(['emojis', 'travel', 'nature', 'animals', 'beaches', 'aesthetic'] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setStickerCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${stickerCategory === cat ? 'bg-black text-white shadow-md' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 overflow-y-auto flex-1 pr-2 custom-scrollbar">
                  {STICKERS.filter(s => s.category === stickerCategory).map(sticker => (
                    <div 
                      key={sticker.id} 
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'sticker', sticker.path)}
                      onClick={() => activePageId && isPageEditable(activePageId) && addElementToPage(activePageId, 'sticker', sticker.path, 150, 225, { fill: '#1D3557' })}
                      className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center hover:bg-brand-primary/10 transition-all cursor-move group hover:scale-110"
                    >
                      <svg viewBox="0 0 100 100" className="w-10 h-10 fill-gray-400 group-hover:fill-brand-primary transition-colors">
                        <path d={sticker.path} />
                      </svg>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </aside>

        {/* Main Workspace */}
        <main className="flex-1 relative flex flex-col bg-[#E9ECEF] overflow-hidden">
          <div className="flex-1 relative flex items-center justify-center p-8 overflow-auto custom-scrollbar">
            {viewMode === 'spread' ? (
              <>
                {/* Zoom Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-xl z-30 border border-white/20">
                  <button onClick={() => setZoom(z => Math.max(20, z - 10))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <Minimize2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="text-[10px] font-bold text-gray-500 w-12 text-center uppercase tracking-widest">{zoom}%</span>
                  <button onClick={() => setZoom(z => Math.min(200, z + 10))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <Maximize2 className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="w-px h-4 bg-gray-200 mx-1" />
                  <button onClick={() => setZoom(75)} className="text-[10px] font-bold text-brand-primary uppercase tracking-widest hover:underline">Fit</button>
                </div>

                {/* Canvas Area */}
                <div className="flex flex-col items-center transition-transform duration-300 ease-out" style={{ transform: `scale(${zoom / 100})` }}>
                  <div className="flex gap-0 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] bg-white p-0 relative rounded-sm overflow-hidden border border-gray-300">
                    {/* Center Fold Shadow */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 pointer-events-none" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-black/20 z-20 pointer-events-none" />
                    
                    {spreadPages[0] ? (
                      <div className="relative">
                        <AlbumCanvas 
                          elements={spreadPages[0].elements}
                          background={spreadPages[0].background}
                          isActive={activePageId === spreadPages[0].id}
                          onActivate={() => setActivePageId(spreadPages[0]!.id)}
                          onDropElement={(type, data, x, y) => {
                            if (type === 'color') {
                              setAlbum(prev => ({
                                ...prev,
                                pages: prev.pages.map(p => p.id === spreadPages[0]!.id ? { ...p, background: data } : p)
                              }));
                            } else {
                              addElementToPage(spreadPages[0]!.id, type as ElementType, data, x, y);
                            }
                          }}
                          onUpdateElement={(id, attrs) => updateElementInPage(spreadPages[0]!.id, id, attrs)}
                          onReplaceImage={(id) => {
                            setSelectedId(id);
                            replaceInputRef.current?.click();
                          }}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                          width={400}
                          height={550}
                        />
                        {!isPageEditable(spreadPages[0].id) && <NonEditableOverlay />}
                      </div>
                    ) : (
                      <div className="w-[400px] h-[550px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Back Cover</span>
                      </div>
                    )}
                    {spreadPages[1] ? (
                      <div className="relative">
                        <AlbumCanvas 
                          elements={spreadPages[1].elements}
                          background={spreadPages[1].background}
                          isActive={activePageId === spreadPages[1].id}
                          onActivate={() => setActivePageId(spreadPages[1]!.id)}
                          onDropElement={(type, data, x, y) => {
                            if (type === 'color') {
                              setAlbum(prev => ({
                                ...prev,
                                pages: prev.pages.map(p => p.id === spreadPages[1]!.id ? { ...p, background: data } : p)
                              }));
                            } else {
                              addElementToPage(spreadPages[1]!.id, type as ElementType, data, x, y);
                            }
                          }}
                          onUpdateElement={(id, attrs) => updateElementInPage(spreadPages[1]!.id, id, attrs)}
                          onReplaceImage={(id) => {
                            setSelectedId(id);
                            replaceInputRef.current?.click();
                          }}
                          selectedId={selectedId}
                          setSelectedId={setSelectedId}
                          width={400}
                          height={550}
                        />
                        {!isPageEditable(spreadPages[1].id) && <NonEditableOverlay />}
                      </div>
                    ) : (
                      <div className="w-[400px] h-[550px] bg-gray-100 flex items-center justify-center border border-dashed border-gray-300">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Empty</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between w-full px-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                    <span>{currentPageIndex === 0 ? 'Back cover' : `Page ${currentPageIndex * 2 - 1}`}</span>
                    <span>{currentPageIndex === 0 ? 'Front cover' : `Page ${currentPageIndex * 2}`}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full p-8 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {/* Grid View of all spreads */}
                  {/* Cover Spread Thumbnail */}
                  <div 
                    onClick={() => { setCurrentPageIndex(0); setViewMode('spread'); }}
                    className={`cursor-pointer transition-all ${currentPageIndex === 0 ? 'ring-4 ring-brand-primary ring-offset-4' : 'hover:scale-105'}`}
                  >
                    <div className="aspect-[4/3] bg-white shadow-lg rounded-lg overflow-hidden flex">
                      <div className="w-1/2 relative border-r border-gray-100">
                        <AlbumCanvas 
                          elements={album.pages[album.pages.length - 1].elements}
                          background={album.pages[album.pages.length - 1].background}
                          width={400}
                          height={550}
                          selectedId={null}
                          setSelectedId={() => {}}
                          onUpdateElement={() => {}}
                          onReplaceImage={() => {}}
                        />
                        <div className="absolute top-2 left-2 bg-black/20 px-2 py-0.5 rounded text-[8px] text-white font-bold uppercase tracking-widest">Back</div>
                      </div>
                      <div className="w-1/2 relative">
                        <AlbumCanvas 
                          elements={album.pages[0].elements}
                          background={album.pages[0].background}
                          width={400}
                          height={550}
                          selectedId={null}
                          setSelectedId={() => {}}
                          onUpdateElement={() => {}}
                          onReplaceImage={() => {}}
                        />
                        <div className="absolute top-2 right-2 bg-black/20 px-2 py-0.5 rounded text-[8px] text-white font-bold uppercase tracking-widest">Front</div>
                      </div>
                    </div>
                    <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">Covers</p>
                  </div>

                  {Array.from({ length: Math.floor((album.pages.length - 2) / 2) }).map((_, idx) => {
                    const spreadIdx = idx + 1;
                    const page1Idx = spreadIdx * 2 - 1;
                    const page2Idx = spreadIdx * 2;
                    const p1 = album.pages[page1Idx];
                    const p2 = album.pages[page2Idx];
                    
                    const isFirstSpread = spreadIdx === 1;
                    const isLastSpread = spreadIdx === Math.floor((album.pages.length - 2) / 2);
                    
                    let displayLabel = `Page ${page1Idx-1}-${page2Idx-1}`;
                    if (isFirstSpread) displayLabel = "Page 1";
                    if (isLastSpread) displayLabel = `Page ${page1Idx-1}`;

                    return (
                      <div 
                        key={spreadIdx}
                        onClick={() => { setCurrentPageIndex(spreadIdx); setViewMode('spread'); }}
                        className={`cursor-pointer transition-all ${currentPageIndex === spreadIdx ? 'ring-4 ring-brand-primary ring-offset-4' : 'hover:scale-105'}`}
                      >
                        <div className="aspect-[4/3] bg-white shadow-lg rounded-lg overflow-hidden flex relative">
                          <div className="w-1/2 relative">
                            {p1 && (
                              <AlbumCanvas 
                                elements={p1.elements}
                                background={p1.background}
                                width={400}
                                height={550}
                                selectedId={null}
                                setSelectedId={() => {}}
                                onUpdateElement={() => {}}
                                onReplaceImage={() => {}}
                              />
                            )}
                            {!isPageEditable(p1?.id) && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-[8px] text-white font-bold uppercase tracking-widest">End Paper</span></div>}
                          </div>
                          <div className="w-1/2 relative border-l border-gray-100">
                            {p2 && (
                              <AlbumCanvas 
                                elements={p2.elements}
                                background={p2.background}
                                width={400}
                                height={550}
                                selectedId={null}
                                setSelectedId={() => {}}
                                onUpdateElement={() => {}}
                                onReplaceImage={() => {}}
                              />
                            )}
                            {!isPageEditable(p2?.id) && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><span className="text-[8px] text-white font-bold uppercase tracking-widest">End Paper</span></div>}
                          </div>
                        </div>
                        <p className="text-center mt-4 text-xs font-bold uppercase tracking-widest text-gray-500">
                          {displayLabel}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Panel - Thumbnails & View Toggle */}
          <div className="h-48 bg-white border-t border-gray-200 flex flex-col z-30 relative">
            <div className="h-10 border-b border-gray-100 flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setViewMode('spread')}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'spread' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <Monitor className="w-4 h-4" /> One page
                </button>
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'text-black border-b-2 border-black pb-1' : 'text-gray-500 hover:text-gray-800'}`}
                >
                  <LayoutIcon className="w-4 h-4" /> All pages
                </button>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  disabled={currentPageIndex === 0}
                  onClick={() => setCurrentPageIndex(prev => prev - 1)}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Previous page</span>
                <span className="text-xs font-bold text-gray-800 uppercase tracking-widest">
                  {currentPageIndex === 0 ? 'Cover' : 
                   currentPageIndex === 1 ? 'Page 1' :
                   currentPageIndex === Math.floor((album.pages.length - 2) / 2) ? `Page ${currentPageIndex * 2 - 2}` :
                   `Page ${currentPageIndex * 2 - 2}-${currentPageIndex * 2 - 1}`}
                </span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Next page</span>
                <button 
                  disabled={currentPageIndex >= Math.ceil(album.pages.length / 2)}
                  onClick={() => setCurrentPageIndex(prev => prev + 1)}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-20"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setZoom(z => Math.max(10, z - 10))}><Minimize2 className="w-4 h-4 text-gray-400" /></button>
                  <span className="text-xs font-bold text-gray-500 w-12 text-center">{zoom}%</span>
                  <button onClick={() => setZoom(z => Math.min(200, z + 10))}><Maximize2 className="w-4 h-4 text-gray-400" /></button>
                </div>
              </div>
            </div>

            <div className="flex-1 flex items-center gap-4 px-6 overflow-x-auto py-4">
                {/* Thumbnail for Cover */}
                <div 
                  onClick={() => setCurrentPageIndex(0)}
                  className={`flex-shrink-0 cursor-pointer transition-all ${currentPageIndex === 0 ? 'ring-2 ring-black ring-offset-4' : 'opacity-60 hover:opacity-100'}`}
                >
                  <div className="w-24 h-16 bg-white border border-gray-200 rounded overflow-hidden flex">
                    <div className="w-1/2 bg-gray-50 border-r border-gray-100 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-gray-300 uppercase rotate-[-90deg]">Back</span>
                    </div>
                    <div className="w-1/2 bg-blue-50 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-blue-200 uppercase rotate-[-90deg]">Cover</span>
                    </div>
                  </div>
                  <p className="text-[10px] font-bold text-center mt-2 text-gray-500 uppercase tracking-widest">Covers</p>
                </div>

                {/* Thumbnails for Spreads */}
                {Array.from({ length: Math.floor((album.pages.length - 2) / 2) }).map((_, idx) => {
                  const spreadIdx = idx + 1;
                  const page1Idx = spreadIdx * 2 - 1;
                  const page2Idx = spreadIdx * 2;
                  
                  const isFirstSpread = spreadIdx === 1;
                  const isLastSpread = spreadIdx === Math.floor((album.pages.length - 2) / 2);
                  
                  let displayLabel = `Page ${page1Idx-1}-${page2Idx-1}`;
                  if (isFirstSpread) displayLabel = "Page 1";
                  if (isLastSpread) displayLabel = `Page ${page1Idx-1}`;

                  return (
                    <div 
                      key={spreadIdx}
                      onClick={() => setCurrentPageIndex(spreadIdx)}
                      className={`flex-shrink-0 cursor-pointer transition-all ${currentPageIndex === spreadIdx ? 'ring-2 ring-black ring-offset-4' : 'opacity-60 hover:opacity-100'}`}
                    >
                      <div className="w-24 h-16 bg-white border border-gray-200 rounded overflow-hidden flex">
                        <div className={`w-1/2 border-r border-gray-100 ${page1Idx === 1 ? 'bg-[#1A1A1A]' : ''}`} />
                        <div className={`w-1/2 ${page2Idx === album.pages.length - 2 ? 'bg-[#1A1A1A]' : ''}`} />
                      </div>
                      <p className="text-[10px] font-bold text-center mt-2 text-gray-500 uppercase tracking-widest">
                        {displayLabel}
                      </p>
                    </div>
                  );
                })}
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <ActionButton 
                icon={<PlusSquare className="w-4 h-4" />} 
                label="Add Pages" 
                primary 
                onClick={addPages}
                disabled={album.pages.length >= 16}
              />
              <ActionButton icon={<Copy className="w-4 h-4" />} label="Duplicate" onClick={duplicateSpread} disabled={album.pages.length >= 16} />
              <ActionButton icon={<RefreshCw className="w-4 h-4" />} label="Clear Page" onClick={clearPage} />
              <ActionButton 
                icon={<Trash2 className="w-4 h-4" />} 
                label="Remove" 
                onClick={removeSpread}
                disabled={currentPageIndex === 0 || currentPageIndex === 1 || currentPageIndex === Math.floor((album.pages.length - 2) / 2)}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex flex-col items-center justify-center p-12"
          >
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-8 right-8 text-white/60 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative bg-white shadow-2xl p-1 flex gap-1">
              {/* Watermark Overlay */}
              <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden opacity-10">
                <div className="flex flex-wrap gap-12 rotate-[-45deg] scale-150">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <span key={i} className="text-4xl font-black uppercase tracking-[0.5em] text-black whitespace-nowrap">
                      PastelPix
                    </span>
                  ))}
                </div>
              </div>

              {spreadPages[0] && (
                <AlbumCanvas 
                  elements={spreadPages[0].elements}
                  background={spreadPages[0].background}
                  width={400}
                  height={550}
                  selectedId={null}
                  setSelectedId={() => {}}
                  onUpdateElement={() => {}}
                  onReplaceImage={() => {}}
                />
              )}
              {spreadPages[1] && (
                <AlbumCanvas 
                  elements={spreadPages[1].elements}
                  background={spreadPages[1].background}
                  width={400}
                  height={550}
                  selectedId={null}
                  setSelectedId={() => {}}
                  onUpdateElement={() => {}}
                  onReplaceImage={() => {}}
                />
              )}
            </div>
            
            <div className="mt-12 flex items-center gap-8">
              <button 
                disabled={currentPageIndex === 0}
                onClick={() => setCurrentPageIndex(prev => prev - 1)}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all disabled:opacity-20"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <span className="text-white font-bold uppercase tracking-widest">
                {currentPageIndex === 0 ? 'Covers' : `Spread ${currentPageIndex}`}
              </span>
              <button 
                disabled={currentPageIndex === Math.floor((album.pages.length - 2) / 2)}
                onClick={() => setCurrentPageIndex(prev => prev + 1)}
                className="p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all disabled:opacity-20"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Selected Element Toolbar */}
      <AnimatePresence>
        {selectedId && selectedElement && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-2xl border border-gray-200 px-6 py-3 flex items-center gap-6 z-50"
          >
            {selectedElement.type === 'text' ? (
              <div className="flex items-center gap-4">
                <input 
                  type="text" 
                  value={selectedElement.content}
                  onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, content: e.target.value })}
                  className="bg-gray-50 border-none focus:ring-2 focus:ring-brand-primary/20 rounded-lg px-3 py-1.5 min-w-[200px] font-display text-lg text-brand-ink transition-all"
                />
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Font Family</span>
                  <select 
                    value={selectedElement.fontFamily}
                    onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, fontFamily: e.target.value })}
                    className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:outline-none text-brand-ink/60 cursor-pointer"
                  >
                    <option value="Inter">Inter Sans</option>
                    <option value="Playfair Display">Playfair Serif</option>
                    <option value="Cormorant Garamond">Cormorant Editorial</option>
                  </select>
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Color</span>
                  <input 
                    type="color" 
                    value={selectedElement.fill || '#1D3557'}
                    onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, fill: e.target.value })}
                    className="w-6 h-6 rounded-full border-none cursor-pointer overflow-hidden"
                  />
                </div>
              </div>
            ) : selectedElement.type === 'image' ? (
              <div className="flex items-center gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Frame Shape</span>
                  <div className="flex items-center gap-1.5">
                    <button 
                      onClick={() => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, shapeType: 'rectangle' })}
                      className={`p-1.5 rounded-md transition-all ${selectedElement.shapeType === 'rectangle' || !selectedElement.shapeType ? 'bg-brand-ink text-white shadow-lg' : 'hover:bg-gray-100 text-gray-400'}`}
                      title="Rectangle"
                    >
                      <Square className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, shapeType: 'circle' })}
                      className={`p-1.5 rounded-md transition-all ${selectedElement.shapeType === 'circle' ? 'bg-brand-ink text-white shadow-lg' : 'hover:bg-gray-100 text-gray-400'}`}
                      title="Circle"
                    >
                      <Circle className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, shapeType: 'triangle' })}
                      className={`p-1.5 rounded-md transition-all ${selectedElement.shapeType === 'triangle' ? 'bg-brand-ink text-white shadow-lg' : 'hover:bg-gray-100 text-gray-400'}`}
                      title="Triangle"
                    >
                      <Triangle className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, shapeType: 'star' })}
                      className={`p-1.5 rounded-md transition-all ${selectedElement.shapeType === 'star' ? 'bg-brand-ink text-white shadow-lg' : 'hover:bg-gray-100 text-gray-400'}`}
                      title="Star"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                
                <div className="w-px h-8 bg-gray-100" />
                
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-400">Corner Radius</span>
                  <input 
                    type="range" 
                    min="0" max="100" step="1"
                    value={selectedElement.borderRadius || 0}
                    onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, borderRadius: parseInt(e.target.value) })}
                    className="w-20 accent-brand-primary h-1"
                  />
                </div>

                <div className="w-px h-8 bg-gray-100" />

                <button 
                  onClick={() => replaceInputRef.current?.click()}
                  className="flex flex-col items-center gap-1 group"
                >
                  <div className="p-2 bg-brand-primary/10 text-brand-primary rounded-lg group-hover:bg-brand-primary group-hover:text-white transition-all shadow-sm">
                    <RefreshCw className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-brand-primary transition-colors">Replace</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Color</span>
                  <input 
                    type="color" 
                    value={selectedElement.fill || '#000000'}
                    onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, fill: e.target.value })}
                    className="w-8 h-8 rounded-full border-none cursor-pointer"
                  />
                </div>
                <div className="w-px h-6 bg-gray-200" />
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Opacity</span>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.1"
                    value={selectedElement.opacity ?? 1}
                    onChange={(e) => updateElementInPage(album.pages.find(p => p.elements.some(el => el.id === selectedId))!.id, selectedId, { ...selectedElement, opacity: parseFloat(e.target.value) })}
                    className="w-24 accent-brand-primary"
                  />
                </div>
              </div>
            )}
            <div className="w-px h-6 bg-gray-200" />
            <button onClick={deleteSelected} className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
            <button onClick={() => setSelectedId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TopBarButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-0.5 px-3 py-1 hover:bg-gray-100 rounded-lg transition-colors group"
  >
    <div className="text-gray-600 group-hover:text-black">{icon}</div>
    <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-600 uppercase tracking-widest">{label}</span>
  </button>
);

const MainSidebarTab = ({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 w-full py-4 transition-all relative group ${active ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
  >
    {active && (
      <motion.div 
        layoutId="activeTab"
        className="absolute inset-y-0 left-0 w-1 bg-brand-primary rounded-r-full shadow-[0_0_10px_rgba(69,123,157,0.5)]"
      />
    )}
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-brand-primary/20 text-brand-primary' : 'group-hover:bg-white/5'}`}>
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-[0.2em] mt-1">{label}</span>
  </button>
);

const SourceButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all group"
  >
    <div className="text-gray-400 group-hover:text-brand-ink">{icon}</div>
    <span className="text-sm font-bold text-gray-600 group-hover:text-brand-ink">{label}</span>
  </button>
);

const CanvasToolButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
  <button 
    onClick={onClick}
    className="w-14 h-14 bg-white/90 backdrop-blur border border-white/20 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg hover:shadow-2xl hover:scale-110 hover:border-brand-primary transition-all group active:scale-95"
  >
    <div className="text-gray-500 group-hover:text-brand-primary transition-colors">{icon}</div>
    <span className="text-[8px] font-black text-gray-400 group-hover:text-brand-primary uppercase tracking-widest transition-colors">{label}</span>
  </button>
);

const ActionButton = ({ icon, label, primary, onClick, disabled }: { icon: React.ReactNode, label: string, primary?: boolean, onClick?: () => void, disabled?: boolean }) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center gap-3 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${primary ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
  >
    {icon}
    {label}
  </button>
);

const NonEditableOverlay = () => (
  <div className="absolute inset-0 bg-[#333] flex flex-col items-center justify-center text-center p-8 z-40 pointer-events-auto">
    <p className="text-white font-bold text-lg uppercase tracking-widest mb-2">This page can not be edited</p>
    <p className="text-white/60 text-[10px] uppercase tracking-widest leading-relaxed">This is a not editable end paper</p>
  </div>
);
