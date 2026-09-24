import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

type ScratchRevealProps = { onReveal: () => void; revealed: boolean };

export function ScratchReveal({ onReveal, revealed }: ScratchRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(ratio, ratio);
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#d8ad6a");
    gradient.addColorStop(.5, "#f0d69b");
    gradient.addColorStop(1, "#bd8545");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "#664723";
    ctx.textAlign = "center";
    ctx.font = "600 18px sans-serif";
    ctx.fillText("SCRATCH TO REVEAL", rect.width / 2, rect.height / 2 - 3);
    ctx.font = "13px sans-serif";
    ctx.fillText("a little date with destiny", rect.width / 2, rect.height / 2 + 22);
  }, [revealed]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - rect.left, y - rect.top, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    const next = progress + 1;
    setProgress(next);
    if (next > 34) onReveal();
  };

  return (
    <div className="scratch-shell">
      <div className="scratch-secret" aria-live="polite">
        <Sparkles aria-hidden="true" />
        <span>Save the date</span>
        <strong>16 October 2026</strong>
        <small>11:00 AM onwards</small>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          className="scratch-canvas"
          aria-label="Scratch this card to reveal the engagement date"
          onPointerDown={(event) => { drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); scratch(event.clientX, event.clientY); }}
          onPointerMove={(event) => { if (drawing.current) scratch(event.clientX, event.clientY); }}
          onPointerUp={() => { drawing.current = false; }}
          onPointerCancel={() => { drawing.current = false; }}
        />
      )}
    </div>
  );
}
