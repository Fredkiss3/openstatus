import Link from "next/link";
import { allPosts } from "contentlayer/generated";

import { formatDate } from "@/lib/utils";

export default async function Post() {
  const posts = allPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <div className="grid gap-8">
      <h1 className="text-foreground font-cal text-4xl">Blog</h1>
      <div>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug}>
            <section>
              <p className="text-foreground font-cal text-2xl">{post.title}</p>
              <p className="text-muted-foreground">{post.description}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {post.author.name}
                <span className="text-muted-foreground/70 mx-1">&bull;</span>
                {formatDate(new Date(post.publishedAt))}
                <span className="text-muted-foreground/70 mx-1">&bull;</span>
                {post.readingTime}
              </p>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}
