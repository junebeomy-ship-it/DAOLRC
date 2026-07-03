import { getPosts } from "@/app/actions";

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function PostList({ category }: { category: string }) {
  const posts = await getPosts(category);

  if (posts.length === 0) {
    return <p className="py-8 text-center text-sm text-neutral-400">아직 등록된 글이 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {posts.map((post) => (
        <li key={post.id} className="rounded-lg border border-neutral-200 bg-white p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-neutral-900">
              {formatDateTime(post.occurred_at)}
            </span>
            <span className="shrink-0 text-xs text-neutral-400">{post.author_name}</span>
          </div>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
            <dt className="text-neutral-400">애널리스트</dt>
            <dd className="text-neutral-700">{post.analyst}</dd>
            {post.institution !== null && post.company !== null ? (
              <>
                <dt className="text-neutral-400">기관</dt>
                <dd className="text-neutral-700">{post.institution}</dd>
                <dt className="text-neutral-400">기업</dt>
                <dd className="text-neutral-700">{post.company}</dd>
              </>
            ) : (
              <>
                <dt className="text-neutral-400">대상자</dt>
                <dd className="text-neutral-700">{post.target}</dd>
              </>
            )}
          </dl>
        </li>
      ))}
    </ul>
  );
}
