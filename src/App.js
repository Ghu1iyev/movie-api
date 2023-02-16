import { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './MovieBox';
import {Navbar, Container, Nav, Form, FormControl, Button} from 'react-bootstrap'

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=ea6638ea40443b24947650ef1a6c2620"

function App() {

const [movies, setMovies] = useState([])
const [query, setQuery] = useState('')

useEffect(() => {
    fetch(API_URL)
    .then((res)=> res.json())
    .then((data) => {
      console.log(data)
      setMovies(data.results)
    })
},[])

const searchMovie = async(e) => {
  e.preventDefault()
  console.log("Searching...")

  try{
    const url = `https://api.themoviedb.org/3/search/movie?api_key=ea6638ea40443b24947650ef1a6c2620&query=${query}`
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    setMovies(data.results)
  }
  catch(e){
    console.log(e)
  }
}

const changeHandler = (e) => {
  setQuery(e.target.value)
}
return (
  <>
  <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/home">MovieDb App</Navbar.Brand>
        <Navbar.Brand href="/home">Trending</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div className='container'>
      <div className='grid'>
      {
        movies?.map((movie) => <MovieBox key={movie.id} {...movie}/>)
      }
      </div>
    </div>
    </>
  );
}

export default App;


