export async function fetchPosts(pageNum: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?limit=10&page=${pageNum}`,
  );
  return response.json();
}

export async function fetchComments(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
  );
  return response.json();
}

export async function deletePost(postId: number) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "DELETE",
    },
  );
  return response.json();
}

export async function updatePost(
  postId: number,
  updatedData: { title?: string; body?: string },
) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    },
  );
  return response.json();
}
