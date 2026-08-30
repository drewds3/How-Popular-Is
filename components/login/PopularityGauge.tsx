"use client";

interface PopularityGaugeProps {
  score?: number; // 0-100, solo decorativo en el login
  label?: string;
}

export function PopularityGauge({ score = 94, label = "Icónico" }: PopularityGaugeProps) {
  return (
    <div className="relative mx-auto mb-2 h-[145px] w-[220px]">
      <svg viewBox="0 0 220 145" width={220} height={145}>
        {/* pista de fondo */}
        <path
          d="M 20 118 A 90 90 0 0 1 200 118"
          fill="none"
          stroke="#E4D5C6"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* relleno del arco */}
        <path
          d="M 20 118 A 90 90 0 0 1 200 118"
          fill="none"
          stroke="#C96A4A"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={283}
          strokeDashoffset={60}
          opacity={0.9}
        />
        {/* aguja animada */}
        <line
          x1={110}
          y1={118}
          x2={144}
          y2={46}
          stroke="#A6321E"
          strokeWidth={4}
          strokeLinecap="round"
          className="origin-[110px_118px] animate-[sweep_1.4s_cubic-bezier(0.22,1,0.36,1)_forwards]"
        />
        <circle cx={110} cy={118} r={7} fill="#A6321E" />
        <text x={110} y={102} textAnchor="middle" className="fill-ink font-mono text-[25px] font-medium">
          {score}
        </text>
        <text x={110} y={140} textAnchor="middle" className="fill-ink-soft font-mono text-[10px] tracking-[0.08em]">
          {label.toUpperCase()}
        </text>
      </svg>
    </div>
  );
}