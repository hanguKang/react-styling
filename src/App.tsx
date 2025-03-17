import AuthInputs from './components/AuthInputs';
import Header from './components/Header';
import Skeleton from './components/Skeleton';
import GlobalStyle from './style/GlobalStyle'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <AuthInputs />
      </main>
      <GlobalStyle/>
      <p className="hidden">여기서부터 스켈레톤 시작이야. </p>
      <Skeleton />
    </>
  );
}
