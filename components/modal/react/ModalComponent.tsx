import React, { useEffect, useState } from 'react';
import "./styles.css"
import { useCssHandles } from 'vtex.css-handles'

interface modalComponent {
  imageDesktop: string;
  imageMobile: string;
  linkModal: string
}

const CSS_HANDLES = [
  'estrategiaModalDcto',
  'estrategiaModalDctoClose',
  'desktopImageModal',
  'mobileImageModal',
] as const

function ModalComponent({ imageDesktop, imageMobile, linkModal }: modalComponent) {
    const [isOpen, setIsOpen] = useState(false);
    const [showElement, setShowElement] = useState(false);
    const handles = useCssHandles(CSS_HANDLES)
  
    useEffect(() => {
      const checkModal = () => {
        const lastClosed = localStorage.getItem("modalclosed");
        const now = Date.now();
    
        if (!lastClosed) {
          setIsOpen(true);
        } else if (now - parseInt(lastClosed) >= 3600000) { 
          setIsOpen(true);
        }
      };
    
      checkModal();
    
      const interval = setInterval(checkModal, 1000);
    
      return () => clearInterval(interval);
    }, []);


    /****SCROLL ***********/

    useEffect(() => {
      // Verificar si estamos en la página principal utilizando window.location
      if (window.location.pathname === "/") {
        const handleScroll = () => {
          if (window.scrollY > 100) {
            setShowElement(true);
          } else {
            setShowElement(false);
          }
        };
  
        // Añadir el evento de scroll
        window.addEventListener("scroll", handleScroll);
  
        // Limpiar el evento cuando el componente se desmonta
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }

      setShowElement(true);
      return () => {}
    }, []); 

    /********SCROLL *******/
  
    
  
    function closeModal() {
      setIsOpen(false);
      localStorage.setItem("modalclosed", Date.now().toString());
    }

   return(
    isOpen && showElement && (
    <div className={handles.estrategiaModalDcto}>
        <button
          className={handles.estrategiaModalDctoClose}
          onClick={closeModal}
        >X</button>
      <a href={linkModal}>
         <img src={imageDesktop} alt="Modal Desktop" className={handles.desktopImageModal} />
         <img src={imageMobile} alt="Modal Mob" className={handles.mobileImageModal} />
      </a>
      </div>
   )
  )
}

ModalComponent.schema = {
   title: 'Custom modal dcto',
   type: 'object',
   properties: {
      imageDesktop: {
        title: 'Image modal Desktop',
        default: '',
        type: 'string',
         widget: {
          "ui:widget": "image-uploader"
       }
      },
      imageMobile: {
         title: 'Image modal Mobile',
         default: '',
         type: 'string',
         widget: {
            "ui:widget": "image-uploader"
         }
      },
      linkModal: {
        type: 'string',
        title: 'Link modal'
      }
   }
};

export default ModalComponent;