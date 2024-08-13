/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/08/2024 23:50:20
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './MediaReader.css';
import Loading from '../../components/Loading/Loading';


interface MediaReaderProps {
 
}


const MediaReader : FC<MediaReaderProps> = () =>{


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
      <div className="MediaReader">
          MediaReader Component
      </div>
    }
    </Fragment>
  );
}

export default MediaReader;