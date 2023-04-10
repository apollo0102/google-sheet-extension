import React, { useState, useEffect } from 'react';
import server from '../../utils/server';
// const { myServerFunctions } = server;
// const { serverFunctions } = server;

// import Edit from './Edit';

export default function Sidebar(props) {
  // const classes = useStyles();
  const [commands, setCommands] = useState([]);
  const [getting, setGetting] = useState(false);
  const [running, setRunning] = useState(false);
  const [editing, setEditing] = useState(false);
  const [selectedCommand, setSelectedCommand] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(-2);
  const [saving, setSaving] = useState(false);
  const [showPromotions, setShowPromotions] = useState(false);

  // snackbar alert
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const [formData, setFormData] = useState({});
  const { getContent } = server;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // handle form submission logic here
    console.log(formData);
    if (formData.link !== '') {
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
        })
        .getContent(formData);
    } else {
      console.log('Please input link!');
      alert('Please input link!');
    }
  };
  const handleReload = async () => {
    console.log(formData);
    if (formData.link !== '') {
      google.script.run
        .withSuccessHandler((response) => {
          console.log(response);
        })
        .getContent(formData);
    } else {
      console.log('Please input link!');
      alert('Please input link!');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="application" style={{ marginBottom: '10px' }}>
          Application:
        </label>
        <input
          type="text"
          name="application"
          onChange={handleChange}
          value={formData.application || ''}
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            width: '90%',
          }}
        />
        <label htmlFor="link" style={{ marginBottom: '10px' }}>
          Link:
        </label>
        <input
          type="text"
          name="link"
          onChange={handleChange}
          value={formData.link || ''}
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            width: '90%',
          }}
        />
        <label htmlFor="method" style={{ marginBottom: '10px' }}>
          Method:
        </label>
        <select
          value={formData.method}
          onChange={handleChange}
          name="method"
          style={{
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
            width: '90%',
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <button
            type="submit"
            style={{
              padding: '5px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              fontSize: '15px',
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReload}
            style={{
              padding: '5px 20px',
              backgroundColor: '#28a745',
              color: '#fff',
              borderRadius: '5px',
              border: 'none',
              fontSize: '15px',
              fontWeight: "bold",
            }}
          >
            Reload
          </button>
        </div>
      </form>
    </div>
  );
}
