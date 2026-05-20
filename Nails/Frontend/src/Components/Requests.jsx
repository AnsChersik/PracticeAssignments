import React, { useState, useEffect } from 'react';

const Requests = ({ user, onLogout }) => {
  const [requests, setRequests] = useState([]);
  const [masters, setMasters] = useState([]);
  const [formData, setFormData] = useState({
    id_master: '',
    booking_date: '',
    booking_time: ''
  });

  useEffect(() => {
    fetchRequests();
    fetchMasters();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await fetch(`http://localhost:3001/requests/user/${user.id}`);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMasters = async () => {
    try {
      const response = await fetch('http://localhost:3001/masters');
      const data = await response.json();
      setMasters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_master || !formData.booking_date || !formData.booking_time) {
      alert('Заполните все поля');
      return;
    }
    const booking_datetime = `${formData.booking_date}T${formData.booking_time}:00`;
    try {
      const response = await fetch('http://localhost:3001/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id_user: user.id,
          id_master: formData.id_master,
          booking_datetime
        })
      });
      if (response.ok) {
        setFormData({ id_master: '', booking_date: '', booking_time: '' });
        fetchRequests();
      } else {
        alert('Ошибка при создании заявки');
      }
    } catch (error) {
      console.error(error);
      alert('Ошибка при создании заявки');
    }
  };

  const timeOptions = [];
  for (let hour = 8; hour <= 18; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00`;
    timeOptions.push(time);
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Мои заявки</h1>
        <button onClick={onLogout}>Выйти</button>
      </header>

      <section className="form-section">
        <h2>Новая заявка</h2>
        <form onSubmit={handleSubmit}>
          <select name="id_master" value={formData.id_master} onChange={handleInputChange}>
            <option value="">Выберите мастера</option>
            {masters.map(master => (
              <option key={master.id} value={master.id}>{master.name}</option>
            ))}
          </select>
          <input 
            type="date" 
            name="booking_date" 
            value={formData.booking_date} 
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
          />
          <select name="booking_time" value={formData.booking_time} onChange={handleInputChange}>
            <option value="">Выберите время</option>
            {timeOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
          <button type="submit">Создать заявку</button>
        </form>
      </section>

      <section className="table-section">
        <h2>Список заявок</h2>
        <table>
          <thead>
            <tr>
              <th>Мастер</th>
              <th>Дата и время</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req.id}>
                <td>{req.master_name}</td>
                <td>{new Date(req.booking_datetime).toLocaleString('ru-RU')}</td>
                <td>{req.status_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Requests;