import React, { useRef } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";

const ExploreMenu = ({ category, setCategory }) => {
  const menuListRef = useRef(null);

  const scrollLeft = () => {
    menuListRef.current.scrollBy({
      left: -200, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    menuListRef.current.scrollBy({
      left: 200, // Adjust the scroll amount as needed
      behavior: "smooth",
    });
  };

  return (
    <div className="explore-Menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="scroll-buttons">
        <button onClick={scrollLeft} className="scroll-button">
          {"<"}
        </button>
        <button onClick={scrollRight} className="scroll-button">
          {">"}
        </button>
      </div>
      <div className="explore-menu-list" ref={menuListRef}>
        {menu_list.map((item, index) => (
          <div
            onClick={() =>
              setCategory((prev) =>
                prev === item.menu_name ? "All" : item.menu_name
              )
            }
            key={index}
            className="explore-menu-list-item"
          >
            <img
              className={category === item.menu_name ? "active" : ""}
              src={item.menu_image}
              alt=""
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
