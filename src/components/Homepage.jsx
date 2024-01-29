//importing necessary items
import React, { useContext } from 'react'
import "./Homepage.css"
import SearchIcon from '@mui/icons-material/Search';
import { useState,useEffect } from 'react';
import axios from "axios"
import { AppContext } from '../context/Parentcontext';
import { Link} from 'react-router-dom';


const Homepage = () => {
    // using usecontext to destucture the values
    const{state,setState}=useContext(AppContext);
    const{isBlur,setIsBlur}=useContext(AppContext);
    //setting empty array of data
    const[data,setData]=useState([]);
 
    // getting the value of search box 
    const handleChange=(e)=>{
       setState(e.target.value);
    }
 
    // setting getting the value from local storage to check that user is singed up or not.

  const storedData=localStorage.getItem("booksData");
  if(storedData){
    setIsBlur(false)
  }

  //fetching data from API using useEffect.

    useEffect(()=>{
        const fetchData = async () => {
            try {
              const response = await axios.get("https://reactnd-books-api.udacity.com/books", {
                headers: {
                  'Authorization': 'Bearer whatever-you-want'
                }
              });
              setData(response.data.books);
            } catch (error) {
              console.log(error);
              
            }
          };
      
          fetchData();
        }, [data]);
    var value=data;
    // console.log(value);

  
  return (
    <div>
        <div className='navbar'>
           <div style={{display:"flex",alignItems:"center"}}>
            <img className='logo' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRR4xnjgU8Zwz3bGiqQr_5sAZf9x0YcgSg2erbUXmmsvKMRpjHOKoIqAjV5IaCkkAkruG0&usqp=CAU" alt="" />
            <h3>Kalvium Books</h3>
           </div>
           <SearchIcon style={{position:"relative",left:"7%"}} />
           <input value={state} onChange={handleChange} placeholder='Search bar'  className='search-bar' type="text" />
           <Link to={"Signuppage"}>
           <button className='register-btn'>Register</button>
           </Link>
        </div>

        <div style={{filter:isBlur?"blur(8px)":"none"}}>
            
            <div className='book-container'>
                {state.length>0?

                //filtering data to show results of searched books . 

                value.filter((e)=>{
                    const filterdData=state.toLowerCase()
                    const title=e.title.toLowerCase();
                    return filterdData && title.startsWith(filterdData) && filterdData!=title;
                }).map((item)=>{

                   return(
                 <div className='card'>
                <img className='book-img' src={item.imageLinks.thumbnail}/>
                <p className='title'>{item.title}</p>
                <div className='price'>
                <p className='rating'>{!item.averageRating?"4":item.averageRating }⭐</p>
                <p>Free</p>
                </div>
                </div>
                    )
                })
                :

                // showing the default data.
             
             data.map((item)=>(
                <div className='card'>
                <img className='book-img' src={item.imageLinks.thumbnail}/>
                <p className='title'>{item.title}</p>
                <div className='price'>
                <p className='rating'>{!item.averageRating?"4":item.averageRating }⭐</p>
                <p>Free</p>
                </div>
                </div>
                
             ))}
            </div>
        </div>
    </div>
  )
}

export default Homepage