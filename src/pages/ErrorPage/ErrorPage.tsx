/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/08/2024 20:07:22
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './ErrorPage.css';



interface ErrorPageProps {
 
}


const ErrorPage : FC<ErrorPageProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState('');

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        setLoading(false)
      }
      runLocalData()
    },[value])

  return (
    <Fragment>
    
      <div className="ErrorPage">
          <h2>404!</h2>
          <p>Page not found!</p>
      </div>
    
    </Fragment>
  );
}

export default ErrorPage;