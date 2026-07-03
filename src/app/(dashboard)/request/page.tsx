import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

const CATEGORY = "request";

export default function RequestPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-neutral-900">리퀘스트</h2>
      <PostForm category={CATEGORY} />
      <PostList category={CATEGORY} />
    </div>
  );
}
