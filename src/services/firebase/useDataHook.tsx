import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { User } from '@/app/Context/auth';
import { db } from './db';
import { format } from 'date-fns';

export type Event = {
  title: string;
  date: string;
  id: string;
  description: string;
  capacity: number;
  joiners: User[];
  time: string;
  author: User;
};

const useEvents = (collectionName: string) => {
  const [data, setData] = useState<Event[] | undefined>();
  const [OriginalData, setOriginalData] = useState<Event[] | undefined>()
  const [FilterData, setFilterData] = useState<Event[] | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pick, setPick] = useState({
    all: true,
    future: false,
    past: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const colRef = collection(db, collectionName);

        const unsubscribe = onSnapshot(colRef, (snapshot) => {
          const newData: Event[] = [];
          snapshot.forEach((doc) => {
            newData.push(doc.data() as Event);
          });


          if(pick.all){
            setData(newData)
            setOriginalData(newData)

          }else if( pick.past){
			const updateFilter = newData.filter((item) => {
				return FilterData?.some((data) => item.id === data.id) ?? false;

			  });
			  setData(updateFilter);
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        setError("An error occurred while loading data.");
        setLoading(false);
      }
    };

    void fetchData();
  }, [pick, FilterData]);

  // Aktuální datum a čas
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const currentTime = format(new Date(), 'HH:mm');

  const FilterFutureEvents = () => {
    const FutureEvents = OriginalData?.filter((item) => {
      if (item.date > currentDate) {
        return true;
      } else if (item.date === currentDate && item.time > currentTime) {
        return true;
      } else {
        return false;
      }
    });
    setData(FutureEvents);
    setPick({ all: false, past: false, future: true });
    setFilterData(FutureEvents)
  };

  const FilterPastEvents = () => {
    const PastEvents = OriginalData?.filter((item) => {
      if (item.date < currentDate) {
        return true;
      } else if (item.date === currentDate && item.time < currentTime) {
        return true;
      } else {
        return false;
      }
    });
    setData(PastEvents)
    setPick({ all: false, past: true, future: false });
    setFilterData(PastEvents)
  };

  const FilterAllEvents = () => {
    setData(OriginalData);
    setPick({ all: true, future: false, past: false });

  };


  return { data, OriginalData, loading, error,pick, FilterFutureEvents, FilterPastEvents, FilterAllEvents};
};

export default useEvents;