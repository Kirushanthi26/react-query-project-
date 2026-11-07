import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deletePost,
  fetchComments,
  updatePost,
} from "../Services/api";

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Comment = {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
};

type PostDetailesProps = {
  post: Post;
  onClose: () => void;
  onTitleChange: (title: string) => void;
};

const PostDetailes = ({ post, onClose, onTitleChange }: PostDetailesProps) => {
  const queryClient = useQueryClient();

  const { data: comments, isLoading: commentsLoading } = useQuery<Comment[]>({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      onClose();
    },
  });

  const updateMutation = useMutation({
    mutationFn: (title: string) => updatePost(post.id, { title }),
    onSuccess: (_data, newTitle) => {
      onTitleChange(newTitle);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  const handleUpdateTitle = () => {
    const newTitle = window.prompt("Enter new title", post.title);
    if (newTitle === null || newTitle.trim() === "") return;
    updateMutation.mutate(newTitle.trim());
  };

  return (
    <section className="mt-6 space-y-4">
      <h2 className="text-3xl font-bold text-sky-500">{post.title}</h2>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => deleteMutation.mutate()}
          disabled={deleteMutation.isPending}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:opacity-50"
        >
          {deleteMutation.isPending ? "Deleting..." : "Delete"}
        </button>
        <button
          type="button"
          onClick={handleUpdateTitle}
          disabled={updateMutation.isPending}
          className="px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50"
        >
          {updateMutation.isPending ? "Updating..." : "Update title"}
        </button>
      </div>

      <article className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {post.body}
        </p>
      </article>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Comments</h3>
        {commentsLoading && (
          <p className="text-gray-500 animate-pulse">Loading comments...</p>
        )}
        <ul className="space-y-3">
          {comments?.map((comment) => (
            <li
              key={comment.id}
              className="rounded-md border border-gray-200 p-3 bg-white"
            >
              <p className="font-medium text-gray-900">{comment.name}</p>
              <p className="text-sm text-gray-500">{comment.email}</p>
              <p className="mt-2 text-gray-700">{comment.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default PostDetailes;
