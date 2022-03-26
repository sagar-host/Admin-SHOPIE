import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {userRequest} from '../../requestMethods'

export default function WidgetSm() {
  const [users, setUsers] = useState([])

  useEffect(()=>{
     const getUsers = async ()=>{
       try{
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data)
       }catch {}
     
     }
     getUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.map(user=>(

    
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={users.img || "https://thumbs.dreamstime.com/b/user-icon-trendy-flat-style-isolated-grey-background-user-symbol-user-icon-trendy-flat-style-isolated-grey-background-123663211.jpg"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>
        ))}
        
      </ul>
    </div>
  );
}
