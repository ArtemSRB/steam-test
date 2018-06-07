import styled from 'styled-components';
export const Body = styled.div`
      color:white;
    background-color: #222;
      text-align: center;
  max-width: 600px;
      padding-bottom: 40px;
  position:relative;
`;
export const Logo = styled.img`
     height: auto;
  max-width:400px;
  margin: 20px auto;
`;
export const Input = styled.input`
    height: 35px;
    max-width: 200px;
    margin: 0 auto;
    border: 1px solid #fff;
    background-color: inherit;
    color: #fff;
        outline: none;
    padding-left: 10px;
    font-size: 20px;
    box-sizing: border-box;
    &::placeholder {
           color: #cecece;
  }
`;
export const Button = styled.button`
 height: 35px;
    max-width: 200px;
    margin: 0 auto;
        outline: none;
        cursor:pointer;
    padding: 0 23px;
    border: 1px solid #fff;
    background-color: inherit;
    color: #fff;
    transition:0.3s;
    font-size: 20px;
    box-sizing: border-box;
    &:hover {
       background-color: #fff;
           color: #222;
  }
`;
export const Profile = styled.div`
    padding: 20px 50px;
    text-align:left;
    display: flex;
    
`;
export const Avatar = styled.div`
    & > img{
    border-radius: 20px;
    }
 & > a {
    display: block;
    border: 1px solid #fff; 
    color: #fff;
    transition:0.3s;
    background-color: inherit;
    text-align: center;
    text-decoration: none;
    padding: 10px 20px;
    margin-top: 15px;
    &:hover{
        background-color: #fff;
           color: #222;
    }
  }
`;
export const Info = styled.div`
    font-size: 17px;
    padding-left: 25px;
    align-items: center;
    & > a{
    color: gold;
    text-decoration: none;
}
     & > .status {
   & > span{
    border: 1px solid #fff; 
    padding: 2px 5px;
     &.offline {
    color:#e64a4a;
  }&.online {
    color:#3dea34;
  }
    }
     
  }
`;
export const Games = styled.div`
    padding: 20px 50px;
        align-items: center;
    text-align:left;
    display: flex;
    & > div{
    padding-left:20px
    & > p{
    margin: 5px 0;
    }
    }
`;
export const Achiev = styled.div`
      display: block;
    border: 1px solid #fff; 
    color: #fff;
    transition:0.3s;
    cursor:pointer;
    background-color: inherit;
    text-align: center;
    text-decoration: none;
    padding: 5px 0;
    margin-top: 15px;
    max-width: 100px;
    &:hover{
        background-color: #fff;
           color: #222;
    }
`;
export const Sort = styled.div`
      display: inline-block;
    border: 1px solid #fff; 
    color: #fff;
    transition:0.3s;
    cursor:pointer;
    background-color: inherit;
    text-align: center;
    text-decoration: none;
    padding: 5px 20px;
    margin-top: 15px;
    &:hover{
        background-color: #fff;
           color: #222;
    }
`;
export const Page = styled.ul`
        margin: 0;
        padding-bottom:20px;
            padding-left: 0;
    & > li{
       display: inline-block;
           transition:0.3s;
    cursor:pointer;
    list-style: none;
    margin-right:10px;
    border: 1px solid #fff;
    padding: 5px 10px;
     &:last-of-type{
     margin-right:0;
    }
     &.active{
   background-color: #fff;
           color: #222;
    }
      &:hover{
        background-color: #fff;
           color: #222;
    }
    }
`;
export const ModalBackDrop = styled.div`
     position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 50px;
`;
export const ModalContent = styled.div`
     background-color:  rgba(0, 0, 0, 0.9);
     border:1px solid #fff;
    max-width: 500px;
    min-height: 300px;
    margin: 0px auto;
    position:relative;
    padding: 30px;
`;
export const Scroll = styled.div`
overflow: auto;
    height: 220px;
`;
export const ItemScroll = styled.div`
flex: 0 0 auto;
    padding: 5px 20px;
    border: 1px solid;
    margin: 20px 10px;
    text-align:center;
`;
export const Close = styled.div`
    line-height: 1;
    font-size: 26px;
    position: absolute;
    right: 15px;
    top: 10px;
    cursor: pointer;
`;