import axios from 'axios'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import url from './url.js';

 let user = async() => {
    
    
        let token = localStorage.getItem('token');
       try{
        let result = await axios.post(`${url}user/user`, {token} );
        
        return result.data
       }catch(err){
        console.log(err.message)
       }
}

export default user
