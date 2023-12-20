"use client";
import Mentor from "@/app/Dashboard/even/component/GridCard/Mentor";
import DateTime from "./component/GridCard/DateTime";
import Title from "./component/GridCard/Title";
import styles from "./index.module.css";
import { auth } from "@/services/firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Description from "./component/GridCard/Description";
import LowerPart from "./component/GridCard/LowerPart";
import { CardContext } from "../componens/Context/Data";
import { useThemeContext } from "../componens/Context/Filter/index";
import GridCard from "./component/GridCard/page";
type User = { uid: string };

export default function EventsList(props: { grip: boolean }) {
  /*Data providing*/
  const {grip} = useThemeContext();
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
        grip? <GridCard></GridCard>:undefined
      }
    </div>
  );
}
