import axios from 'axios'
import {useInfiniteQuery} from '@tanstack/react-query'
import {useAfterQuery} from './hook/UseAterQuery';
import {useRef, useCallback, useState} from 'react'
import {useGlobalContext} from '../provider/Context';
//import { useInView } from 'react-intersection-observer'


interface UnsplashImage {
    id: string;
    urls: {
      regular: string;
    };
    alt_description: string;
  }
  
interface UnsplashPage {
    results: UnsplashImage[];
}

const url = `https://api.unsplash.com/search/photos?client_id=${
import.meta.env.VITE_API_KEY
}`;

// interface queryProp {
//     data:object, 
//     fetchNextPage:()=> void, 
//     hasNextPage:()=>void,
//     isFetching:boolean,
//     isFetchingNextPage :boolean,
//     isError:boolean,
//     isLoading:boolean,
// }

export default function Gallery(){
    const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);
    const {searchTerm} = useGlobalContext();
    const loader = useRef<IntersectionObserver|null>(null);
    const itemsCountParam = 9;


    const queryResult
    // const {
    //     data,
    //     fetchNextPage, 
    //     hasNextPage,
    //     isFetching,
    //     isFetchingNextPage,
    //     isError,
    //     isLoading,
    //  }
      = useInfiniteQuery<UnsplashPage>({
        //v5 버전에서 필수 파라미터
        queryKey:['images', searchTerm],
        //v5 버전에서 필수 파라미터
        queryFn: 
            async ({pageParam})=>{
            const response = await axios.get(
                `${url}&query=${searchTerm}&page=${pageParam}&per_page=${itemsCountParam}`
            );
            //console.log('pageParam:', pageParam); 
            console.log('API 응답:', response.data); // 응답 확인
            //setApiData(response.data);
            return response.data;
        },
        staleTime:60*1000*5,  //5분,
        gcTime:Infinity,
        //v5 버전에서 필수 파라미터
        getNextPageParam: (lastPage, allPages)=>{
            //다음 페이지가 있는지 확인
            if(!lastPage || !lastPage.results || lastPage.results.length < itemsCountParam ) return undefined;
            return allPages.length+1
        },
        enabled: !!searchTerm,
        //v5 버전에서 필수 파라미터
        initialPageParam:1,
     });

    // // 콜백 함수를 useCallback으로 메모이제이션하여 참조 안정성을 확보
    const handleSuccess = useCallback((data:object) => {
        console.log('데이터 넘어왔어?',data);
        //setMessage(`데이터를 받았습니다: ${data.name}`);
        setIsLoadingSkeleton(false);
    }, []);

    const handleError = useCallback((error: Error) => {
        //setMessage(`에러 발생: ${error.message}`);
        console.log(error);
    }, []);

    useAfterQuery({
        queryResult,
        onSuccess:handleSuccess,
        onError:handleError,
    });

    //특정시간 뒤에 불러오기
    const loadNextPageWithDelay = useCallback(()=>{
        if(queryResult.hasNextPage){
            setTimeout(()=>{
                queryResult.fetchNextPage();
            },1000);
        }
    },[queryResult.fetchNextPage, queryResult.hasNextPage]);



    const observer = useCallback((node:HTMLElement | null)=>{
        
        if(queryResult.isLoading || queryResult.isFetchingNextPage) return;
        if(loader.current) loader.current.disconnect();

        loader.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && queryResult.hasNextPage){
                loadNextPageWithDelay();
            }
        },{threshold:0})
        if(node) loader.current.observe(node)
    },[queryResult.isLoading, queryResult.isFetchingNextPage, queryResult.fetchNextPage, queryResult.hasNextPage]);
   
    // useEffect(() => {
    //     const currentElement = target;
    //     const currentObserver = loader.current 
      
    //     return () => {
    //       if (currentElement && currentObserver) {
    //         currentObserver.unobserve(currentElement);
    //       }
    //     };
    //   }, 
    // [target]);

    if(queryResult.isLoading){
        return(
            <section className="image-container-wrapper">
                <h4 className="description">Loading...</h4>
            </section>
        )
    }
    if(queryResult.isError){
        return(
            <section className="image-container-wrapper">
                <h4 className="description">There was an Error...</h4>
            </section>
        )
    }
    if( ( queryResult.data?.pages[0]?.results ?? []).length<1){ //개체가 'undefined'인 것 같습니다.ts(2532)
        return(
            <section className="image-container-wrapper">
                <h4 className="description">No results found...</h4>
            </section>
        )
    }
    
    return(
        <>
            <section className="image-container-wrapper">
                <div className="image-container">
                    {
                        queryResult.data?.pages.map((page, pageIndex)=>{
                            
                            return page.results.map((item, index)=>{ // 여기서는 item, index가 오류가 난다. 왜 오류인거지? page가 results라는 값을 compile때 확인할 수 없어서 그런건가? 그래서 조건문 안에서 넣어봤지만, 역시 오류야 내가 한방석 ex> if(Array.isArray(page.results)) { page.results.map.... } 역시나 오류 메세지는 'item' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다. , 'index' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.
                                const url = item?.urls?.regular;
                                const isSkeleton = isLoadingSkeleton && pageIndex == queryResult.data.pages.length - 1; 

                                return  isSkeleton && (pageIndex >0)?(
                                            <div key={index} className="img skeleton" />
                                        ) : (
                                            <div key={item.id} className="img-wrapper">
                                                <img src={url} alt={item.alt_description} className="img" />
                                                <span className="tooltip">{item.alt_description}</span>
                                            </div>
                                        )        

                            })   

                        })
                    }
                </div>
                <div ref={observer} id="scrollArea" className="h-5 m-b-20">
                    {queryResult.isFetchingNextPage?(
                        <h4 className="description">Loading more...</h4>
                    ):(queryResult.hasNextPage?(
                        <h4 className="description">Loading...</h4>
                        ):(
                            <h4 className="description">NO more found...</h4>
                        )
                    )}
                </div>
            </section>
        </>
    )
}