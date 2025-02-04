import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Create the new item object
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };

    // Send a POST request to add the new item
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add item");
        }
        return response.json();
      })
      .then((newItem) => {
        // Call the onAddItem callback to update the state in ShoppingList
        onAddItem(newItem);

        // Reset the form fields
        setName("");
        setCategory("Produce");
      })
      .catch((error) => console.error("Error adding item:", error));
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item name"
        />
      </label>

      <label>
        Category:
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Produce">Produce</option>
          <option value="Dairy">Dairy</option>
          <option value="Dessert">Dessert</option>
        </select>
      </label>

      <button type="submit">Add to List</button>
    </form>
  );
}

export default ItemForm;