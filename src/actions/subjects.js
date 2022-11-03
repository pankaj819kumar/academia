import { UPDATE_SUBJECTS } from './actionTypes';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

export function fetchSubjects() {
  return async function (dispatch) {
    // const querySnapshot = await getDocs(collection(db, "subjects"));
    const q = query(collection(db, "subjects"), orderBy("subject_name"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      // console.log('snapshot', snapshot);
      dispatch(updateSubjects(data));
    }, (error) => {
      console.log('error in database listener', error);
    });
    if (false) {
      unsubscribe();
    }
  };
}

export function updateSubjects(subjects) {
  return {
    type: UPDATE_SUBJECTS,
    subjects, // same as subjects: subjects
  };
}
