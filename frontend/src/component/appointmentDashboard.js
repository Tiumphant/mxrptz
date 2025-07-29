import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const response = await fetch('http://localhost:8080/api/appointment');
    const data = await response.json();
    setAppointments(data);
  };

  const handleCancel = async (id) => {
    await fetch(`http://localhost:8080/api/appointment/${id}`, {
      method: 'DELETE',
    });
    fetchAppointments();
  };

  return (
    <div>
      <h2>Your Appointments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.appointment_date ? new Date(appointment.appointment_date).toLocaleString() : ''}</td>
              <td>{appointment.status}</td>
              <td>{appointment.reason}</td>
              <td>
                {appointment.status !== 'Cancelled' && (
                  <Button variant="danger" onClick={() => handleCancel(appointment._id)}>
                    Cancel
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/book-appointment">
        <Button variant="primary">Book New Appointment</Button>
      </Link>
    </div>
  );
};

export default AppointmentDashboard;