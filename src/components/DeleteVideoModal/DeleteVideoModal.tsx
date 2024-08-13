/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 06/08/2024 22:11:13
*/
import React, { FC, useEffect } from 'react';
import './DeleteVideoModal.css';
import { Button, Modal } from 'react-bootstrap';
import { deletevideo } from '../../api/api-video';
import { Video } from '../../models/Video';


interface DeleteVideoModalProps {
  hideModal: () => void
  updataData: () => void
  currentVideo: Video
  
 
}


const DeleteVideoModal : FC<DeleteVideoModalProps> = ({currentVideo,updataData, hideModal}) =>{



    useEffect(() => {
      window.scrollTo(0,0)
      const runLocalData = async () => {

      }
      runLocalData()
    })

    const handleDelete = async () => {
      await deletevideo(currentVideo._id!)
      updataData()
      hideModal()

    }

  return (
      <div className="DeleteVideoModal center">
          <Modal show={true} scrollable>
          <Modal.Header>
            <Modal.Title>
              <h2>Delete confirm</h2>
            </Modal.Title>
           <button onClick={hideModal} className="btn-close"></button>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to delete this video:  <strong>{currentVideo.title}</strong>?</p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>Cancel</Button>
          <Button variant='success' onClick={handleDelete}>Confirm</Button>
          </Modal.Footer>
         </Modal>
      </div>
  );
}

export default DeleteVideoModal;