import { useCallback, useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import { MultiValue, SingleValue } from "react-select";

import { JobDescription } from "./utils/types";
import { Loader, JobCard, Filters } from "./components";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [currentJDs, setCurrentJDs] = useState<JobDescription[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    roles: [],
    noOfEmployees: [],
    experience: [],
    jobLocation: [],
    techStack: [],
    baseSalary: [],
  });
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const fetchInitialData = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 9,
        offset: 0,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          setCurrentJDs(result.jdList);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    fetchInitialData();
  }, []);

  const fetchAdditionalData = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    const fetchData = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const body = JSON.stringify({
        limit: 9,
        offset,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
      };

      fetch(
        "https://api.weekday.technology/adhoc/getSampleJdJSON",
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          setCurrentJDs((prevJDs) => [...prevJDs, ...result.jdList]);
          setOffset((prevOffset) => prevOffset + 1);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false);
        });
    };
    fetchData();
  }, [offset, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchAdditionalData();
      }
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const currRef = containerRef.current;
    return () => {
      if (currRef) {
        observer.unobserve(currRef);
      }
    };
  }, [fetchAdditionalData]);

  const handleFilterChange = (
    filterName: string,
    selectedOptions: SingleValue<object> | MultiValue<object>,
  ) => {
    if (selectedOptions) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterName]: selectedOptions.map((option) => option?.value),
      }));
    }
  };

  const filterJobDescriptions = (job: JobDescription) => {
    if (job) {
      return (
        filters.roles.includes(job?.jobRole) &&
        filters.jobLocation.includes(job?.location) &&
        filters.experience.includes(job?.minExp) &&
        filters.baseSalary.includes(job?.minJdSalary)
      );
    } else return;
  };

  const filteredJDs = currentJDs.filter(filterJobDescriptions);

  return (
    <div>
      <Filters handleFilterChange={handleFilterChange} />
      <Grid
        container
        columnSpacing={4}
        rowSpacing={{ xs: 6, sm: 6, md: 4 }}
        ref={containerRef}
        className="jobcard-grid-container"
      >
        {currentJDs.map((jd, idx) => (
          <JobCard key={idx} jobDescription={jd} />
        ))}
      </Grid>
      <div ref={containerRef}>{isLoading && <Loader />}</div>
    </div>
  );
};

export default App;
