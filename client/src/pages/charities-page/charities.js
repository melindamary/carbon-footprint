import React, { useEffect, useState } from "react";
import { SideNav } from "../components/sidenav";
import { PageTitle } from "../components/page-title";
import Axios from "axios";
import "./charities-styles.css";
import { Link, useNavigate } from "react-router-dom";
import { Donation } from "./donation";
import { View } from "./view.js";
import SearchIcon from '@mui/icons-material/Search';


export const Charities = () => {

    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const [openPopup, setOpenPopup] = useState(false);
    const [donationPopup, setDonationPopup] = useState(false);
    const [title, setTitle] = useState("")
    const [summary, setSummary] = useState("")
    const [imageLink, setImageLink] = useState("")
    const [link, setLink] = useState("")
    const [doclink, setDocLink] = useState("")
    const [country, setCountry] = useState("")
    const [organization, setOrganization] = useState("")
    const [organizationUrl, setOrganizationUrl] = useState("")
    const [id, setId] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(()=>{
        Axios.get("/view-active-causes").then(
            (response)=> {
           setProjects(response.data);
           console.log(response.data[0].project_id);

        });

    }, []);
    

    const getapi = () => {
        Axios.get("https://api.globalgiving.org/api/public/projectservice/themes/climate/projects/active?api_key=29e181b0-5d16-4c2b-8426-aa7730421cfb").then(
            (response)=> {
           console.log(response.data.projects.project);
        })
    }

    return (
        <>
        <div className="home">
            <SideNav />
            <PageTitle name="Carbon Offset Projects"/>
            <div className="content">
                <div style={{display: "flex"}}>
                    <div className="search-bar" style={{marginLeft: "5%"}}>
                        <SearchIcon className="search-icon" style={{left: "25%"}}/>
                        <input style={{width: "328px", marginLeft: "18%"}} type='text' placeholder='Search by project or location...'
                            onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <button className="view-donations-button" onClick={() => {navigate("/my-donations")}}>View Donations</button>
                </div>
                
                
                <div className="charities-content">
                    {projects.filter((project) => {
                        if(searchTerm.length>0){
                            if(project.project_name.toLowerCase().includes(searchTerm.toLowerCase()))
                            return project;
                            else if(project.location.toLowerCase().includes(searchTerm.toLowerCase()))
                            return project;
                        } 
                        else return project;
                    }).map((project,key) =>{
                        return(
                            <>
                            <div key1={key} className="donation-card-design">
                                <section className="img-div">
                                    <img src={project.image_url} alt={project.title}></img>
                                </section>
                                <section className="content-div">
                                    <Link><h3>{project.project_name}</h3></Link>
                                    {/* <p><Link>View details</Link></p> */}
                                </section>
                                <section className="donation-buttons">
                                    <button className="btn1" onClick={() => {
                                        setOpenPopup(true)
                                        setTitle(project.project_name)
                                        setSummary(project.project_description)
                                        setImageLink(project.image_url)
                                        setLink(project.project_link)
                                        setDocLink(project.documentation_link)
                                        setCountry(project.location)
                                        setOrganization(project.provider_organization)
                                        // setOrganizationUrl(project.contactUrl)
                                    }}>Learn More</button>

                                    <button className="btn2" onClick={() => {
                                        setDonationPopup(true)
                                        setId(project.project_id)
                                        setTitle(project.project_name)
                                    }}>Donate</button>
                                </section>
                            </div>
                            </>
                        )
                    })
                    
                    }
                </div>
                
                <View
                    openPopup={openPopup} setOpenPopup={setOpenPopup} title={title}
                    summary={summary} imageLink={imageLink} link={link}
                    doclink={doclink} country={country} organization={organization}
                    organizationUrl={organizationUrl}

                />
                <Donation 
                    donationPopup={donationPopup} setDonationPopup={setDonationPopup}
                    title={title} projectid={id}
                />
            </div>  
            
        </div>  
        </>
        
    );
}