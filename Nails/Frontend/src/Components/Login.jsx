import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formDate, setFormDate] = useState({ login: "", password: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setFormDate({ ...formDate, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDate),
      });

      const data = await response.json();
      if (data.length > 0) {
        alert("Вы успешно зашли в систему!");
        navigate("/");
      } else {
        alert("Проверьте корректность данных");
      }
    } catch {
      alert("Ошибка");
    }
  }

  return (
    <div className="conteiner">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Введите логин"
          value={formDate.login}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Введите пароль"
          value={formDate.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="button-form">
          Войти
        </button>
      </form>
      <Link to="/register">
        <button>Создать аккаунт</button>
      </Link>
    </div>
  );
}
