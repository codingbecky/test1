import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css';
function App() {
  const [itemText, setItemText] = useState('')
  const [itemList, setItemList] = useState([]);
//for edit
  const [isUpdating, setIsUpdating] = useState('');
  const [updateItemText, setUpdateItemText] = useState('');

  //add new todo item to database
  const addItem = async () =>{
    try{
      const res = await axios.post('http://localhost:5500/todos/add',{item: itemText})
      console.log(res)
      setItemText('');
    }catch(err){
      console.log(err)
    }
    window.location = '/';
  }
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    addItem(); // Call addItem when the form is submitted
  };

  //1. fetch all data from database
  //2. todoitem
  //3. write map
  useEffect(()=>{
    axios.get('http://localhost:5500/todos/')
      .then(response => {
        setItemList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  },[])
  
  function deleteItem(id) {
    axios.delete('http://localhost:5500/todos/' + id)
      .then(response => {
        console.log(response.data);
        setItemList(itemList.filter(item => item._id !== id));
      })
      .catch(error => {
        console.log(error);
      });
  }

  //before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{editItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Edit</button>
    </form>
  )

  //Update item
  const editItem = async (e) => {
    // e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:5500/todos/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = itemList.findIndex(item => item._id === isUpdating);
      const updatedItem = itemList[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }
  // function editItem(id){
  //   axios.put('http://localhost:5500/todos/' + id, {item:item})
  //     .then

  // }


  return (
    <div className="App">
      <h1>To Do List</h1>
      <form className='form' onSubmit={handleSubmit}>
        <input type='text' placeholder="Add todo Item" onChange={e=>{setItemText(e.target.value)}} value={itemText}/>
        <button type="submit">Add</button>
      </form>
      <div className="todo-listItems">
        
        {
        itemList.map(item => (
          isUpdating === item._id
              ? renderUpdateForm()
              : 
                  <div className="todo-item">
                      <p className="item-content">{item.item}</p>
                      <button className="update-item" onClick={()=>{setIsUpdating(item._id)}}>Edit</button>
                      <button className="delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
                  </div> 
                
          ))
        }
        {/* <div className="todo-item">
          <p className="item-content">THis is item 1</p>
          <button className="edit-item">Edit</button>
          <button className="delete-item">Delete</button>
        </div>
        <div className="todo-item">
          <p className="item-content">THis is item 2</p>
          <button className="edit-item">Edit</button>
          <button className="delete-item">Delete</button>
        </div> */}
      </div>
    </div>
  );
}

export default App;
