'use client';
import Loading from '../../../componens/Loading/loading';
import { useThemeContext } from '../componens/Context/Filter/index';
import GridCard from './component/GridCard';

export default function EventsList() {
    /*Data providing*/
    const { grip, data } = useThemeContext();

    return <>{data ? <GridCard data={data} grip={grip}></GridCard> : <Loading></Loading>}</>;
}
