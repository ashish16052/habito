import React, { useEffect, useState } from 'react'
import check from '../../assets/check.svg'
import uncheck from '../../assets/uncheck.svg'
import axios from 'axios';
import './Habits.scss'

const Habits = (props) => {

  const [habits, setHabits] = useState([
    {
      title: "journaling",
      completed: false
    },
    {
      title: "Gym",
      completed: false
    },
    {
      title: "Dsa",
      completed: false
    },
    {
      title: "Read a book",
      completed: false
    },
    {
      title: "Meditate",
      completed: false
    },
  ])

  const [habitid, sethabitid] = useState(0)
  const [habitday, sethabitday] = useState("")

  const populatehabits = async () => {
    const today = new Date();
    const day = today.getDate()
    const month = today.toLocaleString('en-US', { month: 'short' })
    const year = today.getFullYear()
    const habitday = day + " " + month + " " + year
    sethabitday(habitday)
    var habitid
    try {
      const res1 = await axios.get("http://127.0.0.1:8000/api/habits/?date=" + habitday)
      if (res1.data.length==0)
      {
        const habits = {
          user:21,
          date:habitday,
          count:0
        }
        res1 = axios.post("http://localhost:8000/api/habits/", habits)
      }
      console.log(res1.data);
      sethabitid(res1.data[0].id)
      habitid = res1.data[0].id
      const res2 = await axios.get("http://127.0.0.1:8000/api/habit/?habits=" + habitid)
      if (res2.data.length == 0) {
        for (var i = 0; i < habits.length; i++) {
          await axios.post("http://localhost:8000/api/habit/", { "habits": habitid, ...habits[i] })
        }
      }
      else {
        setHabits(res2.data)
      }
    }
    catch (err) {
      console.error(err);
    }

  }

  useEffect(() => {
    populatehabits()
  }, [])


  const changeStatus = (i) => {
    var temphabit = [...habits]
    temphabit[i].completed = !(habits[i].completed)
    setHabits(temphabit);
  }

  const updateHabit = async (habit, i) => {
    changeStatus(i)
    try {
      const res1 = await axios.get("http://127.0.0.1:8000/api/habit/?habits=" + habitid + "&title=" + habit.title)
      var response = res1.data[0]
      response.completed = habit.completed
      await axios.put(`http://localhost:8000/api/habit/${response.id}/`, response)
      var count = 0;
      for (var i = 0; i < habits.length; i++) {
        if (habits[i].completed)
          count++;
      }
      const habit_obj = {
        id: habitid,
        date: habitday,
        user: 21,
        count: count
      }
      await axios.put(`http://localhost:8000/api/habits/${habitid}/`, habit_obj)
      props.changeRefresh(!props.refresh)
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='habits'>
      {
        habits.map((habit, i) => (
          <div className='habit' key={i}>
            {
              habit.completed
                ? <img src={check} className='status' onClick={() => updateHabit(habit, i)} />
                : <img src={uncheck} className='status' onClick={() => updateHabit(habit, i)} />
            }
            {habit.title}
          </div>
        ))
      }
    </div>
  )
}

export default Habits