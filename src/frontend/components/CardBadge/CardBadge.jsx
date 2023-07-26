import React, { useContext } from "react";
import MaterialIcon from "@material/react-material-icon";
import { CartWishlistContext } from "../../contexts/CartWishlistContext";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CardBadge = ({ gift }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const { addToWishlist, removeFromWishlist, wishlist } =
    useContext(CartWishlistContext);

  const handleAddToWishlist = (gift) => {
    if (token) {
      addToWishlist(gift);
    } else {
      navigate("/login", { state: { from: location } });
    }
  };

  const handleRemoveFromWishlist = (gift) => {
    if (token) {
      removeFromWishlist(gift._id);
    } else {
      toast.error("Log in to continue!");
    }
  };

  const isWishlisted = (itemId) => wishlist.find((item) => item._id === itemId);

  return (
    <span className="card-badge">
      {isWishlisted(gift._id) ? (
        <MaterialIcon
          icon="favorite"
          className="red-fav"
          onClick={() => handleRemoveFromWishlist(gift._id)}
        />
      ) : (
        <MaterialIcon
          icon="favorite_border"
          className="red-fav"
          onClick={() => handleAddToWishlist(gift)}
        />
      )}
    </span>
  );
};

export default CardBadge;
