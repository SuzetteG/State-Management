import React, { useState } from 'react';
import UserPosts from './UserPosts';

const App: React.FC = () => {
  const [userId, setUserId] = useState<number>(1);

  return (
    <div>
      <label>
        Enter User ID:{' '}
        <input
          type="number"
          value={userId}
          min={1}
          onChange={e => setUserId(Number(e.target.value))}
        />
      </label>
      <UserPosts userId={userId} />
    </div>
  );
};

export default App;