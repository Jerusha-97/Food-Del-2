import React, { useState } from "react";
import "./MenuSetup.css"; // Import CSS file for styling

const MenuSetup = () => {
  const [menuItems, setMenuItems] = useState([
    { name: "", count: 0, variations: [] },
    // Initial empty item
  ]);

  const handleMenuItemChange = (index, event) => {
    const { name, value } = event.target;
    const updatedItems = [...menuItems];
    updatedItems[index][name] = value;
    setMenuItems(updatedItems);
  };

  const handleAddMenuItem = () => {
    setMenuItems([...menuItems, { name: "", count: 0, variations: [] }]);
  };

  const handleRemoveMenuItem = (index) => {
    const updatedItems = [...menuItems];
    updatedItems.splice(index, 1);
    setMenuItems(updatedItems);
  };

  const handleCountChange = (index, event) => {
    const { value } = event.target;
    const updatedItems = [...menuItems];
    updatedItems[index].count = value;
    updatedItems[index].variations = new Array(parseInt(value)).fill("");
    setMenuItems(updatedItems);
  };

  const handleVariationChange = (index, varIndex, event) => {
    const { value } = event.target;
    const updatedItems = [...menuItems];
    updatedItems[index].variations[varIndex] = value;
    setMenuItems(updatedItems);
  };

  return (
    <div className="menu-setup container2 res-details">
      <h6>
        To add a new item to your menu, start by clicking the "Add Item(+)"
        button. This action will create a new entry where you can input the name
        of the item and specify how many types of this item are available in
        this category. For example, if you're adding a dish called "Pasta," you
        might specify that it's available in three variations: <br />
        <u>Spaghetti, Penne, and Fusilli</u>
      </h6>
      <br />
      {menuItems.map((menuItem, index) => (
        <div key={index} className="menu-item">
          <input
            type="text"
            name="name"
            value={menuItem.name}
            onChange={(event) => handleMenuItemChange(index, event)}
            placeholder="Item Name"
          />

          <input
            type="number"
            name="count"
            value={menuItem.count}
            onChange={(event) => handleCountChange(index, event)}
            placeholder="Count"
          />

          <div className="variations">
            {menuItem.variations.map((variation, varIndex) => (
              <input
                key={varIndex}
                type="text"
                value={variation}
                onChange={(event) =>
                  handleVariationChange(index, varIndex, event)
                }
                placeholder={`Variation ${varIndex + 1}`}
              />
            ))}
          </div>

          <button className="add-button" onClick={handleAddMenuItem}>
            +
          </button>
          {menuItems.length > 1 && (
            <button
              className="remove-button"
              onClick={() => handleRemoveMenuItem(index)}
            >
              −
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuSetup;
