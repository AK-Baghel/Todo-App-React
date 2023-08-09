import React, { useEffect, useState } from 'react'
import './Todo.css'

export const Todo = () => {

    //Before rendering, return the previous data in Array arr by getting data from localStorage.
    const getArr = () => {
        let list = localStorage.getItem('list');
        if (list) {
            return JSON.parse(localStorage.getItem('list'))
        }
        else {
            return [];
        }
    }

    //taskNo() is counting the Total no. of Todo data checked in an Array arr.
    const taskNo = () => {
        const completedTasks = arr.filter((elem) => {
            return elem.check === true;
        })
        setCompletedTask(completedTasks.length);
    }


    //Using useState Hooks...
    const [input, setInput] = useState("");
    const [completedTask, setCompletedTask] = useState(0);
    const [arr, setArr] = useState(getArr());


    //Input field value onChange calling changeHandle()....
    const changeHandle = (e) => {
        setInput(e.target.value);
    }


    //Addind an object in Array arr, which consits of name, id & check on click Add button. 
    const add = () => {
        if (input) {
            setArr([...arr, { name: input, id: new Date().getTime().toString(), check: false }]);
            setInput("")
        }
        else {
            alert('Fill the box')
        }
    }


    //Removing the unwanted Todo data from Array arr by using Filter()...
    const remove = (dataId) => {
        const items = arr.filter((elem) => {
            return elem.id !== dataId;
        })

        setArr(items);

        // if todo data is checked and we remove that data it will decrement the value of total completed Tasks.
        if (completedTask > 0) {
            setCompletedTask(completedTask - 1);
        }
    }


    //onChange of input type='checked' , it's toggle the pressed key element check data in it's object of Array arr. 
    const check = (dataId) => {
        const items = arr.map((elem) => {
            if (dataId !== elem.id) {
                return (
                    elem
                )
            }
            else {
                return { ...elem, check: !elem.check };
            }
        })
        setArr(items);
        taskNo();

    }

    useEffect(() => {
        // saving todo list data in browser memory .
        localStorage.setItem("list", JSON.stringify(arr));                
        taskNo();
    }, [arr])


    return (
        <>
            <div className="container1">

                <div className="box1">
                    Todo App
                </div>

                <div className="box2">
                    <div className="total">Total no. of Tasks = <span>{arr.length}</span></div>

                    <div className="completed">Completed Tasks = <span>{completedTask}</span></div>
                </div>

                <div className="box3">
                    <input type="text" placeholder='Write your text here...' value={input} onChange={changeHandle} />
                    <button onClick={add}>Add</button>
                </div>

                <div className='box5'>
                    <div className="add" onClick={() => { setArr([]), setCompletedTask(0) }}>Clear All</div>
                </div>
            </div>

            <div className="container2">
                {
                    arr.map((elem) => {
                        return (
                            <div className="box4" key={elem.id}>
                                <div className="data">{elem.name}</div>
                                <div className="box5">
                                    <input className='check' checked={elem.check} type="checkBox" onChange={() => { check(elem.id) }} />
                                    <div className="delete" onClick={() => { remove(elem.id) }}>Delete</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </>
    )
}
