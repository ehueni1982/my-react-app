/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 07/08/2024 23:31:29
*/
import React, { FC, useEffect } from 'react';
import './VideoCard.css';
import { Video } from '../../models/Video';
import { Link } from 'react-router-dom';


interface VideoCardProps {
 video: Video
}


const VideoCard : FC<VideoCardProps> = ({video}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

  return (
      <div key={video._id} className="col-lg-4 col-md-6 p-1">
       <Link to={"/reader"}>
       <div className="card">
         <img height={250} src={video.posterLink} alt={video.title} className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">{video.title}</h5>
            <p className="card-text">Created At: {video?.creatrd_at?.toDateString()}</p>
          </div>
        </div>
       </Link>
      </div>
  );
}

export default VideoCard;