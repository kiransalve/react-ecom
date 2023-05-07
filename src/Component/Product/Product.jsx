import React, { useEffect } from "react";
import {
    setProducts,
    setCategories,
    filterByCategory
} from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import "./Product.css";
import { addToCart } from "../../store/store";

const Product = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.filterProducts);
    const categories = useSelector((state) => state.products.categories);
    const selectedCategory = useSelector((state) => state.products.selectedCategory);

    useEffect(() => {
        const fetchProduct = async () => {
            const requests = await [
                fetch("https://fakestoreapi.com/products"),
                fetch("https://fakestoreapi.com/products/categories"),
            ];
            const responses = await Promise.all(requests);
            const data = await Promise.all(
                responses.map((response) => response.json())
            );
            dispatch(setProducts(data[0]));
            dispatch(setCategories(data[1]));
        };
        fetchProduct();
    }, [dispatch]);

    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }

    const handleCategoryChange = (e) => {
        dispatch(filterByCategory(e.target.value));
    };

    return (
        <>
            <div className="category">
                <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="selectCategory"
                >
                    <option value="">All Category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>

            <div className="products">
                {products.map((product) => (
                    <div className="product" >
                        <div className="product-content">
                            <div className="image">
                                <img src={product.image} alt={product.title} />
                            </div>
                            <div className="title">{product.title}</div>
                            <div className="price">Rs. {Math.floor(product.price)}</div>
                        </div>
                        <button className="addtocart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
