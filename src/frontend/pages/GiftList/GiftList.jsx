import { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MaterialIcon from "@material/react-material-icon";
import Spinner from "../../components/Spinner/Spinner";
import { ToastContainer } from "react-toastify";

import { GiftContext } from "../../contexts/GiftContext";
import "./GiftList.css";
import Filters from "../../components/Filters/Filters";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import CartButton from "../../components/CartButton/CartButton";
import CardBadge from "../../components/CardBadge/CardBadge";
import CardPrice from "../../components/CardPrice/CardPrice";

const GiftList = () => {
  const { categoryId } = useParams();
  const {
    getGiftsByCategory,
    filteredGiftList,
    isLoading,
    setIsLoading,
    error,
  } = useContext(GiftContext);

  useEffect(() => {
    console.log("isLoading: ", isLoading);
    window.scrollTo(0, 0);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    getGiftsByCategory(categoryId);
  }, []);

  return (
    <div className="filter-gifts">
      <div>
        <Filters />
      </div>
      {filteredGiftList?.length > 0 ? (
        <div className="gifts-show">
          <div className="gifts-head">
            <h3>Showing All Products</h3>
            <span>( Showing {filteredGiftList.length} Products )</span>
          </div>
          <div className="gift-list">
            {filteredGiftList?.map((gift) => (
              <div key={gift._id} className="gift-list-item">
                <div className="flex flex-column">
                  <div className="card-header">
                    <div>
                      <Link to={`/giftDetails/${gift._id}`}>
                        <img
                          className="gift-image"
                          src={gift.image}
                          alt="gift-image"
                        />
                      </Link>
                      <CardBadge gift={gift} />
                    </div>
                  </div>
                  <div>
                    <Link to={`/giftDetails/${gift._id}`}>
                      <div className="gift-details">
                        <p className="gift-name">{gift.name}</p>
                      </div>
                    </Link>
                  </div>
                  <CardPrice gift={gift} />
                </div>
                <CartButton gift={gift} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="fw-bold txt-m pt-xl pl-xl">Product Not Found!!</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default GiftList;
