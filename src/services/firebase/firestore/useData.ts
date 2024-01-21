import { useEffect, useState } from 'react';

interface UseData {
    fetcher: () => unknown;
}

export const useData = ({ fetcher }: UseData) => {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState();

    const fetch = async () => {
        try {
            setIsLoading(true);

            const result = await fetcher();

            setData(result.data() as Event);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetch();
    }, []);

    return {
        isLoading,
        data,
        refetch: fetch,
    };
};
