import React from 'react'
import {useQuery} from "react-query";

const ManageCSAShares = () => {
    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('http://localhost/wordpress/?rest_route=/wp/v2/posts').then(res =>
            res.json()
        )
    )
    let posts
    if (isLoading) {
        posts = []
        console.log("loading...")
    } else {
        posts = data.map(p => `<div>${p.title.rendered}</div>`)
    }
    return (
        <div className="manage-csa-shares">
            <div className="management-pane">
                <h2>Manage CSA Shares</h2>
                <div className="add-button">
                    <button>Add Location</button>
                </div>
                {posts ? posts : "loading"}
            </div>
        </div>
    )
}

export default ManageCSAShares