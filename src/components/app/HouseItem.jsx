import { Link, useNavigate } from "react-router-dom";
import styles from "./HouseItem.module.css";
import { useHouses } from "../../contexts/HousesContext";
import ConfirmModal from "../modal/ConfirmModal";
import ConfirmDelete from "../modal/ConfirmDelete";
import CancelBtn from "../modal/CancelBtn";
import DeleteBtn from "../modal/DeleteBtn";

function HouseItem({
  house,
  isModalOpen,
  onOpenHouseModal,
  onCloseModal,
  houseToDelete,
}) {
  // to navigate
  const navigate = useNavigate();
  //the current house
  const { currentHouse, deleteHouse, getHouse, editedButtonIsClicked } =
    useHouses();
  // each house
  const { emoji, location, id, position } = house;

  //edit a house
  function handleEditClick(e) {
    e.preventDefault();
    //navigate to form with the at and lng
    navigate(`/app/form?id=${id}&lat=${position.lat}&lng=${position.lng}`);
    //set the current house id
    getHouse(id);
    //if the edited button is clicked
    editedButtonIsClicked();
  }

  //the delete a house
  function handleDeleteClick(e) {
    e.preventDefault();
    deleteHouse(id);
    onCloseModal();
  }

  return (
    <li>
      {/* the confirm modal  */}
      {house.id === houseToDelete[0].id && (
        <ConfirmModal isModalOpen={isModalOpen}>
          <ConfirmDelete
            onCloseModal={onCloseModal}
            houseToDelete={houseToDelete}
          >
            <CancelBtn onClick={() => onCloseModal()} />
            <DeleteBtn onClick={handleDeleteClick} />
          </ConfirmDelete>
        </ConfirmModal>
      )}

      <Link
        className={`${styles.houseItem} ${
          id === currentHouse.id ? styles["houseItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        {/* the houses details  */}
        <span>{emoji}</span>
        <span>{location}</span>
        <span>H00{id}</span>
        <button className={styles.btn} onClick={handleEditClick}>
          Edit
        </button>
        <button
          className={styles.btn}
          onClick={(e) => onOpenHouseModal(e, house.id)}
        >
          &times;
        </button>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#e3e3e3"
          >
            <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
          </svg>
        </span>
      </Link>
    </li>
  );
}

export default HouseItem;
