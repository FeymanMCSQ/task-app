"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/registration/registration.css";
import Image from "next/image";
import LOGO from "@/app/logo.svg";

export default function LoginPage() {
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");

  const changeValue = (e) => {
    const { name, value } = e.target;

    if (name === "email") SetEmail(value);
    if (name === "password") Setpassword(value);
  };

  const login = (e) => {
    e.preventDefault();

    var data = { email, password };

    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login data sent successfully: ", data);
      })
      .catch((error) => {
        console.error("There was an error: ", error);
      });
  };

  return (
    <div className="registerDiv">
      <form className="form-group" onSubmit={login}>
        <Image
          src={LOGO}
          alt="logo"
          width={140}
          height={140}
          priority={true}
          className="logoImage"
        />
        <h1 className="spacing">Login</h1>

        <div className="inputDiv spacing">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            className="inputSpacing"
            type="email"
            onChange={changeValue}
            required
          />
        </div>

        <div className="inputDiv spacing">
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            className="inputSpacing"
            type="password"
            onChange={changeValue}
            required
          />
        </div>

        <button className="spacing btn btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
