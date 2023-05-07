import { useDispatch, useSelector } from 'react-redux';
import { decreaseQuantity, increaseQuantity } from '../../store/store';
import "./Cart.css"

function Cart() {
    const cartItems = useSelector(state => state.cart.cartItem);

    const dispatch = useDispatch();

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total.toFixed(2);
    };

    const handleIncreaseQuantity = (id) => {
        dispatch(increaseQuantity(id));
    };

    const handleDecreaseQuantity = (id) => {

        dispatch(decreaseQuantity(id));
    };

    return (
        <div className="cart">
            <h2 className="cart-header">Cart</h2>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.title} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-price">Rs. {item.price}</p>
                                <div className="cart-item-quantity">
                                    <button onClick={() => handleDecreaseQuantity(item.id)} className='minus'>-</button>
                                    {item.quantity}
                                    <button onClick={() => handleIncreaseQuantity(item.id)} className='plus'>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">
                        <p>Total: Rs. {calculateTotal()}</p>
                        <button className="cart-checkout">Checkout</button>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Cart;

