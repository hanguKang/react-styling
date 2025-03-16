import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header>
      <img src={logo} alt="캔버스" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
    </header>
  );
}
