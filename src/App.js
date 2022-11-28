import './App.css';
import React from 'react';
import { useState, useEffect } from "react";
import { Card, Space, Button } from 'antd';
import fruitsData from "./fruit.json";
import { Checkbox, Radio} from 'antd';

const onChange = (checkedValues) => {
  console.log('checked = ', checkedValues);
};
const { Meta } = Card;
function App() {
  const[cart, setCart] = useState(new Map()); 
  const[cartTotal, setTotal] = useState(0);
  const season = ["All", "summer", "fall", "winter", "spring"];
  const type = ["All", "berry", "tropical", "other"];
  const sort = ["Default", "Price"];
  function getFruits() {
    const fruitsList = fruitsData;
    return fruitsList;
  }
  
  function filterSeason(fruits, season) {
    let filteredFruits = fruits.filter(item => item.season === season);
    return filteredFruits;
  }

  function filterType(fruits, type) {
    let filteredFruits = fruits.filter(fruit => fruit.type === type);
    return filteredFruits;
  }


  const [filterBySeason, setSeasonFilter] = useState(null)
  const [filterByType, setTypeFilter] = useState(null)
  const [filteredFruits, setFilters] = useState(getFruits());
  useEffect(() => {
    const seasonFiltered = returnSeasonFiltered(getFruits());
    const typeFiltered = returnTypeFiltered(seasonFiltered);
    setFilters(typeFiltered)
  }, [filterBySeason, filterByType]);

  function handleSeasons(e) {
    let typeSeason = e.target.value;
    setSeasonFilter(typeSeason);
  }
  function handleType(e) {
    let type = e.target.value;
    setTypeFilter(type);
  }

  function returnSeasonFiltered(fruits) {
    let filtered = [];
    if (filterBySeason == null) {
      return fruits;
    }
    filterBySeason !== "All"
        ? filtered = filterSeason(fruits, filterBySeason)
        : filtered = fruits
      console.log(filterBySeason)
      console.log(filtered)
      return filtered;
  }
  function returnTypeFiltered(fruits) {
    let filtered = [];
    if (filterByType == null) {
      return fruits;
    }
    filterByType !== "All"
        ? filtered = filterType(fruits, filterByType)
        : filtered = fruits
      console.log(filterByType)
      console.log(filtered)
      return filtered;
  }

  // const [filterBySeason, setSeasonFilter] = useState(null)
  // const [filterByType, setTypeFilter] = useState(null)
  // useEffect(() => {
  //   setSeasonFilter(getFruits());
  // }, []);
  // useEffect(() => {
  //   setTypeFilter(getFruits());
  // }, []);

  // function handleSeasons(e) {
  //   let typeSeason = e.target.value;
  //   console.log(typeSeason)
  //   typeSeason !== "All"
  //     ? setSeasonFilter(filterSeason(typeSeason))
  //     : setSeasonFilter(getFruits());
  //   console.log(filterBySeason)
  //   return filterBySeason;
  // }

  // function handleType(e) {
  //   let type = e.target.value;
  //   console.log(type)
  //   type !== "All"
  //     ? setTypeFilter(filterType(type))
  //     : setTypeFilter(getFruits());
  //   console.log(filterByType)
  //   return filterByType;
  // }

  
  const fruits = filteredFruits && filteredFruits.map((item) => (
    <Card
    style={{
      width: 200,
      margin: 20,
      padding: 0,
    }}
    cover={
      <img
        alt="example"
        src={item.image}
      />
    }
  >
    <Meta
      title={item.name}
    />
    <p>Price: {item.price} </p>
    <p>Season: {item.season} </p> 
    <p>Type: {item.type} </p> 
    <Button onClick={() => addToCart(item)}>Add or Remove</Button>
    </Card>
    ));

  const addToCart = (item) => {
    if (cart.has(item.name)) {
      cart.delete(item.name)
      setTotal(cartTotal - item.price);
    }
    else {
      setCart(cart.set(item.name, item.price));
      setTotal(cartTotal + item.price); 
    }
    console.log(cart)
    };

    const [value, setValue] = useState(1);
    const onChange = (e) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };


  return (
    <div className="App">
      <header className="App-header">
        <h1> Fruit Market</h1>
      </header>
      <div id="body">
        <div id="filters">
        <h2>Filters</h2> 
          <h3> Sort by </h3>
          {sort &&
          sort.map((s, index) => (
            <div>
              <div>
              <input type="radio" id={s} name="sort" value={s} onClick={handleType}/>
              <label for={s}>{s}</label>
            </div>
            </div>
          ))}

          <h3>Seasons</h3>
          {season &&
          season.map((s, index) => (
            <div>
              <input type="radio" id={s} name="season" value={s} onClick={handleSeasons}/>
              <label for={s}>{s}</label>
            </div>
          ))}
    
          <h3>Type of Fruit</h3>
          {type &&
          type.map((s, index) => (
            <div>
              <div>
              <input type="radio" id={s} name="type" value={s} onClick={handleType}/>
              <label for={s}>{s}</label>
            </div>
            </div>
          ))}
        </div>
        <div id="grid"> 
          <Space wrap> 
            {fruits}
          </Space>
        </div>
      </div> 
      <div id="cart">
        <h2>Cart</h2>
        {
          Array.from(cart, ([item, count]) => <p>{count} x {item}</p>)
        }
        Total: {cartTotal}
      </div>
    </div>
  );
}

export default App;
