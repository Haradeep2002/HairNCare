import {useState,useEffect} from 'react'
import Layout from './Layout'
import Card from './Card'
import { getCategories,getFilteredProducts } from './apiCore'
import Checkbox from './Checkbox'
import {prices} from  './fixedPrices'
import RadioBox from './RadioBox'

const Shop = () => {
    const [categories,setCategories] = useState([])
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    })
    const [error,setError] = useState(false)
    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [size,setSize] = useState(0)
    const [filteredResults,setFilteredResults] = useState([])
    const init = () => {
        getCategories().then(data => {
            if(data.error) {
                setError(data.error)
            }else{
                setCategories(data)
            }
        })
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip,limit,myFilters.filters)
    }, []);

    const loadFilteredResults = (newFilters) => {
        console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }
            else{
                console.log(data.data)
                setFilteredResults(data.data)
                setSize(data.size)
                setSkip(0)
            }
        }
        )
    }

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-warning mb-5">
                    Load more
                </button>
            )
        );
    };

    const handleFilters = (filters,filterBy) => {
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy==='price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)
    }
    //2 => 100-499
    //value=2
    //array=[100-499]
    const handlePrice = (value) =>{
        const data = prices
        let array = []
        for(let key in data){
            if(data[key]._id=== parseInt(value)){
                array=data[key].array
            }
        }
        return array
    }

    return(
        <Layout title="Shop Page" description="Ecommerce" className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter By categories</h4>
                    <ul>
                        <Checkbox categories={categories} handleFilters={filters => handleFilters(filters, "category")}></Checkbox>
                    </ul>
                    <h4>Filter By Price Range</h4>
                    <div>
                        <RadioBox prices={prices} handleFilters={filters => handleFilters(filters, "price")}></RadioBox>
                    </div>
                </div>
                <div className="col-8">
                    <h2 className="mb-4">
                        Products
                    </h2>
                    <div className='row'>
                        {filteredResults.map((product, i) => (
                            <Card key={i} product={product} />
                        ))}
                    </div>
                    <hr />
                    {loadMoreButton()}
                </div>
            </div>
      </Layout>
    )
}

export default Shop