import {
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';
import {
  doc,
  updateDoc,
  arrayUnion,
  collection,
  serverTimestamp,
  setDoc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import app, { auth, db } from '../firebase';

const newSubjectRef = doc(collection(db, 'subjects'));

export function uploadFile(name, subjectName, teacher, file) {
  const user = auth.currentUser;
  const uid = user.uid; // currently signed in user uid
  const storage = getStorage(app);
  const storageRef = ref(storage, `academia/${name}`);

  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Uploaded file!', file);
    console.log('file snapshot', snapshot);

    getDownloadURL(storageRef)
      .then((url) => {
        console.log('download url', url);
        getMetadata(storageRef)
          .then((metadata) => {
            // writing query for existing subject doc
            // const q = query(
            //   collection(db, 'subjects'),
            //   where('subject_name', '==', subjectName)
            // );
            const resource = {
              name: name,
              link: url,
              creator: uid,
              contentType: metadata.contentType,
            };
            // if (checkExistingSubject(q, resource)) {
            //   return;
            // }
            // defining doc
            const data = {
              instructor: teacher,
              resources: [resource],
              subject_name: subjectName,
              time: serverTimestamp(),
            };
            addNewDoc(data);
          })
          .catch((error) => {
            console.log(
              'error occured while receiving metadata of uploaded file.',
              error
            );
          });
      })
      .catch((error) => {
        console.log('error in get download link:', error);
      });
  });
}

export async function addNewDoc(data) {
    await setDoc(newSubjectRef, data);
    console.log('doc added successfully');
}
// export async function checkExistingSubject(q, resource) {
//   const querySnapshot = await getDocs(q);
//   if (!querySnapshot.empty) {
//     let id = null;
//     querySnapshot.forEach((doc) => {
//       id = doc.id;
//     });
//     const subjectDocRef = doc(db, 'subjects', id);
//     await updateDoc(subjectDocRef, {
//       resources: arrayUnion(resource),
//     });
//     return true;
//   } else {
//     return false;
//   }
// }
