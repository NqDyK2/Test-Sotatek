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
      date: "11/12/2022",
      piority: "Low",
    },
    {
      id: 2,
      name: "Do homework",
      desc: "Lorem....",
      date: "11/12/2022",
      piority: "Normal",
    },
    {
      id: 3,
      name: "Learn something",
      desc: "Lorem....",
      date: "11/12/2022",
      piority: "High",
    },
  ]
  const [list, setList] = useState(listToDo);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
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
      <div>
        <h1 className='title'>New Task</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" {...register('name', { required: true })} placeholder='Add new task' />
          {errors.name && <><br /> <span>Nhập đi đã.</span> </>}
          <label htmlFor="">Description</label>
          <textarea {...register('desc')} />
          <div>
            <div>
              <label htmlFor="" >Due Date</label>
              <input type="date" {...register('date')} min={formatDate(date)} defaultValue={formatDate(date)} />
            </div>
            <div>
              <label htmlFor="">Piority</label>
              <select {...register('piority')} defaultValue="Normal" >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          <button> Add </button>
        </form>
      </div>
      <div>
        <h1 className='title'>To Do List</h1>
        <input type="text" onChange={(e) => searchItem(e.target.value)} />
        {
          searchInput.length > 1 ? (
            filteredResults.map((item) => (
              <>
                <input type="checkbox" />
                <Collapsible type='checkbox' key={item.id} trigger={`${item.name}`}>

                  <form>
                    <input placeholder={item.name} id="name" />
                    <span>Description</span>
                    <textarea id="desc" />
                    <div>
                      <div>
                        <label htmlFor="">Due Date</label>
                        <input type="date" defaultValue={item.date} />
                      </div>
                      <div>
                        <label htmlFor="">Piority</label>
                        <select defaultValue={item.piority}>
                          <option value="Low">Low</option>
                          <option value="Normal">Normal</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                    <button>Update</button>
                  </form>
                </Collapsible>
              </>
            ))
          ) : (list.map((item, index) => (
            <Collapsible type='checkbox' key={item.id} trigger={`${item.name}`}>
              <form>
                <input placeholder={item.name} id="name" />
                <span>Description</span>
                <textarea id="desc" />
                <div>
                  <div>
                    <label htmlFor="">Due Date</label>
                    <input type="date" defaultValue={item.date} />
                  </div>
                  <div>
                    <label htmlFor="">Piority</label>
                    <select defaultValue={item.piority}>
                      <option value="Low">Low</option>
                      <option value="Normal">Normal</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                </div>
                <button>Update</button>
              </form>
            </Collapsible>)))
        }
      </div>
    </>
  )
}

export default App
