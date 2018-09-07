import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';




export class FetchEmployee extends Component {
   
 

    constructor() {
        super();
        this.state = {
            empList: [],
            loading: true
        };

        fetch('api/Employee/Index')
            .then(response => response.json())
            .then(data => {
                this.setState({ empList: data, loading: false });
            });

        //fetch('api/Employee/Index')
        //    .then(response => response.text())
        //    .then(text => console.log(text));

        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    // Handle Delete request for an employee 
    handleDelete(id) {
        if (!window.confirm("Do you want to delete employee with Id: " + id))
            return;
        else {
            fetch('api/Employee/Delete/?id=' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeId !== id);
                        })
                    });
            });
        }
    } 

    handleEdit(id) {
        this.props.history.push({
            pathname: "addemployee",
            empid: id
        });
    }


    renderEmployeeTable(empList) {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <th></th>
                        <th>EmployeeId</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Department</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {empList.map(emp =>
                        
                            <tr key={emp.employeeId}>
                            <td></td>
                            <td>{emp.employeeId}</td>
                            <td>{emp.name}</td>
                            <td>{emp.gender}</td>
                            <td>{emp.department}</td>
                            <td>{emp.city}</td>
                            <td>
                                <a className="action" onClick={(id)=>this.handleEdit(emp.employeeId)}>Edit</a>  |
                                <a className="action" onClick={(id) => this.handleDelete(emp.employeeId)}>Delete</a>
                            </td>
                            </tr>
                           )
                    }
                </tbody>
            </table>
            ); 
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderEmployeeTable(this.state.empList);

        return (
            <div>
                <h1>Employee Data</h1>
                <p>This component demonstrates fetching Employee data from the server.</p>
                <p>
                    <Link to="/addemployee">Create New</Link>
                </p>
                {contents}
            </div>
        );
    }
}

export class EmployeeData {
    employeeId = 0;
    name = "";
    gender = "";
    city = "";
    department = "";
}

