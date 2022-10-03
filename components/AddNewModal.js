import React, { useState } from 'react'

function AddNewModal({ isShowAddNewModal, isShowBackdrop, handleCloseModal, handleAddNewPost }) {
    const [newPost, setNewPost] = useState({})
    return (
        <>
            <div className="modal" role="dialog" style={{ display: isShowAddNewModal ? "block" : "none" }}>
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title text-center">Add New Post</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="col-form-label">User Id:</label>
                                    <input className="form-control"
                                        name='userId'
                                        type="text"
                                        onChange={(e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Title:</label>
                                    <input className="form-control"
                                        name='title'
                                        type="text"
                                        onChange={(e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="col-form-label">Description:</label>
                                    <input className="form-control"
                                        name='body'
                                        type="text"
                                        onChange={(e) => setNewPost({ ...newPost, [e.target.name]: e.target.value })} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={() => handleAddNewPost(newPost)}>Add Post</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShowBackdrop && (<div className="modal-backdrop fade show"></div>)}
        </>
    )
}

export default AddNewModal