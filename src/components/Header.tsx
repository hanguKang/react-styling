import logo from '../assets/logo.png';
import EmotionBtn from '../style/utilites/button';

// const Button = styled.button`
//   padding: 32px;
//   background-color: hotpink;
//   font-size: 24px;
//   border-radius: 4px;
//   color: black;
//   font-weight: bold;
//   &:hover {
//     color: white;
//   }
// `
export default function Header() {
  return (
        <header>
            <img src={logo} alt="캔버스" />
            <h1>ReactArt</h1>
            <p>A community of artists and art-lovers.</p>
            <EmotionBtn  variant="outline" size="sm" className='text-4xl' >버튼</EmotionBtn>
        </header>
  );
}
