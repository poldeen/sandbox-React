import ActionButton from 'components/common/ActionButton';
import PageHeader from 'components/common/PageHeader';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTable } from 'react-table';
import ProfileService from 'services/profile.service';

const UserAdminTable = props => {
  const [users, setUsers] = useState([]);
  const [searchFirstName, setSearchFirstName] = useState('');
  const [currentUser, setCurrentUser] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const usersRef = useRef();
  let navigate = useNavigate();

  usersRef.current = users;

  useEffect(() => {
    retrieveUsers();
  }, []);

  const onUserSearch = e => {
    const searchFirstName = e.target.value;
    setSearchFirstName(searchFirstName);
  };

  const retrieveUsers = () => {
    ProfileService.getProfiles()
      .then(response => {
        setUsers(response);
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateUser = () => {
    ProfileService.updateProfile(currentUser.profileId, currentUser)
      .then(response => {
        console.log(response);
        retrieveUsers();
        setModalShow(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteUser = rowIdx => {
    ProfileService.deleteProfile(rowIdx)
      .then(response => {
        console.log(response);
        let newUsers = [...usersRef.current];
        newUsers.splice(rowIdx, 1);

        setUsers(newUsers);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByFirstName = () => {
    ProfileService.getProfilesByFirstName(searchFirstName)
      .then(response => {
        if (response) {
          setUsers(response);
        } else {
          setUsers([]);
        }
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const openUser = currentUser => {
    setCurrentUser(currentUser);
    setModalShow(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Email',
        accessor: 'username'
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        Cell: props => {
          const rowIdx = props.row.original.profileId;
          console.log('rowIdx = ' + rowIdx);
          return (
            <>
              <ActionButton
                icon="edit"
                title="Edit"
                variant="action"
                className="p-0 me-2"
                onClick={() => openUser(props.row.original)}
              />
              <ActionButton
                icon="trash-alt"
                title="Delete"
                variant="action"
                className="p-0"
                onClick={() => deleteUser(rowIdx)}
              />
            </>
          );
        }
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: users,
      initialState: { pageSize: 10 }
    });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentUser({ ...currentUser, [name]: value });
  };

  return (
    <>
      <PageHeader title="User Admin" className="mb-3"></PageHeader>
      <Card>
        <Card.Body>
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by title"
                  value={searchFirstName}
                  onChange={onUserSearch}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={findByFirstName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-12 list">
              <table
                className="table table-striped table-bordered"
                {...getTableProps()}
              >
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td {...cell.getCellProps()}>
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Modal show={modalShow} onHide={() => setModalShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit User
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 mb-3">
            <Form.Label column="sm" lg={2}>
              First Name
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                id="firstName"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleInputChange}
              />
            </Col>

            <Form.Label column="sm" lg={2}>
              Last Name
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                id="lastName"
                name="lastName"
                value={currentUser.lastName}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="g-3  mb-3">
            <Form.Label column="sm" lg={2}>
              Email
            </Form.Label>
            <Col>
              <Form.Control
                size="sm"
                type="text"
                id="username"
                name="username"
                value={currentUser.username}
                onChange={handleInputChange}
              />
            </Col>
          </Row>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateUser}
          >
            Update
          </button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserAdminTable;
