import React,{useState, useEffect} from "react";

function App() {
  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState("")
  const[filterOn, setFilterOn] = useState(false)

  useEffect(() =>{
    fetch('http://127.0.0.1:4001/pups')
      .then(response => response.json())
      .then(data => setDogs(data))
},[])

  const handleFilterClick = () =>{
    setFilterOn(!filterOn)
  }

  //filter dogs by isGoodDog status. if filter is true,
  //display dogs that are good..
  const filteredGoodDog = dogs.filter(dog =>{
    if(filterOn){
      return dog.isGoodDog === true
    }else{
      return dog
    }
  })

  


  const handleClick = (dog) =>{
    setSelectedDog(dog.name)
  }
  const filteredDogToDisplay = dogs.filter(dog =>{
    return dog.name === selectedDog
  })
  const handleGoodClick = (selectedDog) =>{
    const updatedDogArray = dogs.map(dog =>{
      if(dog.id === selectedDog.id){
        return {...dog, isGoodDog: !dog.isGoodDog}
    }else{
      return dog
    }}
    )
    setDogs(updatedDogArray)
  }


  const displayElement = filteredDogToDisplay.map(dog =>{
    return(
      <div key={dog.id}>
        <img src={dog.image} alt={dog.name}></img>
        <h2>{dog.name}</h2>
        <button onClick ={()=>handleGoodClick(dog)}>{dog.isGoodDog? "Good Dog!": 'Bad Dog!'}</button>
      </div>
    )
  })


  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleFilterClick} id="good-dog-filter">{filterOn? 'Filter good dogs: ON' : 'Filter good dogs: OFF'}</button>
      </div>
      <div id="dog-bar">
        {filteredGoodDog.map(dog => <span onClick = {()=>handleClick(dog)} key={dog.id}>{dog.name}</span>)}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
        {displayElement}
        </div>
      </div>
    </div>
  );
}

export default App;
// onClick event..in handleClick function, 
//if selected dog is === dog. id, 
//update the isGoodDog to !isGoodDog, using map method.
// return dog if condition not met.
// update new array with dogs state setter function