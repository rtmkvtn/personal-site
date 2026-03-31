"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  forceSimulation,
  forceCollide,
  forceX,
  forceY,
  type SimulationNodeDatum,
} from "d3-force";
import type { SkillBubble } from "@/shared/utils/skillsAggregator";
import styles from "./BubbleChart.module.scss";
import clsx from "clsx";

interface BubbleNode extends SimulationNodeDatum {
  skill: SkillBubble;
  r: number;
}

interface BubbleChartProps {
  skills: SkillBubble[];
  hoveredSkill: string | null;
  onHover: (skill: string | null) => void;
  onTap: (skill: string) => void;
}

const MIN_RADIUS = 28;
const MAX_RADIUS = 72;
const MOBILE_MIN_RADIUS = 22;
const MOBILE_MAX_RADIUS = 56;

function computeRadius(
  weight: number,
  maxWeight: number,
  min: number,
  max: number,
): number {
  const normalized = maxWeight > 0 ? weight / maxWeight : 0;
  return min + normalized * (max - min);
}

export function BubbleChart({
  skills,
  hoveredSkill,
  onHover,
  onTap,
}: BubbleChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<BubbleNode[]>([]);
  const [entered, setEntered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const simulationRef = useRef<ReturnType<typeof forceSimulation<BubbleNode>> | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDimensions({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const { width, height } = dimensions;
    if (width === 0 || height === 0 || skills.length === 0) return;

    const isMobile = width < 640;
    const minR = isMobile ? MOBILE_MIN_RADIUS : MIN_RADIUS;
    const maxR = isMobile ? MOBILE_MAX_RADIUS : MAX_RADIUS;
    const maxWeight = Math.max(...skills.map((s) => s.weight));

    const bubbleNodes: BubbleNode[] = skills.map((skill) => ({
      skill,
      r: computeRadius(skill.weight, maxWeight, minR, maxR),
      x: width / 2 + (Math.random() - 0.5) * width * 0.3,
      y: height / 2 + (Math.random() - 0.5) * height * 0.3,
    }));

    const sim = forceSimulation(bubbleNodes)
      .force("x", forceX(width / 2).strength(0.05))
      .force("y", forceY(height / 2).strength(0.05))
      .force(
        "collide",
        forceCollide<BubbleNode>((d) => d.r + 3).strength(0.8),
      )
      .alphaDecay(0.05)
      .on("tick", () => {
        setNodes([...bubbleNodes]);
      });

    simulationRef.current = sim;

    const entryTimer = setTimeout(() => setEntered(true), 50);

    return () => {
      sim.stop();
      clearTimeout(entryTimer);
    };
  }, [skills, dimensions]);

  const handlePointerEnter = useCallback(
    (skill: string) => {
      onHover(skill);
    },
    [onHover],
  );

  const handlePointerLeave = useCallback(() => {
    onHover(null);
  }, [onHover]);

  const handleClick = useCallback(
    (skill: string) => {
      onTap(skill);
    },
    [onTap],
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <svg
        className={styles.svg}
        width={dimensions.width}
        height={dimensions.height}
      >
        {nodes.map((node, i) => {
          const isHovered = hoveredSkill === node.skill.skill;
          return (
            <g
              key={node.skill.skill}
              transform={`translate(${node.x ?? 0}, ${node.y ?? 0})`}
              className={clsx(
                styles.bubble,
                entered && styles.bubbleEntered,
                isHovered && styles.bubbleHovered,
              )}
              style={{
                transitionDelay: entered ? `${i * 30}ms` : "0ms",
              }}
              onPointerEnter={() => handlePointerEnter(node.skill.skill)}
              onPointerLeave={handlePointerLeave}
              onClick={() => handleClick(node.skill.skill)}
            >
              <circle
                r={node.r}
                className={styles.circle}
              />
              <text
                textAnchor="middle"
                dominantBaseline="central"
                className={styles.label}
              >
                {node.skill.skill.length > node.r / 4.5
                  ? node.skill.skill.slice(0, Math.floor(node.r / 4.5)) + "."
                  : node.skill.skill}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
