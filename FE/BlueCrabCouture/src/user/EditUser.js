import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { findUserAccountById, findUserRole, updateUserAccount } from '../API/ApiService'

export default function EditUser() {
    let navigate = useNavigate()
    const { id } = useParams()
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState(
        {
            phoneNumber: "",
            email: "",
            password: "",
            idUserRole: {}
        }
    )
    const { phoneNumber, email, password } = user
    const onChangeInput = async (e) => {
        if (e.target.name === "role") {
            const userRole = await findUserRole(e.target.value);
            setUser({ ...user, idUserRole: userRole });
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    }
    useEffect(() => { loadUser() }, [])
    const onSubmit = async (e) => {
        e.preventDefault()
        try {
            await updateUserAccount(user)
            navigate("/user")
        } catch (error) {
            setErrors(error.response.data);
        }
    }

    const loadUser = async () => {
        const result = await findUserAccountById(id)
        setUser(result)
    }
    return (
        <div className='container'>
            <h1>Edit User</h1>
            <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-floating mb-3">
                    <input type={"email"} className="form-control" id="email" name='email' value={email} onChange={(e) => onChangeInput(e)} />
                    <label htmlFor="email">Email address</label>
                    <div className="text-danger text-start">{errors.email}</div>
                </div>
                <div className="form-floating mb-3">
                    <input type={"tel"} className="form-control" id="phone" name='phoneNumber' value={phoneNumber} onChange={(e) => onChangeInput(e)} />
                    <label htmlFor="phone">Phone number</label>
                    <div className="text-danger text-start">{errors.phoneNumber}</div>
                </div>
                <div className="form-floating mb-3">
                    <input type={"password"} className="form-control" id="pw" name='password' value={password} onChange={(e) => onChangeInput(e)} />
                    <label htmlFor="pw">Password</label>
                    <div className="text-danger text-start">{errors.password}</div>
                </div>
                <div className="form-floating mb-3" >
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type={"radio"} name="role" id="admin" value="1" checked={user.idUserRole.id == 1} onChange={(e) => onChangeInput(e)} />
                        <label className="form-check-label" htmlFor="admin">Admin</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type={"radio"} name="role" id="user" value="2" checked={user.idUserRole.id == 2} onChange={(e) => onChangeInput(e)} />
                        <label className="form-check-label" htmlFor="user">User</label>
                    </div>
                </div>
                <button type='submit' className='btn btn-outline-success mx-2'>Update</button>
                <Link to="/user" className='btn btn-outline-danger'>Cancel</Link>
            </form>
        </div>
    )
}
