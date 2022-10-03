import Head from 'next/head'
import { useEffect, useState } from 'react'
import AddNewModal from '../components/AddNewModal';
import PostItem from '../components/PostItem';
import styles from '../styles/Home.module.css'

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [isShowAddNewModal, setShowAddNewModal] = useState(false)
  const [isShowBackdrop, setShowBackdrop] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3000/api/posts');
      const data = await response.json();
      setPosts(data.reverse())
    }
    fetchPosts();
  }, [])

  const handleOpenModal = () => {
    setShowAddNewModal(true);
    setShowBackdrop(true);
  }

  const handleCloseModal = () => {
    setShowAddNewModal(false);
    setShowBackdrop(false);
  }

  const handleAddNewPost = async (newPost) => {
    const response = await fetch('http://localhost:3000/api/posts', {
      method: 'POST',
      body: JSON.stringify(newPost),
    });
    const data = await response.json();
    handleCloseModal();
    alert("Thêm mới thành công!")
    setPosts(data.reverse())
  }

  const handleRemovePost = async (id) => {
    const rawResponse = await fetch(`http://localhost:3000/api/posts?id=${id}`, {
      method: "DELETE"
    });
    const result = await rawResponse.json();
    var newPosts = posts.filter(x => x.id != id); // trả về mảng không chứa item có id trùng với id dc so sánh
    setPosts(newPosts)
    alert(result)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>LAB | Posts Nextjs</title>
        <meta name="description" content="LAB | Posts Nextjs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="#" className='text-decoration-none'>YOUR POSTS</a>
        </h1>
        <div style={{ width: "100%" }}>
          <button className="btn btn-primary float-right mb-3 mt-3" onClick={handleOpenModal}>
            + Add New Post
          </button>
        </div>
        <div className={styles.grid}>
          {
            posts.map(post => (
              <PostItem key={post.id} post={post} handleRemovePost={handleRemovePost} />
            ))
          }
        </div>
      </main>

      {/* Create new post */}
      <AddNewModal
        isShowAddNewModal={isShowAddNewModal}
        isShowBackdrop={isShowBackdrop}
        handleCloseModal={handleCloseModal}
        handleAddNewPost={handleAddNewPost} />
    </div >
  )
}

// FETCHING API
// sử dụng getStaticProps hoặc getServerSideProps : tương tự nhau
// export const getStaticProps = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   return {
//     props: { posts: data }
//   }
// }

// sử dụng getInitialProps
// Home.getInitialProps = async () => {
//   const response = await fetch('https://jsonplaceholder.typicode.com/posts');
//   const data = await response.json();
//   return {
//     posts: data
//   }
// };

// Sử dụng màu trong Bootstrap: https://levunguyen.com/laptrinhweb/2021/04/05/su-dung-mau-trong-bootstrap/
// Các tiện ích CSS cơ bản của Bootstrap: https://xuanthulab.net/cac-tien-ich-css-co-ban-cua-bootstrap.html