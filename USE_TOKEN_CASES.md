### Access an API with useToken

#### Single request per Component works fine

```jsx
import React, { useEffect, useState } from 'react';
import { useToken } from '@auth0/auth0-react';

const Posts = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('https://api.example.com/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(await response.json());
    })();
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {posts.map((post, index) => {
        return <li key={index}>{post}</li>;
      })}
    </ul>
  );
};

export default Posts;
```

#### But, subsequent requests could use an expired token

Unless you remove all dependent keys from https://github.com/auth0/auth0-react/blob/use-token/src/use-token.tsx#L47

```jsx
import React, { useEffect, useState } from 'react';
import { useToken } from '@auth0/auth0-react';

const Posts = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.example.com/posts?page={page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(await response.json());
    })();
  }, [page]);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post}</li>;
        })}
      </ul>
      <a onClick={() => setPage(page + 1)}>Next page</a>
    </div>
  );
};

export default Posts;
```

#### And this case would be difficult

```jsx
import React, { useEffect, useState } from 'react';
import { useToken } from '@auth0/auth0-react';

const Posts = () => {
  const { token } = useToken();
  const [posts, setPosts] = useState(null);

  const updatePosts = async () => {
    const response = await fetch(`https://api.example.com/posts?page={page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setPosts(await response.json());
  };

  useEffect(() => {
    (async () => {
      await updatePosts();
    })();
  }, []);

  if (!posts) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {posts.map((post, index) => {
          return <li key={index}>{post}</li>;
        })}
      </ul>
      <a onClick={() => updatePosts()}>refresh</a>
    </div>
  );
};

export default Posts;
```

The simplest solution is to teach the user to call `getToken` just before using an API.
