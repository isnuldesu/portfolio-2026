import Image from "next/image";
import { preload } from "react-dom";

/**
 * The site mascot: Isnul in a flat character-sheet style (thick even outline,
 * flat fills, big round eyes), with the face of public/portrait.webp: black
 * beanie with its tag, clear frames, fringe, goatee, the mole, the beige tee
 * with the smiley print, black cargo pants, white sneakers, smiley chain.
 *
 * All art was generated with Gemini as sheets (several poses side by side in
 * one image, so the style and scale match), then cut out, split, and
 * registered on the ground line. Sources and scripts live in the second brain
 * under Maskot-assets.
 */

/** Standing poses, hands in pockets. One 201x560 image each. */
export const MASCOT_POSES = {
  normal: "/mascot/v3/pose-normal.webp",
  happy: "/mascot/v3/pose-happy.webp",
  laugh: "/mascot/v3/pose-laugh.webp",
  surprised: "/mascot/v3/pose-surprised.webp",
} as const;
export type MascotExpression = keyof typeof MASCOT_POSES;

export function Mascot({
  className,
  priority = false,
  expression = "normal",
}: {
  className?: string;
  priority?: boolean;
  expression?: MascotExpression;
}) {
  return (
    <Image
      src={MASCOT_POSES[expression]}
      alt=""
      width={201}
      height={560}
      priority={priority}
      sizes="(max-width: 768px) 40vw, 200px"
      draggable={false}
      className={className}
    />
  );
}

/** One frame of the walk sprite, in pixels. The sheet is 32 frames wide. */
export const WALK_FRAME = { width: 239, height: 360 } as const;

/**
 * The mascot walking while it pushes. 32 frames lifted from a Gemini (Veo)
 * video made from the character art: one full gait cycle of continuous
 * motion, cut out of its white ground and looped where the first and last
 * frames match. Played with CSS steps(32); the step dust is CSS too. Size it
 * by height.
 */
export function MascotWalk({ className }: { className?: string }) {
  preload("/mascot/v3/walk-32.webp", { as: "image", fetchPriority: "high" });
  return (
    <div className={`mascot-walk ${className ?? ""}`} aria-hidden="true">
      <span className="mascot-dust mascot-dust-a" />
      <span className="mascot-dust mascot-dust-b" />
      <span className="mascot-effort" />
    </div>
  );
}
