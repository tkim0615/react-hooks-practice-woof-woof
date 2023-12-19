import React,{useState, useEffect} from "react";

function App() {
  const [dogs, setDogs] = useState([])
  const [selectedDog, setSelectedDog] = useState(null)
  const [filterOn, setFilterOn] = useState(false)

  const handleFilter =()=>{
    setFilterOn(!filterOn)
  }
  const filteredGoodDogs = dogs.filter(dog =>{
    if(filterOn){
      return dog.isGoodDog === true
    }else{
      return dog
    }
  })


  const handleToggle = () => {
    // Find the selected dog in the dogs array
    const updatedDogs = dogs.map((dog) => {
      if (dog.id === selectedDog) {
        // Toggle the isGoodDog status locally
        return { ...dog, isGoodDog: !dog.isGoodDog };
      }
      return dog;
    });

    // Update the dogs state with the updated dog array
    setDogs(updatedDogs);
  };


  useEffect(()=>{
    fetch('http://127.0.0.1:4001/pups')
      .then(r=>r.json())
      .then(data => setDogs(data))
  },[])

  const handleClick = (dog) =>{
    setSelectedDog(dog.id)
  }
  const filteredDogs = dogs.filter(dog=>{
    if(dog.id === selectedDog){
      return true
  }})

  const detail = filteredDogs.map(dog=>{
    return (
      <div key={dog.id}>
        <img src={dog.image} alt={dog.name} />
        <h2>{dog.name}</h2>
        <button onClick={()=>handleToggle(dog)}>{dog.isGoodDog? 'Good Dog':'Bad Dog'}</button>
      </div>
    )
  })

  return (
    <div className="App">
      <div id="filter-div">
        <button onClick={handleFilter}id="good-dog-filter">{filterOn? 'Filter good dogs: On':'Filter good dogs: Off'}</button>
      </div>
      <div id="dog-bar">{filteredGoodDogs.map(dog=>{ 
        return <span onClick={()=>handleClick(dog)} key={dog.id}>{dog.name}</span>

      })}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          {detail}
        </div>
      </div>
    </div>
  );
}

export default App;
// ### STEP 3: TOGGLE GOOD DOG

// When a user clicks the Good Dog/Bad Dog button, two things should happen:

// - The button's text should change from Good to Bad or Bad to Good
// - The corresponding pup object in the database should be updated to reflect the
//   new isGoodDog value
//   - Please note, you can update a dog by making a PATCH request to `/pups/:id`