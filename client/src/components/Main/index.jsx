import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Image from "./assets/logo.png";
import upload from "./assets/add.png";

const base_url = process.env.base_urlL;

const Main = () => {
  const [search, setSearch] = useState("");
  const [images, setimages] = useState([]);
  const [obj, setObj] = useState({});

  useEffect(() => {
		const getImages = async () => {
			try {
				const url = `${base_url}?search=${search}`;
				const { data } = await axios.get(url);
				setObj(data);
			} catch (err) {
				console.log(err);
			}
		};

		getImages();
	}, [search]);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    const response = await axios.get("http://localhost:8080/files");
    setimages(response.data);
  };

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/files/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file.png";
      //link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


  return (
    <>
    <div className={styles.main_container}>
			<nav className={styles.navbar}>
        <div className={styles.logo}>
          <img  className={styles.logo_nav} src={Image} width={80} />
        </div>

        <form>
        <input  type="text" placeholder="Search...." />
        <button type="submit" >Search{(search) => setSearch(search)}</button>
        </form>
				<button className={styles.button_logout} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>

    <div className={styles.container}>
      <div className={styles.columns}>
        {images && images.map((image) => (
          <div className={styles.column} key={image._id}>
            <div className={styles.card}>
              <div className={styles.card_image}>
                <figure className={styles.image}>
                  <img src={image.url}/>
                </figure>
              </div>
              <div className={styles.card_content}>
                <div className={styles.media}>
                  <div className={styles.media_content}>
                    <p className={styles.tittle}>{image.title}</p>
                  </div>
                </div>
                <button onClick={() => downloadFile(image._id)}>
                Download File
              </button>
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    <Link to="/upload">
    <button className={styles.floating_button} onclick="handleButtonClick()">
      <img src={upload} />
    </button>
    </Link>
    
    
    </>

    
  );
};

export default Main;
