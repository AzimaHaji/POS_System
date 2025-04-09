import React from 'react'

export default function Index() {
    return (
        <main>
            <div className="container-fluid px-4">
                <p className='text-right mt-3'><a style={{ textDecoration: "none" }} href="#">Home</a> / Demo</p>
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1" />
                        DataTable Example
                    </div>
                    <div className="card-body"></div>
                </div>
            </div>
        </main>
    )
}
