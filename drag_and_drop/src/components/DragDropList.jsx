import React, { useState, useRef } from "react";

function DragDropList() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
  ]);
  const draggedIndexRef = useRef(null);

  const handleDragStart = (index) => {
    draggedIndexRef.current = index;
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndexRef.current === null) return;

    const updatedItems = [...items];
    const [draggedItem] = updatedItems.splice(draggedIndexRef.current, 1);
    updatedItems.splice(index, 0, draggedItem);

    setItems(updatedItems);
    draggedIndexRef.current = null;
  };

  return (
    <>
      <h1>Drag and Drop List</h1>
      <ul data-testid="list">
        {items.map((item, index) => (
          <li
            key={item}
            data-testid={`item-${index}`}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            style={{
              padding: "10px",
              margin: "5px 0",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f9f9f9",
              cursor: "grab",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default DragDropList;
