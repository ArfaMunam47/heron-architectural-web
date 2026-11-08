import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

/** An illustrative detail of the existing north-wall opening; never mutates the model. */
export function WindowDetail() {
  const [phase, setPhase] = useState<"plan" | "revealing" | "detail">("plan");
  const trigger = useRef<HTMLButtonElement>(null);
  const back = useRef<HTMLButtonElement>(null);
  const id = useId();
  const glassId = `${id}-glass`;
  const hatchId = `${id}-hatch`;
  const open = phase !== "plan";
  const close = () => {
    setPhase("plan");
    requestAnimationFrame(() => trigger.current?.focus());
  };

  useEffect(() => {
    if (phase !== "revealing") return;
    back.current?.focus({ preventScroll: true });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("detail");
      return;
    }
    const timer = window.setTimeout(() => setPhase("detail"), 2600);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div
      className="pointer-events-none absolute inset-0"
      data-window-phase={phase}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          close();
        }
      }}
    >
      {!open && (
        <>
          <Button
            ref={trigger}
            variant="ghost"
            aria-label="Explore north-wall window"
            aria-expanded={false}
            aria-controls={id}
            onClick={() => setPhase("revealing")}
            className="window-plan-target pointer-events-auto absolute min-h-11 min-w-11 border-0 p-0 text-primary hover:bg-primary/10"
            title="Explore window detail"
          >
            <span className="window-plan-marker" />
          </Button>
          <Button
            variant="link"
            onClick={() => setPhase("revealing")}
            aria-expanded={false}
            aria-controls={id}
            className="pointer-events-auto absolute bottom-0 left-0 h-8 gap-1 px-0 font-mono text-[8px] uppercase sm:text-[9px]"
          >
            Explore window detail <ArrowUpRight className="size-3" />
          </Button>
        </>
      )}
      {open && (
        <div
          id={id}
          role="region"
          aria-label="Architectural window detail"
          className="window-detail-sheet pointer-events-auto absolute inset-0 bg-background"
          data-revealed={phase === "detail"}
        >
          <svg
            viewBox="0 0 560 466"
            className="h-full w-full"
            fill="none"
            stroke="var(--foreground)"
            strokeWidth="1"
            aria-label="Exploded window detail with structural reveal, aluminium frame, mullions, insulated glazing and section"
            role="img"
          >
            <defs>
              <linearGradient id={glassId} x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="var(--window-glass)" stopOpacity=".65" />
                <stop offset=".5" stopColor="var(--background)" stopOpacity=".2" />
                <stop offset="1" stopColor="var(--window-glass)" stopOpacity=".5" />
              </linearGradient>
              <pattern id={hatchId} width="7" height="7" patternUnits="userSpaceOnUse">
                <path d="M-1 1L1 -1 M0 7L7 0 M6 8L8 6" stroke="var(--border)" strokeWidth=".6" />
              </pattern>
            </defs>
            <g
              stroke="none"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill="var(--muted-foreground)"
            >
              <text x="16" y="24">
                W-01 / NORTH OPENING
              </text>
              <text x="544" y="24" textAnchor="end" fill="var(--primary)">
                DETAIL STUDY
              </text>
            </g>
            <path
              className="window-source-outline"
              d="M325 68H395V76H325Z"
              stroke="var(--primary)"
            />
            <g className="window-guides" stroke="var(--line)" strokeWidth=".7">
              <path pathLength="1" d="M35 104H525 M35 315H525 M90 52V364 M284 52V364 M420 52V364" />
              <path
                pathLength="1"
                d="M90 105L234 63 M90 315L234 273 M250 70L394 28 M250 280L394 238"
                strokeDasharray="3 5"
              />
            </g>
            <g className="window-assembly">
              <g className="window-layer window-structure" transform="translate(76 120) skewY(-12)">
                <path
                  d="M0 0H166V214H0Z M16 17V197H150V17Z"
                  fill={`url(#${hatchId})`}
                  fillRule="evenodd"
                />
                <path
                  d="M0 0L-11 8V222L0 214 M0 214L-11 222H155L166 214 M166 0L155 8"
                  stroke="var(--muted-foreground)"
                />
                <path d="M16 17H150V197H16Z" stroke="var(--muted-foreground)" />
              </g>
              <g className="window-layer window-frame" transform="translate(144 114) skewY(-12)">
                <path
                  d="M0 0H166V214H0Z M8 8V206H158V8Z"
                  fill="var(--secondary)"
                  fillRule="evenodd"
                />
                <path
                  d="M0 0L-8 6V220L0 214 M0 214L-8 220H158L166 214 M8 8L14 12H153V201L158 206 M14 12V201H153"
                  stroke="var(--muted-foreground)"
                  strokeWidth=".7"
                />
                <path d="M8 8H158V206H8Z" stroke="var(--primary)" strokeWidth=".8" />
              </g>
              <g className="window-layer window-mullion" transform="translate(212 108) skewY(-12)">
                <path d="M76 8H83V206H76Z M8 102H158V108H8Z" fill="var(--secondary)" />
                <path
                  d="M76 8L70 12V210L76 206 M8 108L2 112H152L158 108"
                  stroke="var(--muted-foreground)"
                  strokeWidth=".7"
                />
                <path d="M8 8H158V206H8Z" stroke="var(--border)" strokeWidth=".6" />
              </g>
              <g className="window-layer window-glazing" transform="translate(280 102) skewY(-12)">
                <path
                  d="M8 8H158V206H8Z"
                  fill={`url(#${glassId})`}
                  stroke="var(--muted-foreground)"
                />
                <path
                  d="M8 8L12 5H162V203L158 206 M158 8L162 5 M8 206L12 203"
                  stroke="var(--muted-foreground)"
                  strokeWidth=".6"
                />
                <path d="M79 8V206 M8 105H158" stroke="var(--border)" strokeWidth=".6" />
                <path
                  d="M24 56L53 26 M24 68L66 26 M110 188L141 157 M123 188L141 170"
                  stroke="var(--background)"
                  strokeWidth="2"
                />
              </g>
            </g>
            <g className="window-dimensions" stroke="var(--muted-foreground)" strokeWidth=".6">
              <path
                pathLength="1"
                d="M76 353L242 318 M76 345V361 M242 310V326 M57 120V334 M52 120H62 M52 334H62"
              />
              <g
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="var(--muted-foreground)"
                stroke="none"
              >
                <text x="163" y="355" textAnchor="middle">
                  W / PROJECT WIDTH
                </text>
                <text x="43" y="229" textAnchor="middle" transform="rotate(-90 43 229)">
                  H / PROJECT HEIGHT
                </text>
              </g>
            </g>
            <g
              className="window-annotations"
              fontFamily="var(--font-mono)"
              fontSize="9"
              stroke="var(--muted-foreground)"
              strokeWidth=".6"
            >
              <path d="M95 298V377H72 M169 286V390H183 M245 263V368H286 M406 216L453 233H505" />
              <g stroke="none" fill="var(--foreground)">
                <text x="72" y="389">
                  01 / REVEAL
                </text>
                <text x="183" y="402">
                  02 / FRAME
                </text>
                <text x="286" y="380">
                  03 / MULLION
                </text>
                <text x="453" y="248">
                  04 / GLAZING
                </text>
              </g>
              <g stroke="none" fill="var(--muted-foreground)" fontSize="8">
                <text x="72" y="402">
                  Structural opening
                </text>
                <text x="183" y="415">
                  Aluminium profile
                </text>
                <text x="286" y="393">
                  Slim sightline
                </text>
                <text x="453" y="261">
                  Insulated glass
                </text>
              </g>
            </g>
            <g className="window-section" transform="translate(451 294)">
              <path d="M0 0H18V47H0Z" fill={`url(#${hatchId})`} stroke="var(--border)" />
              <path d="M18 11H34V17H25V33H34V39H18Z" fill="var(--secondary)" />
              <path
                d="M34 19H55 M34 22H55 M34 29H55 M34 32H55"
                stroke="var(--muted-foreground)"
                strokeWidth=".7"
              />
              <path d="M25 24H31V27H25" stroke="var(--primary)" />
              <text
                x="0"
                y="63"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="var(--muted-foreground)"
                stroke="none"
              >
                SECTION A—A
              </text>
            </g>
            <text
              className="window-annotations"
              x="16"
              y="454"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--muted-foreground)"
              stroke="none"
            >
              ILLUSTRATIVE ASSEMBLY / NOT TO SCALE
            </text>
          </svg>
          <Button
            ref={back}
            variant="link"
            size="sm"
            onClick={close}
            aria-label="Return to floor plan"
            className="absolute bottom-0 right-0 h-8 gap-1 bg-background px-1 font-mono text-[8px] uppercase sm:text-[9px]"
          >
            <ArrowLeft className="size-3" />
            Return to plan
          </Button>
          <span className="sr-only" role="status">
            {phase === "detail"
              ? "Window detail revealed. Illustrative assembly; original model unchanged."
              : "Revealing window components."}
          </span>
        </div>
      )}
    </div>
  );
}
