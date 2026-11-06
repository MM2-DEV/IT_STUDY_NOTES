import { LibraryIndexPage, libraryIndexMetadata } from "@/components/library/library-pages";

export const metadata = libraryIndexMetadata("topics");

export default function TopicsPage() {
  return <LibraryIndexPage library="topics" />;
}
