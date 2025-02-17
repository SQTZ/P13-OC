import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfileSuccess } from '../store/features/userSlice'
import { authService } from '../services/authService'

export default function User() {
    const dispatch = useDispatch()
    const { firstName, lastName } = useSelector(state => state.user)
    const { token } = useSelector(state => state.auth)
    const [isEditing, setIsEditing] = useState(false)
    const [editedFirstName, setEditedFirstName] = useState(firstName)
    const [editedLastName, setEditedLastName] = useState(lastName)

    const handleEdit = () => {
        setIsEditing(true)
        setEditedFirstName(firstName)
        setEditedLastName(lastName)
    }

    const handleSave = async () => {
        try {
            await authService.updateUserProfile(token, editedFirstName, editedLastName)
            dispatch(updateProfileSuccess({
                firstName: editedFirstName,
                lastName: editedLastName
            }))
            setIsEditing(false)
        } catch (error) {
            console.error('Failed to update profile:', error)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
    }

    return (
        <div>
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back</h1>
                    {isEditing ? (
                        <>
                            <div className="edit-name-inputs">
                                <input
                                    type="text"
                                    className="edit-name-input"
                                    value={editedFirstName}
                                    onChange={(e) => setEditedFirstName(e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="edit-name-input"
                                    value={editedLastName}
                                    onChange={(e) => setEditedLastName(e.target.value)}
                                />
                            </div>
                            <div className="edit-name-buttons">
                                <button onClick={handleSave} className="edit-name-button save">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="edit-name-button cancel">
                                    Cancel
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>{firstName} {lastName}!</h1>
                            <button className="edit-button" onClick={handleEdit}>Edit Name</button>
                        </>
                    )}
                </div>
                <h2 className="sr-only">Accounts</h2>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Checking (x8349)</h3>
                        <p className="account-amount">$2,082.79</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Savings (x6712)</h3>
                        <p className="account-amount">$10,928.42</p>
                        <p className="account-amount-description">Available Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
                <section className="account">
                    <div className="account-content-wrapper">
                        <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
                        <p className="account-amount">$184.30</p>
                        <p className="account-amount-description">Current Balance</p>
                    </div>
                    <div className="account-content-wrapper cta">
                        <button className="transaction-button">View transactions</button>
                    </div>
                </section>
            </main>
        </div>
    )
}