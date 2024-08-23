import styled from "styled-components";
import testImg from "../../../img/person.png";
import { useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import GoogleLogin from "../../GoogleLogin/login";

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ImgStyle = styled.img`
  width: 35px;
  height: 35px;
  border: #615efc 1px solid;
  border-radius: 50%;
`;

const LogoutBox = styled.div`
  width: 80px;
  height: 25px;
  align-content: center;
  border-radius: 5px;
  color: #ff5759;
  background-color: #e8f2ff;
  text-align: center;
  font-size: 10px;
  position: absolute;
  top: 40px;
  right: 0px;
`;

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  const handleClickProfile = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {user ? (
        <ProfileContainer>
          <ImgStyle
            src={encodeURI(user.profile)}
            alt="프로필 이미지"
            onClick={handleClickProfile}
          />
          {isOpen && <LogoutBox onClick={handleLogout}>로그아웃</LogoutBox>}
        </ProfileContainer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
