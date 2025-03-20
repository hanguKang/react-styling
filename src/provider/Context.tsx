import {createContext, useContext, useState} from 'react'




interface AppContextType {
    searchTerm: string;
    setSearchTerm: (value: string) => void; // 이런 방식도 맞고 
}

//1 - context 생성
export const AppContext = createContext<AppContextType|undefined>(undefined);


//2 - 상태변수 및 상태 변경 함수 설정
interface AppProviderProps{
    children:React.ReactNode
}
//모듈화된 AppProvider
export function AppProvider({children}:AppProviderProps) {
    const [searchTerm, setSearchTerm] = useState('노을'); 

    return (
        //3 - Context.Provider를 사용하여 하위 컴포넌트에 상태 전달하기
        <AppContext.Provider value={ {searchTerm, setSearchTerm} }> 
            {children}
        </AppContext.Provider>
    )
}

// **** -- 커스텀 훅 만들기 
export const useGlobalContext = ()=>{

    const context = useContext(AppContext)
    
    //Gallery 컴포넌트를 AppProvider로 감싸지 않으면, useGlobalContext는 undefined를 반환합니다.
    //따라서 AppProvider로 Gallery를 감싸서 Context 값을 제공해야 합니다.
    if(context === undefined) throw new Error('useGlobalContext는 AppProvider 내에서 사용되어야 합니다.'); 

    return context;

    
}


