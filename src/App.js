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
  function getFruits() {
    const fruitsList = fruitsData;
    return fruitsList;
  }
  
  function filterSeason(season) {
    let filteredFruits = getFruits().filter(item => item.season === season);
    return filteredFruits;
  }

  function filterType(type) {
    let filteredFruits = getFruits().filter(fruit => fruit.type === type);
    return filteredFruits;
  }


  const [filterBySeason, setSeasonFilter] = useState(null)
  const [filterByType, setTypeFilter] = useState(null)
  useEffect(() => {
    setSeasonFilter(getFruits());
  }, []);
  useEffect(() => {
    setTypeFilter(getFruits());
  }, []);
  // const [filteredFruits, setFilters] = useState(getFruits());
  // useEffect(() => {
  //   const seasonFiltered = setSeasonFilter(getFruits());
  //   const typeFiltered = setTypeFilter(seasonFiltered);
  //   setFilters(typeFiltered)
  // }, [filterBySeason, filterByType]);

  function handleSeasons(e) {
    let typeSeason = e.target.value;
    console.log(typeSeason)
    typeSeason !== "All"
      ? setSeasonFilter(filterSeason(typeSeason))
      : setSeasonFilter(getFruits());
    console.log(filterBySeason)
    return filterBySeason;
  }

  function handleType(e) {
    let type = e.target.value;
    console.log(type)
    type !== "All"
      ? setTypeFilter(filterType(type))
      : setTypeFilter(getFruits());
    console.log(filterByType)
    return filterByType;
  }

  
  const fruits = filterByType && filterByType.map((item) => (
    <Card
    style={{
      width: 300,
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
        <h2>Filters</h2> 
        <h3> Sort by </h3>
        <Radio.Group onChange={onChange} value={value}>
          <Radio value={1}>Default</Radio>
          <Radio value={2}>Popularity</Radio>
          <Radio value={3}>Price</Radio>
        </Radio.Group>
        <h3>Seasons</h3>
        {season &&
        season.map((s, index) => (
          <div>
            <button key={index} value={s} onClick={handleSeasons}>
              {s}
            </button>
          </div>
        ))}
  
        <h3>Type of Fruit</h3>
        {type &&
        type.map((s, index) => (
          <div>
            <button key={index} value={s} onClick={handleType}>
              {s}
            </button>
          </div>
        ))}

        <h3> Other </h3>
        <Checkbox onChange={onChange}>In Cart</Checkbox>
      </header>
      <div id="grid"> 
      <Space wrap> 
        {fruits}
      </Space>
      <div id="cart">

        <h2>Cart</h2>
        {
          Array.from(cart, ([item, count]) => <p>{count} x {item}</p>)
        }
        Total: {cartTotal}
      </div>
      </div>
    </div>
  );
}

export default App;
