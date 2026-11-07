import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

import type { CategoryInfo } from "@/components/explore/explore-flow";
import { BorderBeams } from "@/components/border-beam";
import { Badge } from "@/components/ui/badge";
import { exploreTree } from "@/config/site";

/**
 * The Explore tree for narrow screens: the same tree as explore-flow.tsx, drawn as nested
 * lists with connector lines instead of a React Flow diagram.
 */
export function ExploreTreeList({ categories }: { categories: CategoryInfo }) {
  const { root, branches } = exploreTree;
  const RootIcon = root.icon;

  return (
    <div>
      <div className="relative rounded-2xl border border-primary/40 bg-card shadow-sm">
        <div className="flex items-center gap-2 rounded-t-2xl border-b border-primary/20 bg-primary/10 px-4 py-2.5">
          <RootIcon className="size-4 text-primary" aria-hidden="true" />
          <span className="font-heading text-sm font-semibold">{root.title}</span>
        </div>
        <p className="px-4 py-3 text-sm text-muted-foreground">{root.description}</p>
        <BorderBeams />
      </div>

      <ul className="ml-5 border-l-2 border-dashed border-border pl-4">
        {branches.map((branch, branchIndex) => {
          const BranchIcon = branch.icon;
          return (
            <li key={branch.id} className="relative pt-5">
              <span
                aria-hidden="true"
                className="absolute top-10 -left-4 w-4 border-t-2 border-dashed border-border"
              />
              <div className="relative rounded-2xl border border-primary/30 bg-card shadow-sm">
                <div className="flex items-center gap-2 border-b border-primary/20 bg-primary/10 px-4 py-2.5">
                  <BranchIcon className="size-4 text-primary" aria-hidden="true" />
                  {branch.href ? (
                    <Link href={branch.href} className="font-heading text-sm font-semibold hover:underline">
                      {branch.title}
                    </Link>
                  ) : (
                    <span className="font-heading text-sm font-semibold">{branch.title}</span>
                  )}
                </div>
                <p className="px-4 py-3 text-sm text-muted-foreground">{branch.description}</p>
                <BorderBeams offset={(branchIndex + 1) * 2.2} />
              </div>

              <ul className="ml-5 border-l-2 border-dashed border-border pl-4">
                {branch.leaves.map((leaf, leafIndex) => {
                  const LeafIcon = leaf.icon;
                  const covered = (leaf.categories ?? []).map((slug) => categories[slug]).filter(Boolean);
                  const topics = covered.reduce((sum, category) => sum + category.topics, 0);
                  const body = (
                    <div
                      className={cn(
                        "relative rounded-xl border bg-card px-4 py-3",
                        leaf.available ? "border-border" : "bg-(--card-muted)"
                      )}
                    >
                      <span className="flex items-center gap-2 font-heading text-sm font-semibold">
                        <LeafIcon
                          className={cn("size-4", leaf.available ? "text-primary" : "text-muted-foreground")}
                          aria-hidden="true"
                        />
                        <span className={cn(!leaf.available && "text-muted-foreground")}>{leaf.title}</span>
                        {leaf.available ? (
                          <ArrowRight className="ml-auto size-4 text-primary" aria-hidden="true" />
                        ) : (
                          <Badge variant="outline" className="ml-auto">
                            Coming soon
                          </Badge>
                        )}
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">
                        {leaf.description}
                        {covered.length > 0 && ` ${covered.length} categories · ${topics} topics.`}
                      </span>
                      <BorderBeams offset={(branchIndex * 3 + leafIndex + 2) * 1.1} />
                    </div>
                  );
                  return (
                    <li key={leaf.title} className="relative pt-3">
                      <span
                        aria-hidden="true"
                        className="absolute top-8 -left-4 w-4 border-t-2 border-dashed border-border"
                      />
                      {leaf.available ? (
                        <Link
                          href={leaf.href}
                          className="block rounded-xl outline-none hover:[&>div]:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50"
                        >
                          {body}
                        </Link>
                      ) : (
                        body
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
