// api.js (Mock API)
let jobsDB = [];
let idCounter = 1;

export const uploadJob = async (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const job = {
        id: idCounter++,
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
      jobsDB = jobsDB.map((job) =>
        job.id === id
          ? { ...job, status: "processing" }
          : job
      );
      resolve({ id, status: "processing" });
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
