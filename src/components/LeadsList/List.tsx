import React from 'react';
import DataTable from 'react-data-table-component';
import img1 from "../../common/assets/fileicon1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const LeadsList = ({
  tab,
  tableData,
  rowsPerPage,
  totalRows,
  handleTabSwitch,
  handlePageChange,
  handleRowsPerPageChange,
  handleFormSubmit,
  handleCloseModal,
  selectedRow,
  setSelectedRow,
  columns,
  displayEdit,
  deleteFile,
}) => {
  return (
    <div className="p-0 max-w-full">
      <div className="shadow-lg rounded-lg p-4 bg-white dark:bg-black">
      <div className="mb-6 flex gap-0 border-b border-gray-300">
        {[
          { label: 'Pending Leads', value: 0 },
          { label: 'Upcoming Leads', value: 1 },
          { label: 'Interested', value: 2 },
          { label: 'Cold Leads', value: 3 },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => handleTabSwitch(value)}
            style={{
              fontFamily: 'Roboto, sans-serif',
              backgroundColor: tab === value ? '#EE8812' : 'transparent',
            }}
            className={`py-2 px-3 rounded-t-lg font-medium transition-all border-b-2 ${
              tab === value
                ? 'text-white bg-white border-transparent'
                : 'text-gray-500 bg-transparent border-transparent hover:text-gray-800 hover:border-orange-500'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

        <h1 className="text-3xl font-bold text-center mb-8 mt-10" style={{ fontFamily: 'sans-serif', color: "#ee8812" }}>
          {tab === 0
            ? 'Pending Leads'
            : tab === 1
            ? 'Upcoming Leads'
            : tab === 2
            ? 'Interested'
            : 'Cold Leads'}
        </h1>

        {tableData.length === 0 && (
          <p className="text-gray-500">`No Leads available...`</p>
        )}

        {tableData.length !== 0 && (
          <div className="bg-white dark:bg-gray-800 dark:text-white">
          <DataTable
            columns={columns}
            data={tableData}
            pagination
            paginationServer
            paginationPerPage={rowsPerPage}
            paginationTotalRows={totalRows}
            onChangePage={handlePageChange}
            paginationRowsPerPageOptions={[5, 10, 20]}
            onChangeRowsPerPage={handleRowsPerPageChange}
            responsive
            // highlightOnHover
            conditionalRowStyles={[
              {
                when: (row) => row.time_passed < 7,
                style: {
                  className: 'bg-amber-100 text-amber-700',
                  //   backgroundColor: "#fef3c7",
                  //   color: "#b45309",
                },
              },
              //   {
              //     when: (row) => row.time_passed > 10,
              //     // style: {
              //     //   backgroundColor: "#fde2e2",
              //     //   color: "#b91c1c",
              //     // },
              //     className: 'bg-green-100 text-green-700'
              //   },
            ]}
            customStyles={{
              table: {
                style: {
                  tableLayout: 'fixed',
                  border: "1px solid black",
                },
              },
              pagination: {
                style: {
                  // backgroundColor: 'rgb(214 211 209)', // Tailwind bg-gray-200 equivalent
                  color: 'rgb(31 41 55)', // Tailwind text-gray-700 equivalent
                  fontSize: '14px',
                  fontWeight: '500',
                  fontFamily: 'sans-serif',
                  borderTop: '1px solid rgb(229 231 235)', // Border between table and pagination
                  //padding: '10px 20px',
                },
              },
              headCells: {
                style: {
                  // backgroundColor: 'rgb(214 211 209)', // Tailwind bg-gray-200 equivalent
                  fontFamily: 'sans-serif',
                  fontSize: '1rem',
                  color: 'rgb(31 41 55)', // Tailwind text-gray-800 equivalent
                  fontWeight: 'bold',
                  textAlign: 'center',
                },
              },
              cells: {
                style: {
                  // backgroundColor: 'rgb(229 231 235)', // Tailwind bg-gray-200 equivalent
                  color: 'rgb(31 41 55)', // Tailwind text-gray-800 equivalent
                  fontFamily: 'sans-serif',
                  fontSize: '0.875rem',
                  textAlign: 'center',
                  padding: '16px',
                },
              },
            }}
          />
          </div>
        )}
      </div>

      {displayEdit && (
        <>
          {/* Overlay */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 "
            onClick={handleCloseModal}
          />

          {/* Modal Container */}
          <div style={{ fontFamily: "sans-serif" }}
            className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-3/4 bg-white dark:bg-gray-700 rounded-lg shadow-lg z-50 p-6 flex gap-4`}
            >
            {/* Left Section: Form and Details */}
            <div className={`flex-1 overflow-y-auto max-h-[80vh] `}>
              <div className="flex-1">
                <h3 className="font-bold text-black dark:text-white border-b border-orange-500 pb-2 mb-4 mr-2" style={{ fontSize: "24px" }}>
                  Leads Details
                </h3>

                <div className="text-gray-700 dark:text-white text-sm mb-6">
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flex: '0 0 20%', fontSize: "16px", marginTop: "6px" }}>
                      <strong>Name:</strong>
                    </div>
                    <div style={{ flex: '1', paddingLeft: '10px', marginRight: "10px" }}>
                      <input
                        type="text"
                        className="bg-white dark:bg-white text-black dark:text-black"
                        value={
                          selectedRow.type === 1
                            ? selectedRow.datalake_cust_data?.cust_name
                            : selectedRow.website_cust_data?.cust_name
                        }
                        readOnly
                        style={{
                          width: '100%',
                          border: '0.5px solid #ccc',
                          padding: '5px',
                          // backgroundColor: '#f9f9f9',
                          borderRadius: '6px',
                        }}
                      />
                    </div>
                  </div>
                  {/* {aadhar} */}
                  {
                    <div className="my-3">
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0 0 20%', fontSize: "16px", marginTop: "6px" }}>
                        <strong>Aadhar No.:</strong>
                      </div>
                      <div style={{ flex: '1', paddingLeft: '10px', marginRight: "10px" }}>
                        <input
                          type="text"
                          className="bg-white dark:bg-white text-black dark:text-black"
                          value={selectedRow.type === 1
                            ? selectedRow.datalake_cust_data?.aadhar
                            : selectedRow.website_cust_data?.aadhar}
                          readOnly
                          style={{
                            width: '100%',
                            border: '0.5px solid #ccc',
                            padding: '5px',
                            // backgroundColor: '#f9f9f9',
                            borderRadius: '6px',
                          }}
                        />
                      </div>
                    </div>
                    {!(
                      selectedRow.status == 0 || selectedRow.status == 1
                    ) && (
                      <div>
                        {/*  */}
                        {!selectedRow.aadhar_doc && (
                          <div>No Aadhar doc uploaded</div>
                        )}
                        {selectedRow.aadhar_doc && (
                          <div className="my-4">
                            <span  className="mr-4">Uploaded Aadhar</span> 
                            <a
                              href={`http://localhost:3000/docs/${selectedRow.aadhar_doc}`}
                              download
                              target="_blank" // Opens the link in a new tab
                              rel="noopener noreferrer" // Adds security for external links
                            >
                              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                  <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                </svg>
                              </button>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  }
                  {/* PAN */}
                  {
                    <div className='my-4'>
                    <div style={{ display: 'flex', width: '100%' }}>
                      <div style={{ flex: '0 0 20%', fontSize: "16px", marginTop: "6px" }}>
                        <strong>PAN No.:</strong>
                      </div>
                      <div style={{ flex: '1', paddingLeft: '10px', marginRight: "10px" }}>
                        <input
                          type="text"
                          className="bg-white dark:bg-white text-black dark:text-black"
                          value={selectedRow.type === 1
                            ? selectedRow.datalake_cust_data?.PAN
                            : selectedRow.website_cust_data?.PAN}
                          readOnly
                          style={{
                            width: '100%',
                            border: '0.5px solid #ccc',
                            padding: '5px',
                            // backgroundColor: '#f9f9f9',
                            borderRadius: '6px',
                          }}
                        />
                      </div>
                    </div>
                    {!(
                      selectedRow.status == 0 || selectedRow.status == 1
                    ) && (
                      <div>
                        {!selectedRow.pan_doc && (
                          <div>No PAN doc uploaded</div>
                        )}
                        {selectedRow.pan_doc && (
                          <div className="">
                            <span className='mr-3'>Uploaded PAN </span>
                            <a
                              href={`http://localhost:3000/docs/${selectedRow.pan_doc}`}
                              download
                              target="_blank" // Opens the link in a new tab
                              rel="noopener noreferrer" // Adds security for external links
                            >
                              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                  <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                </svg>
                              </button>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  }

                  {/* income proof */}
                  {!(selectedRow.status == 0 || selectedRow.status == 1) && (
                    <div>
                      <div>
                        {!selectedRow.annual_income && (
                          <div>Annual income not submitted</div>
                        )}
                        {selectedRow.annual_income && (
                          <div>Annual income : {selectedRow.annual_income}</div>
                        )}
                      </div>
                      {!selectedRow.income_proof_doc && (
                        <div>No Income Proof uploaded</div>
                      )}
                      {selectedRow.income_proof_doc && (
                        <div className="">
                          <span className="mr-3">Uploaded Income Proof</span>
                          <a
                            href={`http://localhost:3000/docs/${selectedRow.income_proof_doc}`}
                            download
                            target="_blank" // Opens the link in a new tab
                            rel="noopener noreferrer" // Adds security for external links
                          >
                            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                              >
                                <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                              </svg>
                            </button>
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  {/* address */}
                  {
                    <div className='my-3'>
                    <label className="mb-3 block text-black dark:text-white">
                    < div style={{ fontSize: "16px", marginTop: "6px" }}>
                        <strong>Address:</strong>
                      </div>
                    </label>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', width: '100%' }}>
                      <div style={{ width: '40%' }}>
                        <div style={{ display: 'flex', width: '100%' }}>
                          <div style={{ flex: '0 0 10%', fontSize: "16px", marginTop: "6px" }}>
                            <strong>City:</strong>
                          </div>
                          <div style={{ flex: '1', paddingLeft: '10px', marginRight: "10px" }}>
                            <input
                              type="text"
                              className="bg-white dark:bg-white text-black dark:text-black"
                              value={selectedRow.type === 1
                                ? selectedRow.datalake_cust_data?.city
                                : selectedRow.website_cust_data?.city}
                              readOnly
                              style={{
                                width: '100%',
                                border: '0.5px solid #ccc',
                                padding: '5px',
                                // backgroundColor: '#f9f9f9',
                                borderRadius: '6px',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '40%' }}>
                      <div style={{ display: 'flex', width: '100%' }}>
                          <div style={{ flex: '0 0 10%', fontSize: "16px", marginTop: "6px" }}>
                            <strong>State:</strong>
                          </div>
                          <div style={{ flex: '1', paddingLeft: '10px', marginRight: "10px" }}>
                            <input
                              type="text"
                              className="bg-white dark:bg-white text-black dark:text-black"
                              value={selectedRow.type === 1
                                ? selectedRow.datalake_cust_data?.state
                                : selectedRow.website_cust_data?.state}
                              readOnly
                              style={{
                                width: '100%',
                                border: '0.5px solid #ccc',
                                padding: '5px',
                                // backgroundColor: '#f9f9f9',
                                borderRadius: '6px',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {!(
                      selectedRow.status == 0 || selectedRow.status == 1
                    ) && (
                      <div>
                        {!selectedRow.address && (
                          <div>Full address not available</div>
                        )}
                        {selectedRow.address && (
                          <div className="">
                            <span className='mr-2'>Full Address</span>
                            {selectedRow.address}
                          </div>
                        )}
                      </div>
                    )}

                    {!(
                      selectedRow.status == 0 || selectedRow.status == 1
                    ) && (
                      <div>
                        {!selectedRow.address_proof_doc && (
                          <div>No Address Proof uploaded</div>
                        )}
                        {selectedRow.address_proof_doc && (
                          <div className="">
                            <span className='mr-3'>Uploaded Address Proof File</span>
                            <a
                              href={`http://localhost:3000/docs/${selectedRow.address_proof_doc}`}
                              download
                              target="_blank" // Opens the link in a new tab
                              rel="noopener noreferrer" // Adds security for external links
                            >
                              <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                  <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                </svg>
                              </button>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  }

                  {selectedRow.status === 2 && (
                    <p>
                      <strong>Required Loan amount :</strong>{' '}
                      {selectedRow.amount_interested}
                    </p>
                  )}

                  {selectedRow.status === 3 && (
                    <p>
                      <strong>Last contact date :</strong>{' '}
                      {selectedRow.contacted_on}
                    </p>
                  )}

                  {selectedRow.type === 1 && (
                    <div className="mt-4">
                      <h4 className="text-md font-semibold text-orange-600 mb-2">
                        Other Loan Details
                      </h4>
                      <p>
                        Loan 1 Ending Date:{' '}
                        {selectedRow.datalake_cust_data.loan1_end_date}
                      </p>
                      <p>
                        Loan 2 Ending Date:{' '}
                        {selectedRow.datalake_cust_data.loan2_end_date}
                      </p>
                      <p>
                        Loan 3 Ending Date:{' '}
                        {selectedRow.datalake_cust_data.loan3_end_date}
                      </p>
                    </div>
                  )}
                </div>

                {/*form only is pending or call back requested  */}
                {(selectedRow.status === 0 || selectedRow.status === 1) && (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* {aadhar  */}
                    {
                        <div style={{ marginRight: "10px" }}>
                          <label className="mb-1 block text-black dark:text-white">
                            <div style={{ fontSize: "16px", marginTop: "6px" }}>
                              <strong>Upload Aadhar:</strong>
                            </div>
                          </label>
                          {selectedRow.aadhar_doc &&
                            selectedRow.aadhar_doc.length > 0 && (
                              <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }} >Previous Uploaded Files : </p>
                            )}
                          {selectedRow.aadhar_doc &&
                            selectedRow.aadhar_doc.length > 0 &&
                            selectedRow.aadhar_doc.map((file, index) => (
                              <div className="flex ml-4 mb-2">
                               <span className="ml-2 mt-2 mr-2 text-gray-600 dark:text-white">{index + 1})</span>
                                <a
                                  href={`http://localhost:3000/docs/${file.file_name}`}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer" // Adds security for external links
                                  className="flex my-0"
                                >
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                  />

                                  {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                    <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                  </svg> */}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(
                                      file.id,
                                      'aadhar_doc',
                                      selectedRow.id,
                                    );
                                  }}
                                  className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                    <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}
                          {selectedRow.aadhar_doc_file && (
                            <p className="my-2">
                              <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                              {Array.from(selectedRow.aadhar_doc_file)
                                .map((file, index) => (
                                  <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                    {index + 1}) {file.name}
                                  </span>
                                ))
                                .reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                          )}
                          <input
                            type="file"
                            multiple
                            className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                            onChange={(e) => {
                              const { name, files: selectedFiles } = e.target;
                              setSelectedRow((prev) => ({
                                ...prev,
                                aadhar_doc_file: selectedFiles,
                              }));
                            }}
                          />
                        </div>
                    }

                    {/*  PAN */}
                    {
                        <div style={{ marginRight: "10px" }}>
                          <label className="mb-1 block text-black dark:text-white">
                            <div style={{ fontSize: "16px", marginTop: "6px" }}>
                              <strong>Upload PAN:</strong>
                            </div>
                          </label>
                          {selectedRow.pan_doc &&
                            selectedRow.pan_doc.length > 0 && (
                              <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }}>Previous Uploaded Files : </p>
                            )}
                          {selectedRow.pan_doc &&
                            selectedRow.pan_doc.length > 0 &&
                            selectedRow.pan_doc.map((file, index) => (
                              <div className="flex ml-4 mb-2">
                                <span className="ml-2 mt-2 mr-2  text-gray-600 dark:text-white">{index + 1})</span>
                                <a
                                  href={`http://localhost:3000/docs/${file.file_name}`}
                                  download
                                  target="_blank" // Opens the link in a new tab
                                  rel="noopener noreferrer" // Adds security for external links
                                  className="flex my-0"
                                >
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                  />

                                  {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                    <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                  </svg> */}
                                  {/* <button className="px-4 py-2 disabled:true bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                   
                                  </button> */}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(
                                      file.id,
                                      'pan_doc',
                                      selectedRow.id,
                                    );
                                  }}
                                  className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                    <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}

                          {selectedRow.pan_doc_file && (
                            <p className="my-2">
                              <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                              {Array.from(selectedRow.pan_doc_file)
                                .map((file, index) => (
                                  <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                    {index + 1}) {file.name}
                                  </span>
                                ))
                                .reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                          )}
                          <input
                            type="file"
                            multiple
                            className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                            onChange={(e) => {
                              const { name, files: selectedFiles } = e.target;
                              setSelectedRow((prev) => ({
                                ...prev,
                                pan_doc_file: selectedFiles,
                              }));
                            }}
                          />
                        </div>
                    }

                    {/* annual income */}
                    {
                      <div style={{ marginRight: "10px" }}>
                        <label className="mb-1 block text-black dark:text-white">
                          <div style={{ fontSize: "16px", marginTop: "6px" }}>
                            <strong>Annual Income:</strong>
                          </div>
                        </label>

                        <div className="relative z-20 bg-transparent dark:bg-form-input">
                          <select
                            // value={selectedOption}
                            // onChange={(e) => {
                            //   setSelectedOption(e.target.value);

                            // }}
                            value={selectedRow.annual_income}
                            style={{ borderRadius: "6px" }}
                            onChange={(e) => {
                              setSelectedRow((prev) => ({
                                ...prev,
                                annual_income: e.target.value,
                              }));
                            }}
                            className="w-full px-2 py-2 border border-[#ccc] dark:bg-black rounded-md shadow-sm cursor-pointer"
                          >
                            <option
                              value=""
                              className="text-body dark:text-bodydark"
                            >
                              Select Annual Income
                            </option>
                            <option
                              value=">10L"
                              className="text-body dark:text-bodydark"
                            >
                              {`>10L`}
                            </option>
                            <option
                              value=" 5L-10L"
                              className="text-body dark:text-bodydark"
                            >
                              5L-10L
                            </option>
                            <option
                              value="<5L"
                              className="text-body dark:text-bodydark"
                            >
                              {`<5L`}
                            </option>
                          </select>
                        </div>
                      </div>
                    }

                    {/* income proof */}
                    {
                      <div className="mb-4.5">
                          <div style={{ marginRight: "10px" }}>
                            <label className="mb-1 block text-black dark:text-white">
                              <div style={{ fontSize: "16px", marginTop: "6px" }}>
                                <strong>Upload Income Proof:</strong>
                              </div>
                            </label>
                            {selectedRow.income_proof_doc &&
                              selectedRow.income_proof_doc.length > 0 && (
                                <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }}>Previous Uploaded Files : </p>
                              )}
                            {selectedRow.income_proof_doc &&
                              selectedRow.income_proof_doc.length > 0 &&
                              selectedRow.income_proof_doc.map((file, index) => (
                                <div className="flex ml-4 mb-2">
                                  <span className="ml-2 mt-2 mr-2  text-gray-600 dark:text-white">{index + 1})</span>
                                  <a
                                    href={`http://localhost:3000/docs/${file.file_name}`}
                                    download
                                    target="_blank" // Opens the link in a new tab
                                    rel="noopener noreferrer" // Adds security for external links
                                    className="flex my-0"
                                  >
                                    <FontAwesomeIcon
                                      icon={faDownload}
                                      className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                    />

                                    {/* <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                      <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                    </svg> */}
                                    {/* <button className="px-4 py-2 disabled:true bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                   
                                  </button> */}
                                  </a>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteFile(
                                        file.id,
                                        'income_proof_doc',
                                        selectedRow.id,
                                      );
                                    }}
                                    className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                    >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                    >
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                      <line
                                        x1="10"
                                        y1="11"
                                        x2="10"
                                        y2="17"
                                      ></line>
                                      <line
                                        x1="14"
                                        y1="11"
                                        x2="14"
                                        y2="17"
                                      ></line>
                                      <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                  </button>
                                </div>
                              ))}

                            {selectedRow.income_proof_doc_files && (
                              <p className="my-2">
                                <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                                {Array.from(selectedRow.income_proof_doc_files)
                                  .map((file, index) => (
                                    <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                      {index + 1}) {file.name}
                                    </span>
                                  ))
                                  .reduce((prev, curr) => [prev, ', ', curr])}
                              </p>
                            )}
                            <input
                              type="file"
                              multiple
                              className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                              onChange={(e) => {
                                const { name, files: selectedFiles } = e.target;
                                setSelectedRow((prev) => ({
                                  ...prev,
                                  income_proof_doc_files: selectedFiles,
                                }));
                              }}
                            />
                          </div>
                      </div>
                    }
                    {/* address proof */}
                    {
                      <div>
                        {
                          <div style={{ marginRight: "10px" }}>
                            <label className="mb-1 block text-black dark:text-white my-3">
                              <div style={{ fontSize: "16px", marginTop: "6px" }}>
                                <strong>Enter Full Address:</strong>
                              </div>
                            </label>
                            <textarea
                              rows={4}
                              placeholder="Enter your Full Address"
                              value={selectedRow.address}
                              className="w-full rounded-lg border-[1.5px] border-[#ccc] bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-[#ccc] disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                              onChange={(e) => {
                                setSelectedRow((prev) => ({
                                  ...prev,
                                  address: e.target.value,
                                }));
                              }}
                            ></textarea>
                          </div>
                        }

                          <div style={{ marginRight: "10px" }}>
                            <label className="mb-1 block text-black dark:text-white">
                              <div style={{ fontSize: "16px", marginTop: "6px" }}>
                                <strong>Upload Address Proof:</strong>
                              </div>
                            </label>

                            {selectedRow.address_proof_doc &&
                              selectedRow.address_proof_doc.length > 0 && (
                                <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }}>Previous Uploaded Files : </p>
                              )}
                            {selectedRow.address_proof_doc &&
                              selectedRow.address_proof_doc.length > 0 &&
                              selectedRow.address_proof_doc.map((file, index) => (
                                <div className="flex ml-4 mb-2">
                                  <span className="ml-2 mt-2 mr-2  text-gray-600 dark:text-white">{index + 1})</span>
                                  <a
                                    href={`http://localhost:3000/docs/${file.file_name}`}
                                    download
                                    target="_blank" // Opens the link in a new tab
                                    rel="noopener noreferrer" // Adds security for external links
                                    className="flex my-0"
                                  >
                                    <FontAwesomeIcon
                                      icon={faDownload}
                                      className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                    />

                                    {/* <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      fill="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                      <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                    </svg> */}
                                    {/* <button className="px-4 py-2 disabled:true bg-orange-500 text-white rounded-md hover:bg-orange-600">
                                   
                                  </button> */}
                                  </a>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteFile(
                                        file.id,
                                        'address_proof_doc',
                                        selectedRow.id,
                                      );
                                    }}
                                    className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                    >
                                      <polyline points="3 6 5 6 21 6"></polyline>
                                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                      <line
                                        x1="10"
                                        y1="11"
                                        x2="10"
                                        y2="17"
                                      ></line>
                                      <line
                                        x1="14"
                                        y1="11"
                                        x2="14"
                                        y2="17"
                                      ></line>
                                      <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                    </svg>
                                  </button>
                                </div>
                              ))}

                            
                            {selectedRow.address_proof_doc_files && (
                            <p className="my-2">
                              <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                                {Array.from(selectedRow.address_proof_doc_files)
                                  .map((file, index) => (
                                    <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                      {index + 1}) {file.name}
                                    </span>
                                  ))
                                  .reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                          )}
                            
                            <input
                            type="file"
                            multiple
                            className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                            onChange={(e) => {
                              const { name, files: selectedFiles } = e.target;
                              setSelectedRow((prev) => ({
                                ...prev,
                                address_proof_doc_files: selectedFiles,
                              }));
                            }}
                          />
                          </div>
                      </div>
                    }

                    {/* property docs */}
                    {
                        <div style={{ marginRight: "10px" }}>
                          <label className="mb-1 block text-black dark:text-white">
                              <div style={{ fontSize: "16px", marginTop: "6px" }}>
                                <strong>Upload Property Documents:</strong>
                              </div>
                            </label>

                          {selectedRow.property_doc &&
                            selectedRow.property_doc.length > 0 && (
                              <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }}>Previous Uploaded Files : </p>
                            )}
                          {selectedRow.property_doc &&
                            selectedRow.property_doc.length > 0 &&
                            selectedRow.property_doc.map((file, index) => (
                              <div className="flex ml-4 mb-2">
                                <span className="ml-2 mt-2 mr-2 text-gray-600 dark:text-white">{index + 1})</span>
                                <a
                                  href={`http://localhost:3000/docs/${file.file_name}`}
                                  download
                                  target="_blank" // Opens the link in a new tab
                                  rel="noopener noreferrer" // Adds security for external links
                                  className="flex my-0"
                                >
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                  />

                                  {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                    <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                  </svg> */}
                                  {/* <button className="px-4 py-2 disabled:true bg-orange-500 text-white rounded-md hover:bg-orange-600">
                               
                              </button> */}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(
                                      file.id,
                                      'property_doc',
                                      selectedRow.id,
                                    );
                                  }}
                                  className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                  >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                    <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}

                          
                          {selectedRow.property_doc_files && (
                            <p className="my-2">
                              <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                                {Array.from(selectedRow.property_doc_files)
                                  .map((file, index) => (
                                    <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                      {index + 1}) {file.name}
                                    </span>
                                  ))
                                  .reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                          )}

                          
                          <input
                            type="file"
                            multiple
                            className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                            onChange={(e) => {
                              const { name, files: selectedFiles } = e.target;
                              setSelectedRow((prev) => ({
                                ...prev,
                                property_doc_files: selectedFiles,
                              }));
                            }}
                          />
                        </div>
                    }
                    {/* bank statement docs */}
                    {
                        <div style={{ marginRight: "10px" }}>
                          <label className="mb-1 block text-black dark:text-white">
                              <div style={{ fontSize: "16px", marginTop: "6px" }}>
                                <strong>Upload Address Proof:</strong>
                              </div>
                            </label>

                          {selectedRow.bank_statement_doc &&
                            selectedRow.bank_statement_doc.length > 0 && (
                              <p className='mt-2 ml-4 text-black dark:text-white' style={{ fontSize: "14px" }}>Previous Uploaded Files : </p>
                            )}
                          {selectedRow.bank_statement_doc &&
                            selectedRow.bank_statement_doc.length > 0 &&
                            selectedRow.bank_statement_doc.map((file, index) => (
                              <div className="flex ml-4 mb-2">
                                <span className="ml-2 mt-2 mr-2 text-gray-600 dark:text-white">{index + 1})</span>
                                <a
                                  href={`http://localhost:3000/docs/${file.file_name}`}
                                  download
                                  target="_blank" // Opens the link in a new tab
                                  rel="noopener noreferrer" // Adds security for external links
                                  className="flex my-0"
                                >
                                  <FontAwesomeIcon
                                    icon={faDownload}
                                    className="w-6 h-6 mt-2.5 ml-2 text-black dark:text-white" // Tailwind classes for size and color
                                  />

                                  {/* <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path d="M12 3a1 1 0 00-1 1v10.585l-3.293-3.292a1 1 0 10-1.414 1.414l5 5a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L13 14.585V4a1 1 0 00-1-1z" />
                                    <path d="M4 18a1 1 0 011 1v2h14v-2a1 1 0 112 0v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3a1 1 0 011-1z" />
                                  </svg> */}
                                  {/* <button className="px-4 py-2 disabled:true bg-orange-500 text-white rounded-md hover:bg-orange-600">
                               
                              </button> */}
                                </a>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    deleteFile(
                                      file.id,
                                      'bank_statement_doc',
                                      selectedRow.id,
                                    );
                                  }}
                                  className="p-2 rounded-md transition-all active:scale-95 active:shadow-inner mx-4"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    className="feather feather-trash text-gray-800 dark:text-gray-200 hover:text-red-500 transition-all"
                                  >
                                    <polyline points="3 6 5 6 21 6"></polyline>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                                    <line
                                      x1="10"
                                      y1="11"
                                      x2="10"
                                      y2="17"
                                    ></line>
                                    <line
                                      x1="14"
                                      y1="11"
                                      x2="14"
                                      y2="17"
                                    ></line>
                                    <path d="M9 3h6a1 1 0 0 1 1 1v2H8V4a1 1 0 0 1 1-1z"></path>
                                  </svg>
                                </button>
                              </div>
                            ))}

                          
                          {selectedRow.bank_statement_doc_files && (
                            <p className="my-2">
                              <span className='mt-2 ml-4 mr-2 text-black dark:text-white' style={{ fontSize: "14px" }}>Selected Files:</span>
                                {Array.from(selectedRow.bank_statement_doc_files)
                                  .map((file, index) => (
                                    <span key={file.name} className="mt-2 ml-2 mr-0 text-gray-600 dark:text-white" style={{ fontSize: "14px" }}>
                                      {index + 1}) {file.name}
                                    </span>
                                  ))
                                  .reduce((prev, curr) => [prev, ', ', curr])}
                            </p>
                          )}
                          
                          <input
                            type="file"
                            multiple
                            className="w-full rounded-md border border-[#ccc] border-stroke p-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white cursor-pointer"
                            onChange={(e) => {
                              const { name, files: selectedFiles } = e.target;
                              setSelectedRow((prev) => ({
                                ...prev,
                                bank_statement_doc_files: selectedFiles,
                              }));
                            }}
                          />
                        </div>
                    }

                    <div style={{ marginRight: "10px" }}>
                      <label className="mb-1 block text-black dark:text-white">
                        <div style={{ fontSize: "16px", marginTop: "6px" }}>
                          <strong>Contact made on:</strong>
                        </div>
                      </label>
                      <input
                        type="date"
                        value={selectedRow?.contactedOnDisplay || ''}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value);
                          setSelectedRow((prev) => ({
                            ...prev,
                            contactedOn: selectedDate,
                            contactedOnDisplay: e.target.value,
                          }));
                        }}
                        className="w-full px-2 py-1.5 border border-[#ccc] rounded-md  dark:bg-black shadow-sm cursor-pointer"
                      />
                    </div>

                    <div style={{ marginRight: "10px" }}>
                      <label className="mb-1 block text-black dark:text-white">
                        <div style={{ fontSize: "16px", marginTop: "6px" }}>
                          <strong>Response:</strong>
                        </div>
                      </label>
                      <select
                        value={selectedRow.response || ''}
                        onChange={(e) =>
                          setSelectedRow((prev) => ({
                            ...prev,
                            response: e.target.value,
                          }))
                        }
                        className="w-full px-2 py-2 border border-[#ccc] dark:bg-black rounded-md shadow-sm cursor-pointer"
                      >
                        <option value="">Select Response</option>
                        <option value="Interested">Interested</option>
                        <option value="CallBack">Callback Requested</option>
                        <option value="NotInterested">Not Interested</option>
                      </select>
                    </div>

                    {(selectedRow.response === 'CallBack' ||
                      selectedRow.response === 'NotInterested') && (
                      <div style={{ marginRight: "10px" }}>
                        <label className="mb-1 block text-black dark:text-white">
                          <div style={{ fontSize: "16px", marginTop: "6px" }}>
                            <strong>Remarks:</strong>
                          </div>
                        </label>
                        <input
                          type="text"
                          value={selectedRow?.remarks || ''}
                          onChange={(e) =>
                            setSelectedRow((prev) => ({
                              ...prev,
                              remarks: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-2 dark:bg-black border border-[#ccc] rounded-md shadow-sm"
                        />
                      </div>
                    )}

                    {selectedRow.response === 'CallBack' && (
                      <div style={{ marginRight: "10px" }}>
                        <label className="mb-1 block text-black dark:text-white">
                          <div style={{ fontSize: "16px", marginTop: "6px" }}>
                            <strong>Next Contact On::</strong>
                          </div>
                        </label>
                        <input
                          type="date"
                          value={selectedRow?.nextContactOnDisplay || ''}
                          onChange={(e) => {
                            const nextContactDate = new Date(e.target.value);
                            setSelectedRow((prev) => ({
                              ...prev,
                              nextContactOn: nextContactDate,
                              nextContactOnDisplay: e.target.value,
                            }));
                          }}
                          className="w-full px-2 py-2 border border-[#ccc] rounded-md  dark:bg-black shadow-sm"
                        />
                      </div>
                    )}

                    {selectedRow.response === 'Interested' && (
                      <div style={{ marginRight: "10px" }}>
                        <label className="mb-1 block text-black dark:text-white">
                          <div style={{ fontSize: "16px", marginTop: "6px" }}>
                            <strong>Loan Amount:</strong>
                          </div>
                        </label>
                        <input
                          type="number"
                          value={selectedRow?.amount_interested || ''}
                          onChange={(e) =>
                            setSelectedRow((prev) => ({
                              ...prev,
                              amount_interested: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-1.5 border border-[#ccc] dark:bg-black rounded-md shadow-sm"
                        />{' '}
                      </div>
                    )}
                    <div className="mt-6 flex justify-center gap-4">
                      <button
                        type="button"
                        onClick={handleCloseModal}
                        className="px-4 py-1 bg-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1 bg-orange-500 text-white rounded-lg shadow-sm hover:bg-orange-600 transition"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            {/* Right Section: conversation */}
            {selectedRow.status !== 0 && (
              <div className="flex-1 bg-gray-100 rounded-lg dark:bg-black dark:text-white text-black p-4 shadow-md overflow-y-auto max-h-[800px]">
              <h4 className="mb-4 text-xl font-semibold border-b-2 border-orange-500 pb-2 text-black">
                Old Conversations
              </h4>
              <ul className="p-0 m-0 list-none">
                {(selectedRow.conv || []).map((conversation, index) => (
                  <li
                    key={index}
                    className="p-4 mb-4 border border-gray-300 dark:bg-gray-800 rounded-md bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <p className="mb-2 text-gray-700 dark:text-gray-300">
                      <strong className="text-black mr-2">Date:</strong>{' '}
                      {conversation.createdAt.toString().split('T')[0]}
                    </p>
                    <p className="mb-2">
                      <strong className="text-black mr-2">Response:</strong>{' '}
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white ${
                          conversation.response_type === 1 ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {conversation.response_type === 1
                          ? 'Call Back was requested'
                          : 'Not Interested'}
                      </span>
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong className="text-black mr-2">Message:</strong> {conversation.remarks}
                    </p>
                  </li>
                ))}
              </ul>
            </div>            
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LeadsList;
