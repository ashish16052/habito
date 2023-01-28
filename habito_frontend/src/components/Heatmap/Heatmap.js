import React, { useEffect, useState } from 'react'
import './Heatmap.scss'
import axios from 'axios';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Heatmap = (props) => {

    const [year, setYear] = useState(String(new Date().getFullYear()))
    const month = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    const week = [0, 1, 2, 3, 4, 5];
    const day = [0, 1, 2, 3, 4, 5, 6];

    const [habitData, setHabitdata] = useState([])

    const gethabitdata = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/habits/?user=21")
            setHabitdata(res.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        gethabitdata()
    }, [props.refresh])


    const getScore = (m, w, d) => {
        const searchDate = getcurDate(m, w, d) + ' ' + tomonth(m) + ' ' + year
        const habit = habitData.find(o => o.date == searchDate)
        if (habit) {
            return habit.count;
        }
        else
            return 0;
    }

    const tomonth = (d) => {
        const date = new Date();
        date.setMonth(d);
        return date.toLocaleString('en-US', { month: 'short' });
    }

    const generateYear = () => {
        const start = 2023
        const stop = year
        const step = 1

        return Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => String(start + index * step)
        )
    }

    const getCurYear = (e) => {
        setYear(e.value)
    }

    const getcurDate = (m, w, d) => {
        var date = new Date(parseInt(year), m, 1, 0, 0, 0, 0)
        var offset = date.getDay()
        var today = 7 * w + (d + 1 - offset)
        if (today < 1)
            return 0
        else if (today > 31 && ([0, 2, 4, 6, 7, 9, 11, 13].includes(m)))
            return 0
        else if (today > 30 && ([3, 5, 8, 10, 12].includes(m)))
            return 0
        else if (today > 29 && (m == 1))
            return 0
        else if (today > 28 && (m == 1) && !(parseInt(year) % 4 == 0 && parseInt(year) % 100 != 0))
            return 0
        else
            return today
    }

    const options = generateYear()
    const defaultOption = year

    return (
        <div className='heatmap'>
            <Dropdown onChange={getCurYear} className='year-dropdown' value={defaultOption} options={options} placeholder="Select year" />
            <div className='map'>
                {month.map((m, h) => (
                    <div key={h} className='month'>
                        <div className='month-title'>
                            {tomonth(m)}
                        </div>
                        <div className='month-box'>
                            {week.map((w, i) => (
                                <div key={i} className='week'>
                                    {
                                        day.map((d, j) => (
                                            (getcurDate(m, w, d) ?
                                                <div key={j} className={"day-" + getScore(m, w, d)} title={getcurDate(m, w, d) + ' ' + tomonth(m) + ' ' + year}></div>
                                                :
                                                <div key={j} className='day-null'></div>
                                            )
                                        ))
                                    }
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Heatmap