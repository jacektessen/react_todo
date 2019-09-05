import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Input, FormGroup, Label, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component  {
  state = {
    tasks: [],
    newTaskData: {
      name: '',
      completed: false,
      created_at: ''
    },
    editTaskData: {
      id: '',
      name: '',
      completed: false,
      created_at: ''
    },
    newTaskModal: false,
    editTaskModal: false,

  }
  componentDidMount() {
    this._refreshTasks();
  }
  toggleNewTaskModal() {
    this.setState({
      newTaskModal: ! this.state.newTaskModal
    });
  }
  toggleEditTaskModal() {
    this.setState({
      editTaskModal: ! this.state.editTaskModal
    });
  }
  addTask() {
    axios.post('http://localhost:8000/api/v1/tasks/', this.state.newTaskData).then((response) => {
      let { tasks } = this.state;

      tasks.push(response.data);

      this.setState({ tasks, newTaskModal: false, newTaskData: {
        name: '',
        completed: false
      }})
    });
  }
  updateTask() {
    let { name, completed } = this.state.editTaskData;

    axios.put('http://localhost:8000/api/v1/tasks/' + this.state.editTaskData.id + '/', {
      name, completed
    }).then((response) => {
      this._refreshTasks();

      this.setState({
        editTaskModal: false, editTaskData: { id: '', name: '', completed: false}
      })
    });
  }
  editTask(id, name, completed) {
    this.setState({
      editTaskData: { id, name, completed }, editTaskModal: ! this.state.editTaskModal
    });
  }
  deleteTask(id) {
    axios.delete('http://localhost:8000/api/v1/tasks/' + id + '/').then((response) => {
      this._refreshTasks();
    });
  }
  isCompleted(completed) {
    return completed === false ? "to do" : "done :)";
  }
  _refreshTasks() {
    axios.get('http://localhost:8000/api/v1/tasks/').then(response => response.data).then((data) => {
      this.setState({ tasks: data })
    })
  }
  render() { 

    let tasksTodo = this.state.tasks.filter((value) => {
      return value.completed === false;
    }).map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.name}</td>
          <td>
            {this.isCompleted(task.completed)}
          </td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, task.id, task.name, task.completed, task.created_at)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
          </td>
          <td>{moment(task.created_at).calendar()}</td>
        </tr>
      )
    });
    let tasksDone = this.state.tasks.filter((value) => {
      return value.completed === true;
    }).map((task) => {
      return (
        <tr key={task.id}>
          <td>{task.id}</td>
          <td>{task.name}</td>
          <td>
            {this.isCompleted(task.completed)}
          </td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, task.id, task.name, task.completed, task.created_at)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
          </td>
          <td>{moment(task.created_at).calendar()}</td>
        </tr>
      )
    });
    return (
      <div className="App container">

        <Button color="primary" onClick={this.toggleNewTaskModal.bind(this)}>Add Task</Button>

        <Modal isOpen={this.state.newTaskModal} toggle={this.toggleNewTaskModal.bind(this)}>
          <ModalHeader toggle={this.toggleNewTaskModal.bind(this)}>Add a new Task</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" value={this.state.newTaskData.name} onChange={(e) => {
                let { newTaskData } = this.state;

                newTaskData.name = e.target.value;

                this.setState({ newTaskData });
              }} />
            </FormGroup>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
            <Button color="secondary" onClick={this.toggleNewTaskModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editTaskModal} toggle={this.toggleEditTaskModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditTaskModal.bind(this)}>Edit the Task</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input id="name" value={this.state.editTaskData.name} onChange={(e) => {
                let { editTaskData } = this.state;

                editTaskData.name = e.target.value;

                this.setState({ editTaskData });
              }} />
            </FormGroup>
            <FormGroup check>
              <Label check for="completed">Completed</Label>
              <Input type="checkbox" id="completed" value={this.state.editTaskData.completed} onChange={(e) => {
                let { editTaskData } = this.state;

                editTaskData.completed = e.target.value;

                this.setState({ editTaskData });
              }} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.updateTask.bind(this)}>Update Task</Button>{' '}
            <Button color="secondary" onClick={this.toggleEditTaskModal.bind(this)}>Cancel</Button>
          </ModalFooter>
        </Modal>

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Completed</th>
              <th>Actions</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {tasksTodo}
            <td colspan="5"><span className="font-weight-bold">History of completed tasks:</span></td>
            {tasksDone}
          </tbody>
        </Table>
        
      </div>
    );
  }
}
 
export default App;