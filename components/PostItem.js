import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.css'

function PostItem({ post, handleRemovePost }) {
    return (
        <div
            className={styles.card}>
            <Link href={`/${post.id}`}>
                <div>
                    <h6 className="text-right text-muted">ID: {post.id}</h6>
                    <h2 className="text-capitalize">{post.title}</h2>
                    <p className="text-capitalize lead">{post.body}</p>
                </div>
            </Link>
            <div className="modal-footer">
                <Link href={`/update/${post.id}`}>
                    <button className="btn btn-warning">Update</button>
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => handleRemovePost(post.id)}>Remove</button>
            </div>
        </div>
    )
}

export default PostItem