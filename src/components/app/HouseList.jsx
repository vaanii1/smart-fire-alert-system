import { useState } from "react";
import { useHouses } from "../../contexts/HousesContext";
import Message from "../message/Message";
import Spinner from "../Spinner/Spinner";
import HouseItem from "./HouseItem";
import styles from "./HouseList.module.css";

function HousesList() {
  // open modal to confirm delete
  const [isModalOpen, setIsModalOpen] = useState(false);
  // to delete a house
  const [houseToDelete, setHouseToDelete] = useState([{}]);
  // handle open delete house Modal
  function handleOpenModal() {
    setIsModalOpen((isOpen) => !isOpen);
  }

  //data from the context
  const { houses, isLoading } = useHouses();
  //when the data is loading
  if (isLoading) return <Spinner />;
  //when there's no data
  if (!houses.length) return <Message message="Add Houses via the map." />;

  //the house to delete
  function handleHouseToDelete(id) {
    setHouseToDelete(houses.filter((house) => house.id === id));
  }
  //open house model
  function handleOpenHouseModal(e, id) {
    e.preventDefault();
    handleOpenModal();
    handleHouseToDelete(id);
    console.log(houseToDelete);
  }
  //close modal
  function handleCloseModal() {
    handleOpenModal();
    setHouseToDelete([{}]);
  }

  return (
    <ul className={styles.houseList}>
      {houses.map((house) => (
        <HouseItem
          house={house}
          key={house.id}
          isModalOpen={isModalOpen}
          onOpenModal={handleOpenModal}
          onOpenHouseModal={handleOpenHouseModal}
          onCloseModal={handleCloseModal}
          houseToDelete={houseToDelete}
        />
      ))}
    </ul>
  );
}

export default HousesList;
