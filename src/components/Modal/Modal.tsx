import { CloseButton } from "@mantine/core";
import style from "./style.module.scss";
import type { LaunchesAction } from "../../modules/Launches/Launches";

interface ModalProps {
  mission: string;
  rocket: string;
  patch: string;
  details: string;
  dispatch: React.ActionDispatch<[action: LaunchesAction]>;
}

export const Modal = ({
  mission,
  rocket,
  patch,
  details,
  dispatch,
}: ModalProps) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>
        <div className={style.top}>
          <h3>{mission}</h3>
          <CloseButton
            onClick={() => {
              dispatch({
                type: "set_show_modal",
                value: false,
                data: {
                  mission: "",
                  rocket: "",
                  patch: "",
                  details: "",
                },
              });
            }}
            data-testid="close"
          />
        </div>
        <img
          className={style.img}
          src={patch}
          alt={mission}
          width={200}
          height={200}
        />
        <div className={style.gap}>
          <p className={style.name}>Mission name:</p>
          <p className={style.data}>{mission}</p>
        </div>
        <div className={style.gap}>
          <p className={style.name}>Rocket name:</p>
          <p className={style.data}>{rocket}</p>
        </div>
        <div className={style.gap}>
          <p className={style.name}>Details:</p>
          <p className={style.data}>{details}</p>
        </div>
      </div>
    </div>
  );
};
