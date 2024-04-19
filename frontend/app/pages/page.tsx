import { FC, useState, useEffect } from 'react';

type Post = {
    id: number;
    title: string;
};

async function getPost() {
    const res = await fetch('http://localhost:3000/posts');

    if (!res.ok) {
        throw new Error('Failed to fetch Post');
    }

    return res.json();
}

const Home: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const fetchedPosts = await getPost();
                setPosts(fetchedPosts);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch posts');
                setLoading(false);
            }
        }

        fetchPosts();
    }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="m-4">
            <h1 className="text-4xl mb-4 underline">Post List</h1>
            {posts.map((post) => (
                <p className="mb-1" key={post.id}>
                    {post.title}
                </p>
            ))}
        </div>
    );
};

export default Home;