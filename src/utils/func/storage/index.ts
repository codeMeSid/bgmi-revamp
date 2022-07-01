import { initializeApp } from "firebase/app";
import {
  FirebaseStorage,
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";

class Storage {
  private _storage: FirebaseStorage;
  constructor() {
    this._storage = getStorage(
      initializeApp({
        apiKey: "AIzaSyBo9ojBJuQ_oV8X4Bh-imfDMRd46RzHCco",
        authDomain: "bgmi-65d14.firebaseapp.com",
        projectId: "bgmi-65d14",
        storageBucket: "bgmi-65d14.appspot.com",
        messagingSenderId: "475050784286",
        appId: "1:475050784286:web:69c3dba48b9c821785200f",
      })
    );
  }
  async delete(fileUrl: string) {
    try {
      const urlSplit = fileUrl.split("/");
      const urlToken = urlSplit[urlSplit.length - 1];
      const token = urlToken.split("?")[0];
      const fileRef = ref(this._storage, token);
      return new Promise((res, rej) => {
        deleteObject(fileRef).then(res).catch(rej);
      });
    } catch (error) {}
  }
  async upload(file: File, progressHandler: any): Promise<string> {
    const fileRef = ref(this._storage, `${new Date().valueOf()}${v4()}`);
    const task = uploadBytesResumable(fileRef, file);
    return new Promise((res, rej) => {
      task.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 10
          );
          if (progressHandler) progressHandler(progress * 10);
        },
        (e) => rej(e.message),
        () => res(getDownloadURL(task.snapshot.ref))
      );
    });
  }
}

export const storage = new Storage();
