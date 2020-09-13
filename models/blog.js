const mongoose=require('mongoose');

const blogschema=mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Blog',blogschema);