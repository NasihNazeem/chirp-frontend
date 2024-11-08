import Welcome from "./pages/Welcome";
import Timeline from "./pages/Timeline";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect } from "react";
import Register from "./pages/Register";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import PageLoader from "./pages/PageLoader";
import Profile from "./pages/Profile";
import "./styles/App.css";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { setUser } from "./state/slices/userSlice";
import ExpandedPost from "./pages/ExpandedPost";
import Messages from "./pages/Messages";
import DirectMessage from "./pages/DirectMessage";
import ComingSoon from "./pages/ComingSoon";
import Toast from "./components/Common/Toast";

function App() {
  const { isLoading, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const userIsLoading = useAppSelector((state) => state.user.isLoading);
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(`${import.meta.env.VITE_BASE_URL}/users/`);
    const getUser = async () => {
      try {
        console.log("I got into the getUser");
        const token = await getAccessTokenSilently();
        if (isAuthenticated) {
          console.log("token:", token);
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log("I  get here");

    getUser();
  }, [getAccessTokenSilently, dispatch, isAuthenticated]);

  if (isLoading || (isAuthenticated && userIsLoading)) {
    console.log("loading :", isLoading);
    console.log("authenticated:", isAuthenticated);
    console.log("user laoding:", userIsLoading);
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <Welcome />;
  }

  if (!username) {
    return <Register />;
  }

  return (
    <>
      <Toast />
      <Routes>
        <Route path="/" element={<ProtectedRoute component={Timeline} />} />
        <Route
          path="/messages"
          element={<ProtectedRoute component={Messages} />}
        />
        <Route
          path="/messages/:userId1/:userId2"
          element={<ProtectedRoute component={DirectMessage} />}
        />
        <Route
          path="/:username"
          element={<ProtectedRoute component={Profile} />}
        />
        <Route
          path="/post/:postId"
          element={<ProtectedRoute component={ExpandedPost} />}
        />
        <Route
          path="/coming-soon"
          element={<ProtectedRoute component={ComingSoon} />}
        />
      </Routes>
    </>
  );
}

export default App;
