import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Message.css";

function Message() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(process.env.REACT_APP_SEND_MESSAGE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again later.");
        console.error("Error sending message:", response.statusText);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.error("Error sending message:", error);
    }

    let remainingTime = 60;
    setCooldownTimer(remainingTime);
    const interval = setInterval(() => {
      remainingTime -= 1;
      setCooldownTimer(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(interval);
        setIsSubmitting(false);
      }
    }, 1000);
  };

  return (
    <div className="centered-form">
      <ToastContainer />
      <h1>Contact Us</h1>
      <p>
        Have questions about buying our products or need assistance with a
        recent purchase? We're here to help and provide the best support.
      </p>
      <Form className="form-group" onSubmit={handleSubmit}>
        <Form.Group className="mb-1" controlId="formBasicName">
          <Form.Label>Your name</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-1" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-4" controlId="formBasicSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            size="lg"
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicMessage">
          <Form.Label>Your Message</Form.Label>
          <Form.Control
            size="lg"
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={{ height: "150px" }}
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          className="custom-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? `Wait ${cooldownTimer}s` : "Submit"}
        </Button>
      </Form>
    </div>
  );
}

export default Message;
