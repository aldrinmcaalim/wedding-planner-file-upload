const {Storage} = require("@google-cloud/storage");
const storage = new Storage();
const cors = require("cors")();

exports.upload = async (req, res) => {
    cors(req, res, async () => {
        const body = req.body;
        const bucket = storage.bucket("wedding-images-upload");
        const buffer = Buffer.from(body.content, "base64");
        const file = bucket.file(`${body.name}.${body.extension}`);
        await file.save(buffer);
        await file.makePublic();
        res.send({ photoLink: file.publicUrl });
    });
};
