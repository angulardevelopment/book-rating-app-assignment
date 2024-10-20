import React, { useState } from "react";
import styles from "./NavBar.module.css"; // Import CSS module

const NavBar = () => {
  // State to toggle menu

  return (
    <div className={styles.navContainer}>
      <nav className={`navbar navbar-expand-lg navbar-light sticky-top`}>
        <a class="navbar-brand " href="#" styles={{ fontSize: "24px" }}>
          Book Rating App
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav mr-auto ml-auto mt-2 mt-lg-0">
            <li class="nav-item active">
              <a className={`nav-link  ${styles.button}`} href="#">
                Home
              </a>
            </li>
            <li class="nav-item active">
              <a className={`nav-link  ${styles.button}`} href="#">
                Your Books
              </a>
            </li>
            <li class="nav-item active">
              <a className={`nav-link  ${styles.button}`} href="#">
                Add Books
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
            />
            <button
              class="btn  my-2 my-sm-0"
              type="submit"
              style={{ border: "1px solid black" }}
            >
              Search
            </button>
            <div class="nav-item active ">
              <button
                className={`nav-link  ${styles.button}`}
                href="#"
                style={{ color: "black" }}
              >
                Login/Sign up
              </button>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

// <nav className={styles.navbar}>
//   <div className={styles.logo}>PlantWorld</div>

//   {/* Toggle Button for Mobile */}
//   <div className={styles.hamburger} onClick={toggleMenu}>
//     <div className={isOpen ? styles.barOpen : styles.bar}></div>
//     <div className={isOpen ? styles.barOpen : styles.bar}></div>
//     <div className={isOpen ? styles.barOpen : styles.bar}></div>
//   </div>

//   {/* Links Section */}
//   <ul className={`${styles.navLinks} ${isOpen ? styles.active : ""}`}>
//     <li>
//       <a href="#home">HOME</a>
//     </li>
//     <li>
//       <a href="#shop">MY BOOKS</a>
//     </li>
//     <li>
//       <a href="#about">ADD BOOKS</a>
//     </li>
//     <li>
//       <form class="form-inline my-2 my-lg-0">
//         <input
//           class="form-control mr-sm-2"
//           type="search"
//           placeholder="Search"
//         />
//         <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
//           Search
//         </button>
//       </form>
//     </li>
//   </ul>

//   {/* User Icon */}
//   <div className={styles.userIcon}>
//     <img src="path-to-your-icon/user-icon.png" alt="User Icon" />
//   </div>
// </nav>
