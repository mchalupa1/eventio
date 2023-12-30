"use client";
import style from "./index.module.css";
import Link from "next/link";
import {
  signOut,
} from "firebase/auth";
import { auth } from "@/services/firebase/auth";
import { useRouter } from "next/navigation";

const Dropmenu = () => {
  const logout = async () => {
    push("/LoginPage")
    await signOut(auth);
  };
  const { push } = useRouter();
  return (
    <div className={style.container}>
      <div className={style.all}>
        <ul className={style.ull}>
          <li>
            <Link
              href={"Profile"}
              style={{ textDecoration: "none", color: "#9CA5AF" }}
            >
              Profile
            </Link>
          </li>
          <li>
            <button
              className={style.btn}
              onClick={logout}
              style={{ textDecoration: "none", color: "#9CA5AF" }}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dropmenu;
