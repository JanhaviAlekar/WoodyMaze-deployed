import React from 'react'
import Layout from '../components/layout/layout'

import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <Layout title={"OOPS! go back"}>
            <div className='pnf'>
                <h1 className='pnf-title'>404</h1>
                <h2 className='pnf-heading'>OOPS! Page Not Found</h2>
                <Link to='/' className='pnf-button'>
                    Go back
                </Link>
            </div>
        </Layout>
    )
}

export default PageNotFound