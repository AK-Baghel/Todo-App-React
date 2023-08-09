import React, { useEffect, useState } from 'react'
import './Todo.css'

export const Todo = () => {

    const getArr = () => {
        let list = localStorage.getItem('list');
        if (list) {
            return JSON.parse(localStorage.getItem('list'))
        }
        else {
            return [];
        }
    }

    const taskNo = () => {
        const completedTasks = arr.filter((elem) => {
            return elem.check === true;
        })
        setCompletedTask(completedTasks.length);
    }


    const [input, setInput] = useState("");
    const [completedTask, setCompletedTask] = useState(9);
    const [arr, setArr] = useState(getArr());

    const changeHandle = (e) => {
        setInput(e.target.value);
    }

    const add = () => {
        if (input) {
            setArr([...arr, { name: input, id: new Date().getTime().toString(), check: false }]);
            setInput("")
        }
        else {
            alert('Fill the box')
        }
    }

    const remove = (dataId) => {
        const items = arr.filter((elem) => {
            return elem.id !== dataId;
        })
        setArr(items);
        if (completedTask > 0) {
            setCompletedTask(completedTask - 1);
        }
    }

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
