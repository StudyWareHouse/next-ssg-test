import { useEffect } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { useIsFetching } from 'react-query'

const Loading = (props) => {
    const isFetching = useIsFetching();
    
    if (!isFetching) {
        return null;
    }

    return <div>...Loading now</div>
}

export default Loading;