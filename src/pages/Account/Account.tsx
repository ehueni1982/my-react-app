/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/08/2024 18:09:24
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Account.css';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';


interface AccountProps {
 
}


const Account : FC<AccountProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    //const [value, setValue] = useState('');

    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

        setLoading(false)
      }
      runLocalData()
    },[])

  return (
    <Fragment>
    {
      loading ?
      <Loading />
      :
     <Container/>
    }
    </Fragment>
  );
}

export default Account;