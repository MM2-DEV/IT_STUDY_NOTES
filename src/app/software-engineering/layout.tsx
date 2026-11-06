import { LibraryLayout } from "@/components/library/library-pages";

export default function SoftwareEngineeringLayout({ children }: LayoutProps<"/software-engineering">) {
  return <LibraryLayout library="software-engineering">{children}</LibraryLayout>;
}
