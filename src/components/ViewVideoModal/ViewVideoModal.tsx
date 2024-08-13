/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 05/08/2024 22:06:26
*/
import React, { FC, useEffect, useState } from 'react';
import './ViewVideoModal.css';
import { Button, Modal, useAccordionButton } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { getvideo } from '../../api/api-video';
import Loading from '../Loading/Loading';
import { convertBlobToUrl } from '../../helpers/filehelpers';
import { OuitubePlayer } from 'ouitube-player';


interface ViewVideoModalProps {
  videoId: number
  hideModal:()=>void
 
}


const ViewVideoModal : FC<ViewVideoModalProps> = ({ videoId, hideModal}) =>{

  const [video, setVideo] = useState<Video|null>(null)
  const [isLoading, setisLoading] = useState<boolean>(true)

 const runLocalData = async () => {
      const data: any = await getvideo(videoId)
      if (data.isSuccess){
        const currentVideo = data.result
        currentVideo.poster = convertBlobToUrl(currentVideo.poster as Blob)
        currentVideo.link = convertBlobToUrl(currentVideo.link as Blob)
       setVideo(currentVideo)

      }else{
        //Gestion erreurs

      }
      setisLoading(false)

      }
    useEffect(() => {
      window.scrollTo(0,0)
     
      runLocalData()
    },[])

  return (
      <div className="ViewVideoModal">
          <Modal show={true} scrollable size='lg'>
          <Modal.Header>
            <Modal.Title>
              View Video
            </Modal.Title>
           <button onClick={hideModal} className="btn-close"></button>
          </Modal.Header>
          <Modal.Body>
          {
            isLoading ?
            <Loading/>
            :
            video ?
            //<div>{video.title}</div>
            <table className="table table-bordered">
              <tbody>
              <tr>
                <th>Title</th>
                <td>{video.title}</td>
              </tr>
              <tr>
                <th>Decription</th>
                <td>{video.description}</td>
              </tr>
              <tr>
                <th>Category</th>
                <td>{video.category}</td>
              </tr>
              <tr>
                <th>Poster</th>
                <td>
                  <img src={video.poster as string} width={"100%"} alt={video.title} className="img-fluid" />
                </td>
              </tr>
              <tr>
                <th>Video</th>
                <td>
                <OuitubePlayer src={video.link as string}/>
              {/* <video controls src={video.link as string} width={"100%"}></video> */}                
              
              </td>
              </tr>
              </tbody>
            </table>
            :
            <p>Error</p>

          }
          </Modal.Body>
          <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>Close</Button>
          </Modal.Footer>
         </Modal>
      </div>
  );
}

export default ViewVideoModal;