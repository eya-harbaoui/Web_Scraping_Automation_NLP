import React from 'react';
import styles from "./stylesdemo.css";
const DemoPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Website Demo</h1>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/your-video-id"
          title="Website Demo Video"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>
      <p>
        Welcome to our website! Watch the video above to learn more about how our website works and the benefits it offers. Feel free to explore the different features and functionalities we provide. If you have any questions, please don't hesitate to reach out to us.
      </p>
    </div>
  );
};

export default DemoPage;