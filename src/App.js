import "./App.css";
import { Route, Routes } from "react-router-dom";
import PostListPage from "./page/PostListPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import WritePage from "./page/WritePage";
import PostPage from "./page/PostPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/write/:postId" element={<WritePage />} />
      <Route path="/:username">
        <Route index element={<PostListPage />} />
        <Route path=":postId" element={<PostPage />} />
      </Route>
    </Routes>
  );
}

export default App;
