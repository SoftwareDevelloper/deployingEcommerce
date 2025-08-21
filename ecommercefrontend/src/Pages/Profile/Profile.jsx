import { useEffect, useState } from 'react';
import '../CSS/profile.css';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
const Profile = () => {
  const { id } = useParams();
  console.log("User ObjectId from URL:", id);
  const [User,setUser] =useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }
  //fetch profile info
  useEffect(()=>{
    fetch(`http://localhost:4000/ClientInfo/${id}`)
      .then((response) => response.json())
      .then((data)=>{
        console.log('User fetched',data);
        setUser(data);
        setFormData(prev => ({
          ...prev,
          name:data.name || "",
          email:data.email || "",
        }));
      })
       .catch((error) => {
          console.error('Error fetching user:', error);
        });
  }, [id]);
  // update profile info
  const UpdateCLIENTProfile = async()=>{
    if (!formData.name ||!formData.email || !formData.oldPassword || !formData.newPassword || !formData.confirmPassword ) {
      toast.info("Please fill all fields");
      return;
    }
    console.log(formData);
    let responseData;
    await fetch(`http://localhost:4000/updateProfile/${id}`,{
      method:"PUT",
      headers:{
        Accept:'application/json',
        'Content-type':'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response)=> response.json())
    .then((data)=> responseData=data);
    toast.success("Profile updated successfully")
    
  }
return (
    <div className='profile'>
      <ToastContainer/>
      <div className='MyProfile'>
        <span>Edit Your Profile</span>
        <form action="#" className="editProfile" onSubmit={(e)=>{e.preventDefault(); UpdateCLIENTProfile()}}>
          <div className="name_email">
            <div className="name">
              <label className="label">First name</label>
              <input type="text" name="name" className='inputs' value={formData.name} onChange={changeHandler}  />
            </div>
            <div className="e-mail">
              <div className="label">Email</div>
              <input type="email" name="email" className="inputs"  value={formData.email} onChange={changeHandler} />
            </div>
          </div>
          <div className="PasswordChanges">
            <label  className="label">Password Changes</label>
            <input type="password" name="oldPassword" className='inputs' placeholder='Current Password'value={formData.oldPassword} onChange={changeHandler}  />
            <input type="password" name="newPassword" className='inputs' placeholder='New Password' value={formData.newPassword} onChange={changeHandler} />
            <input type="password" name="confirmPassword" className='inputs' placeholder='Confirm New Password' value={formData.confirmPassword} onChange={changeHandler} />
          </div>
          <div className="buttons">
            <button className="cancel" type='reset'>Cancel</button>
            <button type="submit" className="save">Save Changes</button>
          </div>
        </form>
      </div>
      <div className="welcomeHeaderRight">
            <p>Welcome!<span> {User.name} </span> </p>
      </div>
    </div>
  )
}
export default Profile
