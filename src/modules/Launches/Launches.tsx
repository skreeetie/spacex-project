import { Button, Card } from "@mantine/core";
import style from "./style.module.scss";
import { useEffect, useReducer } from "react";
import { createPortal } from "react-dom";
import { Modal } from "../../components/Modal/Modal";

interface Launch {
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
  mission_name: string;
  rocket: {
    rocket_name: string;
  };
  details: string;
  flight_number: number;
  launch_date_unix: number;
}

interface State {
  launches: Launch[];
  showModal: boolean;
  modalData: {
    mission: string;
    rocket: string;
    patch: string;
    details: string;
  };
}

export type LaunchesAction =
  | { type: "set_launches"; value: State["launches"] }
  | {
      type: "set_show_modal";
      value: State["showModal"];
      data: State["modalData"];
    };

const launchesReducer = (state: State, action: LaunchesAction) => {
  switch (action.type) {
    case "set_launches":
      return {
        ...state,
        launches: action.value,
      };
    case "set_show_modal":
      return {
        ...state,
        showModal: action.value,
        modalData: action.data,
      };
    default:
      throw new Error();
  }
};

export const Launches = () => {
  const [state, dispatch] = useReducer(launchesReducer, {
    launches: [],
    showModal: false,
    modalData: {
      mission: "",
      rocket: "",
      patch: "",
      details: "",
    },
  });
  const loadData = async () => {
    const res = await fetch(
      "https://api.spacexdata.com/v3/launches?launch_year=2020"
    );
    const data = await res.json();
    dispatch({ type: "set_launches", value: data });
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <section className={style.launches}>
      <h1 className={style.title}>SpaceX Launches 2020</h1>
      {state.launches.map((launch) => {
        return (
          <Card
            className={style.card}
            shadow="sm"
            padding="md"
            radius="md"
            withBorder
            key={launch.flight_number + launch.launch_date_unix}
          >
            <img
              className={style.patch}
              src={launch.links.mission_patch_small}
              alt={launch.mission_name}
              width={120}
              height={120}
            />
            <p className={style.mission}>{launch.mission_name}</p>
            <p className={style.rocket}>{launch.rocket.rocket_name}</p>
            <Button
              onClick={() => {
                dispatch({
                  type: "set_show_modal",
                  value: true,
                  data: {
                    mission: launch.mission_name,
                    rocket: launch.rocket.rocket_name,
                    patch: launch.links.mission_patch,
                    details: launch.details,
                  },
                });
              }}
              className={style.button}
              variant="filled"
              size="md"
              radius="md"
            >
              See more
            </Button>
          </Card>
        );
      })}
      {state.showModal &&
        createPortal(
          <Modal
            mission={state.modalData.mission}
            rocket={state.modalData.rocket}
            patch={state.modalData.patch}
            details={state.modalData.details}
            dispatch={dispatch}
          />,
          document.body
        )}
    </section>
  );
};
