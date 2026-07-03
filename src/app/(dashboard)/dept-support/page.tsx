import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";

const CATEGORY = "dept-support";

export default function DeptSupportPage() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-neutral-900">타부서 지원</h2>
      <PostForm category={CATEGORY} />
      <PostList category={CATEGORY} />
    </div>
  );
}
