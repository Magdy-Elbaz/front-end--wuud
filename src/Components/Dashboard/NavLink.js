import {
  faBoxesStacked,
  faBoxOpen,
  faSquarePlus,
  faTruckFast,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const link = [
  {
    name: "Users",
    path: "users",
    icon: faUsers,
    role: ["1995"],
  },
  {
    name: "Add User",
    path: "user/add",
    icon: faUserPlus,
    role: ["1995"],
  },
  {
    name: "Categories",
    path: "categories",
    icon: faBoxesStacked,
    role: ["1995", "1999"],
  },
  {
    name: "Add Category",
    path: "category/add",
    icon: faBoxOpen,
    role: ["1995", "1999"],
  },
  {
    name: "Products",
    path: "products",
    icon: faTruckFast,
    role: ["1995", "1999"],
  },
  {
    name: "Add Product",
    path: "product/add",
    icon: faSquarePlus,
    role: ["1995", "1999"],
  },
];
