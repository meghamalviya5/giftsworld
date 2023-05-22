import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GiftContext } from "../../contexts/GiftContext";
import "./GiftList.css";
import Filters from "../../components/Filters/Filters";

const GiftList = () => {
  const { categoryId } = useParams();
  const { getGiftsByCategory, selectedGiftList } = useContext(GiftContext);

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
          {selectedGiftList?.map((gift) => (
            <div key={gift._id} className="gift-list-item">
              <img className="gift-image" src={gift.image} alt="" />
              <div className="gift-details">
                <p>{gift.name}</p>
                <b>&#x20B9; {gift.price}</b>
              </div>
              <button className="card-btn">Add To Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GiftList;
