import {useLoading} from "../useLoading";
import React, {useContext, useState} from "react";
import {RestaurantApiContext} from "../restaurantApiContext";


function ItemEntry({item: {name, ingredients, price, category}}) {
    return <><h3>{name}</h3>
        <div>Ingredients: {ingredients.map(e => `${e}, `)}</div>
        <div>Price: {price}</div>
        <div>Category: {category}</div>
    </>
}

export function Menu() {

    const {menu} = useContext(RestaurantApiContext)
    const [category, setCategory] = useState("");
    const [categoryQuery, setCategoryQuery] = useState("");
    const [price, setPrice] = useState("");
    const [priceQuery, setPriceQuery] = useState("");
    const {loading, error, data} = useLoading(
        async () => await menu({category, price}),
        [category, price]
    );


    function handleSubmitQuery(e) {
        e.preventDefault();
        setCategory(categoryQuery);
        setPrice(priceQuery);
    }


    if (loading){
        return <div>Loading...</div>
    }
    if (error) {
        return <div>
            <h1>ERROR</h1>
            <div id="error-text">{error.toString()}</div>
        </div>
    }

    return <div>
        <h1> The Grand Menu </h1>

        <div>
            <form onSubmit={handleSubmitQuery}>
                <label>
                    Category:
                    <input
                        id="category-query"
                        value={categoryQuery}
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    />
                </label>
                <br/>
                <label>
                    Price:
                    <input
                        id="price-query"
                        onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }}
                        value={priceQuery}
                        onChange={(e) => setPriceQuery(e.target.value)}
                    />
                </label>
                <br/>
                <button>Filter</button>
            </form>
        </div>

        {data.map((item) => (
            <ItemEntry key={item.name} item={item}/>
        ))}

    </div>;

}