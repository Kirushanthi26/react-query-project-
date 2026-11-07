import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./Services/api";
import { useState } from "react";
import PostDetailes, { type Post } from "./Components/PostDetailes";

const BlogHomePage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPosts(pageNumber),
  });

  const goToPage = (nextPage: number) => {
    setPageNumber(nextPage);
    setSelectedPost(null);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Blog Home Page</h1>
      {isLoading && (
        <div className="text-center text-blue-500 font-bold text-lg animate-pulse">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 font-bold text-lg">
          Error: {error.message}
        </div>
      )}
      <ul className="space-y-2 text-lg">
        {posts?.map((post) => (
          <li key={post.id}>
            <button
              type="button"
              onClick={() =>
                setSelectedPost((current) =>
                  current?.id === post.id ? null : post,
                )
              }
              className={`text-left w-full hover:underline ${
                selectedPost?.id === post.id
                  ? "text-sky-600 font-semibold"
                  : "text-blue-700"
              }`}
            >
              {post.title}
            </button>
          </li>
        ))}
      </ul>

      <nav
        className="flex items-center gap-2 justify-between mt-4"
        aria-label="Blog posts pagination"
      >
        <button
          type="button"
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber === 1 || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {pageNumber}</span>
        <button
          type="button"
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber === 10 || isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </nav>

      {selectedPost && (
        <>
          <hr className="my-6 border-gray-300" />
          <PostDetailes
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
            onTitleChange={(title) =>
              setSelectedPost((prev) => (prev ? { ...prev, title } : null))
            }
          />
        </>
      )}
    </div>
  );
};

export default BlogHomePage;
