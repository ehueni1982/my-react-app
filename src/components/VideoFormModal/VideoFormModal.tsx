/*
  Author : Ehueni Barthélemy ANGORA Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 31/07/2024 19:23:52
*/
import React, { FC, useEffect, useState } from 'react';
import './VideoFormModal.css';
import { Button, Modal } from 'react-bootstrap';
import { Video } from '../../models/Video';
import { title } from 'process';
import { convertFileToBlob, convertFileToLink } from '../../helpers/filehelpers';
import { addvideo, updatevideo } from '../../api/api-video';
import Loading from '../Loading/Loading';



interface VideoFormModalProps {
  currentVideo?:Video
  hideModal:()=>void
  updateData:()=>void
  
 
}


const VideoFormModal : FC<VideoFormModalProps> = ({currentVideo, hideModal, updateData}) =>{

  const [posterPreview, setPosterPreview] = useState<string>(currentVideo?.posterLink as string || "")
  const [videoPreview, setVideoPreview] = useState<string>(currentVideo?.videoLink as string || "")
  const [formSubmitError, setFormSubmitError] = useState<string>("")
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const [formData, setFormData] = useState<Video>(currentVideo || {
    title: '',
    description: '',
    poster: null,
    link: null,
    category:'',
    isAvailable: true
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});


    useEffect(() => {
      window.scrollTo(0,0) 
        const runLocalData = async () => {
          setFormData(currentVideo ||{
          title: '',
          description: '',
          poster: null,
          link: null,
          category:'',
          isAvailable: true
        })

      }
      runLocalData()
    },[currentVideo])

  const handleInputChange= async (event: any) =>{
     const {name, value, type, files, checked} = event.target
     const newValue: any = formData
     
     if(type === "checkbox"){
      newValue[name] = checked
     }else if(type === "file"){
      const file = files[0]
      const link = await convertFileToLink(file)
      if(name === "poster"){
        if(!file.type.startsWith('image/')){
          return;
        }
        setPosterPreview(link)
      }
      if(name === "link"){
        if(!file.type.startsWith('video/')){
          return;
        }

        //const video: Video = formData
        //video.creatrd_at = new Date()

        //console.log({video})
        setVideoPreview(link)

      }
      newValue[name] = file
     }else{
      newValue[name] = value
     }
    
    //console.log({name, value, type, files, checked}); 
    console.log(newValue)

    const errors = formErrors
    delete errors[name]
    setFormErrors({...errors})

    setFormData(newValue)

  }
  const validateForm = (): boolean =>{
    const erros: Record<string, string> = {}
    if(!formData.title.trim()) {
      erros.title = 'Title is required!';
    }
    if(!formData.description.trim()) {
      erros.description = 'Description is required!';
    }
    if(!formData.poster) {
      erros.poster = 'Poster is required!';
    }
    if(!formData.link) {
      erros.link = 'Video file is required!';
    }
    if(!formData.category) {
      erros.category = 'Category is required! please select it';
    }
    
    setFormErrors(erros);

    return Object.keys(erros).length === 0

  }

  const handleSubmit = async (event: any)=>{
    event.preventDefault()
    if(!validateForm()){
      return
    }

    try {
      setIsSubmitted(true)
      const video: Video = formData
      


      let result
      if(currentVideo){
        //update
        if(video.poster instanceof File){
          video.poster = await convertFileToBlob(video.poster as File)
        }
        if(currentVideo.link instanceof File){
          video.link = await convertFileToBlob(video.link as File)
        }

        delete video?.posterLink
        delete video?.videoLink
        video.updated_at = new Date()
        
        result = await updatevideo(video)

      }else{
        //Create or ADD
        
        video.poster = await convertFileToBlob(video.poster as File)
        video.link = await convertFileToBlob(video.link as File)
        video.creatrd_at = new Date()
        result = await addvideo(video)

      }

     
      //console.log({result})
      if(result?.isSuccess){
        console.log({result});
        //reset formData
        setFormData({
          title: '',
          description: '',
          poster: null,
          link: null,
          category:'',
          isAvailable: true

        })
        updateData()
        //Close Modal
        hideModal()

      }

    } catch (error) {
      setFormSubmitError('Error, please try again later !')
      
    }
    setIsSubmitted(false)
   
  }

  return (
      <div className="VideoFormModal">
         <Modal show={true} scrollable>
          <Modal.Header>
            <Modal.Title>
              Video Form
            </Modal.Title>
           <button onClick={hideModal} className="btn-close"></button>
          </Modal.Header>
          <Modal.Body>
              {
                isSubmitted ?
                <Loading/>
                :
              <form action="">
            {formErrors && <div className="text-danger">{formSubmitError}</div>}
              <div className="form-group">
                <label htmlFor="title">Title: </label>
                <input 
                defaultValue={formData.title}
                 type="text" name="title" 
                 className={`form-control ${formErrors.title ? 'is-invalid': ''}`}
                 onChange={handleInputChange}
                />
                {formErrors.title && <div className='invalid-feedback'>{formErrors.title}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Description: </label>
                <textarea name="description"
                id="description"
                defaultValue={formData.description}
                className={`form-control ${formErrors.description ? 'is-invalid': ''}`}
                onChange={handleInputChange}
                />
                {formErrors.description && <div className='invalid-feedback'>{formErrors.description}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Image (poster) :</label>
                <input type="file" name="poster" accept='image/*'  className={`form-control ${formErrors.poster ? 'is-invalid': ''}`}
                onChange={handleInputChange}
                />
                {
                posterPreview && <div className="preview-image card my-1">
                  <img className='img-fluid' width={'100%'} src={posterPreview}/>
                </div>
                }
                 {formErrors.poster && <div className='invalid-feedback'>{formErrors.poster}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="description">Video :</label>
                <input type="file" name="link"  accept='video/*'  className={`form-control ${formErrors.link ? 'is-invalid': ''}`} 
                onChange={handleInputChange}
                />
                {
                videoPreview && <div className="video-preview card my-1">
                  <video controls src={videoPreview} width={'100%'}></video>
                </div>
                }
                {formErrors.link && <div className='invalid-feedback'>{formErrors.link}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categories :</label>
                <select defaultValue={formData.category}  onChange={handleInputChange}  name="category" id="category" className={`form-control ${formErrors.category ? 'is-invalid': ''}`} >
                  <option value="Politique">Select video categories</option>
                  <option value="Politique">Politique</option>
                  <option value="Education">Education</option>
                  <option value="Culture">Culture</option>
                  <option value="Formation">Formation</option>
                </select>
                {formErrors.category && <div className='invalid-feedback'>{formErrors.category}</div>}
              </div>
              <div className="form-check form-switch">
                <input defaultChecked={formData.isAvailable}  onChange={handleInputChange} className={`form-check-input ${formErrors.isAvailable ? 'is-invalid': ''}`}  type="checkbox"  id="isAvailable" name='isAvailable'/>
                <label htmlFor="isAvailable" >Is Available </label>
                {formErrors.isAvailable && <div className='invalid-feedback'>{formErrors.isAvailable}</div>}
              </div>              
          </form>
              }
          
          </Modal.Body>
          <Modal.Footer>
          <Button variant='primary' onClick={hideModal}>Cancel</Button>

            {
              currentVideo?
              <Button variant='warning' onClick={handleSubmit}>Update Video</Button>
              :
              <Button variant='success' onClick={handleSubmit}>Save Video</Button>
            }

          </Modal.Footer>
         </Modal>
      </div>
  );
}

export default VideoFormModal;