import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="CabinForm">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Window name="CabinForm">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );

  // const [isClicked, setIsClicked] = useState(false);

  // return (
  //   <>
  //     <Button onClick={() => setIsClicked((c) => !c)}>Add a new cabin</Button>
  //     {isClicked && (
  //       <Modal onClose={() => setIsClicked(false)}>
  //         <CreateCabinForm onClose={() => setIsClicked(false)} />
  //       </Modal>
  //     )}
  //   </>
  // );
}

export default AddCabin;
