import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
import './gal.css'; 

const Gallery = () => {
  const [posts, setPosts] = useState([]);
  const [after, setAfter] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false); 

  const fetchData = async () => {
    try {
      
      setLoading(true);

      
      const response = await fetch(`https://www.reddit.com/r/memes.json?limit=1000&after=${after || ''}`);

      
      const data = await response.json();

      
      const extractedPosts = data.data.children.map((child) => {
        const post = {
          title: child.data.title,
          thumbnail: child.data.thumbnail,
          url: child.data.url,
        };
        return post;
      });

      
      setPosts((prevPosts) => [...prevPosts, ...extractedPosts]);
      setAfter(data.data.after);

     
      setHasMore(extractedPosts.length > 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      
      setLoading(false);
    }
  };

  useEffect(() => {
   
    fetchData();
  }, []); 

  return (
    <div className='container'>
      <div className='heading'>
        <h1>MEMES <span>GALLERY</span></h1>
      </div>

      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<ClipLoader color="#36D7B7" loading={loading} size={50} />} 
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="thumbnail-grid">
          {posts.map((post, index) => (
            <div key={index} className="grid-item">
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <img src={post.thumbnail} alt="THUMBNAIL" />
                <div className='title'>
                  <h4>{post.title}</h4>
                </div>
              </a>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Gallery;
