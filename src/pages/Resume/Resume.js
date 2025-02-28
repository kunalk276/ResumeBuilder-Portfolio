import React, { useState, useRef } from "react";
import './Resume.css';
import { Grid, Typography, Paper, TextField, Button } from '@material-ui/core';
import emailjs from 'emailjs-com';
import resumeData from "../../utils/resumeData";
import CustomTimeline, { CustomTimelineSeperator } from "../../components/Timeline/CustomTimeline";
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";


const Resume = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState("");
    const form = useRef();

    const handleChange = (setter) => (e) => setter(e.target.value);

    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm("service_jtln8jo", "template_sdoyu3f", form.current, "onuTJmcRUbLyue_5l")
            .then(() => {
                setName("");
                setEmail("");
                setMessage("");
                setSuccess("Message Sent Successfully");
            }, (error) => {
                console.log("FAILED...", error.text);
            });
    };

    return (
        <>
            {/* About Me */}
            <Grid container className="section pb_45 pt_45">
                <Grid item className="section_title mb_30">
                    <span></span>
                    <h6 className="section_title_text">About Me</h6>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2" className="aboutMe_text">{resumeData.about}</Typography>
                </Grid>
            </Grid>

            {/* Education and Experience */}
            <Grid container className="section pb_45">
                <Grid item className="section_title mb_30">
                    <span></span>
                    <h6 className="section_title_text">Resume</h6>
                </Grid>
                <Grid item xs={12}>
                    <Grid container className="resume_timeline">
                        <Grid item sm={12} md={6}>
                            <CustomTimeline title="Work Experience" icon={<WorkIcon />}>
                                {resumeData.experiences.map((experience, index) => (
                                    <TimelineItem key={index}>
                                        <CustomTimelineSeperator />
                                        <TimelineContent className="timeline_content">
                                            <Typography className="timeline_title">{experience.title}</Typography>
                                            <Typography variant="caption" className="timeline_date">{experience.date}</Typography>
                                            <Typography variant="body2" className="timeline_description">{experience.description}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </CustomTimeline>
                        </Grid>
                        <Grid item sm={12} md={6}>
                            <CustomTimeline title="Education" icon={<SchoolIcon />}>
                                {resumeData.educations.map((education, index) => (
                                    <TimelineItem key={index}>
                                        <CustomTimelineSeperator />
                                        <TimelineContent className="timeline_content">
                                            <Typography className="timeline_title">{education.title}</Typography>
                                            <Typography variant="caption" className="timeline_date">{education.date}</Typography>
                                            <Typography variant="body2" className="timeline_description">{education.description}</Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </CustomTimeline>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            {/* Skills */}
            <Grid container className="section graybg pb_45">
                <Grid item className="section_title mb_30">
                    <span></span>
                    <h6 className="section_title_text">Skills</h6>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={3} justifyContent="space-around">
                        {resumeData.skills.map((skill, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Paper elevation={0} className="skill">
                                    <Typography variant="h6" className="skill_title">{skill.title}</Typography>
                                    {skill.description.map((element, idx) => (
                                        <Typography key={idx} variant="body2" className="skill_description">
                                            <TimelineDot variant={'outlined'} className="timeline_dot" />
                                            {element}
                                        </Typography>
                                    ))}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

           {/* Contact Section */}
<Grid container spacing={7} className="section pt_45 pb_45">
    
    {/* Contact Form */}
    <Grid item xs={12} lg={7} id="contact-form">

        <Grid container>
            <Grid item className="section_title mb_30">
                <span></span>
                <h6 className="section_title_text">Contact Form</h6>
            </Grid>
            <Grid item xs={12}>
                <form ref={form} onSubmit={sendEmail}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth name="from_name" label="Name" value={name} onChange={handleChange(setName)} required />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth name="from_email" label="E-mail" type="email" value={email} onChange={handleChange(setEmail)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth name="message" label="Message" multiline rows={4} value={message} onChange={handleChange(setMessage)} required />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Send</Button>
                        </Grid>
                        {success && (
                            <Grid item xs={12}>
                                <Typography color="textSecondary">{success}</Typography>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </Grid>
        </Grid>
    </Grid>

    {/* Contact Info (Placed Opposite) */}
    <Grid item xs={12} lg={5} >
        <Grid container>
            <Grid item className="section_title mb_30">
                <span></span>
                <h6 className="section_title_text">Contact Information</h6>
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className="contactInfo_item">
                            <span>Address: </span>{resumeData.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="contactInfo_item">
                            <span>Phone: </span>{resumeData.phone}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className="contactInfo_item">
                            <span>Email: </span>{resumeData.email}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container className="contactInfo_socialsContainer">
                    {Object.keys(resumeData.socials).map(key => (
                        <Grid item className="contactInfo_social">
                            <a href={resumeData.socials[key].link}>
                                {resumeData.socials[key].icon}
                            </a>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    </Grid>
</Grid>


        </>
    );
};

export default Resume;
