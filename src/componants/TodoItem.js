import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodoAsync, editTodoAsync } from "../Redux/TodoSlice";
import { Modal, Button, Form } from "react-bootstrap";

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState(todo.taskName);
  const [editedStatus, setEditedStatus] = useState(todo.status);

  const handleEdit = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = () => {
    // Dispatch the editTodoAsync action creator with the updated todo information
    dispatch(
      editTodoAsync(todo.id, { taskName: editedTaskName, status: editedStatus })
    );
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteTodoAsync(todo.id));
  };

  return (
    <>
      <tr>
        <td>{todo.taskName}</td>
        <td>
          {todo.status === "in progress" ? (
            <div className="badge bg-primary">{todo.status}</div>
          ) : todo.status === "in Testing" ? (
            <div className="badge bg-warning">{todo.status}</div>
          ) : todo.status === "Completed" ? (
            <div className="badge bg-success">{todo.status}</div>
          ) : (
            <div className="badge bg-secondary">{todo.status}</div>
          )}
        </td>

        <td>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
          <button className="btn btn-secondary mx-2" onClick={handleEdit}>
            Edit
          </button>
        </td>
      </tr>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTaskName">
              <Form.Label>Task Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name"
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                className="form-select"
                as="select"
                value={editedStatus}
                onChange={(e) => setEditedStatus(e.target.value)}
              >
                <option value="in progress">In Progress</option>
                <option value="in Testing">In Testing</option>
                <option value="Completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TodoItem;
