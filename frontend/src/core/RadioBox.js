import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0)
    const handleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }
    return prices.map((p, i) => (
        <div key={i}>
            <span style={{ color: "#001233" }}>rad</span><input type="radio" name={p} onChange={handleChange} value={`${p._id}`} className="mr-2 ml-4" ></input>
            <label className="form-check-label" style={{ color: '#EFE0CA' }} >{p.name}</label>
        </div>
    ))
}

export default RadioBox