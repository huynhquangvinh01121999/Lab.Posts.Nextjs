import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

function Detail() {

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
    return (
        <div className={styles.container}>
            <Head>
                <title>LAB | Posts Nextjs</title>
                <meta name="description" content="LAB | Posts Nextjs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h2 className={styles.title}>
                    Detail Post ID: <a href="#" className='text-decoration-none'>{router.query.id}</a>
                </h2>

                <div className={styles.grid}>
                    <h2 className="text-capitalize block">{post.title}</h2>
                    <h4 className="text-capitalize lead">{post.body}</h4>
                </div>
                <Link href="/">
                    <button href='/' className='btn btn-primary'>Back To List</button>
                </Link>
            </main>
        </div>
    )
}

export default Detail