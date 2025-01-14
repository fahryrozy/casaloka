"use client";
import React from "react";
import Header from "../components/header";

const Register = () => {
  return (
    <div className="w-full flex flex-col items-center bg-white">
      <Header />

      {/* Form Container */}
      <div className="flex flex-col items-center w-3/4 mt-16 bg-white rounded-lg px-8 py-10">
        <h2 className="text-2xl font-bold text-primary">Buat Akun Baru</h2>
        <p className="text-gray-600 mt-2 text-center">
          Daftarkan dirimu & cari rumah impianmu bersama kami.
        </p>

        <form className="w-full mt-6 space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Nama Depan"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="Nama Belakang"
              className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <input
            type="tel"
            placeholder="Masukkan No. Telepon"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input
            type="email"
            placeholder="Masukkan Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="w-4 h-4" />
            <label htmlFor="terms" className="text-gray-600">
              Menyetujui pendaftaran
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Daftar Sekarang
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">Atau</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Signup */}
        <div className="flex w-full space-x-4">
          <button className="flex-grow bg-gray-100 text-gray-600 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Daftar dengan Google
          </button>
          <button className="flex-grow bg-primary text-white py-2 rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary">
            Daftar Dengan Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
