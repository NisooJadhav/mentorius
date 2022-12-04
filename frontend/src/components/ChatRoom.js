import React, { useRef, useState } from "react";
import "../chat.css";

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/analytics";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import { FcGoogle } from "react-icons/fc";
import { FaRegPaperPlane } from "react-icons/fa";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "loquacious-007.firebaseapp.com",
  projectId: "loquacious-007",
  storageBucket: "loquacious-007.appspot.com",
  messagingSenderId: "1019345291878",
  appId: "1:1019345291878:web:51e2df4228e1c41f1b3ba7",
  measurementId: "G-B4WDX5VM18",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

const ChatRoom = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="w-full h-full p-4 pt-0">
      <header className="flex flex-row items-center justify-between border-b-2 w-full p-0 mb-2">
        <h1 className="dark:text-white text-xl">Chat Room</h1>
        <SignOut />
      </header>
      <section>{user ? <Chatroom /> : <SignIn />}</section>
    </div>
  );
};

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <>
      <div className="flex align-center items-center flex-col mt-[40%] md:mt-[22%] sm:mt-[40%]">
        <button
          onClick={signInWithGoogle}
          className="text-xl p-3 m-3 flex flex-row items-center bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-sky-600 dark:hover:bg-sky-900 hover:shadow-sm"
        >
          <FcGoogle className="text-2xl mr-2" /> Sign In with Google
        </button>
        <p className="text-lg dark:text-white">do not violate community guidelines</p>
      </div>
    </>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <button
        onClick={() => auth.signOut()}
        className="rounded-lg hover:rounded-full transition-all duration-300 m-2 text-lg p-4 py-2 text-gray-50/80 bg-gray-900 hover:text-white dark:bg-gray-700 dark:hover:bg-sky-500 "
      >
        Sign Out
      </button>
    )
  );
}

function Chatroom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={dummy}></span>
      </div>

      <form onSubmit={sendMessage} className="chatForm w-[100vw] mb-2">
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="ask something..."
          className="m-0 p-3 shadow-sm focus:shadow-lg text-black w-[72%] md:w-[75%] sm:w-[100%] md:text-2xl text-sm dark:bg-gray-800 dark:text-white bg-white"
        />
        <button
          type="submit"
          disabled={!formValue}
          className="flex flex-row items-center p-3 bg-gray-200 text-black hover:bg-gray-400 dark:hover:bg-sky-600 dark:bg-gray-700 mr-0 md:text-2xl pr-5
          text-1xl dark:bg-gray-600 dark:text-white
          "
        >
          Submit <FaRegPaperPlane className="pl-2 animate-ping " />
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <>
      <div className="flex flex-row items-center m-1">
        <div className={`message ${messageClass}`}>
          <img
            src={
              photoURL ||
              "https://api.adorable.io/avatars/23/abott@adorable.png"
            }
            alt="avatar"
            className="avatar rounded-full shadow-sm w-10 m-0"
          />
          <p className="reply p-2 m-1 rounded-lg">{text}</p>
        </div>
      </div>
    </>
  );
}

export default ChatRoom;
