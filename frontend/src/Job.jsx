import styles from "./Job.module.css";

export default function Job({ job, withCompany = false, apply, applied }) {
  return (
    <div className={styles.jobContainer}>
      <div className={styles.jobDetails}>
        <div className={styles.jobTitle}>{job.title}</div>
        {withCompany ? <div>{job.companyName}</div> : ""}
        <div className={styles.jobSalary}>
          Salary: ${(+job.salary).toLocaleString()}
        </div>
        <div className={styles.jobEquity}>Equity: {job.equity || 0}</div>
      </div>

      <div className={styles.applyBtn}>
        {applied ? (
          <button disabled className={styles.appliedBtn}>
            Applied
          </button>
        ) : (
          <button onClick={() => apply(job.id)}>Apply</button>
        )}
      </div>
    </div>
  );
}
