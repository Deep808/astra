import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/firebase";
import SignIn from "./components/SignIn";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./slices/userSlice";
import { clearUserData } from "./slices/promptSlice";
import Profile from "./components/Profile";
import { tailChase } from "ldrs";

tailChase.register();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (allowedUser) => {
      setUser(allowedUser);
      if (allowedUser) {
        dispatch(clearUserData());
        dispatch(
          setCurrentUser({
            uid: allowedUser?.uid,
            displayName: allowedUser?.displayName,
            email: allowedUser?.email,
            photoURL: allowedUser?.photoURL,
          })
        );
      } else {
        dispatch(setCurrentUser(null));
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <SignIn />
      ) : (
        <>
          <div className="min-h-screen flex">
            <Profile />
            {/* <Sidebar /> */}
            <div className="mx-auto w-full">
              <Main />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default App;
