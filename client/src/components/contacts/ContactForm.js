import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contacts/contactContext";

const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, updateContact, clearCurrent, current } = contactContext;

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        contact_type: "personal",
      });
    }
  }, [contactContext, current]);

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    contact_type: "personal",
  });

  const { name, email, phone, contact_type } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
      setContact({
        name: "",
        email: "",
        phone: "",
        contact_type: "personal",
      });
    } else {
      updateContact(contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Edit Contact" : "Add Contact"}
      </h2>
      <input
        type='text'
        name='name'
        value={name}
        onChange={onChange}
        placeholder='Name'
      />
      <input
        type='email'
        name='email'
        value={email}
        onChange={onChange}
        placeholder='Email'
      />
      <input
        type='text'
        name='phone'
        value={phone}
        onChange={onChange}
        placeholder='Phone'
      />
      Personal{" "}
      <input
        type='radio'
        name='contact_type'
        value='personal'
        checked={contact_type === "personal"}
        placeholder='Name'
        onChange={onChange}
      />{" "}
      Professional{" "}
      <input
        type='radio'
        name='contact_type'
        value='professional'
        checked={contact_type === "professional"}
        placeholder='Name'
        onChange={onChange}
      />
      <div>
        <input
          type='submit'
          value={current ? "Update Contact" : "Add Contact"}
          className='btn btn-primary btn-dark btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
