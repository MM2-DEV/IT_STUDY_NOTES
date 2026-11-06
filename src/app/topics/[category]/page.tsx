import {
  LibraryCategoryPage,
  libraryCategoryMetadata,
  libraryCategoryParams,
} from "@/components/library/library-pages";

export function generateStaticParams() {
  return libraryCategoryParams("topics");
}

export async function generateMetadata({ params }: PageProps<"/topics/[category]">) {
  return libraryCategoryMetadata("topics", (await params).category);
}

export default async function CategoryPage({ params }: PageProps<"/topics/[category]">) {
  return <LibraryCategoryPage library="topics" categorySlug={(await params).category} />;
}
