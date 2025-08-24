import './App.css'
import Form from './Components/Form'


function App() {
  return (
    <div style={{backgroundColor:"skyblue"}}>
      <div className="container d-flex">
        <div className="col-md-3"></div>
        <div className="col-md-6 col-sm-12" style={{backgroundColor:"skyblue"}}>
            <Form/>
        </div>
        <div className="col-md-3">
        </div>
      </div>
      
    </div>
  )
}

export default App
