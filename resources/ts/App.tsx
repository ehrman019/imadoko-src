import { Routes, Route } from "react-router-dom";
import { Global } from "@emotion/react";
import { globalStyle, getColorStyle } from "./styles/globalStyle";
import Layout from "./Layout";
import Home from "./pages/Home";
import Members from "./pages/Members";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <>
      <Global styles={[globalStyle, getColorStyle]} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/members" element={<Members />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
