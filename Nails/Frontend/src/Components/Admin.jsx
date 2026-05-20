import React, { useState, useEffect } from "react";

const Admin = ({ onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchAllRequests();
    fetchStatuses();
  }, []);

  const fetchAllRequests = async () => {
    try {
      const response = await fetch("http://localhost:3001/requests/admin");
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await fetch("http://localhost:3001/statuses");
      const data = await response.json();
      setStatuses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = async (requestId, newStatusId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/requests/${requestId}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_status: newStatusId }),
        },
      );
      if (response.ok) {
        fetchAllRequests();
      } else {
        alert("Ошибка при обновлении статуса");
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка при обновлении статуса");
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Панель администратора</h1>
        <button onClick={onLogout}>Выйти</button>
      </header>

      <section className="table-section">
        <h2>Все заявки</h2>
        <table>
          <thead>
            <tr>
              <th>ФИО</th>
              <th>Телефон</th>
              <th>Мастер</th>
              <th>Дата и время</th>
              <th>Статус</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.user_full_name}</td>
                <td>{req.user_phone}</td>
                <td>{req.master_name}</td>
                <td>
                  {new Date(req.booking_datetime).toLocaleString("ru-RU")}
                </td>
                <td>
                  <select
                    value={req.id_status}
                    onChange={(e) =>
                      handleStatusChange(req.id, parseInt(e.target.value))
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => handleStatusChange(req.id, req.id_status)}
                    className="btn-save"
                  >
                    Сохранить
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
