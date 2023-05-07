import { createSlice, configureStore } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        filterProducts: [],
        categories: [],
        selectedCategory: "",
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
            state.filterProducts = action.payload;
        },

        setCategories(state, action) {
            state.categories = action.payload;
        },

        filterByCategory(state, action) {
            const category = action.payload;
            state.selectedCategory = category;
            if (category === "") {
                state.filterProducts = state.products;
            } else {
                state.filterProducts = state.products.filter(
                    (product) => product.category === category
                );
            }
        },
    },
});

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: [],
    },
    reducers: {
        addToCart(state, action) {
            const product = action.payload
            const existingProductIndex = state.cartItem.findIndex((item) => item.id === product.id);
            if (existingProductIndex >= 0) {
                state.cartItem[existingProductIndex].quantity++;
            } else {
                state.cartItem.push({ ...product, quantity: 1 })
            }
        },
        removeCartItem: (state, action) => {
            const itemUid = action.payload;
            const existingItem = state.cartItem.find((item) => item.uid === itemUid);
            if (existingItem.quantity === 1) {
                state.cartItem = state.items.filter((item) => item.uid !== itemUid);
            } else {
                existingItem.quantity--;
            }
        },
        replaceCart: (state, action) => {
            state.cartItem = action.payload;
        },
        increaseQuantity(state, action) {
            const id = action.payload;
            const item = state.cartItem.find((item) => item.id === id);
            if (item) {
                item.quantity++;
            }
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const item = state.cartItem.find((item) => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
            } else {
                state.cartItem = state.cartItem.filter((item) => item.id !== id);
            }
        },
    },
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        token: localStorage.getItem("token") ?? "",
        emailId: localStorage.getItem("emailId") ?? "",
        isLoggedIn: false,
    },
    reducers: {
        login: (state, action) => {
            state.emailId = action.payload?.email ?? "";
            state.token = action.payload?.idToken ?? "";
            state.isLoggedIn = true
            localStorage.setItem("token", JSON.stringify(state.token));
            localStorage.setItem("emailId", JSON.stringify(state.emailId));
        },
        logout: (state, action) => {
            state.token = "";
            state.isLoggedIn = false;
            localStorage.removeItem("token");
            localStorage.removeItem("emailId");
        },
    },
});

export const { setProducts, setCategories, filterByCategory, filterByRating } = productSlice.actions;
export const { addToCart, increaseQuantity, decreaseQuantity, removeCartItem, replaceCart } = cartSlice.actions;
export const { login, logout } = userSlice.actions;

const store = configureStore({
    reducer: {
        products: productSlice.reducer, // we access data by this name in useSelector.initialState
        cart: cartSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
