import React, { useState, useEffect, useMemo  } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import DirectorCancelledStudents from './DirectorCancelledStudents';
import { useSelector } from 'react-redux';

function AdminComponent() {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(100);
  const [totalStudentCount, setTotalStudentCount] = useState(0);
  const [originalModeOfResidence, setOriginalModeOfResidence] = useState('');
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    // Function to fetch students data from the backend
    const fetchStudents = async () => {
      try {
        var SchoolManagementSystemApi = require('school_management_system_api');
        var api = new SchoolManagementSystemApi.DbApi();
        const opts = {
          body: {
            "collectionName": "students",
            "query": {
              "studentStatus": "Active",
              "branch":user.branch
            },
            "type": "findMany"
          }
        };


        console.log(opts.body);

        api.dbGet(opts, function(error, data, response) {
          if (error) {
            console.error('API Error:', error);
          } else {
            try {
              const responseBody = response.body; // Assuming response.body is already in JSON format
              console.log("Get Kundan Testing",responseBody);
              setStudents(responseBody)
              setTotalStudentCount(responseBody.length);
               // Assuming the actual data is in responseBody.data
            } catch (parseError) {
              console.error('Error parsing response:', parseError);
            }
          }
        });

      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    const filtered = handleSearch(e.target.value.toLowerCase());
    setTotalStudentCount(filtered.length);

  };

  const sortedAndFilteredStudents = useMemo(() => {
    let filtered = students;
    if (searchQuery) {
      const searchTerms = searchQuery.split(',').map(term => term.trim().toLowerCase());
      filtered = students.filter(student => searchTerms.every(term =>
        student.firstName?.toLowerCase().includes(term) ||
        student.applicationNumber?.toLowerCase().includes(term) ||
        student.surName?.toLowerCase().includes(term) ||
        student.parentName?.toLowerCase().includes(term) ||
        student.branch?.toLowerCase().includes(term) ||
        student.primaryContact?.includes(term) ||
        student.gender?.toLowerCase().includes(term) ||
        student.batch?.includes(term) ||
        student.course?.toLowerCase().includes(term) ||
        student.modeOfResidence?.toLowerCase().includes(term) ||
        (student.firstYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.firstYearHostelFee?.toString() ?? "").includes(term) ||
        (student.secondYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.secondYearHostelFee?.toString() ?? "").includes(term) ||
        (student.pendingFirstYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.pendingFirstYearHostelFee?.toString() ?? "").includes(term) ||
        (student.pendingSecondYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.pendingSecondYearHostelFee?.toString() ?? "").includes(term) ||
        (student.paidFirstYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.paidFirstYearHostelFee?.toString() ?? "").includes(term) ||
        (student.paidSecondYearTuitionFee?.toString() ?? "").includes(term) ||
        (student.paidSecondYearHostelFee?.toString() ?? "").includes(term)
      ));
    }
    
    // Continue with the rest of the sorting logic as before
    return filtered.sort((a, b) => {
      if (!sortConfig.key) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [students, searchQuery, sortConfig]);
  

const handleSearch = (searchQuery) => {
  if (!searchQuery) {
    return students;
  }

  const searchTerms = searchQuery.split(',').map(term => term.trim().toLowerCase());

  return students.filter(student => {
    return searchTerms.every(term => {
      // Use regex to specifically match 'male' avoiding matches with 'female'
      if (term === "male") {
        return new RegExp('\\bmale\\b').test(student.gender?.toLowerCase() ?? "");
      }
      // Safely handle properties that could be null or undefined
      return (student.firstName?.toLowerCase().includes(term) ?? false) ||
        (student.applicationNumber?.toLowerCase().includes(term) ?? false) ||
        (student.surName?.toLowerCase().includes(term) ?? false) ||
        (student.parentName?.toLowerCase().includes(term) ?? false) ||
        (student.branch?.toLowerCase().includes(term) ?? false) ||
        (student.primaryContact?.includes(term) ?? false) || // Assuming primaryContact is always a string or number
        (student.gender?.toLowerCase().includes(term) ?? false) ||
        (student.batch?.includes(term) ?? false) ||
        (student.course?.toLowerCase().includes(term) ?? false) ||
        (student.modeOfResidence?.toLowerCase().includes(term) ?? false) ||
        (student.firstYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.firstYearHostelFee?.toString().includes(term) ?? false) ||
        (student.secondYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.secondYearHostelFee?.toString().includes(term) ?? false) ||
        (student.pendingFirstYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.pendingFirstYearHostelFee?.toString().includes(term) ?? false) ||
        (student.pendingSecondYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.pendingSecondYearHostelFee?.toString().includes(term) ?? false) ||
        (student.paidFirstYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.paidFirstYearHostelFee?.toString().includes(term) ?? false) ||
        (student.paidSecondYearTuitionFee?.toString().includes(term) ?? false) ||
        (student.paidSecondYearHostelFee?.toString().includes(term) ?? false);
    });
  });
};


  


const [originalStudentData, setOriginalStudentData] = useState(null);

const openEditModal = (student) => {
    setEditingStudent({ ...student });
    setOriginalStudentData({ ...student }); // Store the original student data
    setIsEditModalOpen(true);
    setOriginalModeOfResidence(student.modeOfResidence);
};

  // New function to handle field change in the edit modal
  const [validationErrors, setValidationErrors] = useState({ primaryContact: '', secondaryContact: '' });
  const [changesToConfirm, setChangesToConfirm] = useState({});

const handleEditChange = (e) => {
  const { name, value } = e.target;
  let updatedValue = value;
  let newValidationErrors = { ...validationErrors };

  // Use the original value from originalStudentData for comparison
  const originalValue = originalStudentData[name];

  // Validation for names
  if (name === 'firstName' || name === 'surName' || name === 'parentName') {
    updatedValue = value.toUpperCase().replace(/[^A-Z\s]/g, '');
  }

  // Validation for contacts
  if (name === 'primaryContact' || name === 'secondaryContact') {
    updatedValue = value.replace(/[^0-9]/g, '');

    // Check for 10 digit length
    if (updatedValue.length !== 10) {
      newValidationErrors[name] = 'Contact number must be 10 digits.';
    } else {
      newValidationErrors[name] = '';
    }
  }

  // Check if primary and secondary contacts are not the same
  const newPrimaryContact = name === 'primaryContact' ? updatedValue : editingStudent.primaryContact;
  const newSecondaryContact = name === 'secondaryContact' ? updatedValue : editingStudent.secondaryContact;

  if (newPrimaryContact === newSecondaryContact && newPrimaryContact.length === 10 && newSecondaryContact.length === 10) {
    newValidationErrors.primaryContact = 'Primary and Secondary contacts must be different.';
    newValidationErrors.secondaryContact = 'Primary and Secondary contacts must be different.';
  } else {
    if (newPrimaryContact.length === 10) newValidationErrors.primaryContact = '';
    if (newSecondaryContact.length === 10) newValidationErrors.secondaryContact = '';
  }

  setValidationErrors(newValidationErrors);
  setEditingStudent({ ...editingStudent, [name]: updatedValue });
  // Handling Mode of Residence changes
  if (name === 'modeOfResidence') {
    if (value === 'Hostel') {
      // Mode of Residence changed to Hostel
      // Set firstYearHostelFee and secondYearHostelFee values to pending fees
      setEditingStudent(prevState => ({
        ...prevState,
        [name]: updatedValue,
        firstYearHostelFee: prevState.pendingFirstYearHostelFee,
        secondYearHostelFee: prevState.pendingSecondYearHostelFee,
        
      }));
    } else if (value === 'Day Scholar') {
      // Mode of Residence changed to Day Scholar
      if (editingStudent.pendingFirstYearHostelFee === 0 && editingStudent.pendingSecondYearHostelFee === 0) {
        // If pending hostel fees are 0, set hostel fees to 0
        setEditingStudent(prevState => ({
          ...prevState,
          [name]: updatedValue,
          firstYearHostelFee: 0,
          secondYearHostelFee: 0,
        }));
      } else {
        // If pending fees are not cleared, alert the user and do not change Mode of Residence
        alert("Since the pending fee for Hostel (1st Year and/or 2nd Year) is not zero, it needs to be cleared or waived off.");
        // Do not update state, hence not changing Mode of Residence
        setEditingStudent(prevState => ({ ...prevState, modeOfResidence: "Hostel" }));
        return;
      }
    }
  } else {
    // Apply the updatedValue for other fields
    setEditingStudent(prevState => ({ ...prevState, [name]: updatedValue }));
  }

  // Update the editingStudent state with potentially validated and corrected value
  setEditingStudent((prevState) => ({ ...prevState, [name]: updatedValue }));

  // Track changes for confirmation
  if (originalValue !== updatedValue) {
    setChangesToConfirm((prev) => ({ ...prev, [name]: updatedValue }));
  } else {
    // If the value was changed back to the original, remove it from changesToConfirm
    const updatedChanges = { ...changesToConfirm };
    delete updatedChanges[name];
    setChangesToConfirm(updatedChanges);
  }
};

  
const [isConfirmed, setIsConfirmed] = useState(false); 
const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  // New function to submit edited data without actual backend update
  const handleEditSubmit = async () => {
    // Check for validation errors
    const hasValidationErrors = Object.values(validationErrors).some(error => error !== '');
  
    // Additional validation for hostel fees when modeOfResidence is "Hostel"
    const requiresHostelFees = editingStudent.modeOfResidence === 'Hostel' && originalModeOfResidence === 'Day Scholar';
    const hostelFeesNotProvided = requiresHostelFees && (!editingStudent.firstYearHostelFee || !editingStudent.secondYearHostelFee);
  
    if (hasValidationErrors || hostelFeesNotProvided) {
      let errorMessage = "Please correct the errors before submitting.";
      if (hostelFeesNotProvided) {
        errorMessage = "Please enter the hostel fees before submitting.";
      }
      alert(errorMessage);
      return;
    }
  
    if (isConfirmed) {
      // If already confirmed through some logic, directly perform submission
      performSubmission();
    } else {
          // If not confirmed, open the confirmation modal and close the edit modal
          setIsEditModalOpen(false);
          setIsConfirmModalOpen(true);

    }
  };
  
  // Adjust the confirmation and cancellation handlers accordingly
  const handleConfirmationAccept = async () => {
    setIsConfirmed(true);
    setIsConfirmModalOpen(false); // Ensure confirmation modal is closed
  // Directly perform the submission logic here
  await performSubmission();
  };
  
  const handleConfirmationCancel = () => {
    setIsConfirmModalOpen(false);
    setIsEditModalOpen(true); // Reopen the editing modal if the user cancels
    setIsConfirmed(false);
  };


 // Extracted submission logic into a separate function for clarity
  const performSubmission = async () => {
    try {
      var SchoolManagementSystemApi = require('school_management_system_api');
      var api = new SchoolManagementSystemApi.DbApi();
      if (editingStudent.studentStatus === "Cancelled") {
        editingStudent.studentName = editingStudent.firstName + " " + editingStudent.surName + " (Cancelled)";
      }
      else {
        editingStudent.studentName = editingStudent.firstName + " " + editingStudent.surName;
      }
      const opts = {
        body: {
          "collectionName": "students",
          "query": {
            'applicationNumber': editingStudent.applicationNumber
          },
          "type": 'updateOne',
          "update": {
            "firstName": editingStudent.firstName,
            "surName": editingStudent.surName,
            "parentName": editingStudent.parentName,
            "primaryContact": editingStudent.primaryContact,
            "secondaryContact": editingStudent.secondaryContact,
            "gender": editingStudent.gender,
            "batch": editingStudent.batch,
            "course": editingStudent.course,
            "modeOfResidence": editingStudent.modeOfResidence,
            "studentStatus": editingStudent.studentStatus,
            // Ensure to include the potentially updated hostel fee fields
            "firstYearHostelFee": editingStudent.firstYearHostelFee,
            "secondYearHostelFee": editingStudent.secondYearHostelFee,
            // You might also need to update pending fees if logic requires
            "pendingFirstYearHostelFee": editingStudent.firstYearHostelFee,
            "pendingSecondYearHostelFee": editingStudent.secondYearHostelFee,

          }
        }
      };

      api.dbUpdate(opts, function(error, data, response) {
        if (error) {
          console.error('API Error:', error);
        } else {
          try {
            const responseBody = response.body; // Assuming response.body is already in JSON format
            console.log("Update Kundan Testing",responseBody);
            // setStudents(responseBody.data); // Assuming the actual data is in responseBody.data
  
            // Close the modal and reset editingStudent
            setIsEditModalOpen(false);
            setEditingStudent(null);
  
            // Display success message with changes
            console.log(`Student updated successfully: ${JSON.stringify(editingStudent)}`);
  
          } catch (parseError) {
            console.error('Error parsing response:', parseError);
          }
        }
      });


      const opts2 = {
        body : {
          "collectionName": "receipts",
          "query": {
            'applicationNumber': editingStudent.applicationNumber
          },
          "type": 'updateMany',
          "update": {
            "studentName": editingStudent.studentName,
            "parentName": editingStudent.parentName,
            "registeredMobileNumber": editingStudent.primaryContact,
            "gender": editingStudent.gender,
            "batch": editingStudent.batch,
            "stream": editingStudent.course,
            "residenceType": editingStudent.modeOfResidence,
            "studentStatus": editingStudent.studentStatus,
            "firstYearHostelFeePayable":editingStudent.firstYearHostelFee,
            "secondYearHostelFeePayable":editingStudent.secondYearHostelFee,    
            "firstYearTotalHostelFeePending":editingStudent.firstYearHostelFee,
            "secondYearTotalHostelFeePending":editingStudent.secondYearHostelFee,
          }
        }
      }

      api.dbUpdate(opts2, function(error, data, response) {
        if (error) {
          console.error('API Error:', error);
        } else {
          try {
            const responseBody = response.body; // Assuming response.body is already in JSON format
            console.log(responseBody);
  
            // Display success message with changes
            setIsEditModalOpen(false);
            setEditingStudent(null);
            setChangesToConfirm({});
            setIsConfirmed(false); // Reset the confirmation flag
    
            console.log(`bulk receipt updated successfully: ${JSON.stringify(responseBody)}`);
            // relod the window
            window.location.reload();
          } catch (parseError) {
            console.error('Error parsing response:', parseError);
          }
        }
      });


    } catch (error) {
      console.error("Error updating student: ", error);
    }
    console.log("Performing submission with the edited data...");
  }; 
  

  const generateBatchOptions = () => {
    const startYear = 2022;
    const endYear = 2048;
    const options = [];

    for (let year = startYear; year <= endYear; year++) {
      options.push(`${year}-${year + 2}`);
    }

    return options;
  };  
  
  
  const exportToExcel = () => {
    const dataToExport = mapDataToSchema(handleSearch(searchQuery));// Fetch the data to be exported
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });


    const now = new Date();
    const formattedDate = `${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')} ${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    
    // Create a Blob
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    
    // Use FileSaver to save the file
    saveAs(data, `Dashboard ${formattedDate}.xlsx`);
  };

  const mapDataToSchema = (data) => {
    return data.map(student => ({
      'Name': `${student.firstName} ${student.surName}`,
      'Application Number': student.applicationNumber,
      'Parent Name': student.parentName,
      'Branch': student.branch,
      'Primary Contact': student.primaryContact,
      'Gender': student.gender,
      'Batch': student.batch,
      // 'Date of Joining': student.dateOfJoining ? new Date(student.dateOfJoining).toLocaleDateString() : '',
      'Course': student.course,
      'Mode of Residence': student.modeOfResidence,
      '1st Year Tuition Fee': student.firstYearTuitionFee,
      '1st Year Hostel Fee': student.firstYearHostelFee,
      '2nd Year Tuition Fee': student.secondYearTuitionFee,
      '2nd Year Hostel Fee': student.secondYearHostelFee,
      'Paid 1st Year Tuition Fee': student.paidFirstYearTuitionFee,
      'Paid 1st Year Hostel Fee': student.paidFirstYearHostelFee,
      'Paid 2nd Year Tuition Fee': student.paidSecondYearTuitionFee,
      'Paid 2nd Year Hostel Fee': student.paidSecondYearHostelFee,
      'Pending 1st Year Tuition Fee': student.pendingFirstYearTuitionFee,
      'Pending 1st Year Hostel Fee': student.pendingFirstYearHostelFee,
      'Pending 2nd Year Tuition Fee': student.pendingSecondYearTuitionFee,
      'Pending 2nd Year Hostel Fee': student.pendingSecondYearHostelFee,
      // Add other fields if necessary
    }));
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  } 


  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' 🔼' : ' 🔽';
    }
    return '';
  };


  const totalPages = Math.ceil(sortedAndFilteredStudents.length / rowsPerPage);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPageNumbers = () => {
    let pageNumbers = [];
    const totalPages = Math.ceil(sortedAndFilteredStudents.length / rowsPerPage);
    const pageBuffer = 3; // Number of pages to show before and after current page
  
    for (let i = 1; i <= totalPages; i++) {
      // Always add the first and last few pages
      if (i === 1 || i === totalPages || i === currentPage || (i >= currentPage - pageBuffer && i <= currentPage + pageBuffer)) {
        pageNumbers.push(
          <button key={i} onClick={() => paginate(i)} className={`btn ${currentPage === i ? 'btn-active' : ''}`}>
            {i}
          </button>
        );
      }
    }
  
    // Insert ellipses where there are gaps in the page numbers
    const withEllipses = [];
    let prevPage = null;
    for (const page of pageNumbers) {
      if (prevPage) {
        // If there's a gap between this page and the previous page, insert ellipses
        if (page.key - prevPage.key > 1) {
          withEllipses.push(<span key={`ellipsis-${prevPage.key}`} className="px-2">...</span>);
        }
      }
      withEllipses.push(page);
      prevPage = page;
    }
  
    return withEllipses;
  };

  
  const indexOfLastStudent = currentPage * rowsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
  const currentStudents = sortedAndFilteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

  const [showCancelled, setShowCancelled] = useState(false);

  // Function to toggle showCancelled state
  const toggleShowCancelled = () => {
    setShowCancelled(!showCancelled);
  };
  


  return (

    
    <div >   

<div className="overflow-x-auto mt-3">
<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
  <div className="mb-4 md:mb-0">
    <button onClick={exportToExcel} className="btn btn-primary bg-blue-500 hover:bg-blue-700">
      Export to Excel
    </button>
  </div>
  <div className="flex-1 flex justify-center card bg-slate-600 text-black px-4 py-2 text-center"> {/* Center-align the dashboard heading */}
    <h2 className="text-2xl font-bold text-white">DASHBOARD</h2>
  </div>
  <div className="flex flex-col items-center md:items-end w-full md:w-auto">
    <input
      type="text"
      placeholder="Search students..."
      className="input input-bordered w-full md:max-w-xs text-black placeholder-black mb-4 md:mb-0"
      value={searchQuery}
      onChange={handleSearchChange}
    />
    <div className="text-m font-bold text-black w-full md:w-auto md:pr-0 " style={{ paddingRight: '4rem' }}>Total Students: {totalStudentCount}</div>

  </div>
</div>




        <div className="pagination">
          {renderPageNumbers()}
        </div>       
            
        <table className="min-w-full border border-gray-800 border-collapse">
          <thead>
            <tr style={{backgroundColor: '#2D5990', color:'#FFFFFF'}}>
              <th  className="text-xs" onClick={() => requestSort('firstName')}>Student Name {getSortDirection('firstName')}</th>
              <th  className="text-xs" onClick={() => requestSort('applicationNumber')}>Application Number {getSortDirection('applicationNumber')}</th>
              <th  className="text-xs" onClick={() => requestSort('parentName')}>Parent Name {getSortDirection('parentName')}</th>
              <th  className="text-xs" onClick={() => requestSort('primaryContact')}>Primary Contact {getSortDirection('primaryContact')}</th>
              <th  className="text-xs" onClick={() => requestSort('gender')}>Gender {getSortDirection('gender')}</th>
              <th  className="text-xs" onClick={() => requestSort('batch')}>Batch {getSortDirection('batch')}</th>
              <th  className="text-xs" onClick={() => requestSort('course')}>Course {getSortDirection('course')}</th>
              <th  className="text-xs" onClick={() => requestSort('modeOfResidence')}>Mode of Residence {getSortDirection('modeOfResidence')}</th>
              <th  className="text-xs" onClick={() => requestSort('firstYearTuitionFee')}>1st Year Tuition Fee {getSortDirection('firstYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('firstYearHostelFee')}>1st Year Hostel Fee {getSortDirection('firstYearHostelFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('secondYearTuitionFee')}>2nd Year Tuition Fee {getSortDirection('secondYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('secondYearHostelFee')}>2nd Year Hostel Fee {getSortDirection('secondYearHostelFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('paidFirstYearTuitionFee')}>Paid 1st Year Tuition Fee {getSortDirection('paidFirstYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('paidFirstYearHostelFee')}>Paid 1st Year Hostel Fee {getSortDirection('paidFirstYearHostelFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('paidSecondYearTuitionFee')}>Paid 2nd Year Tuition Fee {getSortDirection('paidSecondYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('paidSecondYearHostelFee')}>Paid 2nd Year Hostel Fee {getSortDirection('paidSecondYearHostelFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('pendingFirstYearTuitionFee')}>Pending 1st Year Tuition Fee {getSortDirection('pendingFirstYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('pendingFirstYearHostelFee')}>Pending 1st Year Hostel Fee {getSortDirection('pendingFirstYearHostelFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('pendingSecondYearTuitionFee')}>Pending 2nd Year Tuition Fee {getSortDirection('pendingSecondYearTuitionFee')}</th>
              <th  className="text-xs" onClick={() => requestSort('pendingSecondYearHostelFee')}>Pending 2nd Year Hostel Fee {getSortDirection('pendingSecondYearHostelFee')}</th>
              <th  className="text-xs">Action</th> {/* Assuming no sorting for the action column */}
            </tr>
          </thead>

          <tbody>
            {currentStudents.map((student, index) => (
              <tr className="odd:bg-[#FFFFFF] even:bg-[#F2F2F2]" key={index}>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs" >{`${student.firstName} ${student.surName}`.trim()}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.applicationNumber}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.parentName}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.primaryContact}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.gender}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.batch}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.course}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.modeOfResidence}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.firstYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.firstYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.secondYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.secondYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.paidFirstYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.paidFirstYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.paidSecondYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.paidSecondYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.pendingFirstYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.pendingFirstYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.pendingSecondYearTuitionFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">{student.pendingSecondYearHostelFee}</td>
                <td className="border-2 border-gray-800 px-4 py-2 text-xs">
                    <button onClick={() => openEditModal(student)} style={{ color: "#2D5990" }}>
                        <i className="fas fa-edit"></i>
                    </button>
                </td>
      </tr>

            ))}
          </tbody>
        </table>



      </div>


    {isEditModalOpen && (
      <div className="edit-modal">
        <h3 className="text-xs font-semibold ">Editing Student Details</h3>
        <h3 className="text-xs font-semibold ">{editingStudent.applicationNumber}</h3>


        <label className="form-control text-xs">
          <span className="label-text text-xs">First Name</span>
          <input type="text" name="firstName" value={editingStudent.firstName} onChange={handleEditChange} />
        </label>
        <label className="form-control text-xs">
          <span className="label-text text-xs">Surname</span>
          <input type="text" name="surName" value={editingStudent.surName} onChange={handleEditChange} />
        </label>
        <label className="form-control text-xs">
          <span className="label-text text-xs">Parent Name</span>
          <input type="text" name="parentName" value={editingStudent.parentName} onChange={handleEditChange} />
        </label>
        <label className="form-control text-xs">
          <span className="label-text text-xs">Primary Contact</span>
          <input type="text" name="primaryContact" value={editingStudent.primaryContact} onChange={handleEditChange} />
          {validationErrors.primaryContact && <span className="text-red-500">{validationErrors.primaryContact}</span>}
        </label>
        <label className="form-control text-xs">
          <span className="label-text text-xs">Secondary Contact</span>
          <input type="text" name="secondaryContact" value={editingStudent.secondaryContact} onChange={handleEditChange} />
          {validationErrors.secondaryContact && <span className="text-red-500">{validationErrors.secondaryContact}</span>}
        </label>


        <label className="form-control text-xs">
          <span className="label-text text-xs">Gender</span>
          <select name="gender" value={editingStudent.gender} onChange={handleEditChange}>
            <option value="" disabled>Choose Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>

        <label className="form-control text-xs">
          <span className="label-text text-xs">Batch</span>
          <select name="batch" value={editingStudent.batch} onChange={handleEditChange}>
            {generateBatchOptions().map(batch => (
              <option key={batch} value={batch}>{batch}</option>
            ))}
          </select>
        </label>

        <label className="form-control text-xs">
          <span className="label-text text-xs">Course</span>
          <select name="course" value={editingStudent.course} onChange={handleEditChange}>
            <option value="" disabled>Select Course</option>
            <option value="MPC">MPC</option>
            <option value="BiPC">BiPC</option>
          </select>
        </label>

        <label className="form-control text-xs">
          <span className="label-text text-xs">Mode of Residence</span>
          <select name="modeOfResidence" value={editingStudent.modeOfResidence} onChange={handleEditChange}>
            <option value="" disabled>Select Mode of Residence</option>
            <option value="Day Scholar">Day Scholar</option>
            <option value="Hostel">Hostel</option>
          </select>
        </label>
        {editingStudent.modeOfResidence === 'Hostel' && originalModeOfResidence === 'Day Scholar' && (
          <>
            <label className="form-control text-xs">
              <span className="label-text text-xs">First Year Hostel Fee</span>
              <input type="number" name="firstYearHostelFee" value={editingStudent.firstYearHostelFee || ''} onChange={handleEditChange} />
            </label>
            <label className="form-control text-xs">
              <span className="label-text text-xs">Second Year Hostel Fee</span>
              <input type="number" name="secondYearHostelFee" value={editingStudent.secondYearHostelFee || ''} onChange={handleEditChange} />
            </label>
          </>
        )}

        <label className="form-control text-xs">
          <span className="label-text text-xs">Student Status</span>
          <select name="studentStatus" value={editingStudent.studentStatus} onChange={handleEditChange}>
            <option value="Active">ACTIVE</option>
            <option value="Cancelled">CANCELLED</option>
          </select>
        </label>

        <button className="btn btn-outline text-white text-xs" style={{ backgroundColor: '#2D5990' }} onClick={handleEditSubmit}>Submit</button>
        <button className="btn btn-outline text-white text-xs" style={{ backgroundColor: '#2D5990' }} onClick={() => setIsEditModalOpen(false)}>Close</button>
      </div>
    )}

{isConfirmModalOpen && (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
      <div className="mt-3 text-center">
        <h3 className="text-lg leading-6 font-medium text-black-900">Confirm Changes</h3>
        <div className="mt-2">
          {Object.keys(changesToConfirm).length > 0 ? (
            <>
              <p className="text-sm text-black-500">Are you sure you want to save these changes?</p>
              <ul className="text-sm text-black-500 list-disc list-inside">
                {Object.entries(changesToConfirm).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>
              <div className="items-center gap-4 mt-4">
                <button className="btn btn-outline text-white text-xs" style={{ backgroundColor: '#2D5990' }}
                  onClick={handleConfirmationAccept}>
                  Confirm
                </button>
                <button className="btn btn-outline text-white text-xs" style={{ backgroundColor: '#2D5990' }}
                  onClick={handleConfirmationCancel}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-black-500">No changes made.</p>
              <div className="items-center gap-4 mt-4">
                <button className="btn btn-outline text-white text-xs" style={{ backgroundColor: '#2D5990' }}
                  onClick={handleConfirmationCancel}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
)}



      <div className="pagination">
        {renderPageNumbers()}
      </div>

      

      <div className="my-4 ml-4">
        <label className="flex items-center">
          <span className="label-text mr-2">View Cancelled Students -</span>
          <input 
            type="checkbox" 
            checked={showCancelled} 
            onChange={toggleShowCancelled} 
            className="checkbox checkbox-normal" 
          />
        </label>
      </div>



      {showCancelled && <DirectorCancelledStudents />}

      

</div>
  );
}

export default AdminComponent;