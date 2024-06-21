import React from "react";
import FoodDisplay from "../../../../components/FoodDisplay/FoodDisplay"
import ExploreMenu from "../../../../components/ExploreMenu/ExploreMenu"

const MenuList = () => {
  return <div>
    <h1>Menu List</h1>        
    <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
  </div>;
};

export default MenuList;
