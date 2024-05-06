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
    companyName: "",
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
    const listInnerElement = containerRef.current;
    if (listInnerElement) {
      listInnerElement.addEventListener("scroll", onScroll);

      // Clean-up
      return () => {
        listInnerElement.removeEventListener("scroll", onScroll);
      };
    }
  });

  const onScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const isNearBottom = scrollTop + clientHeight >= scrollHeight;

      if (isNearBottom) {
        fetchAdditionalData();
      }
    }
  };

  const handleFilterChange = (
    filterName: string,
    selectedOptions: SingleValue<object> | MultiValue<object> | string,
  ) => {
    if (selectedOptions) {
      if (filterName === "companyName") {
        console.log(selectedOptions);
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterName]: selectedOptions.toLowerCase(),
        }));
        console.log({
          ...filters,
          [filterName]: selectedOptions.toLowerCase(),
        });
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterName]: selectedOptions.map((option) => {
            if (typeof option === "string") {
              return option?.value.toLowerCase();
            } else {
              return option?.value;
            }
          }),
        }));
      }
    }
  };

  const filterJobDescriptions = (job: JobDescription) => {
    if (job) {
      const { roles, baseSalary, experience, jobLocation, companyName } =
        filters;

      return (
        (!roles.length || roles.includes(job.jobRole)) &&
        (!jobLocation.length || jobLocation.includes(job?.location)) &&
        (!experience.length || experience.includes(job?.minExp)) &&
        (!baseSalary.length || baseSalary.includes(job?.minJdSalary)) &&
        (!companyName.length ||
          companyName.includes(job?.companyName?.toLowerCase()))
      );
    } else return;
  };

  const filteredJDs = currentJDs.filter(filterJobDescriptions);

  return (
    <div>
      <Filters handleFilterChange={handleFilterChange} />

      <div
        ref={containerRef}
        style={{ maxHeight: "80vh", overflowY: "scroll" }}
      >
        <Grid
          container
          columnSpacing={4}
          rowSpacing={{ xs: 6, sm: 6, md: 4 }}
          className="jobcard-grid-container"
        >
          {filteredJDs.map((jd, idx) => (
            <JobCard key={idx} jobDescription={jd} />
          ))}
        </Grid>
      </div>
      <div>{isLoading && <Loader />}</div>
    </div>
  );
};

export default App;
