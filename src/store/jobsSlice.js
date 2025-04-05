import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  uploadJob,
  getJobs,
  deleteJobById,
  resubmitJobById,
  pollJobsStatus,
} from '../utils/api';

// Async Thunks
export const submitJob = createAsyncThunk('jobs/submitJob', async (file) => {
  const response = await uploadJob(file);
  return response;
});

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await getJobs();
  return response;
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (jobId) => {
  await deleteJobById(jobId);
  return jobId;
});

export const resubmitJob = createAsyncThunk('jobs/resubmitJob', async (jobId) => {
  const response = await resubmitJobById(jobId);
  return response;
});

export const pollJobStatus = createAsyncThunk('jobs/pollStatus', async () => {
  const response = await pollJobsStatus();
  return response; // This should return an array of updated job statuses
});

// Slice
const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitJob.pending, (state) => {
        state.loading = true;
      })
      .addCase(submitJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.unshift(action.payload);
      })
      .addCase(submitJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      })

      .addCase(resubmitJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })

      .addCase(pollJobStatus.fulfilled, (state, action) => {
        action.payload.forEach((updated) => {
          const index = state.jobs.findIndex((job) => job.id === updated.id);
          if (index !== -1) {
            state.jobs[index].status = updated.status;
          }
        });
      });
  },
});

export default jobsSlice.reducer;
