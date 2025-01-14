"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(20);
  const [editingRow, setEditingRow] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/DummyDataNew.json")
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = orders
    .filter(
      (order) =>
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toString().includes(searchQuery)
    )
    .slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(orders.length / recordsPerPage);

  const handleDelete = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  const handleSaveEdit = () => {
    const updatedOrders = orders.map((order) =>
      order.id === editingRow ? editedOrder : order
    );
    setOrders(updatedOrders);
    setEditingRow(null);
    setEditedOrder(null);
  };

  const handleInputChange = (e, field) => {
    setEditedOrder({
      ...editedOrder,
      [field]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Customer Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded w-full max-w-md"
        />
      </div>

      {/* Header */}
      <div className="bg-indigo-600 text-white p-6 rounded-lg shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Orders Dashboard</h1>
          <p className="text-sm opacity-80">
            Track and manage all your orders efficiently.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-medium">Total Orders</h2>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 overflow-auto">
        <h2 className="text-xl font-semibold mb-4">Order List</h2>
        
        {/* Add overflow-x-auto here to make the table horizontally scrollable */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse table-auto">
            <thead className="bg-gray-100">
              <tr>
                {["ID", "Customer", "Email", "Product", "Quantity", "Value", "Actions"].map((header) => (
                  <th key={header} className="border-b px-4 py-2 text-left text-sm text-gray-600">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  {editingRow === order.id ? (
                    <>
                      <td className="border-b px-4 py-2">{order.id}</td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="text"
                          defaultValue={order.customer_name}
                          onChange={(e) => handleInputChange(e, "customer_name")}
                          className="border rounded px-2 py-1 w-full max-w-xs"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="email"
                          defaultValue={order.customer_email}
                          onChange={(e) => handleInputChange(e, "customer_email")}
                          className="border rounded px-2 py-1 w-full max-w-xs"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="text"
                          defaultValue={order.product}
                          onChange={(e) => handleInputChange(e, "product")}
                          className="border rounded px-2 py-1 w-full max-w-xs"
                        />
                      </td>
                      <td className="border-b px-4 py-2">
                        <input
                          type="number"
                          defaultValue={order.quantity}
                          onChange={(e) => handleInputChange(e, "quantity")}
                          className="border rounded px-2 py-1 w-full max-w-xs"
                        />
                      </td>
                      <td className="border-b px-2 py-6">
                        <input
                          type="number"
                          defaultValue={order.order_value}
                          onChange={(e) => handleInputChange(e, "order_value")}
                          className="border rounded px-1 py-3 w-full max-w-xs"
                        />
                      </td>
                      <td className="border-b px-3 py-8 flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingRow(null)}
                          className="bg-gray-300 text-black px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border-b px-4 py-2">{order.id}</td>
                      <td className="border-b px-4 py-2">{order.customer_name}</td>
                      <td className="border-b px-4 py-2">{order.customer_email}</td>
                      <td className="border-b px-4 py-2">{order.product}</td>
                      <td className="border-b px-4 py-2">{order.quantity}</td>
                      <td className="border-b px-4 py-2">${order.order_value}</td>
                      <td className="border-b px-4 py-2 flex space-x-2">
                        <button
                          onClick={() => {
                            setEditingRow(order.id);
                            setEditedOrder({ ...order });
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(order.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-indigo-500 text-white"}`}
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-400" : "bg-indigo-500 text-white"}`}
        >
          Prev
        </button>
        <span className="px-4 py-2 text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-indigo-500 text-white"}`}
        >
          Next
        </button>
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-400" : "bg-indigo-500 text-white"}`}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default OrdersTable;
