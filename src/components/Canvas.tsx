import React, { useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Text as KonvaText, Transformer, Rect, Circle as KonvaCircle, Line, Path, Group } from 'react-konva';
import useImage from 'use-image';
import { AlbumElement, ShapeType } from '../types';

const getClipFunc = (shapeType: ShapeType | undefined, width: number, height: number) => {
  return (ctx: any) => {
    ctx.beginPath();
    if (shapeType === 'circle') {
      ctx.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, Math.PI * 2);
    } else if (shapeType === 'triangle') {
      ctx.moveTo(width / 2, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
    } else if (shapeType === 'star') {
      const spikes = 5;
      const outerRadius = Math.min(width, height) / 2;
      const innerRadius = outerRadius / 2.5;
      let rot = (Math.PI / 2) * 3;
      let x = width / 2;
      let y = height / 2;
      let step = Math.PI / spikes;

      ctx.moveTo(width / 2, height / 2 - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = width / 2 + Math.cos(rot) * outerRadius;
        y = height / 2 + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = width / 2 + Math.cos(rot) * innerRadius;
        y = height / 2 + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(width / 2, height / 2 - outerRadius);
      ctx.closePath();
    } else {
      // Default rectangle
      ctx.rect(0, 0, width, height);
    }
    ctx.closePath();
  };
};

interface ElementProps {
  element: AlbumElement;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: AlbumElement) => void;
  onReplace?: () => void;
  onDragMove?: (e: any) => void;
  onDragEnd?: (e: any) => void;
}

