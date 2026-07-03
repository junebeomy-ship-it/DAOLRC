import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

const CATEGORY = "seminar";

export default function SeminarPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-neutral-900">세미나</h2>
      <PostForm category={CATEGORY} />
      <PostList category={CATEGORY} />
    </div>
  );
}
