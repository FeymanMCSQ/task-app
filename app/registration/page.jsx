"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/registration/registration.css";
import Image from "next/image";
import LOGO from "@/app/logo.svg";
import Head from "next/head";
// import { response } from "express";

export default function RegistrationPage() {
  const [username, SetUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, Setpassword] = useState("");

  const changeValue = (e) => {
    const { name, value } = e.target;

    if (name === "Username") SetUsername(value);
    if (name === "email") SetEmail(value);
    if (name === "password") Setpassword(value);
  };

  const register = (e) => {
    e.preventDefault();

    var data = { username, email, password };

    fetch("http://localhost:5000/api/register", {
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
        console.log("Data added successfully: ", data);
      })
      .catch((error) => {
        console.error("There was an error: ", error);
      });
  };

  return (
    <>
      <Head>
        <link rel="icon" href="@/public/favicon.svg" type="image/svg+xml" />
      </Head>
      <div className="registerDiv">
        <form className="form-group" onSubmit={register}>
          <Image
            src={LOGO}
            alt="logo"
            width={150}
            height={150}
            priority={true}
            className="logoImage"
          />
          <h1 className="spacing">Register</h1>
          <div className="inputDiv spacing">
            <label htmlFor="Username">Username:</label>
            <input
              name="Username"
              className="inputSpacing"
              type="text"
              onChange={changeValue}
              required
            />
          </div>

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

          <button className="btn btn-primary spacing" type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}
