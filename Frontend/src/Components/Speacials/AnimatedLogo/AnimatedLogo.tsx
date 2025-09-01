import { cn } from "../../../lib/utils";
import animatedLogoVideo from "../../../Assets/Videos/animatedLogo.mp4";
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
  const videoSrc = animatedLogoVideo; // Use the same video for both variants for now
  const sizeClass = variant === 'header' ? 'animated-logo-header' : 'animated-logo-hero';
  
  // Enhanced blend classes based on variant
  const blendClass = variant === 'hero' ? 'logo-hero-blend' : 'logo-screen-blend';
  
  return (
    <video 
      src={videoSrc}
      autoPlay={true}
      loop={false} 
      muted 
      playsInline
      className={cn(sizeClass, 'animated-logo-base', blendClass, className)}
      aria-label={`DHnaturally ${variant === 'header' ? 'Navigation' : 'Hero'} Animated Logo`}
      onError={(e) => {
        console.error('Video failed to load:', e);
      }}
    />
  );
}
