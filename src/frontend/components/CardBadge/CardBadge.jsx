import React, { useContext } from "react";
import MaterialIcon from "@material/react-material-icon";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";

const CardBadge = ({ gift }) => {
  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(CartWishlistContext);

  const isWishlisted = (itemId) => wishlist.find((item) => item._id === itemId);

  return (
    <span className="card-badge">
      {isWishlisted(gift._id) ? (
        <MaterialIcon
          icon="favorite"
          className="red-fav"
          onClick={() => removeFromWishlist(gift._id)}
        />
      ) : (
        <MaterialIcon
          icon="favorite_border"
          className="red-fav"
          onClick={() => addToWishlist(gift)}
        />
      )}
    </span>
  );
};

export default CardBadge;
