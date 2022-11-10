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
import app, { auth, db } from './index';

const newSubjectRef = doc(collection(db, 'subjects'));

export async function uploadFile(name, subjectName, teacher, file) {
  const user = auth.currentUser;
  const uid = user.uid;
  const storage = getStorage(app);
  // console.log('file', file);
  // const storageRef = ref(storage, `academia/${name}`);
  const storageRef = ref(storage, `academia/${name}.${file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2)}`);
  // writing query to check existing subject doc
  const q = query(
    collection(db, 'subjects'),
    where('subject_name', '==', subjectName)
  );
  // if found will get doc ref
  const subjectDocRef = await checkExistingSubjectDoc(q);
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    // console.log('Uploaded file!', file);
    getDownloadURL(storageRef)
      .then((url) => {
        getMetadata(storageRef)
          .then((metadata) => {
            const resource = {
              name: name,
              link: url,
              creator: uid,
              contentType: metadata.contentType,
              creator_name: user.displayName,
            };
            if (subjectDocRef) {
              updateDocHelper(subjectDocRef, resource);
              console.log('resource added successfully in existing doc');
            } else {
              // defining doc
              const data = {
                instructor: teacher,
                resources: [resource],
                subject_name: subjectName,
                time: serverTimestamp(),
              };
              addNewDoc(data);
            }
          })
          .catch((error) => {
            console.log(
              'error occured while receiving metadata of uploaded file.',
              error
            );
          });
      })
      .catch((error) => {
        console.log('error in getting file link:', error);
      });
  });
}

export async function addLink(name, subjectName, teacher, link) {
  const user = auth.currentUser;
  const uid = user.uid;
  // writing query to check existing subject doc
  const q = query(
    collection(db, 'subjects'),
    where('subject_name', '==', subjectName)
  );
  // if found will get doc ref
  const subjectDocRef = await checkExistingSubjectDoc(q);
  const resource = {
    name: name,
    link: link,
    creator: uid,
    contentType: 'text/uri-list',
    creator_name: user.displayName,
  };
  if (subjectDocRef) {
    updateDocHelper(subjectDocRef, resource);
    console.log('resource added successfully in existing doc');
  } else {
    // defining doc
    const data = {
      instructor: teacher,
      resources: [resource],
      subject_name: subjectName,
      time: serverTimestamp(),
    };
    addNewDoc(data);
  }
}

async function addNewDoc(data) {
  await setDoc(newSubjectRef, data);
  console.log('doc added successfully');
}

async function checkExistingSubjectDoc(q) {
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const subjectDocRef = querySnapshot.docs[0].ref;
    return subjectDocRef;
  } else {
    return null;
  }
}

async function updateDocHelper(subjectDocRef, resource) {
  await updateDoc(subjectDocRef, {
    resources: arrayUnion(resource),
  });
}