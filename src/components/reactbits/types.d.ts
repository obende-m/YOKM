/* Types for the React Bits components, which are plain JavaScript files. */
declare module "@/components/reactbits/AccordionGallery.jsx" {
  import type { FC } from "react";
  const AccordionGallery: FC<{
    items: { image: string; label?: string; link?: string; alt?: string }[];
    defaultIndex?: number;
    accentColor?: string;
    overlayColor?: string;
    textColor?: string;
    height?: number;
    gap?: number;
    radius?: number;
    expandRatio?: number;
    orientation?: "horizontal" | "vertical";
    duration?: number;
    ease?: string;
    parallax?: number;
    tilt?: number;
    stagger?: number;
    trigger?: "hover" | "click";
    showLabels?: boolean;
    grayscale?: boolean;
    className?: string;
  }>;
  export default AccordionGallery;
}

declare module "@/components/reactbits/CircularGallery.jsx" {
  import type { CSSProperties, FC } from "react";
  const CircularGallery: FC<{
    items: { image: string; text?: string; description?: string; alt?: string }[];
    bend?: number;
    textColor?: string;
    borderRadius?: number;
    font?: string;
    scrollSpeed?: number;
    scrollEase?: number;
    itemSize?: number;
    itemAspect?: number;
    gap?: number;
    wave?: number;
    fadeEdges?: number;
    shadow?: number;
    grayscale?: boolean;
    showTitles?: boolean;
    snap?: boolean;
    autoScroll?: number;
    openOnClick?: boolean;
    intro?: boolean;
    className?: string;
    style?: CSSProperties;
  }>;
  export default CircularGallery;
}

declare module "@/components/reactbits/Masonry.jsx" {
  import type { CSSProperties, FC } from "react";
  const Masonry: FC<{
    items: {
      id: string;
      img: string;
      width?: number;
      height?: number;
      title?: string;
      description?: string;
      alt?: string;
      url?: string;
      span?: number;
    }[];
    columns?: "auto" | number;
    columnWidth?: number;
    gap?: number;
    radius?: number;
    animateFrom?: "bottom" | "top" | "left" | "right" | "center" | "random" | "none";
    stagger?: number;
    duration?: number;
    bounce?: number;
    blurToFocus?: boolean;
    revealOnScroll?: boolean;
    hoverEffect?: "zoom" | "lift" | "tilt" | "none";
    focusOnHover?: boolean;
    captions?: "hover" | "always" | "none";
    parallax?: number;
    lightbox?: boolean;
    draggable?: boolean;
    className?: string;
    style?: CSSProperties;
  }>;
  export default Masonry;
}
