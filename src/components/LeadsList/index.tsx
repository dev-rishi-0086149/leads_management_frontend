import React, { useEffect, useRef, useState } from 'react';

import DataTable from 'react-data-table-component';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LeadsList from './List';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

const LeadsListDash: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRows, setTotalRows] = useState(0);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [tab, setTab] = useState(0); //0->pending 1->upcoming leads/waiting for callback 2->intrested 3->cold lead
  const [overDueLeads, setOverDueLeads] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const getDataCount = async () => {
    const response = await axios.get(
      `http://localhost:3000/leads/get-leads-count?tab=${tab}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
    setTotalRows(response.data.count);
  };

  const getData = async () => {
    const response = await axios.get(
      `http://localhost:3000/leads/get-leads?rown=${rowsPerPage}&pageno=${currentPage}&tab=${tab}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const nowIST = new Date(now.getTime() + istOffset);
    const formattedData = response.data.data.map((row) => ({
      ...row,
      time_passed: Math.floor(
        (nowIST - new Date(row.lead_origin_date)) / (1000 * 60 * 60 * 24),
      ),
      contactedOnDisplay: row.contacted_on ? row.contacted_on.toString() : null,
      aadhar_doc: row.docs.filter((doc) => {
        return doc.doc_type == 0;
      }),
      pan_doc: row.docs.filter((doc) => {
        return doc.doc_type == 1;
      }),
      property_doc: row.docs.filter((doc) => {
        return doc.doc_type == 2;
      }),
      bank_statement_doc: row.docs.filter((doc) => {
        return doc.doc_type == 3;
      }),
      income_proof_doc: row.docs.filter((doc) => {
        return doc.doc_type == 4;
      }),
      address_proof_doc: row.docs.filter((doc) => {
        return doc.doc_type == 5;
      }),
    }));

    //doc_type
    //0-aadhar docs
    //1-pan docs
    //2-property docs
    //3-bank statement
    //4-income proof doc
    //5 address proof doc

    setTableData(formattedData);
    console.log(formattedData);
    if (response.data.status && response.data.data.length > 0) {
      //console.log(formattedData);
      let tempColumns = [
        {
          name: 'ID',
          selector: (row) => row.id,
          sortable: true,
          center: true,
          width: '6%',
        },
        {
          name: 'CUST_NAME',
          selector: (row) =>
            row.type == 1
              ? row.datalake_cust_data?.cust_name
              : row.website_cust_data?.cust_name,
          sortable: true,
          center: true,
          width: '17%',
        },
        {
          name: 'AADHAR',
          selector: (row) =>
            row.type == 0
              ? row.website_cust_data?.aadhar
              : row.datalake_cust_data?.aadhar,
          sortable: true,
          center: true,
          width: '17%',
        },
        {
          name: 'PAN',
          selector: (row) =>
            row.type == 0
              ? row.website_cust_data?.PAN
              : row.datalake_cust_data?.PAN,
          sortable: true,
          center: true,
          width: '10%',
        },
        {
          name: 'PHONE NO.',
          selector: (row) =>
            row.type == 0
              ? row.website_cust_data?.phone_no
              : row.datalake_cust_data?.phone_no,
          sortable: true,
          width: '10%',
          center: true,
        },
        {
          name: 'CITY',
          selector: (row) =>
            row.type == 0
              ? row.website_cust_data?.city
              : row.datalake_cust_data?.city,
          sortable: true,
          center: true,
          width: '10%',
        },
        {
          name: 'TIME ELAPSED',
          selector: (row) => row.time_passed,
          cell: (row) =>
            row.time_passed > 7 ? (
              <span className="text-red-500 font-extrabold">
                {row.time_passed}
              </span>
            ) : (
              <span className="text-green-500">{row.time_passed}</span>
            ),
          sortable: true,
          center: true,
          width: '10%',
        },
        {
          name: 'CHANNEL',
          selector: (row) => (row.type == 0 ? 'WEBSITE' : 'DATA LAKE'),
          sortable: true,
          center: true,
          width: '10%',
        },
        {
          name: 'ACTION',
          selector: (row) => (
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                cursor: 'pointer',
                fontSize: '1.2rem',
                color: '',
              }}
              onClick={() => handleEditView(row)}
              title="Edit"
            />
          ),
          center: true,
          width: '10%',
        },
      ];
      setColumns(tempColumns);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    getDataCount();
    getData();
  }, [rowsPerPage, currentPage, tab]);

  //toast on initial load
  // useEffect(() => {
  //   if (!initialLoading && tableData.length > 0) {
  //     const pendingData = tableData.filter((lead) => lead.time_passed > 5);
  //     setOverDueLeads(pendingData);

  //     pendingData.forEach((pendingLead, index) => {
  //       setTimeout(() => {
  //         toast(
  //           (t) => (
  //             <div
  //               style={{
  //                 display: "flex",
  //                 alignItems: "center",
  //                 justifyContent: "space-between",
  //                 padding: "10px",
  //                 backgroundColor: "#f8d7da",
  //                 borderRadius: "1px",
  //                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  //               }}
  //             >
  //               <span>
  //                 <strong>Alert:</strong> Lead with ID {pendingLead.id} is{" "}
  //                 {pendingLead.time_passed} days past TAT deadline
  //               </span>
  //               <button
  //                 onClick={() => toast.dismiss(t.id)}
  //                 style={{
  //                   backgroundColor: "transparent",
  //                   border: "none",
  //                   fontSize: "16px",
  //                   cursor: "pointer",
  //                   marginLeft: "10px",
  //                   color: "#721c24",
  //                 }}
  //               >
  //                 ✖
  //               </button>
  //             </div>
  //           ),
  //           { duration: 10000, position: "bottom-right" } // Adjust duration and position
  //         );
  //       }, index * 500); // Delay by 0.5s for each toast
  //     });
  //   }
  // }, [initialLoading]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const handleEditView = (row) => {
    setSelectedRow(row);
    setDisplayEdit(true);
  };

  const handleTabSwitch = (newTab) => {
    setTab(newTab);
    setCurrentPage(1); // Reset to first page when switching tabs
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    //
    const formData = new FormData();
    formData.append('id', selectedRow.id);
    formData.append('contacted_on', selectedRow.contactedOn);
    formData.append('response', selectedRow.response);
    
    //aadhar docs files
    selectedRow.aadhar_doc_file && Array.from(selectedRow.aadhar_doc_file)?.forEach((file)=>{
      formData.append('aadhar_doc',file)
    });
    
    //pan doc files
    selectedRow.pan_doc_file && Array.from(selectedRow.pan_doc_file)?.forEach((file)=>{
      formData.append('pan_doc',file)
    });
    
    //property doc files
    selectedRow.property_doc_files && Array.from(selectedRow.property_doc_files)?.forEach((file)=>{
      formData.append('property_doc',file)
    });

    //bank statement files
    selectedRow.bank_statement_doc_files && Array.from(selectedRow.bank_statement_doc_files)?.forEach((file)=>{
      formData.append('bank_statement_doc',file)
    });

    //income proof docs
    selectedRow.income_proof_doc_files && Array.from(selectedRow.income_proof_doc_files)?.forEach((file)=>{
      formData.append('income_proof_doc',file)
    });

    //address proof docs
    selectedRow.address_proof_doc_files && Array.from(selectedRow.address_proof_doc_files)?.forEach((file)=>{
      formData.append('address_proof_doc',file)
    });
    
    if (selectedRow.annual_income)
      formData.append('annual_income', selectedRow.annual_income);
    if (selectedRow.address) formData.append('address', selectedRow.address);

    if (formData.get('response') == 'CallBack') {
      formData.append('lead_origin_date', selectedRow.nextContactOn);
    }
    if (
      formData.get('response') == 'NotInterested' ||
      formData.get('response') == 'CallBack'
    ) {
      formData.append('remarks', selectedRow.remarks);
    }
    if (formData.get('response') == 'Interested') {
      formData.append('amount_interested', selectedRow.amount_interested);
    }

    const response = await axios.post(
      'http://localhost:3000/leads/update-lead',
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );

    if (response.data.status) {
      getData();
    }

    handleCloseModal();
  };

  const handleCloseModal = () => {
    setDisplayEdit(false);
    setSelectedRow(null);
    getData();
  };

  const deleteFile = async (id, fileType, leadId) => {
    if (fileType == 'aadhar_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        aadhar_doc: prev.aadhar_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    } else if (fileType == 'pan_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        pan_doc: prev.pan_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    }else if (fileType == 'income_proof_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        income_proof_doc: prev.income_proof_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    }
    else if (fileType == 'address_proof_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        address_proof_doc: prev.address_proof_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    }
    else if (fileType == 'property_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        property_doc: prev.property_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    }
    else if (fileType == 'bank_statement_doc') {
      setSelectedRow((prev) => ({
        ...prev,
        bank_statement: prev.bank_statement_doc.filter((file) => {
          return file.id != id;
        }),
      }));
    }
    
    
    
    

    
    console.log('selected row - ', selectedRow);

    const response = await axios.post(
      'http://localhost:3000/leads/delete-file',
      { id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
      },
    );
  };

  return (
    <>
      <LeadsList
        tableData={tableData}
        columns={columns}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        totalRows={totalRows}
        displayEdit={displayEdit}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        tab={tab}
        handlePageChange={handlePageChange}
        handleRowsPerPageChange={handleRowsPerPageChange}
        handleEditView={handleEditView}
        handleTabSwitch={handleTabSwitch}
        handleFormSubmit={handleFormSubmit}
        handleCloseModal={handleCloseModal}
        deleteFile={deleteFile}
      />
    </>
  );
};

export default LeadsListDash;
