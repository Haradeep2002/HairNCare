import { API } from "../config";

const ShowImage = ({ item, url }) => {
    return (
        <div className="product-img">
            <img className="mb-3" src={`${API}/${url}/photo/${item._id}`} alt={item.name} style={{ height: '80%', width: '90%', maxHeight: '150%', maxWidth: '150%' }}></img>
        </div>
    )
}

export default ShowImage