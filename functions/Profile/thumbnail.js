const axios = require('axios');
const fs = require('fs');

module.exports = async (req, res) => {
    if(!req.params.handle) return res.status(400).send('Handle required to make request');
    let url, thumbnail;
    let final_size = {
        x: 1200,
        y: 630
    };
    let scale = 3;
    let resolution = {
        x: final_size.x/scale,
        y: final_size.y/scale
    }
    try {
        url = 'https://capture.neutroncreative.com/api/v1/capture?apiKey=' + global.config.capture_key + '&url=https://app.singlelink.co/u/' + req.params.handle + '&size=' + resolution.x + 'x' + resolution.y + '&crop=true&scale=' + scale;
        thumbnail = await axios.get(url, {
            responseType: "arraybuffer"
        })
    } catch (err) {
        return res.send(err.message || 'Error!');
    } finally {
        //return res.send(btoa(thumbnail.data));

        let thumbnail_img = "data:" + thumbnail.headers["content-type"] + ";base64," + Buffer.from(thumbnail.data).toString('base64')

        return res.send(thumbnail_img);

    }
}
