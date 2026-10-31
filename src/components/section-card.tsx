import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

import { BorderBeam } from "@/components/border-beam";
import { SpotlightCard } from "@/components/spotlight-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SiteSection } from "@/config/site";

export function SectionCard({ section }: { section: SiteSection }) {
  const Icon = section.icon;

  const card = (
    <Card
      className={cn(
        "relative h-full transition-[box-shadow,background-color]",
        section.available
          ? "bg-card/80 backdrop-blur-sm group-hover/link:shadow-lg group-hover/link:ring-primary/30"
          : "bg-muted/40"
      )}
    >
      <CardHeader>
        <div
          className={cn(
            "mb-3 flex size-11 items-center justify-center rounded-xl ring-1",
            section.available
              ? "bg-primary/10 text-primary ring-primary/20"
              : "bg-muted text-muted-foreground ring-border"
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </div>
        <CardTitle
          className={cn("text-lg", !section.available && "text-muted-foreground")}
        >
          {section.title}
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {section.description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="mt-auto justify-between bg-transparent">
        {section.available ? (
          <>
            <span className="font-medium text-primary">Start reading</span>
            <ArrowRight
              className="size-4 text-primary transition-transform group-hover/link:translate-x-1"
              aria-hidden="true"
            />
          </>
        ) : (
          <Badge variant="outline">Coming soon</Badge>
        )}
      </CardFooter>
      <BorderBeam duration={8} />
      <BorderBeam
        duration={8}
        delay={4}
        colorFrom="var(--beam-2-from)"
        colorTo="var(--beam-2-to)"
      />
    </Card>
  );

  if (!section.available) {
    return card;
  }

  return (
    <Link
      href={section.href}
      className="group/link block h-full rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <SpotlightCard>{card}</SpotlightCard>
    </Link>
  );
}
