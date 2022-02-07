import { useEffect, useState } from "react"
import { getCategories } from "./apiCore"
import { list } from "./apiCore"
import Card from "./Card"
const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: [],
        searched: false
    })

    const { categories, category, search, results, searched } = data

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setData({
                    ...data,
                    categories: data
                })
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    const handleChange = (name) => event => {
        event.preventDefault()
        setData({
            ...data,
            [name]: event.target.value, searched: false
        })

    }

    const searchData = () => {
        // console.log(search,category)
        if (search) {
            list({ search: search || undefined, category: category })
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    }
                    else {
                        setData({
                            ...data,
                            results: response,
                            searched: true
                        })
                    }
                })
        }
    }
    const searchSubmit = (event) => {
        event.preventDefault()
        searchData()
    }

    const searchedProducts = (results = []) => {
        return (
            <div>
                <h2 className="mt-4 mb-4 bg-success text-white">
                    {searchMessage(searched, results)}
                </h2>
                <div className="row">
                    {results.map((product, i) => (
                        <div key={i} className="col-4 mb-3">
                            <Card key={i} product={product} />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const searchMessage = (searched, results) => {
        if (searched && results.length > 0) {
            return `Found ${results.length} products`;
        }
        if (searched && results.length < 1) {
            return `No products found`;
        }
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn" style={{ marginTop: '5px' }} onChange={handleChange('category')}>
                            <option value="All">Select Category</option>
                            {categories.map((c, i) => (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <input type="search" className="form-control" style={{ marginLeft: '10px' }} onChange={handleChange('search')} placeholder="Search By Name"></input>
                </div>
                <div className="btn input-group-append" >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )
    return (
        <div className="row">
            <div className="container">
                {searchForm()}
            </div>
            <div className="container-fluid mb-3">
                {searchedProducts(results)}
            </div>
            <hr></hr>
            {/* {JSON.stringify(results)} */}
        </div>
    )
}

export default Search