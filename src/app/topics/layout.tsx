import { LibraryLayout } from "@/components/library/library-pages";

export default function TopicsLayout({ children }: LayoutProps<"/topics">) {
  return <LibraryLayout library="topics">{children}</LibraryLayout>;
}
