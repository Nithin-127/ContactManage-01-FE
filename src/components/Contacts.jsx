import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { deletecnt, editcnt, getcontacts, postcontact } from "./services/Axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Contacts = () => {
  const [contactFt, setcontactFt] = useState([]);

  const [postData, setpostData] = useState({
    name: "",
    age: "",
    phno: "",
  });

  const [editingData, seteditingData] = useState({
    id: "",
    name: "",
    age: "",
    phno: "",
  });

  // get data
  let getFn = async () => {
    let response = await getcontacts();
    setcontactFt(response.data);
  };

  // post data
  let postFn = async () => {
    await postcontact(postData);
    getFn();
    setpostData({ name: "", age: "", phno: "" });
  };

  // delete data
  let deleteFn = async (id) => {
    await deletecnt(id);
    getFn();
  };

  // edit data function
  const EditFn = async () => {
    await editcnt(editingData.id, editingData);
    getFn();
  };

  useEffect(() => {
    getFn();
  }, []);

  // save modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // edit modal
  const [editModal, seteditModal] = useState(false);
  const showeditmoda = () => seteditModal(true);
  const hideeditmodal = () => seteditModal(false);

  return (
    <div>
      <div className="container">
        <h4 className="text-center mt-4 bg-danger p-2 text-white">
          CONTACT MANAGEMENT SYSTEM
        </h4>

        <div className="text-center mt-3">
          <Button variant="primary" onClick={handleShow}>
            ADD Contact
          </Button>
        </div>

        <div className="mt-5">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>Name</th>
                <th>AGE</th>
                <th>PHONE</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {contactFt.map((each, index) => (
                <tr key={index}>
                  <td>{each.id}</td>
                  <td>{each.name}</td>
                  <td>{each.age}</td>
                  <td>{each.phno}</td>

                  <td>
                    <div className="d-flex justify-content-center gap-3">
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          showeditmoda();
                          seteditingData({
                            id: each.id,
                            name: each.name,
                            age: each.age,
                            phno: each.phno,
                          });
                        }}
                      >
                        EDIT
                      </button>

                      <button
                        onClick={() => deleteFn(each.id)}
                        className="btn btn-danger"
                      >
                        DELETE
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Add Modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <input
                value={postData.name}
                onChange={(e) =>
                  setpostData({ ...postData, name: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter name"
                type="text"
              />
              <input
                value={postData.age}
                onChange={(e) =>
                  setpostData({ ...postData, age: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter age"
                type="text"
              />
              <input
                value={postData.phno}
                onChange={(e) =>
                  setpostData({ ...postData, phno: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter phone"
                type="text"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                postFn();
                handleClose();
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={editModal} onHide={hideeditmodal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <input
                value={editingData.name}
                onChange={(e) =>
                  seteditingData({ ...editingData, name: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter name"
                type="text"
              />
              <input
                value={editingData.age}
                onChange={(e) =>
                  seteditingData({ ...editingData, age: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter age"
                type="text"
              />
              <input
                value={editingData.phno}
                onChange={(e) =>
                  seteditingData({ ...editingData, phno: e.target.value })
                }
                className="mt-3 form-control"
                placeholder="Enter phone"
                type="text"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={hideeditmodal}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                EditFn();
                hideeditmodal();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Contacts;