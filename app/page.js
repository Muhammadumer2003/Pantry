"use client"
import Image from "next/image";
import {collection, addDoc, query, onSnapshot, deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Db } from "./firebase";

export default function Home() {
  const [Items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({name: "", quantity: ""});
  const [isEditing, setIsEditing] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Add items
  const addItems = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.quantity !== "") {
      if (isEditing) {
        await updateDoc(doc(Db, 'items', currentItemId), {
          name: newItem.name.trim(),
          quantity: newItem.quantity,
        });
        setIsEditing(false);
        setCurrentItemId(null);
      } else {
        await addDoc(collection(Db, 'items'), {
          name: newItem.name.trim(),
          quantity: newItem.quantity,
        });
      }
      setNewItem({name: "", quantity: ""});
    }
  };

  // Read items
  useEffect(() => {
    const q = query(collection(Db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id});
      });
      setItems(itemsArr);
    });

    return () => unsubscribe();
  }, []);

  // Delete items
  const deleteItems = async (id) => {
    await deleteDoc(doc(Db, 'items', id));
  };

  // Edit items
  const editItems = (item) => {
    setNewItem({name: item.name, quantity: item.quantity});
    setIsEditing(true);
    setCurrentItemId(item.id);
  };

  // Filter items based on search query
  const filteredItems = Items.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="flex justify-center pt-[5%]">
          <h1 className="text-3xl font-bold">Pantry App</h1>
        </div>

        <div className="pt-[5%]">
          <form className="flex justify-center gap-6 text-black">
            <input 
              type="text"  
              placeholder="Enter Items" 
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              className="py-3 w-1/4 rounded text-left pl-6"
            />
            <input 
              type="number" 
              placeholder="Enter quantity"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
              className="border py-4 rounded pl-6"
            />
            <button 
              type="submit" 
              onClick={addItems}
              className="px-3 py-2 bg-slate-500 rounded-lg text-black font-bold hover:bg-slate-300"
            >
              {isEditing ? "Update Item" : "Add Item"}
            </button>
          </form>
        </div>

        <div className="pt-[5%]">
          <form className="flex justify-center gap-6 text-black">
            <input 
              type="text"  
              placeholder="Search Items" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="py-3 w-1/4 rounded text-left pl-6"
            />
          </form>
        </div>

        <div className="mt-[5%] flex justify-center">
          <div className="bg-slate-900 w-6/12 p-6 rounded-lg">
            <ul className="flex-col">
              {filteredItems.map((e, index) => (
                <li key={index}>
                  <div className="flex justify-around mb-4">
                    <h1>{e.name}</h1>
                    <p>{e.quantity}</p>
                
                      <button 
                        onClick={() => deleteItems(e.id)} 
                        className="px-3  bg-red-500 rounded-lg text-white font-bold hover:bg-red-400"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => editItems(e)} 
                        className="px-3  bg-blue-500 rounded-lg text-white font-bold hover:bg-blue-400"
                      >
                        Edit
                      </button>
                    </div>
               
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
