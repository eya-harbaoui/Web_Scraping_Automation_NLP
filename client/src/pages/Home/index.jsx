import styles from "./styles.module.css";

function Home(userDetails) {
  const user = userDetails.user;
  const logout = () => {
    localStorage.removeItem( "token" );
    window.location.reload();
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>Web Scraper </h1>
        <button className={styles.btn} onClick={logout}>
          Log Out
        </button>
      </nav>
    </div>
    /*<div className={styles.container}>
      <h1 className={styles.heading}>Home</h1>
      <div className={styles.form_container}>
        <div className={styles.left}>
          <img className={styles.img} src="./images/profile.jpg" alt="login" />
        </div>
        <div className={styles.right}>
          <h2 className={styles.from_heading}>Profile</h2>
          <img
            src={user.picture}
            alt="profile"
            className={styles.profile_img}
          />
          <input
            type="text"
            defaultValue={user.name}
            className={styles.input}
            placeholder="UserName"
          />
          <input
            type="text"
            defaultValue={user.email}
            className={styles.input}
            placeholder="Email"
          />
           </div>
      </div>
    </div>*/
  );
}

export default Home;