const URLImage: React.FC<ElementProps> = ({ element, isSelected, onSelect, onChange, onReplace, onDragMove, onDragEnd }) => {
  const [img] = useImage(element.content || '', 'anonymous');
  const shapeRef = React.useRef<any>(null);
  const trRef = React.useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Group
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        rotation={element.rotation}
        draggable
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={onReplace}
        onDblTap={onReplace}
        onDragMove={onDragMove}
        onDragEnd={(e) => {
          onChange({
            ...element,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (onDragEnd) onDragEnd(e);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
        clipFunc={getClipFunc(element.shapeType, element.width, element.height)}
      >
        <KonvaImage
          image={img}
          width={element.width}
          height={element.height}
          cornerRadius={element.borderRadius || 0}
          stroke={element.stroke}
          strokeWidth={element.strokeWidth}
          opacity={element.opacity}
        />
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          rotateEnabled={true}
          anchorFill="#1D3557"
          anchorStroke="#FFFFFF"
          anchorSize={8}
          borderStroke="#1D3557"
          borderDash={[3, 3]}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const EditableText: React.FC<ElementProps> = ({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }) => {
  const shapeRef = React.useRef<any>(null);
  const trRef = React.useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <KonvaText
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        text={element.content}
        x={element.x}
        y={element.y}
        width={element.width}
        fontSize={element.fontSize}
        fontFamily={element.fontFamily}
        fill={element.fill}
        rotation={element.rotation}
        draggable
        onDragMove={onDragMove}
        onDragEnd={(e) => {
          onChange({
            ...element,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (onDragEnd) onDragEnd(e);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();

          node.scaleX(1);
          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          enabledAnchors={['middle-left', 'middle-right']}
          anchorFill="#1D3557"
          anchorStroke="#FFFFFF"
          anchorSize={8}
          borderStroke="#1D3557"
          borderDash={[3, 3]}
          boundBoxFunc={(oldBox, newBox) => {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const ShapeElement: React.FC<ElementProps> = ({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }) => {
  const shapeRef = React.useRef<any>(null);
  const trRef = React.useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  const renderShape = () => {
    const commonProps = {
      onClick: onSelect,
      onTap: onSelect,
      ref: shapeRef,
      x: element.x,
      y: element.y,
      width: element.width,
      height: element.height,
      rotation: element.rotation,
      fill: element.fill || '#E5E7EB',
      stroke: element.stroke,
      strokeWidth: element.strokeWidth,
      opacity: element.opacity,
      draggable: true,
      onDragMove: onDragMove,
      onDragEnd: (e: any) => {
        onChange({ ...element, x: e.target.x(), y: e.target.y() });
        if (onDragEnd) onDragEnd(e);
      },
      onTransformEnd: (e: any) => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...element,
          x: node.x(),
          y: node.y(),
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(5, node.height() * scaleY),
          rotation: node.rotation(),
        });
      }
    };

    if (element.shapeType === 'circle') {
      return <KonvaCircle {...commonProps} radius={Math.min(element.width, element.height) / 2} x={element.x + element.width/2} y={element.y + element.height/2} />;
    } else if (element.shapeType === 'triangle') {
      return (
        <Line 
          {...commonProps} 
          points={[element.width / 2, 0, element.width, element.height, 0, element.height]} 
          closed 
          fill={element.fill}
        />
      );
    } else if (element.shapeType === 'star') {
      return (
        <Path 
          {...commonProps} 
          data={`M ${element.width/2} 0 L ${element.width*0.65} ${element.height*0.35} L ${element.width} ${element.height*0.35} L ${element.width*0.7} ${element.height*0.6} L ${element.width*0.8} ${element.height} L ${element.width/2} ${element.height*0.75} L ${element.width*0.2} ${element.height} L ${element.width*0.3} ${element.height*0.6} L 0 ${element.height*0.35} L ${element.width*0.35} ${element.height*0.35} Z`}
          fill={element.fill}
        />
      );
    }
    return <Rect {...commonProps} cornerRadius={element.borderRadius || 0} />;
  };

  return (
    <React.Fragment>
      {renderShape()}
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorFill="#1D3557"
          anchorStroke="#FFFFFF"
          anchorSize={8}
          borderStroke="#1D3557"
          borderDash={[3, 3]}
        />
      )}
    </React.Fragment>
  );
};

const StickerElement: React.FC<ElementProps> = ({ element, isSelected, onSelect, onChange, onDragMove, onDragEnd }) => {
  const shapeRef = React.useRef<any>(null);
  const trRef = React.useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Path
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        data={element.content || ''}
        x={element.x}
        y={element.y}
        width={element.width}
        height={element.height}
        scaleX={element.width / 100} // Assuming base size 100
        scaleY={element.height / 100}
        rotation={element.rotation}
        fill={element.fill || '#000000'}
        opacity={element.opacity}
        draggable
        onDragMove={onDragMove}
        onDragEnd={(e) => {
          onChange({
            ...element,
            x: e.target.x(),
            y: e.target.y(),
          });
          if (onDragEnd) onDragEnd(e);
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          onChange({
            ...element,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          anchorFill="#1D3557"
          anchorStroke="#FFFFFF"
          anchorSize={8}
          borderStroke="#1D3557"
          borderDash={[3, 3]}
        />
      )}
    </React.Fragment>
  );
};

interface AlbumCanvasProps {
  elements: AlbumElement[];
  background?: string;
  width: number;
  height: number;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
  onUpdateElement: (id: string, attrs: AlbumElement) => void;
  onReplaceImage: (id: string) => void;
  onDropElement?: (type: string, data: string, x: number, y: number) => void;
  isActive?: boolean;
  onActivate?: () => void;
}

export const AlbumCanvas: React.FC<AlbumCanvasProps> = ({ 
  elements, 
  background, 
  width, 
  height, 
  selectedId, 
  setSelectedId, 
  onUpdateElement,
  onReplaceImage,
  onDropElement,
  isActive,
  onActivate
}) => {
  const stageRef = React.useRef<any>(null);
  const [guidelines, setGuidelines] = useState<{ x?: number; y?: number }[]>([]);

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
    onActivate?.();
  };

  const handleDragMove = (e: any) => {
    const item = e.target;
    const itemRect = item.getClientRect();
    
    const newGuidelines: { x?: number; y?: number }[] = [];
    const SNAP_THRESHOLD = 5;

    // Center lines
    const centerX = width / 2;
    const centerY = height / 2;

    if (Math.abs(item.x() + (item.width() * item.scaleX()) / 2 - centerX) < SNAP_THRESHOLD) {
      newGuidelines.push({ x: centerX });
    }
    if (Math.abs(item.y() + (item.height() * item.scaleY()) / 2 - centerY) < SNAP_THRESHOLD) {
      newGuidelines.push({ y: centerY });
    }

    // Alignment with other elements
    elements.forEach(el => {
      if (el.id === selectedId) return;
      
      if (Math.abs(item.x() - el.x) < SNAP_THRESHOLD) newGuidelines.push({ x: el.x });
      if (Math.abs(item.y() - el.y) < SNAP_THRESHOLD) newGuidelines.push({ y: el.y });
      if (Math.abs(item.x() + item.width() * item.scaleX() - (el.x + el.width)) < SNAP_THRESHOLD) newGuidelines.push({ x: el.x + el.width });
      if (Math.abs(item.y() + item.height() * item.scaleY() - (el.y + el.height)) < SNAP_THRESHOLD) newGuidelines.push({ y: el.y + el.height });
    });

    setGuidelines(newGuidelines);
  };

  const handleDragEnd = () => {
    setGuidelines([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dropData = e.dataTransfer.getData('application/json');
    if (dropData && onDropElement && stageRef.current) {
      try {
        const { type, data } = JSON.parse(dropData);
        const stage = stageRef.current;
        stage.setPointersPositions(e);
        const pos = stage.getPointerPosition();
        if (pos) {
          onDropElement(type, data, pos.x, pos.y);
        }
      } catch (err) {
        // Fallback for simple image drops
        const imageUrl = e.dataTransfer.getData('text/plain');
        if (imageUrl) {
          const stage = stageRef.current;
          stage.setPointersPositions(e);
          const pos = stage.getPointerPosition();
          if (pos) {
            onDropElement('image', imageUrl, pos.x, pos.y);
          }
        }
      }
    } else {
      // Fallback for simple image drops if no JSON
      const imageUrl = e.dataTransfer.getData('text/plain');
      if (imageUrl && onDropElement && stageRef.current) {
        const stage = stageRef.current;
        stage.setPointersPositions(e);
        const pos = stage.getPointerPosition();
        if (pos) {
          onDropElement('image', imageUrl, pos.x, pos.y);
        }
      }
    }
  };

  return (
    <div 
      className={`bg-white shadow-2xl overflow-hidden transition-all relative ${isActive ? 'ring-4 ring-brand-primary ring-offset-2' : 'hover:ring-2 hover:ring-gray-300'}`} 
      style={{ width, height }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={onActivate}
    >
      <Stage
        width={width}
        height={height}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
      >
        <Layer>
          {background && (
            <Rect 
              x={0}
              y={0}
              width={width}
              height={height}
              fill={background}
            />
          )}
          {elements.map((el) => {
            const commonProps = {
              key: el.id,
              element: el,
              isSelected: el.id === selectedId,
              onSelect: () => setSelectedId(el.id),
              onChange: (newAttrs: AlbumElement) => onUpdateElement(el.id, newAttrs),
              onDragMove: handleDragMove,
              onDragEnd: handleDragEnd
            };

            if (el.type === 'image') {
              return <URLImage {...commonProps} onReplace={() => onReplaceImage(el.id)} />;
            } else if (el.type === 'text') {
              return <EditableText {...commonProps} />;
            } else if (el.type === 'shape') {
              return <ShapeElement {...commonProps} />;
            } else if (el.type === 'sticker') {
              return <StickerElement {...commonProps} />;
            }
            return null;
          })}
          
          {/* Guidelines */}
          {guidelines.map((line, i) => (
            <Line
              key={i}
              points={line.x !== undefined ? [line.x, 0, line.x, height] : [0, line.y!, width, line.y!]}
              stroke="#FF4444"
              strokeWidth={1}
              dash={[4, 4]}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

