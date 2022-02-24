import React, { useEffect, useState } from "react"
import { FaAngleDoubleRight } from 'react-icons/fa'
const url = 'https://course-api.com/react-tabs-project'


function App() {

  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(1)

  // fetches the data 
  const fetchJobs = async () => {
    const response = await fetch(url)
    const newJobs = await response.json()

    setJobs(newJobs)
    setLoading(false)
  }

  // adds the data into the empty "jobs" state when the page loads 
  useEffect(
    () => {
      fetchJobs()
    }, []
  )

  // loading condition 
    if(loading) {
      return(
        <h1>loading...</h1>
      )
    }

    const { company, dates, duties, title } = jobs[value];

  return (
    <div>
      <h1>Experience</h1>
      {/* nav buttons */}
      <div>
        {jobs.map(
          (job, index) => {
            return(
              <button 
              key={job.id}
              onClick={() => {
                // making the index into state of "value" so that the site displays job details based on the buttons.
                setValue(index)
              }}
              >
                {job.company}
              </button>
            )
          }
        )}
      </div>
      {/* job details  */}
      <div>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p>{dates}</p>
        {/* mapping over the array of duties  */}
        {duties.map(
          (duty, index) => {
            return(
              <p key={index}><FaAngleDoubleRight></FaAngleDoubleRight>{duty}</p>
            )
          }
        )}
      </div>
    </div>
  );
}

export default App;
