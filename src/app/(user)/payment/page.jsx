"use client"; // Pastikan ini ditulis dengan benar

import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Navbar from "@/components/Navbar";

const GajiKeseluruhan = () => {
  const [gajiList, setGajiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGajiList = async () => {
      try {
        setIsLoading(true);
        const gajiCollection = collection(db, "gajiKeseluruhan");
        const querySnapshot = await getDocs(gajiCollection);
        const gajiData = [];
        querySnapshot.forEach((doc) => {
          gajiData.push({ id: doc.id, ...doc.data() });
        });
        setGajiList(gajiData);
      } catch (error) {
        console.error("Error fetching gaji data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGajiList();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6 bg-white md:border rounded-md md:shadow-md mt-36">
        <h2 className="text-2xl font-semibold mb-6">Data Karyawan</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full divide-y  divide-gray-200">
            <thead>
              <tr>
                <th className="px-2 py-3 bg-gray-50">Username</th>
                <th className="px-2 py-3 bg-gray-50">Fullname</th>
                <th className="px-2 py-3 bg-gray-50">Email</th>
                <th className="px-2 py-3 bg-gray-50">Duration</th>
                <th className="px-2 py-3 bg-gray-50">Bank</th>
                <th className="px-2 py-3 bg-gray-50">Account Number</th>
                <th className="px-2 py-3 bg-gray-50">Salary</th>
                <th className="px-2 py-3 bg-gray-50">Salary Cut</th>
                <th className="px-2 py-3 bg-gray-50">Final Salary</th>
                <th className="px-2 py-3 bg-gray-50">Total Gaji Keseluruhan</th>
                <th className="px-2 py-3 bg-gray-50">Golongan</th>
                <th className="px-2 py-3 bg-gray-50">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {gajiList.map((gaji) => (
                <tr key={gaji.id}>
                  <td className="px-2 py-4">{gaji.username}</td>
                  <td className="px-2 py-4">{gaji.fullname}</td>
                  <td className="px-2 py-4">{gaji.email}</td>
                  <td className="px-2 py-4">{gaji.jangka} Bulan</td>
                  <td className="px-2 py-4">{gaji.bank}</td>
                  <td className="px-2 py-4">{gaji.nomorAkun}</td>
                  <td className="px-2 py-4">{gaji.salary}</td>
                  <td className="px-2 py-4">{gaji.salaryCut}</td>
                  <td className="px-2 py-4">{gaji.finalSalary}</td>
                  <td className="px-2 py-4">{gaji.totalGajiKeseluruhan}</td>
                  <td className="px-2 py-4">{gaji.golongan}</td>
                  <td className="px-2 py-4">{gaji.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default GajiKeseluruhan;
