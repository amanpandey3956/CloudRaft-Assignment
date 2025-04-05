let jobsDB = [];

const generateJobId = () => {
  let id;
  do {
    id = Math.floor(1000 + Math.random() * 9000); 
  } while (jobsDB.find((job) => job.id === id)); 
  return id;
};

export const uploadJob = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = {
        id: generateJobId(),
        filename: file.name,
        status: "processing",
      };
      jobsDB.push(job);
      resolve(job);
    }, 1000);
  });
};

export const getJobs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...jobsDB]);
    }, 500);
  });
};

export const deleteJobById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jobsDB = jobsDB.filter((job) => job.id !== id);
      resolve(id);
    }, 500);
  });
};

export const resubmitJobById = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let updatedJob;
      jobsDB = jobsDB.map((job) => {
        if (job.id === id) {
          updatedJob = { ...job, status: "processing" };
          return updatedJob;
        }
        return job;
      });
      resolve(updatedJob); // return full updated job with filename
    }, 800);
  });
};


export const pollJobsStatus = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jobsDB = jobsDB.map((job) => {
        if (job.status === "processing") {
          const random = Math.random();
          return {
            ...job,
            status: random < 0.7 ? "done" : "error", // 70% success rate
          };
        }
        return job;
      });
      resolve([...jobsDB]);
    }, 800);
  });
};
