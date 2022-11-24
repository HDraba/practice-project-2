import { useEffect, useState } from 'react';
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css';
import DUMMY_MEALS from './dummyMeals';
import MealItem from './MealItem';

type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
};

//don't forget to add .json
const FIREBASE_URL =
  'https://react-typescript-290e9-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(FIREBASE_URL);
      const data = await response.json();

      const loadedMeals: Meal[] = [];
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      console.log(loadedMeals);

      setMeals(loadedMeals);
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
