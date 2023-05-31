import { useContext } from "react";
import { useParams } from "react-router-dom";
import { GiftContext } from "../../contexts/GiftContext";
import "./GiftDetails.css";

const GiftDetails = () => {
  const { giftId } = useParams();
  const { filteredGiftList } = useContext(GiftContext);
  console.log("in giftdetails");
  //find gift by id
  const giftByID = filteredGiftList.find((gift) => gift._id === Number(giftId));
  const { image, name, reviews, rating, price } = giftByID;

  return (
    <div className="gift-detail-container">
      <div className="">
        <img src={image} className="gift-detail-image" alt="" />
      </div>
      <div className="gift-info">
        <p>{name}</p>
        <span>{rating}</span>
        <span>({reviews} Reviews)</span>
        <p>&#x20B9; {price}</p>
        <div>
          <button>Add to Cart</button>
          <button>Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default GiftDetails;
