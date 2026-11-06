import {
  LibraryTopicPage,
  libraryTopicMetadata,
  libraryTopicParams,
} from "@/components/library/library-pages";

export function generateStaticParams() {
  return libraryTopicParams("topics");
}

export async function generateMetadata({ params }: PageProps<"/topics/[category]/[topic]">) {
  const { category, topic } = await params;
  return libraryTopicMetadata("topics", category, topic);
}

export default async function TopicPage({ params }: PageProps<"/topics/[category]/[topic]">) {
  const { category, topic } = await params;
  return <LibraryTopicPage library="topics" categorySlug={category} topicSlug={topic} />;
}
