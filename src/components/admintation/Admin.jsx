import React from 'react'
import AdminPhoto from '../../images/admin.jpg'
import "../admintation/Admin.css"
function Admin() {
  return (
    <div className='Admin'>
      <div>
        <img className='Admin__photo' src={AdminPhoto} alt="" />
      </div>
    </div>
  )
}

export default Admin
