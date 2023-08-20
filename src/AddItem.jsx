import React from "react";
import { FaPlus} from 'react-icons/fa'
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit, addNewItem }) => {
  const inputRef = useRef()
  return (
    <form className="addForm" onSubmit={(e) =>handleSubmit(e)}>
        <label htmlFor="addItem"> Add Item</label>
        <input 
            ref={inputRef}
            autoFocus
            type="text" 
            name="add item" 
            id="addItem"  
            required 
            placeholder="Add Item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}

        />
        <button type="submit"
          onClick={() => inputRef.current.focus()}
          aria-label="Add Item">
            <FaPlus />
        </button>
    </form>
  )
};

export default AddItem;
