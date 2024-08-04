import { Job } from "../models/job.model.js";
import { Application } from "../models/application.model.js"; 


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "job id is required",
                success: false
            });
        }
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId }).lean();
        if (existingApplication) {
            return res.status(400).json({
                message: "you have already applied to this job",
                success: false
            });
        }
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "job not Found",
                success: false
            });
        }

        const newApplication = await Application.create({ job: jobId, applicant: userId }); 
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job applied Successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } }
            }
        }).lean();
        if (!applications) {
            return res.status(404).json({
                message: "no applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        }).lean();

        if (!job) {
            return res.status(404).json({
                message: "job not Found",
                success: false
            });
        }
        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.log(error);
        
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            });
        }

        const application = await Application.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not Found",
                success: false
            });
        }
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
       
    }
};
