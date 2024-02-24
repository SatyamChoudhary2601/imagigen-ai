import { useState } from "react";
import axios from "axios";
import styles from "./ImageGeneration.module.css";
// https://n3967h.csb.app/
const URL = "https://api.openai.com/v1/images/generations";
const ImageGeneration = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const getImage = async () => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
        "User-Agent": "Chrome",
      },
    };
    try {
      const res = await axios.post(
        URL,
        {
          prompt,
          num_images: 1,
          size: "1024x1024",
        },
        config
      );
      if (res.status === 200) {
        setData(res.data.data[0].url);
        setPrompt("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>ImagiGen.ai</h1>
        <p>Unleashing Visual Imagination</p>
        <div className={styles.imageContainer}>
          <img src={data} className={styles.img} />
          {!data && <p className={styles.noImage}>Generate an image</p>}
          {loading && <div className={styles.loading}>Loading...</div>}
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="What's in your mind!"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button className={styles.btn} onClick={getImage} disabled={loading}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ImageGeneration;
// https://api.openai.com/v1/images/generations
// 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
// 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
// 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
