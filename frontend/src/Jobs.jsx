import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Job from "./Job";
import Search from "./Search";
import JoblyApi from "./api";

export default function Jobs({ apply, curUser }) {
  const [jobs, setJobs] = useState([]);
  const [searchParams] = useSearchParams();

  const queryString = searchParams.toString();

  useEffect(() => {
    async function fetchJobs() {
      const title = searchParams.get("title");
      const params = title ? { title } : {};
      const jobsData = await JoblyApi.getJobs(params);
      setJobs(jobsData);
    }
    fetchJobs();
  }, [queryString, searchParams, curUser.applications]);

  return (
    <div>
      <Search type={"jobs"} />

      {jobs.map((j) => (
        <Job
          job={j}
          key={j.id}
          withCompany={true}
          apply={apply}
          applied={
            curUser && curUser.applications.includes(j.id) ? true : false
          }
        />
      ))}
    </div>
  );
}
