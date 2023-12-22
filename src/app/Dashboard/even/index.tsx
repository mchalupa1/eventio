"use client";
import styles from "./index.module.css";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useThemeContext } from "../componens/Context/Filter/index";
import GridCard from "./component/GridCard";
type User = { uid: string };

export default function EventsList() {
  /*Data providing*/
  const {grip,data} = useThemeContext();
  /*Authorizace*/
  const useAuthorization = () => {
    const [user, setUser] = useState<User | undefined>();

    useEffect(() => {
      onAuthStateChanged(auth, (userData) => {
        if (userData) {
          setUser(userData);
        } else {
          setUser(undefined);
        }
      });
    }, []);
    return user;
  };
  const user = useAuthorization();

  return (
    <div className={styles.allBoxs}>
      {
        grip? <GridCard data={data}></GridCard>:undefined
      }
    </div>
  );
}
