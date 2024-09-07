import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open>
        <div>
          <Button>Add a Cabin</Button>
        </div>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
