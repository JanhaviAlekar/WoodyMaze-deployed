import React from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/userMenu';
const Orders = () => {
    return (
        <Layout title={"admin-create-category"}>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All orders</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders