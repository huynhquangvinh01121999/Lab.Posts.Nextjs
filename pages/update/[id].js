import Head from 'next/head';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import styles from '../../styles/Home.module.css'

function Updated() {

    const router = useRouter();

    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchDetail = async () => {
            const response = await fetch(`http://localhost:3000/api/posts/detail?id=${router.query.id}`);
            const data = await response.json();
            setPost(data);
        }
        fetchDetail();
    }, [])

    const handleUpdatePost = async () => {
        const rawResponse = await fetch('http://localhost:3000/api/posts', {
            method: 'PUT',
            body: JSON.stringify(post),
        });
        const result = await rawResponse.json();
        alert(result)
        Router.back();
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>LAB | Posts Nextjs</title>
                <meta name="description" content="LAB | Posts Nextjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h3 className={styles.title} style={{ fontSize: "26px", marginBottom: "10px" }}>
                    Edit your post Id {router.query.id}
                </h3>
                <div className="form-group">
                    <label className="col-form-label">User Id:</label>
                    <input className="form-control"
                        type="text"
                        value={post.userId}
                        disabled={true} />
                </div>
                <div className="form-group">
                    <label className="col-form-label">Title:</label>
                    <input className="form-control"
                        name='title'
                        type="text" value={post.title}
                        onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })} />
                </div>
                <div className="form-group">
                    <label className="col-form-label">Description:</label>
                    <textarea className="form-control"
                        name='body'
                        type="text"
                        value={post.body}
                        onChange={(e) => setPost({ ...post, [e.target.name]: e.target.value })} ></textarea>
                </div>
                <div className="modal-footer">
                    <button type="submit" className="btn btn-primary" onClick={handleUpdatePost}>Update Post</button>
                    <button type="button" className="btn btn-secondary" onClick={() => Router.back()}>Cancel</button>
                </div>
            </main>
        </div>
    )
}

export default Updated