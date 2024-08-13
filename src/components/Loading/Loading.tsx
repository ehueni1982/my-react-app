/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/08/2024 17:30:31
*/
import React, { FC, useEffect } from 'react';
import './Loading.css';


interface LoadingProps {
 
}


const Loading : FC<LoadingProps> = () =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div className="Loading">
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      </div>
  );
}

export default Loading;