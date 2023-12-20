import React,{useState, useEffect} from "react";

function App() {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);
  const [filterOn, setFilterOn] = useState(false);

  const handleDetailClick = (dog)=>{
    setSelectedDog(dog)
  }  
  useEffect(() =>{
    fetch('http://127.0.0.1:4001/pups')
    .then(res => res.json())
    .then(dogs => setDogs(dogs));
  },[])

  const handleClick = (updateDog) =>{
      const updatedDogsArray = dogs.map(dog => {
      if(dog.id === updateDog.id){
        return {...dog, isGoodDog: !dog.isGoodDog}
      }else{
        return dog
      }
    })
    setDogs(updatedDogsArray)
  }
  
  const handleFilter = () =>{
    setFilterOn(!filterOn)
  } 
  const filterBar = dogs.filter(dog => {
    if(filterOn){
      return dog.isGoodDog === true
    }else{
      return dog
    }
  })




  const detailDog = dogs.filter(dog => dog.id === selectedDog.id)
  const dogDetailElement = detailDog.map(dog=> {
  return(
      <div key={dog.id}>
        <img src={dog.image} alt={dog.name}/>
        <h2>{dog.name}</h2>
        <button onClick={()=>handleClick(dog)}>{dog.isGoodDog? 'Good dog': 'Bad dog'}</button>
      </div>
  )})





  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleFilter} id="good-dog-filter">{filterOn? 'Filter good dogs: ON' : 'Filter good dogs: OFF'}</button>
      </div>
      <div  id="dog-bar">
        {filterBar  .map(dog =>{
          return (
          <span onClick={()=>handleDetailClick(dog)} key={dog.id}>
            {dog.name}
            </span>)
        })}

      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {dogDetailElement}
        
        </div>
      </div>
    </div>
  );
}

export default App;
