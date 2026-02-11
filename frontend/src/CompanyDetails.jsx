import { useParams } from "react-router-dom";
import styles from "./CompanyDetails.module.css";
import { useEffect, useState } from "react";
import JoblyApi from "../../api";
import Job from "./Job";

export default function CompanyDetails({ apply, curUser }) {
  const params = useParams();

  const [curCompany, setCurCompany] = useState({});

  useEffect(() => {
    async function fetchCompanies() {
      const comp = await JoblyApi.getCompany(params.handle);
      setCurCompany(comp);
    }
    fetchCompanies();
  }, [params.handle]);

  return (
    <div>
      <div className={styles.companyDetails}>
        <div className={styles.companyName}>{curCompany.name}</div>
        <div className={styles.companyDesc}>{curCompany.description}</div>
      </div>

      <div className={styles.companyJobs}>
        {curCompany.jobs?.map((j) => (
          <Job
            job={j}
            key={j.title}
            apply={apply}
            applied={
              curUser?.jobs && curUser.jobs.includes(j.id) ? true : false
            }
            withCompany={false}
          />
        ))}
      </div>
    </div>
  );
}
