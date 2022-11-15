import { useState } from 'react'
import Collapsible from 'react-collapsible';
import { useForm } from 'react-hook-form';
import './App.css'

function App() {
  const listToDo = [
    {
      id: 1,
      name: "Do housework",
      desc: "Lorem....",
      date: "Mon Nov 14 2022 23:40:24 GMT+0700",
      piority: "Low",
    },
    {
      id: 2,
      name: "Do homework",
      desc: "Lorem....",
      date: "Tue Nov 15 2022 23:40:24 GMT+0700",
      piority: "Normal",
    },
    {
      id: 3,
      name: "Learn something",
      desc: "Lorem....",
      date: "Fri Nov 11 2022 23:40:24 GMT+0700",
      piority: "High",
    },
  ]
  const [list, setList] = useState(listToDo);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  // const [isOpenBulk,setIsOpenBulk] = useState(false)
  const jsonObj = JSON.stringify(list)
  localStorage.setItem("jsonObj", jsonObj)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const date = new Date();
  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }
  const onSubmit = (data) => {
    console.log(data.piority);
    const obj = {
      id: list.length + 1,
      name: data.name,
      desc: data.desc,
      date: data.date,
      piority: data.piority,
    }
    const newListTodo = list.slice();
    newListTodo.push(obj);
    setList(newListTodo)
  }
  const handleRemove = (id) => {
    const newListTask = list.filter((item) => item.id !== id);
    setList(newListTask)
    console.log(newListTask);
  }

  const searchItem = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      const filterData = list.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filterData)
    } else {
      setFilteredResults(list)
    }
  }
  return (
    <>
      <main>
        <div className='block'>
          <h1 className='title'>New Task</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('name', { required: true })} className="inputName" placeholder='Add new task' />
            {errors.name && <><br /><div className='blockErr'><span className='errors'>You need to enter this field</span></div>  <br /> </>}
            <div className='blockTextArea'>
              <span className='textDes'>Description</span>
              <textarea {...register('desc')} className="textArea" />
            </div>
            <div className='blockOption'>
              <div>
                <span className='op1'>Due Date</span>
                <input type="date" {...register('date')} min={formatDate(date)} defaultValue={formatDate(date)} className='date' />
              </div>
              <div >
                <span className='op1'>Piority</span> <br />
                <select {...register('piority')} defaultValue="Normal" className='select'>
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
            <button className='btn'> Add </button>
          </form>
        </div>
        <div className='block'>
          <h1 className='title'>To Do List</h1>
          <input type="text" className="inputName" placeholder='Search....' onChange={(e) => searchItem(e.target.value)} />
          {
            searchInput.length > 1 ? (
              filteredResults.map((item) => (
                <>
                  <div>
                  <div className='test' key={item.id}>
                    <div className='check'>
                      <div>
                        <input type="checkbox" className='inputCheck' />
                      </div>
                      <div>
                        <span className='nameTask'>{item.name}</span>
                      </div>
                    </div>
                    <div className='check'>
                      <Collapsible trigger={"Learn Something"} className="collBtn">
                        <div className='detailData'>
                          <form>
                            <input placeholder={item.name} id="name" />
                            <span>Description</span>
                            <textarea id="desc" />
                            <div>
                              <div>
                                <span>Due Date</span>
                                <input type="date" defaultValue={item.date} />
                              </div>
                              <div>
                                <span>Piority</span>
                                <select defaultValue={item.piority}>
                                  <option value="Low">Low</option>
                                  <option value="Normal">Normal</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>
                            <button>Update</button>
                          </form>
                        </div>
                      </Collapsible>
                     
                    </div>
                    <button onClick={() => handleRemove(item.id)}>
                        Remove
                      </button>
                  </div>
                </div>

                </>
              ))
            ) : (list.map((item, index) => (
              <>
                <div>
                  <div className='test' key={item.id}>
                    <div className='check'>
                      <div>
                        <input type="checkbox" className='inputCheck' />
                      </div>
                      <div>
                        <span className='nameTask'>{item.name}</span>
                      </div>
                    </div>
                    <div className='check'>
                      <Collapsible trigger={"Learn Something"} className="collBtn">
                        <div>
                          <form>
                            <input placeholder={item.name} id="name" />
                            <span>Description</span>
                            <textarea id="desc" />
                            <div>
                              <div>
                                <span>Due Date</span>
                                <input type="date" defaultValue={item.date} />
                              </div>
                              <div>
                                <span>Piority</span>
                                <select defaultValue={item.piority}>
                                  <option value="Low">Low</option>
                                  <option value="Normal">Normal</option>
                                  <option value="High">High</option>
                                </select>
                              </div>
                            </div>
                            <button>Update</button>
                          </form>
                        </div>
                      </Collapsible>
                      <a onClick={() => handleRemove(item.id)}>
                        Remove
                      </a>
                    </div>
                  </div>
                </div>
              </>)))
          }
        </div>
      </main>
      {/* <div className='test'>
        <div className='check'>
          <div>
            <input type="checkbox" className='inputCheck' />
          </div>
          <div>
            <span className='nameTask'>Do Homework</span>
          </div>
        </div>
        <div className='check'>
          <Collapsible trigger={"Learn Something"} className="collBtn">
            <div className='childColl'>ABCXYZ123456</div>
          </Collapsible>
          <a>
            Remove
          </a>
        </div>
      </div> */}
    </>
  )
}

export default App
