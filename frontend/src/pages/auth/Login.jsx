import React, { useState } from "react";
import Button from "@/components/ui/Button";
import "./Auth.scss";
import Input from "@/components/ui/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { login as loginApi } from "@/api/auth.api";
import { useAuth } from "@/store/auth.store";

const Login = () => {
  const navigate = useNavigate();
  const { login, isReady, isAuthed } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    if (!form.email.trim()) {
      setError("이메일을 입력해주세요");
      return;
    }
    if (!form.password.trim()) {
      setError("비밀번호를 입력해주세요");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const data = await loginApi({
        email: form.email.trim(),
        password: form.password,
      });

      login(data);
      navigate("/app");
    } catch (error) {
      setError(error.message || "로그인을 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleKakaoLogin = () => {
    const BASE_URL = import.meta.env.VITE_API_URL ?? "";
    window.location.href = `${BASE_URL}/api/auth/kakao`;
  };

  if (isReady && isAuthed) {
    return <Navigate to="/app" replace />;
  }

  return (
    <section className="auth">
      <img src="images/Landingbg.png" alt="로그인 배경 화면 이미지" />
      <div className="inner">
        <div className="auth-box">
          <nav>
            <h2>로그인</h2>
            <Button text="뒤로가기" className="back" onClick={handleBack} />
          </nav>

          <form className="auth-form" onSubmit={handleSumit}>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="이메일을 입력하세요"
              />
              <Input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="auth-btn-wrap">
              <Button
                text={isLoading ? "로그인 중..." : "로그인"}
                type="submit"
                className="primary"
              />
            </div>
          </form>

          {error && <p className="error-text">{error}</p>}

          <div className="kakao-divider">SNS 로그인</div>
          <div className="kakao-login-wrap">
            <button
              type="button"
              className="btn-kakao"
              onClick={handleKakaoLogin}
              aria-label="카카오로 로그인"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 5.512 2 9.827c0 2.769 1.776 5.2 4.45 6.627l-1.132 4.213a.375.375 0 0 0 .573.408L10.8 17.98c.39.037.796.056 1.2.056 5.523 0 10-3.512 10-7.827C22 5.512 17.523 2 12 2Z"
                  fill="rgba(0,0,0,0.85)"
                />
              </svg>
            </button>
          </div>

          <div className="auth-now">
            <span>계정이 없으신가요?</span>
            <Link to="/signup">
              <Button text="회원가입하기" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
