import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './provider/Context';
import AuthInputs from './components/AuthInputs';
import Header from './components/Header';
import Skeleton from './components/Skeleton';
import Gallery from './components/Gallery';
import UseRefTest from './components/UseRefTest'
import GlobalStyle from './style/GlobalStyle'


const Base = styled.div`
  display:grid;
  width:100%;
  grid-template-columns:repeat(5, 1fr);
  gap:24px 12px;
`;
const Container = styled.div`
  display:flex;
  flex-direction:column;
  box-shadow: 0px 4px 16px 0px rgb(0 0 0 / 4%);
`;
const ImageWrapper = styled.div`
  width:320px;
  height:220px;
`;
const Image = styled.img`
  width:100%;
  height:100%;
  object-fit: cover;
`;
const Info = styled.div`
  display:flex;
  flex-direction:column;
  flex:1 1 0;
`;
const Title = styled.h4`
  margin:8px 0 0 0; 
  padding:0; 
  font-size:24px;
`;
const Description = styled.p`
  margin:8px 0 0 0;
  padding:0; 
  font-size:16px;
`;
const Placeholder = ()=>(
  <Container>
    <ImageWrapper>
      <Skeleton width={320} height={220}/>
    </ImageWrapper>
    <Info>
      <div style={{height:"8px"}}></div>
      <Skeleton width={150} height={29} rounded/>
      <div style={{height:"8px"}}></div>
      <Skeleton width={200} height={19} rounded/>
    </Info>
  </Container>
)

const Item = ()=>(
  <Container>
    <ImageWrapper>
      <Image src="https://i.ibb.co/pWDL42M/react.png" />
    </ImageWrapper>
    <Info>
        <Title>안녕하세요</Title>
        <Description>강한구입니다.</Description>
      </Info>
  </Container>
)


// QueryClient 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선하게 유지
            gcTime:  1000 * 60 * 10,
            retry: 2, // 실패 시 2번 재시도
        },
    },
    queryCache: new QueryCache({
      onError: (error) =>
        console.error(`Something went wrong: ${error.message}`),
        //toast.error(`Something went wrong: ${error.message}`),
    }),
    
});

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },2000)
  } ,[]);
  return (
    <>
    {
    //QueryClient를 사용할 수 있도록 Application전체적으로 QueryClientProvider를 씌워준다. 이 QueryClientProvider는 React Query의 기능을 사용할 수 있도록 React App에 Query Client를 제공한다. 'client' prop으로 queryClient 객체를 전달한다. 이 queryClient는 쿼리와 캐시를 관리하는 핵심 객체이다. 이를 통해 전역 쿼리 클라이언트를 설정해 애플리케이션의 모든 컴포넌트에서 동일한 쿼리 클라이언트 인스턴스에 접근할 수 있게 된다.
    }
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Header />
        <main>
          <AuthInputs />
        </main>
        <GlobalStyle/>
          <p className="hidden">여기서부터 스켈레톤 시작이야. </p>
          <Base>
            {
              loading?
              Array.from({length:25}).map( (_,idx)=><Placeholder key={idx}></Placeholder> )
              :Array.from({ length: 25 }).map((_, idx) => <Item key={idx} />)
            }
          </Base>
        <Gallery/>
        <UseRefTest/>
      </AppProvider>
    </QueryClientProvider>
    </>
  );
}
