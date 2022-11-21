import {useLoading} from "../useLoading";


function ItemEntry({item: {name, ingredients, price}}) {
    return <><h3>{name}</h3>
        <div>Ingredients: {ingredients.map(e => `${e}, `)}</div>
        <div>Price: {price}</div>
    </>
}

export function Menu({menu}) {

    const {loading, error, data} = useLoading(menu);

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

        {data.map((item) => (
            <ItemEntry key={item.name} item={item}/>
        ))}

    </div>;

}