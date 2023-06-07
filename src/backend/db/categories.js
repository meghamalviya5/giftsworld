import { v4 as uuid } from "uuid";

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    displayName: "Birthday",
    categoryName: "birthday",
    image:
      "https://images.statusfacebook.com/profile_pictures/birthday/happy-birthday-profile-pictures-dp-for-whatsapp-facebook-02.png",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    displayName: "Anniversary",
    categoryName: "anniversary",
    image:
      "https://as2.ftcdn.net/v2/jpg/03/05/86/79/1000_F_305867937_mrezPLTDQgIZd4EoKxSgHWAYkcoFSqi4.jpg",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
  {
    _id: uuid(),
    displayName: "Unique Gifts",
    categoryName: "unique",
    image:
      "https://images.thequint.com/thequint%2F2020-12%2F083d3dc8-249d-4a1a-ad01-542f24771c35%2F1693710.jpg?auto=format%2Ccompress&fmt=webp&width=720",
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
  },
  {
    _id: uuid(),
    displayName: "New Arrivals",
    categoryName: "newArrival",
    image:
      "https://i.pinimg.com/736x/77/35/1e/77351e163f8f4c5b928383d9feaca7f7.jpg",
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    displayName: "Trending",
    categoryName: "trending",
    image:
      "https://www.chch.com/wp-content/uploads/2022/10/TrendingNowML_000010.png",
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
];
