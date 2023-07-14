import React from "react";
import { Navbar } from "../navbar";
import { Footer } from "../footer";
import about1 from '../../assets/images/about1.jpg'

export const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-body">
                <section className="sections section1">
                    <div className="about-image">
                        <img src={about1} alt="environment-friendly"/>
                    </div>
                    <div className="text">
                        <h2 className="section-heading">What is carbon footprint?</h2>
                        <p>
                        The carbon footprint is commonly expressed as the carbon dioxide equivalent (CO2e) 
                        and is meant to sum up the total greenhouse gas emissions (not just carbon dioxide) caused by economic activities,
                        events, organizations, services etc.  It includes direct emissions, such as those that result from fossil-fuel combustion in manufacturing, 
                        heating, and transportation, as well as emissions required to produce the electricity associated with 
                        goods and services consumed.
                        </p>
                        <p>Every aspect of your operations, from energy consumption and transportation to waste management and supply chain activities, 
                        contributes to your carbon footprint. Your corporate footprint is a measure of sustainability.
                        {/* Understanding and managing your carbon footprint is 
                        essential for organizations committed to sustainability and responsible corporate citizenship. */}
                        </p>
                    </div>
                </section>

                <section className="sections section2">
                        <h2>Corporate carbon footprint and its impact</h2>
                        <p>As major economic players, corporations have an important role to play here –
                         both as developers of new solutions and as users of them. As the effects of climate change have come into
                        focus in recent years, there has been increasing pressure on organizations to reduce their carbon footprints 
                        and address climate change. A growing number of corporates are vocal about their 
                         commitment to cutting their carbon footprints. What is driving this? There are several motivating factors.
                          Reporting around sustainability and other environmental issues are increasingly mandated.</p>
                </section>
                <section className="sections section3">
                        <h2>Why BetterEarth?</h2>
                        <p>
                        {/* We are dedicated to supporting organizations in their journey towards measuring, managing, and reducing
                         their carbon footprint. We understand that businesses and institutions have a crucial role to play in combatting
                         climate change and building a sustainable future. Our mission is to help organizations like yours make a positive
                         environmental impact. */}
    
                         Our web application provides an intuitive and user-friendly platform for measuring and tracking your 
                         carbon emissions. This enables you to gain valuable insights into your carbon footprint, identify emission hotspots, and set realistic reduction targets.
                         We understand that reducing your carbon footprint can be a complex task. That's why we go beyond measurement and 
                         offer a range of tools and resources to support your sustainability efforts. </p>
                         <p>Our platform provides you with a wealth of information and best practices for implementing effective emission reduction strategies.
                        Whether it's optimizing energy efficiency, implementing sustainable transportation practices, or adopting 
                        circular economy principles, we guide you towards practical and impactful solutions.
                        In addition to reducing emissions internally, we recognize the importance of offsetting unavoidable emissions.
                        Our platform facilitates access to verified carbon offset projects, allowing your organization to invest in 
                        initiatives that remove or reduce greenhouse gas emissions elsewhere. We also promote renewable energy
                        projects, enabling you to support clean and sustainable energy sources. </p>
                        <p>Join us today and embark on a journey towards a more sustainable future.
                        Measure your carbon footprint, develop effective reduction strategies, and be part of a community 
                        of organizations committed to environmental stewardship. Together, let's build a greener and more 
                        resilient world. Get started with BetterEarth now and make a lasting impact!</p>
                </section>
                
            </div>
            <Footer />
        </>
    );
}