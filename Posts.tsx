import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const Posts = () => {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts</p>;

  return (
    <ul>
      {data?.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default Posts;