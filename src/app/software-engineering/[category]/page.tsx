import {
  LibraryCategoryPage,
  libraryCategoryMetadata,
  libraryCategoryParams,
} from "@/components/library/library-pages";

export function generateStaticParams() {
  return libraryCategoryParams("software-engineering");
}

export async function generateMetadata({ params }: PageProps<"/software-engineering/[category]">) {
  return libraryCategoryMetadata("software-engineering", (await params).category);
}

export default async function CategoryPage({ params }: PageProps<"/software-engineering/[category]">) {
  return <LibraryCategoryPage library="software-engineering" categorySlug={(await params).category} />;
}
