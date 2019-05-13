var key = require('./config/api_key').GOOGLE_PLACES_API_KEY;
var axios = require('axios');
var Zillow = require('node-zillow');
var zillowKey = require('./config/api_key').ZWSID;
var esriToken = require('./config/api_key').ESRI_TOKEN;

module.exports = (app, connection) => {
    app.get("/api/getGooglePlacesData", function (req, res) {
        var geospatialSearchQuery = 'SELECT *,3956*2*ASIN(SQRT(POWER(SIN((? - ABS(wfm_store_info.geometry__location__lat))*PI()/180/2),2) + COS(?*PI()/180)*COS(ABS(wfm_store_info.geometry__location__lat)*PI()/180)*POWER(SIN((? - wfm_store_info.geometry__location__lng)*PI()/180/2),2))) AS distance FROM wfm_store_info HAVING distance < 10000 ORDER BY distance limit 10;'
        var address = req.query.address;
        var keyPlace = req.query.keyPlace;
        var location = null;
        var urlForGeocodingAPI = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`;
        var urlForGooglePlacesAPI = null;
        var searchResult = [];
        var dataToSend = {};
        dataToSend.mapCenter = null;
        dataToSend.places = [];
        //get nearby key places
        const getDataFromGooglePlaces = async () => {
            try {
                urlForGooglePlacesAPI = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyPlace.split(" ").join("+")}&location=${location.lat},${location.lng}&radius=10000&key=${key}`;
                const response = await axios.get(urlForGooglePlacesAPI);
                if (response.statusText === "OK") {
                    searchResult = response.data.results;
                    for (let i = 0; i < searchResult.length; i++) {
                        dataToSend.places.push({
                            "formatted_address": searchResult[i].formatted_address,
                            "geometry__location__lat": searchResult[i].geometry.location.lat,
                            "geometry__location__lng": searchResult[i].geometry.location.lng,
                            "id": searchResult[i].id,
                            "name": searchResult[i].name
                        })
                    }
                } else {
                    res.send(response);
                }
            }
            catch (error) {
                res.send(error);
            }
        }

        const getDataFromWFMdb = (req, resp) => {
            connection.getConnection(function (error, tempCont) {
                if (!!error) {
                    tempCont.release();
                    res.send(error);
                    console.log('Error');
                } else {
                    console.log('Connected');
                    tempCont.query(geospatialSearchQuery, [location.lat, location.lat, location.lng], function (error, rows, field) {
                        tempCont.release();
                        if (!!error) {
                            res.send(error);
                            console.log('Error in the query:', error);
                        } else {
                            console.log("Successful query\n");
                            for (let i = 0; i < rows.length; i++) {
                                dataToSend.places.push({
                                    "formatted_address": rows[i].formatted_address,
                                    "geometry__location__lat": rows[i].geometry__location__lat,
                                    "geometry__location__lng": rows[i].geometry__location__lng,
                                    "id": rows[i].id,
                                    "name": rows[i].name
                                })
                            }
                            res.send(dataToSend);
                        }
                    });
                }
            })
        }

        //get latitude and longitude from address and call getDataFromGooglePlaces
        const getLatLngFromAddress = async () => {
            try {
                const response = await axios.get(urlForGeocodingAPI);
                if (response.statusText === "OK") {
                    location = response.data.results[0].geometry.location;
                    dataToSend.mapCenter = location;
                    await getDataFromGooglePlaces();
                    await getDataFromWFMdb();
                } else {
                    res.send(response);
                }
            }
            catch (error) {
                res.send(error);
            }
        }

        getLatLngFromAddress();
    });

    app.get("/api/getZillowData", function (req, res) {
        const zillow = new Zillow(zillowKey);
        const parameters = {
            // address: "14351 Jessica St.",
            // citystatezip: "Garden Grove, CA",
            // rentzestimate: false,
            // state: "CA",
            zip: "92843"
        }
        // zillow.get('GetRegionChildren', parameters)
        zillow.get('GetDemographics', parameters)
            .then(results => {
                // console.log(results);
                res.send(results);
                // return results;
            })
    });

    app.get("/api/getDemographicData", function (req, res) {
        var urlForDemographicDataAPI = `https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich?f=json&token=${esriToken}&inSR=4326&outSR=4326&returnGeometry=true&studyAreas=[{"geometry":{"x": -118.09047,"y": 33.81091}}]& studyAreasOptions={"areaType": "RingBuffer","bufferUnits": "esriMiles","bufferRadii": [1]}& dataCollections=["KeyGlobalFacts", "KeyUSFacts"]`;
        const getDemographicData = async () => {
            try {
                // urlForDemographicDataAPI = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${keyPlace.split(" ").join("+")}&location=${location.lat},${location.lng}&radius=10000&key=${key}`;
                const response = await axios.get(urlForDemographicDataAPI);
                if (response.status === 200) {
                    res.json(response.data);
                } else {
                    res.send(response);
                }
            }
            catch (error) {
                res.send(error);
            }
        }
        getDemographicData();
    });

}


