import './Form.css';
import axios from 'axios'; 
import { useEffect, useState } from 'react';

function Form() {

  const [user, setUser] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState("")

  const createPost = () => {
    axios.get("http://localhost:8000/api/user/")
		 .then(res => setUser(res.data))
  }

  const submit = () => {
    var newUser = {}
    newUser.name = name
    newUser.age = age
    axios.post("http://localhost:8000/api/user/", newUser)
    setName("")
    setAge("")
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8000/api/user/${id}/`)
  }

  useEffect(() => {
    createPost()
  }, [user])

  return (
    <div className="Form">
      {user.map((i,key)=>(
        <div key={key}>
          <p>{i.name} {i.age} <button onClick={()=>deleteUser(i.id)}>X</button></p>
        </div>
      ))}
      <input name="name" type="text" value={name} placeholder="name" onChange={(e)=>setName(e.target.value)}/>
      <input name="name" type="number" value={age} placeholder="age" onChange={(e)=>setAge(e.target.value)}/>
      <button onClick={submit}>Add</button>
    </div>
  );
}

export default Form;