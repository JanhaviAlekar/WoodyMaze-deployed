import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router';
const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/v1/product/search/${values.keywords}`)
            setValues({ ...values, results: data })
            navigate('/search');
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <form className="d-flex" onSubmit={handleSubmit}>
                        <input className="form-control "
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={values.keywords}
                            onChange={(e) => { setValues({ ...values, keywords: e.target.value }) }}
                        />
                        <button className="btn success search"
                            type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </div>
    )
}

export default SearchInput