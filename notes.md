
# Functional requirements

~~Signup~~
 - ~~register new user (done)~~

~~Login~~
 - ~~authentication (done)~~
 - ~~protected routes (done)~~
 - ~~admin or organization (done)~~

## Pages

1. Carbon-footprint calculation

 - ~~category cards (done)~~
 - inputs for each category (include date)
 - total for each category
     (~~electricity, water, fuels~~,~~vehicles,~~~~materials~~,trips, waste disposal)

2. Resources Blog

 - ~~card display (done)~~
 - ~~functionality (view) (done)~~

3. Donation

 - ~~connect to projects api  (done)~~
 - ~~card display (done)~~
 - ~~donation form~~ 
 - ~~add details of payment~~
 - find offset amount (money) equivalent to carbon emission 

4. Dashboard
 
 - display organization name and country
 - total amount of carbon offset (cards)
 - equivalent carbon offset and individual data (table)
 - ~~total footprint (card)~~
 - ~~category wise footprint (table)~~

5. Impact tracker

- display current year on top left and a search year dropdown option.
- display charts - user's footprint vs country average and other countries
- display chart indicating progress of each year
- ~~category wise footprint chart~~

6. OFFSET : 
Find amount of money to offset 1 unit of Carbon footprint
Show total carbon offset and a doughnut chart indicating how much more to offset


# Admin functionality

## ~~View users(done)~~
## ~~View all donations~~
## View footprint of all users ?
## ~~Add, delete blog posts(done)~~

# Sites to visit for project

### API FOR CHARITY
https://api.globalgiving.org/api/public/projectservice/themes/climate/projects?api_key=29e181b0-5d16-4c2b-8426-aa7730421cfb   

### DATASET FOR CO2 EMISSIONS COUNTRY AND YEAR WISE
https://ourworldindata.org/co2-data-update-2022

### CARBON OFFSET EQUIVALENTS
https://verra.org/programs/verified-carbon-standard/



# Account for Individual (if there is time, calculate their footprint)




// const activities = [
//     { id: 1, name: 'Construction', materials: ['Asbestos', 'Asphalt', 'Bricks', 'Concrete', 'Insulation', 
//                                                 'Soils', 'Tyres', 'Wood'] },
//     { id: 2, name: 'Organic', materials: ['Compost derived from garden waste',
//                                             'Compost derived from food and garden waste'] },
//     { id: 3, name: 'Electrical items', materials: ['Fridges and freezers', 'IT'] },
//     { id: 4, name: 'Metal', materials: ['Scrap metal', 'steel cans'] },
//     { id: 5, name: 'Plastic', materials: [] },
//     { id: 6, name: 'Paper', materials: [] },
//     { id: 7, name: 'Other', materials: ['Books', 'Glass', 'Clothing', 'Food and drink'] },
        
// ];
// const handleActivityChange = (event) => {
    //     const activityName = event.target.value;
    //     setSelectedActivity(activityName);
    //     setSelectedMaterial('');
    //   };

    // const handleMaterialChange = (event) => {
    //     const materialName = event.target.value;
    //     setSelectedMaterial(materialName);
    // };

    // const getMaterialsbyActivity = (activityName) => {
    //     const activity = activities.find((a) => a.name === activityName);
    //     return activity ? activity.materials : [];
    // };

     {/* <select value={selectedMaterial} onChange={handleMaterialChange} disabled={!selectedActivity}>
                            <option value="">--Select--</option>
                            {getMaterialsbyActivity(selectedActivity).map((material, index) => (
                                <option key={index} value={material}>{material}</option>
                            ))}
                        </select> <br /> */}
