import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  Card,
  Container,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap"
import Header from "./components/Header"

const initialTitles = [
  { id: 1, title: "Do Work" },
  { id: 2, title: "Eat Food" },
  { id: 3, title: "Take a Nap" },
  { id: 4, title: "Code" },
  { id: 5, title: "Sleep" },
]

function App() {
  const [titles, setTitles] = useState(initialTitles)
  const [title, setTitle] = useState("")
  const [showEdit, setShowEdit] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editIndex, setEditIndex] = useState(null)
  const [sort, setSort] = useState("")

  function handleOnDragEnd(result) {
    if (!result.destination) return

    const items = Array.from(titles)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setTitles(items)
  }

  function handleTitleChange(e) {
    setTitle(e.target.value)
  }

  function handleEditTitleChange(e) {
    setEditTitle(e.target.value)
  }

  function handleEdit(id) {
    const index = titles.findIndex((title) => title.id === id)
    setEditTitle(titles[index].title)
    setEditIndex(index)
    setShowEdit(true)
  }

  function handleSaveEdit() {
    const items = Array.from(titles)
    items[editIndex].title = editTitle
    setTitles(items)
    setShowEdit(false)
  }

  function handleCloseEdit() {
    setShowEdit(false)
  }

  function handleDelete(id) {
    setTitles(titles.filter((title) => title.id !== id))
  }

  function handleSort(value) {
    setSort(value)
    const items = Array.from(titles)
    if (value === "asc") {
      items.sort((a, b) => a.title.localeCompare(b.title))
    } else if (value === "desc") {
      items.sort((a, b) => b.title.localeCompare(a.title))
    }
    setTitles(items)
  }

  return (
    <>
      <Header />
      <Container>
        <InputGroup className="my-3 w-100 w-md-75 w-lg-50 mx-auto">
          <Form.Control
            size="lg"
            placeholder="Add a title..."
            value={title}
            onChange={handleTitleChange}
          />
          <Button
            variant="primary"
            onClick={() => {
              setTitles([...titles, { id: titles.length + 1, title }])
              setTitle("")
            }}
          >
            Add
          </Button>
        </InputGroup>
        <Form.Select
          aria-label="Sort"
          className="w-25 mb-3 ms-auto"
          onChange={(e) => handleSort(e.target.value)}
          value={sort}
        >
          <option>Sort By</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </Form.Select>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="title">
            {(provided) => (
              <div
                className="title"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {titles.map(({ id, title }, index) => {
                  return (
                    <Draggable
                      key={id}
                      draggableId={id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card.Body className="d-flex justify-content-between align-items-center">
                            <Card.Title>{title}</Card.Title>
                            <div>
                              <Button
                                variant="warning"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(id)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDelete(id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <Modal show={showEdit} onHide={handleCloseEdit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control value={editTitle} onChange={handleEditTitleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEdit}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  )
}

export default App
