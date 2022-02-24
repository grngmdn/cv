import { Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
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
        <Typography
          variant="h1"
        >loading...</Typography>
      )
    }

    const { company, dates, duties, title } = jobs[value];

  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          paddingTop: "50px",
          paddingBottom: "50px",
        }}
      >
        Experience
      </Typography>
      {/* nav buttons */}
      <Box>
        {jobs.map(
          (job, index) => {
            return(
              <button 
              key={job.id}
              // making the index into state of "value" so that the site displays job details based on the buttons.
              onClick={() => {setValue(index)}}
              // changing css style class based on the active button 
              className={`btn ${index === value && 'active-btn'}`}
              >
                {job.company}
              </button>
            )
          }
        )}
      </Box>
      {/* job details  */}
      <Box
        sx={{
          width: "80vw",
          paddingTop: '50px'
        }}
      >
        <Typography
          variant="h3"
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          sx={{
            paddingTop: "15px",
            paddingBottom: "15px"
          }}
        >
          {company}
        </Typography>

        <Typography
          variant="p"
          color="textSecondary"
        >
          {dates}
        </Typography>

        {/* mapping over the array of duties  */}
        {duties.map(
          (duty, index) => {
            return(
              <Box
              key={index}
              sx={{
                display: "flex",            
                paddingTop: "25px"
              }}
              >
                <Box
                  sx={{
                    paddingRight: "20px",
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  <FaAngleDoubleRight
                    className="job-icon"
                  >
                  </FaAngleDoubleRight>
                </Box>
                <Box>
                  <Typography
                    variant="p"
                  >
                    {duty}
                  </Typography> 
                </Box>
              </Box>

            )
          }
        )}
      </Box>
    </Box>
  );
}

export default App;
