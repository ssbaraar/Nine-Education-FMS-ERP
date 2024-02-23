import React, { useState , useEffect } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = date.getFullYear();
    return day + '-' + month + '-' + year;
};

  
  const [studentData, setStudentData] = useState({
    firstName: '',
    surName: '',
    parentName: '',
    branch: '',
    primaryContact: '',
    secondaryContact: '',
    gender: '',
    batch: '',
    dateOfJoining: formatDate(new Date()),
    yearOfJoining: '',
    course: '',
    modeOfResidence: '',
    firstYearTuitionFee: '',
    firstYearHostelFee: '',
    secondYearTuitionFee: '',
    secondYearHostelFee: '',
    pendingFirstYearTuitionFee: 0,
    pendingFirstYearHostelFee: 0,
    pendingSecondYearTuitionFee: 0,
    pendingSecondYearHostelFee: 0,
    paidFirstYearTuitionFee: 0,
    paidFirstYearHostelFee: 0,
    paidSecondYearTuitionFee: 0,
    paidSecondYearHostelFee: 0,
    studentStatus: 'Active',
  });
  const [isOnTC, setIsOnTC] = useState(false);
  const [isDayScholar, setIsDayScholar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect hook for handling changes in isOnTC state
  useEffect(() => {
    if (isOnTC) {
      setStudentData(prevState => ({
        ...prevState,
        firstYearTuitionFee: 0,
        pendingFirstYearTuitionFee: 0,
        firstYearHostelFee: 0,
        pendingFirstYearHostelFee: 0
      }));
    }
  }, [isOnTC]);

  // useEffect hook for handling changes in isDayScholar state
  useEffect(() => {
    if (isDayScholar) {
      setStudentData(prevState => ({
        ...prevState,
        firstYearHostelFee: 0,
        pendingFirstYearHostelFee: 0,
        secondYearHostelFee: 0,
        pendingSecondYearHostelFee: 0
      }));
    }
  }, [isDayScholar]);

  const initializeFees = () => {
    setStudentData((prevData) => ({
      ...prevData,
      pendingFirstYearTuitionFee: prevData.firstYearTuitionFee,
      pendingFirstYearHostelFee: prevData.firstYearHostelFee,
      pendingSecondYearTuitionFee: prevData.secondYearTuitionFee,
      pendingSecondYearHostelFee: prevData.secondYearHostelFee,
    }));
  };

  useEffect(() => {
    initializeFees();
  }, []);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [serverResponse, setServerResponse] = useState('None')
  const [errors, setErrors] = useState({
    primaryContactError: '',
    secondaryContactError: '',
});

useEffect(() => {
  setStudentData(prevState => {
    // Determine if the batch already ends with an asterisk
    const batchEndsWithAsterisk = prevState.batch.endsWith('*');
    let updatedBatch = prevState.batch;

    // If turning On TC, add asterisk if not already present
    if (isOnTC && !batchEndsWithAsterisk) {
      updatedBatch += '*';
    }
    // If turning Off TC, remove asterisk if present
    else if (!isOnTC && batchEndsWithAsterisk) {
      updatedBatch = updatedBatch.slice(0, -1); // Remove last character (asterisk)
    }

    return {
      ...prevState,
      batch: updatedBatch,
    };
  });
}, [isOnTC]);



const handleInputChange = (e) => {
  const { name, value } = e.target;
  let newErrors = { ...errors };
  let updatedValue = value;

  // Additional logic for modeOfResidence
  if (name === 'modeOfResidence') {
    setIsDayScholar(value === 'Day Scholar');
  }

  // Convert firstName, surName, and parentName to uppercase and allow only alphabets
  if (name === 'firstName' || name === 'surName' || name === 'parentName') {
    updatedValue = value.toUpperCase().replace(/[^A-Z\s]/g, '');
  }

  // Handling contact numbers validation
  if (name === 'primaryContact' || name === 'secondaryContact') {
      if (value.length !== 10) {
          newErrors[`${name}Error`] = 'Contact number must be 10 digits.';
      } else {
          newErrors[`${name}Error`] = '';
      }

      if (name === 'primaryContact' && value === studentData.secondaryContact) {
          newErrors.secondaryContactError = 'Secondary contact must be different from primary.';
      }
      if (name === 'secondaryContact' && value === studentData.primaryContact) {
          newErrors.secondaryContactError = 'Secondary contact must be different from primary.';
      }
  }

  

  setStudentData(prevState => {
    let newState = { ...prevState, [name]: updatedValue };

    // Copy first-year fees to second-year fields and pending fees
    if (name === 'firstYearTuitionFee') {
      newState.secondYearTuitionFee = updatedValue;
      newState.pendingFirstYearTuitionFee = updatedValue;
    } else if (name === 'firstYearHostelFee') {
      newState.secondYearHostelFee = updatedValue;
      newState.pendingFirstYearHostelFee = updatedValue;
    }

    // Update pending fees for second-year fields
    if (name === 'secondYearTuitionFee') {
      newState.pendingSecondYearTuitionFee = updatedValue;
    } else if (name === 'secondYearHostelFee') {
      newState.pendingSecondYearHostelFee = updatedValue;
    }

    // Extract the year of joining from batch if batch is changed
    if (name === 'batch') {
      const yearOfJoining = value.substring(0, 4); // Extracting the first four characters
      newState.yearOfJoining = yearOfJoining;
    }

    return newState;
  });

  // Update errors
  setErrors(newErrors);
};



  const validateInput = (name, value) => {
    if (name === 'primaryContact' || name === 'secondaryContact' || name==='secondYearHostelFee' || name==="secondYearTuitionFee" || name==="firstYearHostelFee" || name==="firstYearTuitionFee") {
      return /^[0-9]*$/.test(value);
    }
    if (name === 'firstName' || name === 'surName' || name === 'parentName') {
      return /^[a-zA-Z\s]*$/.test(value);
    }
    return true;
  };


  


  const validateForm = () => {
    // Validate all fields including fees
    if (!studentData.firstName.trim() ||
        !studentData.surName.trim() ||
        !studentData.parentName.trim() || 
        !studentData.primaryContact.trim() || 
        !studentData.secondaryContact.trim() || 
        !studentData.gender || 
        !studentData.studentStatus || 
        !studentData.batch || 
        !studentData.branch || 
        !studentData.dateOfJoining ||   
        !studentData.course || 
        !studentData.modeOfResidence ||
        studentData.firstYearTuitionFee === "" ||
        studentData.firstYearHostelFee === "" ||
        studentData.secondYearTuitionFee === "" ||
        studentData.secondYearHostelFee === "") {
      alert('Please fill in all required fields.');
       console.log('Form Data:', studentData);
      return false;
    }
  
    // Additional validation logic for other conditions
  
    // If all validations pass
    return true;
  };
  
  
  
  // const navigate = useNavigate(); // **Create an instance of navigate** 
  const handleSubmit = async (e) => {


    e.preventDefault();    
        // Check for errors before proceeding
        const hasErrors = Object.values(errors).some(error => error !== '');
        if (hasErrors) {
          alert('Please correct the errors before submitting.');
          return; // Prevent form submission
        }
    if (isSubmitting) return;

    if (validateForm()) {
        const updatedStudentData = {
            ...studentData,
            pendingFirstYearHostelFee: studentData.firstYearHostelFee,
            pendingSecondYearTuitionFee: studentData.secondYearTuitionFee,
            pendingSecondYearHostelFee: studentData.secondYearHostelFee
        };
        console.log('Form Data:', studentData);

        setIsSubmitting(true);

        try {
            var SchoolManagementSystemApi = require('school_management_system_api')
            var api = new SchoolManagementSystemApi.StudentsApi()
            var body = new SchoolManagementSystemApi.Student(updatedStudentData);
            SchoolManagementSystemApi.Student.constructFromObject(updatedStudentData, body);

            api.studentsPost(body, function(error, data, response) {
                if (error) {
                    console.error('API Error:', error);
                } else {
                    try {
                        var responseBody = JSON.parse(response.text);
                        if (responseBody && responseBody.message) {
                            setServerResponse(responseBody.message);
                            if (responseBody.message.includes("Student created successfully")) { // **Check if message indicates success**
                                // navigate('/AddReceipts'); // **Redirect to AddReceipts**
                                window.location.href = '/AddReceipts';
                                const user = JSON.parse(localStorage.getItem('user'));
                                if (user) {
                                  user.totalStudentCount = (user.totalStudentCount || 0) + 1;
                                  localStorage.setItem('user', JSON.stringify(user));
                                }
                            }
                        }
                    } catch (parseError) {
                        console.error('Error parsing response:', parseError);
                    }

                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        setShowSuccessMessage(false);
                    }, 3000);
                }
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
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
    
  const [branches, setBranches] = useState([]);
  

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        var SchoolManagementSystemApi = require('school_management_system_api');
        var api = new SchoolManagementSystemApi.DbApi();
        const opts = {
          body: {
            "collectionName": "branches",
            "query": {
              
            },
            "type": 'findMany'
          }
        };

        // console.log(opts.body);

        api.dbGet(opts, function(error, data, response) {
          if (error) {
            console.error('API Error:', error);
          } else {
            try {
              const responseBody = response.body; // Assuming response.body is already in JSON format
              // console.log(responseBody);
              setBranches(responseBody); // Assuming the actual data is in responseBody.data
            } catch (parseError) {
              console.error('Error parsing response:', parseError);
            }
          }
        });
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };
  
    fetchBranches();
  }, []);

  const branch = useSelector((state) => state.auth.branch);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
      if (role === 'Executive' || role === 'Accountant' || role === 'Director') {
          setStudentData(prevState => ({
              ...prevState,
              branch: branch // assuming 'branch' is the value fetched from your global state or prop
          }));
      }
  }, [branch, role]);

  function formatNumberIndia(num) {
    var x = num.toString();
    var lastThree = x.substring(x.length - 3);
    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '')
        lastThree = ',' + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
}  

    return (
      <div className='root-container'>
          <Navbar/>
          <div className="container mx-auto p-4 text-center">   
            <div className="card bg-slate-600 text-black p-2"> {/* Added padding here */}
              <h2 className="text-2xl font-bold text-white">ADD NEW STUDENT</h2>
            </div>
          </div>
      <div className="AddStudent">


      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-4">
        <div className="flex justify-between space-x-1">  {/* First Name and last name Field */}
                  {/* surName Name Field */}
                  <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Student's Surname/Initial</span>
            </div>
            <input
              type="text"
              placeholder="Student's Surname/Initial"
              className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
              name="surName"
              value={studentData.surName}
              onChange={(e) => {
                if (validateInput(e.target.name, e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />
            
          </label>      
          <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Student's First Name</span>
            </div>
            <input
              type="text"
              placeholder="Student's First Name"
              className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
              name="firstName"
              value={studentData.firstName}
              onChange={(e) => {
                if (validateInput(e.target.name, e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />
           
          </label>


        </div>
        <div className="flex justify-between space-x-1 ">        {/* parent Name and branch Field */}
          <label className="form-control w-1/2 pr-2 ">
            <div className="label ">
              <span className="label-text ">Parent's Name</span>
            </div>
            <input
              type="text"
              placeholder="Parent's Name"
              className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
              name="parentName"
              value={studentData.parentName}
              onChange={(e) => {
                if (validateInput(e.target.name, e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />
            
          </label>

          {/* branch Name Field */}
          <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Branch</span>
            </div>
            {
              (role === 'Executive' || role === 'Accountant' || role === 'Director') ? (
                <input
                  type="text"
                  className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                  value={branch}
                  readOnly
                />
              ) : (
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="branch"
                  value={studentData.branch}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Choose Branch</option>
                  {branches.map((branch) => (
                    <option key={branch.branchCode} value={branch.branchCode}>{branch.branchName} ({branch.branchCode})</option>
                  ))}
                </select>
              )
            }
          </label>

        </div>
        <div className="flex justify-between space-x-1">        {/* Primary Contact Field */}
          <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Primary Contact</span>
            </div>
            <input
              type="text"
              placeholder="Primary Contact"
              className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
              name="primaryContact"
              value={studentData.primaryContact}
              onChange={(e) => {
                if (validateInput(e.target.name, e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />  
            {errors.secondaryContactError && <span className="text-red-500">{errors.secondaryContactError}</span>}      
          </label>
          {/* Secondary Contact Field */}
          <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Secondary Contact</span>
            </div>
            <input
              type="text"
              placeholder="Secondary Contact"
              className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
              name="secondaryContact"
              value={studentData.secondaryContact}
              onChange={(e) => {
                if (validateInput(e.target.name, e.target.value)) {
                  handleInputChange(e);
                }
              }}
            />
            {errors.secondaryContactError && <span className="text-red-500">{errors.secondaryContactError}</span>}
          </label>
        </div>
        <div className="flex justify-between space-x-1">        {/* Gender and batch Field */}
          <label className="form-control w-1/2 pr-2">
              <div className="label">
                  <span className="label-text">Gender</span>
              </div>
              <select
                  className="select select-bordered w-full max-w-xs"
                  name="gender"
                  value={studentData.gender}
                  onChange={handleInputChange}
              >
                  <option value="" disabled>Choose Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select>
          </label>

          {/* Batch Field */}
          <label className="form-control w-1/2 pr-2">
            <div className="label">
              <span className="label-text">Batch</span>
            </div>
            <select
              className="select select-bordered w-full max-w-xs"
              name="batch"
              value={studentData.batch}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Batch</option>
              {generateBatchOptions().map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
          </label>

        </div>
        <div className="flex justify-between space-x-1">        {/* Date of Joining Field */}
                <label className="form-control w-1/2 pr-2">
                  <div className="label">
                    <span className="label-text">Date of Joining</span>
                  </div>
                  <div className="rounded border border-gray-400 p-2 w-3/4">
                    <span className="text-gray-700">{formatDate(new Date())}</span>
                  </div>
                </label>

                {/* Year of Joining Field (Read-only) */}
                <label className="form-control w-1/2 pr-2">
                    <div className="label">
                        <span className="label-text">Year of Joining</span>
                    </div>
                    <input
                        type="text"
                        className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                        name="yearOfJoining"
                        value={studentData.yearOfJoining}
                        readOnly // This makes the field read-only
                    />
                </label>

        </div>
        <div className="flex justify-between space-x-1">        {/* Course Field */}
          <label className="form-control w-1/2 pr-2">
              <div className="label">
                  <span className="label-text">Course</span>
              </div>
              <select
                  className="select select-bordered w-full max-w-xs"
                  name="course"
                  value={studentData.course}
                  onChange={handleInputChange}
              >
                  <option value="" disabled>Select Course</option>
                  <option value="MPC">MPC</option>
                  <option value="BiPC">BiPC</option>
              </select>
          </label>


          {/* Mode of Residence Field */}
          <label className="form-control w-1/2 pr-2">
              <div className="label">
                  <span className="label-text">Mode of Residence</span>
              </div>
              <select
                  className="select select-bordered w-full max-w-xs"
                  name="modeOfResidence"
                  value={studentData.modeOfResidence}
                  onChange={handleInputChange}
              >
                  <option value="" disabled>Select Mode of Residence</option>
                  <option value="Day Scholar">Day Scholar</option>
                  <option value="Hostel">Hostel</option>
              </select>
          </label>
        </div>                                              
        <div className="form-control flex">                     {/* on TC Field */}
          <label className="mr-2">On TC?</label>
          <input
            type="checkbox"
            className="checkbox"
            checked={isOnTC}
            onChange={(e) => setIsOnTC(e.target.checked)}
          />
        </div>
        <div className="flex justify-between space-x-1">        {/* 1 Tuition and Hostel Fees Fields */}
                <label className="form-control w-1/2 pr-2">
                  <div className="label">
                    <span className="label-text">1st Year Tuition Fee</span>
                  </div>
                  <input
                    type="text"
                    placeholder="1st Year Tuition Fee"
                    className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                    name="firstYearTuitionFee"
                    value={studentData.firstYearTuitionFee}
                    onChange={(e) => {
                      if (validateInput(e.target.name, e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                    disabled={isOnTC}
                  />
                  <h1 className='text-green-500 text-lg '>You have entered: {formatNumberIndia(studentData.firstYearTuitionFee)}</h1>
                </label>
                <label className="form-control w-1/2 pr-2">
                  <div className="label">
                    <span className="label-text">1st Year Hostel Fee</span>
                  </div>
                  <input
                    type="text"
                    placeholder="1st Year Hostel Fee"
                    className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                    name="firstYearHostelFee"
                    value={studentData.firstYearHostelFee}
                    onChange={(e) => {
                      if (validateInput(e.target.name, e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                    disabled={isOnTC || isDayScholar}
                  />
                  <h1 className='text-green-500 text-lg'>You have entered: {formatNumberIndia(studentData.firstYearHostelFee)}</h1>
                </label>
        </div>
        <div className="flex justify-between space-x-1">        {/* 2 Tuition and Hostel Fees Fields */}
                <label className="form-control w-1/2 pr-2">
                  <div className="label">
                    <span className="label-text">2nd Year Tuition Fee</span>
                  </div>
                  <input
                    type="text"
                    placeholder="2nd Year Tuition Fee"
                    className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                    name="secondYearTuitionFee"
                    value={studentData.secondYearTuitionFee}
                    onChange={(e) => {
                      if (validateInput(e.target.name, e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                  />
                  <h1 className='text-green-500 text-lg'>You have entered: {formatNumberIndia(studentData.secondYearTuitionFee)}</h1>
                </label>
                <label className="form-control w-1/2 pr-2">
                  <div className="label">
                    <span className="label-text">2nd Year Hostel Fee</span>
                  </div>
                  <input
                    type="text"
                    placeholder="2nd Year Hostel Fee"
                    className="input input-bordered w-full max-w-xs bg-[#F2F2F2]"
                    name="secondYearHostelFee"
                    value={studentData.secondYearHostelFee}
                    onChange={(e) => {
                      if (validateInput(e.target.name, e.target.value)) {
                        handleInputChange(e);
                      }
                    }}
                    disabled={isDayScholar}
                  />
                  <h1 className='text-green-500 text-lg'>You have entered: {formatNumberIndia(studentData.secondYearHostelFee)}</h1>
                </label>
        </div>
        <div className="flex justify-between space-x-1">        {/* active status Field */}
        <label className="form-control w-1/2 pr-2">
          <div className="label">
            <span className="label-text">Student Status</span>
          </div>
          <div className="rounded border border-gray-400 p-2 w-3/4 ">
                    <span className="text-gray-700 ">{studentData.studentStatus}</span>
                  </div>
        </label>

        </div>

        
        {showSuccessMessage && (
            <div role="alert" className="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{serverResponse}</span>
            </div>
        )}
        {/* Submit Button */}
        <button 
            type="submit"  
            className={`btn btn-outline ${isSubmitting ? 'bg-gray-500' : 'bg-[#2D5990]'} text-white`} 
            disabled={isSubmitting}
        >
            {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    {isSubmitting && (
        <div className="loader" aria-hidden="true"></div>
    )}
    </div>
  );
};

export default AddStudent;
