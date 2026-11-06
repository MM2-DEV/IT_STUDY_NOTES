import { LibraryIndexPage, libraryIndexMetadata } from "@/components/library/library-pages";

export const metadata = libraryIndexMetadata("software-engineering");

export default function SoftwareEngineeringPage() {
  return <LibraryIndexPage library="software-engineering" />;
}
