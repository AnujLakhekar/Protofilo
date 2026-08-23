import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Download, Gamepad2, Sparkles } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

const mainMenuAssets = [
  { label: "1 Player", src: "/games/soccer/1-player.png" },
  { label: "1 Player (Selected)", src: "/games/soccer/1-player-selected.png" },
  { label: "2 Players", src: "/games/soccer/2-players.png" },
  {
    label: "2 Players (Selected)",
    src: "/games/soccer/2-players-selected.png",
  },
  { label: "Options", src: "/games/soccer/options.png" },
  { label: "Options (Selected)", src: "/games/soccer/options-selected.png" },
] as const;

const uiAssets = [
  { label: "Ball Selector", src: "/games/soccer/ball-selection.png" },
  { label: "Layout P1", src: "/games/soccer/layout-p1.png" },
  { label: "Layout P2", src: "/games/soccer/layout-p2.png" },
] as const;

export const metadata: Metadata = {
  title: "Soccer Game",
  description:
    "Retro soccer game concept page with downloadable assets and portfolio styling.",
};

export default function SoccerGamePage() {
  return (
    <main className="min-h-dvh flex flex-col gap-12 relative">
      <section className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY}>
          <div className="border rounded-2xl p-6 sm:p-8 bg-card/70 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 opacity-35 pointer-events-none">
              <Image
                src="/games/soccer/menu-background.png"
                alt="Soccer field pixel-art background"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <Image
                src="/games/soccer/menu-mask.png"
                alt="Background mask"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <Badge className="bg-primary text-primary-foreground border border-primary/20 px-3 py-1">
                  Arcade Showcase
                </Badge>
                <Badge variant="outline" className="bg-background/80 backdrop-blur">
                  <Sparkles className="size-3.5 mr-1.5" /> Pixel games
                </Badge>
              </div>

              <Image
                src="/games/soccer/title.png"
                alt="Super Soccer title"
                width={285}
                height={120}
                className="w-48 sm:w-64 md:w-72 h-auto"
              />

              <div className="max-w-xl space-y-2">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tighter text-balance">
                  Super Soccer 
                </h1>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  A neon-retro menu presentation designed as a playable game front
                  screen. This page keeps the same visual rhythm as your portfolio,
                  while giving the game assets their own hero spotlight.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <Button asChild className="rounded-xl h-10 px-5">
                  <a
                    href="/games/soccer/super-soccer-assets.zip"
                    download="super-soccer-assets.zip"
                  >
                    <Download className="size-4 mr-2" /> Download game
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-xl h-10 px-5">
                  <Link href="/">Back to Portfolio</Link>
                </Button>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

    </main>
  );
}
