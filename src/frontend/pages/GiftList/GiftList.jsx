import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GiftContext } from "../../contexts/GiftContext";
import "./GiftList.css";
import Filters from "../../components/Filters/Filters";
import { CartContext } from "../../contexts/CartContext";

const GiftList = () => {
  const { categoryId } = useParams();
  const { getGiftsByCategory, filteredGiftList } = useContext(GiftContext);
  const { addToCart, cart } = useContext(CartContext);

  const findInCart = (itemId) =>
    cart.find((cartItem) => cartItem._id === itemId);

  useEffect(() => {
    getGiftsByCategory(categoryId);
    // console.log("after context call in useffect");
  }, []);

  return (
    <div className="filter-gifts">
      <div>
        <Filters />
      </div>
      <div className="gifts-show">
        <h2>Showing All Products</h2>
        <div className="gift-list">
          {filteredGiftList?.map((gift) => (
            <div key={gift._id} className="gift-list-item">
              <Link to={`/giftDetails/${gift._id}`}>
                <img className="gift-image" src={gift.image} alt="" />
                <div className="gift-details">
                  <p>{gift.name}</p>
                  <b>&#x20B9; {gift.price}</b>
                </div>
              </Link>
              {findInCart(gift._id) ? (
                <Link to="/cart">
                  <button className="card-btn">Go To Cart</button>
                </Link>
              ) : (
                <button className="card-btn" onClick={() => addToCart(gift)}>
                  Add To Cart
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;
