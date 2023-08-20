import './App.css'
import Header from './Header'
import AddItem from './AddItem'
import SearchItem from './SearchItem'
import Content from './Content'
import Footer from './Footer'
import { useState, useEffect } from 'react'
import apiRequest from './apiRequest'

function App() {
  const API_URL = 'http://localhost:3500/items'
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);


  useEffect(() =>{
  
    const fetchData = async () =>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error('Did not receive expected data')
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null)
      } catch (error) {
        console.log(error.message)
        setFetchError(error.message)
      }
    }

    (async () => fetchData())();
  }, [])

  const addNewItem = async (item) =>{
    const id = items.length ? items[items.length - 1].id + 1 : 1
    const myNewItem = {id, checked: false, item }
    const listItems = [... items, myNewItem]
    setItems(listItems)

    const optionsPost = {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, optionsPost)
    if(result) setFetchError(result);
  } 

  const handleCheck = async (id) =>{
  const listItems = items.map(item => item.id ===id ? {...item,checked: !item.checked } : item);
  setItems(listItems)

  const getId = listItems.filter(item => item.id === id)
  const optionCheck = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({checked: getId[0].checked})
  };
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, optionCheck)
    if(result) setFetchError(result)
  }

  const handleDelete = async (id) =>{
  const listItems = items.filter(item => item.id !== id)
  setItems(listItems)

  const optionDelete = { method: 'DELETE'}
  const reqUrl = `${API_URL}/${id}`
  const result = await apiRequest(reqUrl, optionDelete)
  if (result) setFetchError(result)
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    if(!newItem) return
    addNewItem(newItem)
    setNewItem('')
  }
  return (
    <>
      <Header />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
        addNewItem={addNewItem}
      />
      <SearchItem
      search={search}
      setSearch={setSearch}
      />
      <main>
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>}
        {!fetchError && <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />}
      </main>
      <Footer length={items.length} />
    </>
  )
}

export default App
