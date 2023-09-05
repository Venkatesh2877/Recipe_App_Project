import React, { useState, useEffect } from "react";
import API from "../Utils/index";
import Card from "../Components/Card";
import styles from "../Styles/home.module.css";
import cardStyles from "../Styles/card.module.css";

const Home = () => {
  const [input, setInput] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = `${API.ROOT_URL}/api/recipes/v2?type=public&q=${input}&app_id=${API.APP_ID}&app_key=${API.APP_KEY}
        `;
        const response = await fetch(url);
        const jsonData = await response.json();
        setRecipes(jsonData.hits);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipes();
  }, [input]);

  return (
    <div>
      <h1>Recipe Search</h1>
      <input
        className={styles.search}
        type="search"
        placeholder="Search a recipe"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <ul className={styles.list}>
        {recipes.map((recipe) => {
          console.log(recipe);
          return (
            <li className={cardStyles.badges}>
              <div className={cardStyles.badge}>
                <Card
                  image={recipe.recipe.image}
                  title={recipe.recipe.label}
                  url={recipe._links.self.href}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
