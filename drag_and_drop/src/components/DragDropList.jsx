import React, { useRef, useCallback, memo, useReducer } from "react";

const DraggableItem = memo(({ item, index, handleDragStart, handleDragOver, handleDrop }) => {
  return (
    <li
      draggable
      onDragStart={() => handleDragStart(index)}
      onDragOver={handleDragOver}
      onDrop={() => handleDrop(index)}
      style={{
        padding: "0.6em 5.2em",
        margin: "5px",
        fontSize: "1em",
        fontWeight: 700,
        borderRadius: "50px",
        fontFamily: "inherit",
        color: "#171923",
        backgroundColor: "#47c7eb",
        cursor: "pointer",
        transition: "border-color 0.25s",
        animation: "pop-up 0.5s ease-in-out",
      }}
    >
      {item}
    </li>
  );
});

const listReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_ITEM":
      const updatedItems = [...state];
      const [draggedItem] = updatedItems.splice(action.payload.draggedIndex, 1);
      updatedItems.splice(action.payload.targetIndex, 0, draggedItem);
      return updatedItems;
    default:
      return state;
  }
};

function DragDropList() {
  const [items, dispatch] = useReducer(listReducer, ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  const draggedIndex = useRef(null);

  const handleDragStart = useCallback((index) => {
    draggedIndex.current = index;
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleDrop = useCallback((targetIndex) => {
    if (draggedIndex.current === null) return;
    dispatch({ type: "MOVE_ITEM", payload: { draggedIndex: draggedIndex.current, targetIndex } });
    draggedIndex.current = null;
  }, []);

  return (
    <>
      <h1>Drag and Drop List</h1>
      <ul data-testid="list">
        {items.map((item, index) => (
          <DraggableItem
            key={item}
            item={item}
            index={index}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
          />
        ))}
      </ul>
    </>
  );
}

export default DragDropList;
