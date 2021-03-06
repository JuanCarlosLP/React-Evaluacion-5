import React, {useState, useEffect} from 'react';
import Modal from 'react-modal';
import PokemonDetail from './pokemonDetail/pokemonDetail';
import './card.css';


export default function Card(props) {
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    // componentDidMount
    Modal.setAppElement("body");
  }, []);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () =>{
    setShowModal(false)
  }
 
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '50vw',
      height                : '70vh',
      padding               : '20px',
      overflow              : 'hidden',
    }
  };

  return (
    <div className='card-container'>
      <div className="pokemon-id">
        <h3>{props.number}</h3>
        <h2>{props.name[0].toUpperCase() + props.name.slice(1)}</h2>
      </div>
      <img src={props.img} alt={props.name}/>
      <button onClick={() => openModal()}>
        Details
      </button>

      <Modal isOpen={showModal} style={customStyles}>
        <PokemonDetail number={props.number} name={props.name} img={props.img} closeModalFn={closeModal}/>
      </Modal>
    </div>
  )
}
