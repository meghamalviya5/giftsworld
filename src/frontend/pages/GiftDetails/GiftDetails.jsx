import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import MaterialIcon from "@material/react-material-icon";
import "./GiftDetails.css";
import { GiftContext } from "../../contexts/GiftContext";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import CardPrice from "../../components/CardPrice/CardPrice";

const GiftDetails = () => {
  const { giftId } = useParams();
  const { filteredGiftList } = useContext(GiftContext);
  const { findInWishlist, addToWishlist } = useContext(CartWishlistContext);
  const { addToCart, findInCart } = useContext(CartWishlistContext);
  console.log("in giftdetails");

  //find gift by id
  const giftByID = filteredGiftList.find((gift) => gift._id === Number(giftId));
  const { _id, image, name, reviews, rating } = giftByID;

  return (
    <div className="single-card-container flex flex-center">
      <div className="single-card flex-center">
        <div className="single-card-left">
          <img src={image} className="single-card-img" alt="" />
        </div>
        <div className="single-card-right">
          <div className="single-card-title">
            <h3 className="single-card-title-header">{name}</h3>
            <span className="star-ratings">
              {rating}
              <i className="fa fa-star"></i>
            </span>
          </div>

          <span>({reviews} Reviews)</span>
          <CardPrice gift={giftByID} />
          <p className="paragraph-sm msg">
            <i className="fa fa-bolt" aria-hidden="true"></i> Hurry , Only Few
            Left !
          </p>
          <span className="tag-msg">
            <i className="fa fa-tag" aria-hidden="true"></i> Fastest Delivery
          </span>
          <span className="tag-msg">
            <i className="fa fa-tag" aria-hidden="true"></i> Inclusive of All
            Taxes
          </span>
          <span className="tag-msg">
            <i className="fa fa-tag" aria-hidden="true"></i> Cash On Delivery
            Available
          </span>

          <div className="action-button">
            {findInCart(giftByID._id) ? (
              <Link to="/cart" className="w-full">
                <button className="flex flex-col-gap-xs flex-center card-btn ">
                  <FontAwesomeIcon
                    className="fw-icon-cart"
                    icon={faCartShopping}
                    title="Cart"
                  />
                  <span>Go To Cart</span>
                </button>
              </Link>
            ) : (
              <button
                className="flex flex-col-gap-xs flex-center card-btn"
                onClick={() => addToCart(giftByID)}
              >
                <FontAwesomeIcon
                  className="fw-icon-cart"
                  icon={faCartShopping}
                  title="Cart"
                />
                Add To Cart
              </button>
            )}

            {findInWishlist(_id) ? (
              <Link to="/wishlist" className="w-full">
                <button className="flex flex-col-gap-xs flex-center card-btn">
                  <MaterialIcon icon="favorite" />
                  Go To Wishlist
                </button>
              </Link>
            ) : (
              <button
                className="flex flex-col-gap-xs flex-center card-btn"
                onClick={() => addToWishlist(giftByID)}
              >
                <MaterialIcon icon="favorite_border" />
                Add to Wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
