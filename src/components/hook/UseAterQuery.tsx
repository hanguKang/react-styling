import { useEffect } from "react";
import { UseQueryResult } from "@tanstack/react-query";

// interface queryProp {
//     data:object, 
//     fetchNextPage:()=> void, 
//     hasNextPage:()=>void,
//     isFetching:boolean,
//     isFetchingNextPage :boolean,
//     isError:boolean,
//     isLoading:boolean,
// }

interface UseAfterQueryOptions<TData, TError> {
  queryResult: UseQueryResult<TData, TError>;
  enabled?: boolean;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}



export function useAfterQuery<TData, TError>({
  queryResult,
  enabled = true,
  onSuccess,
  onError,
}: UseAfterQueryOptions<TData, TError>) {
  useEffect(() => {
    //console.log('UseAfqueryResult', queryResult.data)
    if (!enabled) return; // enabled가 false면 아무것도 하지 않음

    if (queryResult.data && onSuccess) {
      onSuccess(queryResult.data); // 데이터가 있으면 onSuccess 실행
    }

    if (queryResult.error && onError) {
      onError(queryResult.error); // 에러가 있으면 onError 실행
    }
  }, [enabled, queryResult.data, queryResult.error, onSuccess, onError]);
}