import { UPDATE_SUBJECTS } from "./actionTypes";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export function fetchSubjects() {
    return async function (dispatch) {
        const querySnapshot = await getDocs(collection(db, "subjects"));
        const data = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            data.push(doc.data());
        });
        dispatch(updateSubjects(data));
        // console.log(querySnapshot);
  };
}

export function updateSubjects(subjects) {
  return {
    type: UPDATE_SUBJECTS,
    subjects, // same as subjects: subjects
  };
}
