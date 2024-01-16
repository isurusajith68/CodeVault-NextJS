"use client"
import axios from 'axios';
import React from 'react';

import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";

const User = () => {

  const [users, setData] = React.useState({
    nodes: [],
    pageInfo: {},
  });

  const [userName, setUserName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isAdmin, setIsAdmin] = React.useState(false);

  const [editClick, setEditClick] = React.useState(false);
  const [editDataId, setEditDataId] = React.useState(null);


  const doGet = React.useCallback(async () => {
    const response = await axios.get(`/api/user`);
    setData({
      nodes: response.data.data,
      pageInfo: response.data.pageInfo,
    });
  }, []);

  React.useEffect(() => {
    doGet();
  }, [doGet]);


  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
        }
      `,
    BaseCell: `
        margin: 9px;
        padding: 11px;
      `,
    Cell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }
      `,
  });

  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const data = {
    nodes: users.nodes.filter((item) =>
      item.username.toLowerCase().includes(search.toLowerCase())
    ),
  };

  const handleRemove = async (id) => {
    const response = await axios.delete(`/api/user/${id}`);
    if (response.data.status === false) {
      toast.error(response.data.message);
    }
    doGet();
  }

  const handleEditClick = async (item) => {
    setEditClick(true);
    setEditDataId(item._id);
    setUserName(item.username);
    setEmail(item.email);
    setIsAdmin(item.isAdmin);
  }


  const handleUpdate = async (id) => {
    const response = await axios.put(`/api/user/${id}`, { username: userName, email: email, isAdmin: isAdmin });
    if (response.data.status === false) {
      toast.error(response.data.message);
    }
    setEditClick(false);
    setEditDataId(null);
    doGet();
  }

  return (
    <>
      <label htmlFor="search" >
        Search by Task:
        <input id="search" autocomplete="off" value={search} onChange={handleSearch} />
      </label>
      <br />
      <Table data={data} theme={theme}>
        {(tableList) => (
          <>
            <Header>
              <HeaderRow className='bg-slate-100 '>
                <HeaderCell>User Name</HeaderCell>
                <HeaderCell>Email</HeaderCell>
                <HeaderCell>isAdmin</HeaderCell>
                <HeaderCell>Actions</HeaderCell>
                <HeaderCell>Actions</HeaderCell>


              </HeaderRow>
            </Header>

            <Body>
              {tableList.map((item) => {

                return (
                  <React.Fragment key={item._id}>
                    <Row item={item}>
                      {
                        editClick && editDataId === item._id ?
                          <>
                            <Cell className='bg-red-200 border-white border-2'>
                              <input onChange={(e) => setUserName(e.target.value)} className='bg-red-200 border-none focus:outline-none' type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />

                            </Cell>
                            {/* <Cell className='bg-red-200 border-white border-2'>
                              <input className='bg-red-200 border-none focus:outline-none' type="text" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                            <Cell>{item.email}</Cell>
                            {/* </Cell> */}
                            <Cell className='bg-red-200 border-white border-2'>
                              <select className='bg-red-200 border-none focus:outline-none ' value={isAdmin} onChange={(e) => setIsAdmin(e.target.value === "true")}>
                                <option value='true'>true</option>
                                <option value='false'>false</option>
                              </select>

                            </Cell>
                          </>
                          :
                          <>
                            <Cell>{item.username}</Cell>
                            <Cell>{item.email}</Cell>
                            <Cell>{item.isAdmin.toString()}</Cell>
                          </>
                      }

                      <Cell>
                        <button className='text-red-500' type="button" onClick={() => handleRemove(item._id)}>
                          Remove
                        </button>
                      </Cell>
                      <Cell>
                        {
                          editClick && editDataId === item._id ?
                            <div className='flex justify-around'>
                              <button className='text-green-500' type="button" onClick={() => handleUpdate(item._id)}>
                                Update
                              </button>
                              <button className='text-blue-500' type="button" onClick={() => {
                                setEditClick(false);
                                setEditDataId(null);
                  
                              }}>
                                Cancel
                              </button>
                            </div>
                            :
                            <button className='text-green-500' type="button" onClick={() => handleEditClick(item)}>
                              Edit
                            </button>
                        }
                      </Cell>


                    </Row>
                  </React.Fragment>
                );
              })}
            </Body>
          </>
        )}
      </Table>
    </>
  )
}
export default User