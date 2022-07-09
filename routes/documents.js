const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
//const Doc = require('../schema/doc.schemas.js');
const Doc = require('../schema/doc.schema');


router.get('/', async (req, res) => {
    try{
        const documents = await Doc.find();
        res.json(documents);
    } catch {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getDocument, (req, res) => {
        res.json(res.doc);
});

router.post('/', async (req, res) => {
    const document = new Doc({
        docTitle: req.body.docTitle,
        docBody: req.body.docBody,
        docNumber: req.body.docNumber
    });
    try {
        const newDocument = await document.save();
        res.status(201).json(newDocument);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', async (req, res) => {
    let doc;
    try {
        doc = await Doc.findByIdAndRemove(req.params.id);
        res.doc = doc;
        res.json({ message: 'deleted document.' });
    } catch {
        res.status(500).json({ message: 'could not find document.' });
    }
});

router.delete('/', async (req, res) => {
    let doc;
    try {
        doc = await Doc.remove();
        res.doc = doc;
        res.json({ message: 'deleted document.' });
    } catch {
        res.status(500).json({ message: 'could not find document.' });
    }
});

router.patch('/:id', getDocument, async (req, res) => {
    if (req.body.docTitle != null) {
        res.doc.docTitle = req.body.docTitle;
    }
    if (req.body.docBody != null){
        res.doc.docBody = req.body.docBody;
    }
    try {
        const updateDocument = await res.doc.save();
        res.json(updateDocument);
    } catch (err) {
        res.status(400).json({ message: 'document not updated'});
    }
});

async function getDocument(req, res, next) {
    let doc;
    if(req.params.id.length < 20){
        const valStr = req.params.id.toString();
        const num = valStr.substring(1,valStr.length);
        if(valStr.charAt(0) == "1"){
            doc = await Doc.find({docNumber: {$lt: num}});
        }else{
            doc = await Doc.find({docNumber: {$gt: num}});
        }
    }else{
        try {
            doc = await Doc.findById(req.params.id);
            if(doc == null){
                return res.status(404), json({ message: 'Cannot find document.'});
            }
        } catch (err) {
            return res.status(500).json({ message: 'The ID selected was not found.'});
        }
    }
    res.doc = doc;
    next();
}

module.exports = router;