"use client";
import alldata from "../data";
import style from "./Allboxfilterg.module.css";

const Allbox = () => {
  return (
    <div className={style.box}>
      <div className={style.allbox}>
        {alldata.map((onebox) => {
          const { id, date, title, mentor, description, capacity, status } =
            onebox;
          return (
            <div className={style.onebox} key={id}>
              <h1 className={style.title}>{title}</h1>
              <p className={style.description}>{description}</p>
              <p className={style.mentor}>{mentor}</p>
              <p className={style.date}>{date}</p>
              <div className={style.lower}>
                <p className={style.capacity}>{capacity}</p>
              </div>
                <div className={style.boxbtn}>
                  <button
                    key={id}
                    className={
                      status === "JOIN"
                        ? style.statusJ
                        : status === "LEAVE"
                        ? style.statsuL
                        : style.statusE
                    }
                  >
                    {status}
                  </button>
                </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Allbox;
