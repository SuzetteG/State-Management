import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';

type NewPost = {
  title: string;
  body: string;
};

const createPost = async (newPost: NewPost) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return response.data;
};

const AddPostForm = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { mutate, status, isSuccess, isError } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleAddPost = () => {
    mutate({ title, body });
    setTitle('');
    setBody('');
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />
      <button onClick={handleAddPost}>Add Post</button>
      {status === 'pending' && <p>Adding post...</p>}
      {isError && <p>Error adding post</p>}
      {isSuccess && <p>Post added!</p>}
    </div>
  );
};

export default AddPostForm;