import { ref, child, get } from "firebase/database";

import { updateLoadState, updateData } from "./vinesSlice";
import database from "../firebase-config";

export async function vinesLoad(dispatch) {

  dispatch(updateLoadState({state: 1, error: null}));
  const dbRef = ref(database);

  get(child(dbRef, "vines/"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateLoadState({state: 2, error: null}));
        dispatch(updateData(snapshot.val()));
      } else {
        dispatch(updateLoadState({state: 3, error: "No data"}));
        console.error("No data");
      }
    })
    .catch((error) => {
      dispatch(updateLoadState({state: 3, error: error}));
      console.error(error);
    }
    )};