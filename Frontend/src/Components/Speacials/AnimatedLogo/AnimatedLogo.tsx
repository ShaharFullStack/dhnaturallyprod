import { cn } from "../../../lib/utils";
import "./AnimatedLogo.css";

interface AnimatedLogoProps {
  variant?: 'header' | 'hero';
  className?: string;
  blendMode?: 'screen' | 'multiply' | 'overlay' | 'soft-light' | 'normal';
}

export function AnimatedLogo({ 
  variant = 'header', 
  className, 
  blendMode = 'screen' 
}: AnimatedLogoProps) {
  const videoSrc = variant === 'header' ? '/assets/animatedLogo2.mp4' : '/assets/animatedLogo5.mp4';
  const sizeClass = variant === 'header' ? 'animated-logo-header' : 'animated-logo-hero';
  
  // Enhanced blend classes based on variant
  const blendClass = variant === 'hero' ? 'logo-hero-blend' : 'logo-screen-blend';
  
  return (
    <video 
      src={videoSrc}
      autoPlay 
      loop={false} 
      muted 
      playsInline
      className={cn(sizeClass, 'animated-logo-base', blendClass, className)}
      aria-label={`DHnaturally ${variant === 'header' ? 'Navigation' : 'Hero'} Animated Logo`}
    />
  );
}
