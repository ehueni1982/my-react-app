/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/08/2024 18:09:24
*/
import React, { FC, useEffect,Fragment, useState } from 'react';
// import Loading from '../Loading/Loading';
import './Home.css';
import Loading from '../../components/Loading/Loading';
import { getAllvideo } from '../../api/api-video';
import { Video } from '../../models/Video';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import VideoCard from '../../components/VideoCard/VideoCard';


interface HomeProps {
 
}


const Home : FC<HomeProps> = () =>{


    // const [state, setState] = useState<any>(null)
    const [loading, setLoading] = useState(true);
    const [videos, setVideos] = useState<Video[]>([])
    //const [value, setValue] = useState('');
    const runLocalData = async () => {
      const data: any = await getAllvideo()
      if (data.isSuccess){
        data.results.map((video: Video) => {
          video.posterLink = convertBlobToUrl(video.poster as Blob)
          video.videoLink = convertBlobToUrl(video.link as Blob)
          return video
        })
        setVideos(data.results)
        setLoading(false)
      }
      
    }

    useEffect(() => {
      window.scrollTo(0,0)
      
      runLocalData()
    },[])

  return (
    <Fragment>
    {
      loading ?
      <Loading />
      :
      <div className="Home container py-2">
          <div className="row">
            {
            videos.map((video: Video)=>(                         
            <VideoCard video={video}/>
              ))
            }
          </div>
      </div>
          
    }
    </Fragment>
  );
}

export default Home;


