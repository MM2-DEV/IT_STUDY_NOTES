import {
  LibraryTopicPage,
  libraryTopicMetadata,
  libraryTopicParams,
} from "@/components/library/library-pages";

export function generateStaticParams() {
  return libraryTopicParams("software-engineering");
}

export async function generateMetadata({ params }: PageProps<"/software-engineering/[category]/[topic]">) {
  const { category, topic } = await params;
  return libraryTopicMetadata("software-engineering", category, topic);
}

export default async function TopicPage({ params }: PageProps<"/software-engineering/[category]/[topic]">) {
  const { category, topic } = await params;
  return <LibraryTopicPage library="software-engineering" categorySlug={category} topicSlug={topic} />;
}
