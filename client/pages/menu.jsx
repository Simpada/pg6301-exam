import {useLoading} from "../useLoading";
import {useState} from "react";


function ItemEntry({item: {name, ingredients, price, category}}) {
    return <><h3>{name}</h3>
        <div>Ingredients: {ingredients.map(e => `${e}, `)}</div>
        <div>Price: {price}</div>
        <div>Category: {category}</div>
    </>
}

export function Menu({menu}) {


    const {category, setCategory} = useState("");
    const {categoryQuery, setCategoryQuery} = useState("");
    const {loading, error, data} = useLoading(

        menu
    );


    function handleSubmitQuery(e) {
        e.preventDefault();
        setCategory(categoryQuery);
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
                    Country:
                    <input
                        id="category-query"
                        value={categoryQuery}
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    />
                    <button>Filter</button>
                </label>
            </form>
        </div>

        {data.map((item) => (
            <ItemEntry key={item.name} item={item}/>
        ))}

    </div>;

}