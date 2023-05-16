import style from "./page.module.css";
import { Logo } from "@/componens/svg/Logo";
import { X } from "./svg/X";
const page = () => {
  return (
    <>
      <div className={style.all}>
        <div className={style.navbar}>
          <p className={style.logo}>
            <Logo></Logo>
          </p>
          <div className={style.close}>
            <p className={style.X}>X</p>
            <p className={style.CloseL}>Close</p>
          </div>
        </div>
        <div className={style.allbox}>
          <div className={style.box}>
            <p className={style.title}>Create new event</p>
            <p className={style.details}>Enter details below</p>
            <div className={style.forms}>
              <input
                type="text"
                name="fname"
                placeholder="Title"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Description"
                className={style.oneform}
              ></input>
              <input
                name="fname"
                placeholder="Date"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Time"
                className={style.oneform}
              ></input>
              <input
                type="text"
                name="fname"
                placeholder="Capacity"
                className={style.oneform}
              ></input>
              <button>Create new event</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
