import React, { useEffect, useState } from "react"
import ModalDialog from "./components/ModalDialog"
import CopyTextInput from "./components/CopyTextInput"
import { has } from "lodash"
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share"
import PropTypes from 'prop-types';
import {isNumber, toNumber} from 'lodash';

const SocialShareModal =  props => {
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setActive(true);
    }, isNumber(props.delay) ?  toNumber(props.delay)*1000 : 5000);
    return () => clearTimeout(timerId);
  }, []);

  const closeModal = () => {
    setActive(false);
  };

  const isMobile = has(navigator, "share")
  const url = process.env.REACT_APP_BASE_URL
  const mobileShareButton = isMobile ? (
    <div className='control'>
      <button className='button is-primary' onClick={() => {
        navigator.share({
          url,
          text: "Conoce la evolución de la pandemia de covid-19 a tu alrededor y en tiempo real con Geo-Protect",
          title: "Geo-Protect",
        })
      }}>
        Compartir
      </button>
    </div>
  ) : null
  const header = (
    <div className='intro has-background-white'>
      <div className='logo'>
        <img src={"geo-protect-icon.png"} alt='logo'/>
      </div>
      <div className='content'>
        <h1>¡Ayúdanos a salvar vidas!</h1>
        <p>
          Copia el enlace o haz click en los íconos para compartir en tus
          redes sociales
        </p>
      </div>
    </div>
  );
  return (
    <ModalDialog isActive={isActive}
                 className='social-share-modal'
                 title={header}
                 onClose={closeModal}
    >
      <div className='body'>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <div className='field'>
              <div className='control'>
                <CopyTextInput
                  className='input is-info'
                  value={url}/>
              </div>
              {mobileShareButton}
            </div>
          </div>
        </div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            <ul className='social-network-icons'>
              <li>
                <FacebookShareButton url={url}>
                  <FacebookIcon size={64}/>
                </FacebookShareButton>
              </li>
              <li>
                <TwitterShareButton url={url}>
                  <TwitterIcon size={64}/>
                </TwitterShareButton>
              </li>
              <li>
                <WhatsappShareButton url={url}>
                  <WhatsappIcon size={64}/>
                </WhatsappShareButton>
              </li>
            </ul>
          </div>
        </div>
        <div className='level'>
          <div className='level-item  has-text-centered'>
            <button className='button is-medium is-primary' onClick={closeModal}>
              Hecho
            </button>
          </div>
        </div>
      </div>
    </ModalDialog>
  )
}

SocialShareModal.propTypes = {
  delay: PropTypes.number,
};

export default SocialShareModal;