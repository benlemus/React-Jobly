import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Company from "./Company";
import Search from "./Search";
import JoblyApi from "./api";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();

  useEffect(() => {
    async function fetchCompanies() {
      const name = searchParams.get("name");
      const paramData = name ? { name } : {};
      const comps = await JoblyApi.getCompanies(paramData);
      setCompanies(comps);
    }
    fetchCompanies();
  }, [queryString, searchParams]);

  return (
    <div>
      <Search type={"companies"} />

      {companies.map((c) => (
        <Company company={c} key={c.handle} />
      ))}
    </div>
  );
}
