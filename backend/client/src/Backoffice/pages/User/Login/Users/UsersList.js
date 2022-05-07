import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { Dropdown } from 'primereact/dropdown';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { userService } from '../../_services';

const UsersList = () => {
    let emptyUser = {
        _id: null,
        username: null,
        firstname: null,
        lastname: null,
        mailAddress: null,
        lockUntil: 0,
        img:null,
        loginAttempts: 0,
        roles: null,
    };

    const [userDialog, setUserDialog] = useState(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState(false);
    const [deleteUsersDialog, setDeleteUsersDialog] = useState(false);
    const [user,setUser] = useState(emptyUser)
    const [addUser,setAddUser] = useState(emptyUser)
    const [users, setUsers] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [dropdownValue, setDropdownValue] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const dropdownValues = [
        { name: 'Simple User', code: 'Simple User' },
        { name: 'Admin', code: 'Admin' },
        { name: 'Financial', code: 'Financial' }
    ];

    useEffect(() => {
        setTimeout(()=>{
            getListFunction()
        },100)
    },[])

    /*useEffect(()=>{
        setTimeout(() => {
            users.map((user)=>{
            if (user.roles) {
                const roleres = roleService.getRole(user.roles)
                roleres.then((value)=>{
                    user.roles = value.data.type
                    })
                }
            })
            setUsers(users)
        }, 100);
    },[users])*/

    const getListFunction = () =>{
        const res = userService.getAll()
        Promise.resolve(res)
        .then((value)=>{
            setUsers(value.data)
        })
    }


    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }

    const openNew = () => {
        setAddUser(emptyUser);
        setSubmitted(false);
        setUserDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setUserDialog(false);
    }

    const hideDeleteUserDialog = () => {
        setDeleteUserDialog(false);
    }

    const saveUser = () => {
        setSubmitted(true);
        let _users = [...users];
        let _user = { ...addUser };
        if (_user._id) {
            userService.update(_user)
            const index = findIndexById(_user._id);
            _users[index] = _user;
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Updated', life: 3000 });
        } else {
            userService.addUser(_user)
            _users.push(_user);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Created', life: 3000 });
            window.location.reload(false);
        }
        setUsers(_users);
        setUserDialog(false);
        setUser(emptyUser);

    }

    const getUserImage = (user) => {
        const res = userService.getUserImage(user.img)
                res.then((value)=>{
                    user.img = value.data.img.imgName
                    })
    }

    const editUser = (user) => {
        setAddUser({ ...user });
        setUserDialog(true);
    }

    const confirmDeleteUser = (user) => {
        setUser(user);
        setDeleteUserDialog(true);
    }

    const deleteUser = () => {
        userService.delete(user._id)
        getListFunction()
        setDeleteUserDialog(false);
        setUser(emptyUser);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'User Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const exportCSV = () => {
        dt.current.exportCSV();
    }

    const confirmDeleteSelected = () => {
        setDeleteUsersDialog(true);
    }

    const deleteSelectedUsers = () => {
        selectedUsers.map((user)=>{
            userService.delete(user._id)
            })
        getListFunction()
        setDeleteUsersDialog(false);
        setSelectedUsers(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Users Deleted', life: 3000 });
    }

    const onCategoryChange = (e) => {
        let _user = { ...user };
        _user['category'] = e.value;
        setUser(_user);
    }

    const onInputChange = (e, username) => {
        const val = (e.target && e.target.value) || '';
        let _user = { ...addUser };
        if (username==='roles') {
            setDropdownValue(e.value)
            _user[`${username}`] = val.name;
            console.log(dropdownValue)
        }
        else {
            _user[`${username}`] = val;
        }
        setAddUser(_user);
        console.log(_user)
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _user = { ...user };
        _user[`${name}`] = val;
        setUser(_user);
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                    <Button label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedUsers || !selectedUsers.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            </React.Fragment>
        )
    }
    const codeBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.code}
            </>
        );
    }

    const nameBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Name</span>
                {rowData.name}
            </>
        );
    }


    const imageBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Image</span>
                <img src={require("../../../../../assets/layout/images/"+rowData.img.imgName)} alt={"a"} className="shadow-2" width="100" />
            </>
        )
    }

    const priceBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Price</span>
                {formatCurrency(rowData.price)}
            </>
        );
    }

    const categoryBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.category}
            </>
        );
    }

    const ratingBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Reviews</span>
                <Rating value={rowData.rating} readonly cancel={false} />
            </>
        );
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span className="p-column-title">Status</span>
                <span className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}>{rowData.inventoryStatus}</span>
            </>
        )
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editUser(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteUser(rowData)} />
            </div>
        );
    }

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Manage Users</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );

    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveUser} />
        </>
    );
    const deleteProductDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteUser} />
        </>
    );
    const deleteProductsDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteUserDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedUsers} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={users} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}
                        dataKey="_id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} users"
                        globalFilter={globalFilter} emptyMessage="No users found." header={header} responsiveLayout="scroll">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem'}}></Column>
                        <Column field="username" header="User Name" sortable body={user.username} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="mailAddress" header="Mail Address" sortable body={user.mailAddress} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column header="Image" body={imageBodyTemplate} headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column field="roles" header="Role" body={user.roles} sortable headerStyle={{ width: '14%', minWidth: '10rem' }}></Column>
                        <Column body={actionBodyTemplate}></Column>
                    </DataTable>

                    <Dialog visible={userDialog} style={{ width: '450px' }} header="Add/Update User" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <InputText id="username" value={addUser.username} onChange={(e) => onInputChange(e, 'username')} required autoFocus className={classNames({ 'p-invalid': submitted && !addUser.name })} />
                            {submitted && !addUser.username && <small className="p-invalid">Username is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="mailAddress">Mail Address</label>
                            <InputText id="mailAddress" value={addUser.mailAddress} onChange={(e) => onInputChange(e, 'mailAddress')} required rows={3} cols={20} />
                            {submitted && !addUser.mailAddress && <small className="p-invalid">mailAddress is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="firstname">Name</label>
                            <InputText id="firstname" value={addUser.firstname} onChange={(e) => onInputChange(e, 'firstname')} required rows={3} cols={20} />
                            {submitted && !addUser.firstname && <small className="p-invalid">Name is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="lastname">Lastname</label>
                            <InputText id="lastname" value={addUser.lastname} onChange={(e) => onInputChange(e, 'lastname')} required rows={3} cols={20} />
                            {submitted && !addUser.lastname && <small className="p-invalid">Lastname is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="lastname">Role</label>
                            <Dropdown value={dropdownValue} onChange={(e) => onInputChange(e,'roles')} options={dropdownValues} optionLabel="name" placeholder="Select" />
                            {submitted && !addUser.roles && <small className="p-invalid">Role is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <InputText id="password" onChange={(e) => onInputChange(e, 'password')} required rows={3} cols={20} />
                            {submitted && !addUser.password && <small className="p-invalid">Password is required.</small>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUserDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {user && <span>Are you sure you want to delete <b>{user.username}</b>?</span>}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsersDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteUserDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {users && <span>Are you sure you want to delete the selected users?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(UsersList, comparisonFn);
