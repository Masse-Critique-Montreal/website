import { type ReactNode } from "react";

export interface SVGShape {
  type: "circle" | "square" | "triangle" | "line" | "half-circle"
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
  size: number // multiplier of base unit (block height)
  style?: "primary" | "secondary" | "accent" | "dark"
}

interface PhraseBlockProps {
  className?:string,
  text: string | ReactNode;
  bgColor?: "primary" | "secondary" | "accent" | "background" | "dark" | "kids"
  shapes?: SVGShape[]
}

export function PhraseBlock({  className, text, bgColor = "background", shapes = [] }: PhraseBlockProps) {
  const bgClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    accent: "bg-accent text-accent-foreground",
    background: "bg-background text-foreground",
    dark: 'bg-primary-foreground text-white',
    kids: 'bg-transparent text-[var(--kids-primary)] px-7! py-3!'
  }

  const colorClasses = {
    primary: "bg-primary fill-primary",
    secondary: "bg-secondary fill-primary-foreground",
    accent: "bg-accent ",
    dark: 'bg-current opacity-15'
  }

  const renderShape = (shape: SVGShape, index: number) => {
    // Base unit is the block height (py-8 = 2rem padding, text is ~2rem, total ~6rem)
    const baseUnit = 6 // rem
    const shapeSize = baseUnit * shape.size

    // Position mapping to exact corners/edges
    const centering = shape.type === 'circle';
    const positions = {
      "top-left": "top-0 left-0 " + (centering ? "-translate-x-1/2 -translate-y-1/2" : ''),
      "top-right": "top-0 right-0 " + (centering ? "translate-x-1/2 -translate-y-1/2" : ''),
      "bottom-left": "bottom-0 left-0 " +( centering ? "-translate-x-1/2 translate-y-1/2" : ''),
      "bottom-right": "bottom-0 right-0 " + (centering ? "translate-x-1/2 translate-y-1/2" : ''),
    };

    const colorClass = shape.style ? colorClasses[shape.style] : "bg-current opacity-15"

    let svgContent
    switch (shape.type) {
      case "circle":
        return <div key={index}
          className={`sm:max-w-none sm:max-h-none max-w-full max-h-full h-[calc(200%)] rounded-full absolute ${positions[shape.position]} z-1 aspect-square  ${colorClass}`}/>
      case "square":
        svgContent = <rect x="0" y="0" width="100" height="100" />
        break
      case "triangle":

        const s = 100;
        const i = -20;
        const gx = 1.5;

        svgContent = <polygon points={`${i},${0} ${(s-i)},${(s-i)} ${shape.position.includes('top') ? i : (s-i)},${shape.position.includes('top') ? (s-i): i}`} />
        break
      case "line":
        svgContent = <rect x="0" y="45" width="100" height="10" />
        break
      case "half-circle":
        svgContent = <path d="M 0 50 A 50 50 0 0 1 100 50 L 100 100 L 0 100 Z" />
        break
    }

    return (
      <svg
        key={index}
        className={`absolute ${positions[shape.position]} ${colorClass}`}
        style={{
          width: `${shapeSize}rem`,
          height: `${shapeSize}rem`,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {svgContent}
      </svg>
    )
  }

  return (
    <section className={`relative py-7 px-12 ${bgClasses[bgColor]} overflow-hidden`}>
      {shapes.map((shape, index) => renderShape(shape, index))}

      <p className={`text-xl md:text-2xl text-left leading-relaxed max-w-4xl relative z-10 ${className}`}>
        {text}
      </p>
    </section>
  )
}
