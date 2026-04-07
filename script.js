body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* NAVBAR */
.navbar {
  background: #111;
  color: white;
  position: fixed;
  width: 100%;
}

.nav-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.menu a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}

.logo {
  font-weight: bold;
}

.btn {
  background: #4f46e5;
  padding: 8px 15px;
  border-radius: 5px;
  color: white;
}

.hamburger {
  display: none;
  cursor: pointer;
}

/* HERO */
.hero {
  height: 100vh;
  background: #1e293b;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
}

/* SECTION */
.section {
  padding: 80px 20px;
}

.container {
  max-width: 1000px;
  margin: auto;
}

.bg {
  background: #f1f5f9;
}

.center {
  text-align: center;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.card {
  background: white;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* FOOTER */
footer {
  text-align: center;
  padding: 20px;
  background: #111;
  color: white;
}

/* RESPONSIVE */
@media(max-width:768px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .menu {
    display: none;
    flex-direction: column;
  }

  .menu.active {
    display: flex;
  }

  .hamburger {
    display: block;
  }
}
