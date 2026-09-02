import Scanner from "../Scanner";
import "./index.css";

export function PortfolioBackground() {
  return (
    <div className="portfolio-background" aria-hidden="true">
      <Scanner
        color1="#5227ff"
        color2="#ff9ffc"
        color3="#ffffff"
        speed={0.15}
        sweepSpeed={0.2}
        sweepWidth={1.6}
        sweepFalloff={3}
        scale={1.5}
        frequency={2}
        ripple={0.22}
        bandDensity={11}
        lineSharpness={5}
        glow={0.22}
        scanDirection="vertical"
        colorSpread={0.8}
        brightness={1}
        contrast={1.15}
        softness={2.5}
        vignette={0.45}
        scanline
        grain
        grainIntensity={0.05}
        opacity={0.75}
        mouseInteraction={false}
        mouseRadius={0.5}
        mouseStrength={0.5}
      />
    </div>
  );
}
