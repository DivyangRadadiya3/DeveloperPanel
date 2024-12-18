import React from "react";
import { FaFileExport } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

export default function Incomeboard() {
  // const apiUrl = process.env.BASE_URL;
  // console.log('API URL:', apiUrl);
  const cardsData = [
    {
      title: "Wallet",
      image: "wallet.png",
      data: [
        { label: "Today Total Wallet Entry", value: "₹ 10,000" },
        { label: "Amount Used For Contest", value: "₹ 10,000" },
        { label: "Amount Unused In Wallet", value: "₹ 10,000" },
      ],
    },
    {
      title: "Income",
      image: "income.png",
      data: [{ label: "Earning From Contest", value: "₹ 10,000" }],
    },
    {
      title: "Expense",
      image: "income.png",
      data: [
        { label: "Today Price Distribution", value: "₹ 10,000" },
        { label: "GST Coin", value: "₹ 10,000" },
        { label: "Amount Shared To Coaching", value: "₹ 10,000" },
        { label: "Referral Shared Coin", value: "₹ 10,000" },
      ],
    },
    {
      title: "Profit",
      image: "profit.png",
      data: [
        { label: "Total Income", value: "₹ 90,000" },
        { label: "Total Expense", value: "₹ 30,000" },
        { label: "Total Profit", value: "₹ 60,000", isTotal: true },
      ],
    },
  ];

  return (
    <>
      {/* <section className="space-y-6 pb-4">
        <div className="flex items-center justify-end  gap-2 font-sans text-md font-medium leading-none text-slate-800">
          <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FiFilter />
            </svg>
            <p className="font-semibold">Filter</p>
          </button>
          <button className="inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="w-4 h-4" viewBox="0 0 16 16">
              <FaFileExport />
            </svg>
            <p className="font-semibold">Export</p>
          </button>
        </div>
        <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-3 2xl:gap-6">
           wallet 
          <div className="w-full md:max-w-xl whitespace-normal break-words rounded-lg  bg-white p-4 space-y-6 font-sans text-sm font-normal shadow-lg focus:outline-none">
            <div className="flex items-center gap-3">
              <img
                src="wallet.png"
                alt="Wallet"
                className="w-12 h-12 rounded-full"
              />

              <p className="font-sans text-2xl font-semibold text-gray-800 antialiased">
                Wallet
              </p>
            </div>
            <ul>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Today Total Wallet Entry
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Amount Used For Contest
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Amount Unused In Wallet
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
           income 
          <div className="w-full md:max-w-xl whitespace-normal break-words rounded-lg  bg-white p-4 space-y-6 font-sans text-sm font-normal shadow-lg focus:outline-none">
            <div className="flex items-center gap-3">
              <img
                src="income.png"
                alt="Income"
                className="w-12 h-12 rounded-full"
              />
              <p className="font-sans text-2xl font-semibold text-gray-800 antialiased">
                Income
              </p>
            </div>
            <ul>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Earning From Contest
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
           expense 
          <div className="w-full md:max-w-xl whitespace-normal break-words rounded-lg  bg-white p-4 space-y-6 font-sans text-sm font-normal shadow-lg focus:outline-none">
            <div className="flex items-center gap-3">
              <img
                src="income.png"
                alt="Income"
                className="w-12 h-12 rounded-md"
              />

              <p className="font-sans text-2xl font-semibold text-gray-800 antialiased">
                Exprense
              </p>
            </div>
            <ul>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Today Price Distribution
                <p className=" px-2 font-sans text-right border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                GST Coin
                <p className=" px-2 font-sans text-right border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased ">
                Amount Shared To Coching
                <p className=" px-2 font-sans text-right border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Referral Shared Coin
                <p className=" px-2 font-sans text-right border-l-2  border-dashed border-black">
                  ₹ 10,000
                </p>
              </li>
            </ul>
          </div>
           profit 
          <div className="w-full md:max-w-xl whitespace-normal break-words rounded-lg  bg-white p-4 space-y-6 font-sans text-sm font-normal shadow-lg focus:outline-none">
            <div className="flex items-center gap-3">
              <img
                src="profit.png"
                alt="profit"
                className="w-12 h-12 rounded-md"
              />

              <p className="font-sans text-2xl font-semibold text-gray-800 antialiased">
                Profit
              </p>
            </div>
            <ul>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Total Income
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 90,000
                </p>
              </li>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased">
                Total Expense
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 30,000
                </p>
              </li>
            </ul>
            <ul>
              <li className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased border-t-2 border-dashed border-green-700">
                Total Profit
                <p className=" px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2  border-dashed border-black">
                  ₹ 60,000
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section> */}
      <section className="space-y-6 pb-4">
        <div className="flex items-center justify-end gap-2 font-sans text-md font-medium leading-none text-slate-800">
          <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90">
            <FiFilter className="font-bold text-white w-4 h-4" />
            <p className="font-semibold">Filter</p>
          </button>
          <button className="inline-flex items-center space-x-2 rounded-lg px-4 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90">
            <FaFileExport className="w-4 h-4" />
            <p className="font-semibold">Export</p>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-2 lg:gap-2 xl:grid-cols-3 xl:gap-3 2xl:grid-cols-3 2xl:gap-6">
          {cardsData.map((card, index) => (
            <div key={index} className="w-full md:max-w-xl whitespace-normal break-words rounded-lg bg-white p-4 space-y-6 font-sans text-sm font-normal shadow-lg focus:outline-none">
              <div className="flex items-center gap-3">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-12 h-12 rounded-full"
                />
                <p className="font-sans text-2xl font-semibold text-gray-800 antialiased">
                  {card.title}
                </p>
              </div>
              <ul>
                {card.data.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 flex items-center justify-between text-left text-lg font-medium text-gray-700 antialiased"
                  >
                    {item.label}
                    <p className="px-2 font-sans text-right text-lg font-medium text-gray-700 antialiased border-l-2 border-dashed border-black">
                      {item.value}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
