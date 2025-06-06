import ProductCard from "./ProductCard/ProductCard.tsx";
import {products} from "../datas/datas.tsx";

const ProductList = () => {
    return (
        <>
            <h1 style={{textAlign:"center"}}>Our shoes</h1>
            <div className={"cards-container"} style={{display:"grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "30px", margin: "0 50px"}}>
                {products.map(((product, index) =>
                <ProductCard key={index} product={product}></ProductCard>) )
                }
            </div>
        </>
    )
}

export default ProductList;