import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./styles.module.css";



const Upload = () => {
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");


  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:8080/api/upload",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.addItems}>
        <input
          type="text"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="file" ref={fileInputRef} />
        <button onClick={addItem}>Add</button>
      </div>
    </div>
  );
};

export default Upload;
