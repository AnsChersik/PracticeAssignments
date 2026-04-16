import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    full_name: "",
    phone: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      alert("Вы зарегестрированы");
      setFormData(data);
      navigate("/login");
    } catch {
      alert("Вы не зарегестрированны. Проверьте данные");
    }
  }
  return (
    <div className="conteiner">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Введите логин"
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="full_name"
          placeholder="Введите ФИО"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Введите телефон"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button-form">
          Зарегестрироваться
        </button>
      </form>
      <Link to="/login">
        <button>Войти</button>
      </Link>
    </div>
  );
}
