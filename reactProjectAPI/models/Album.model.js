const mongoose = require('mongoose')
const { Schema, model} = mongoose

const albumSchema = new Schema(
{
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags:{
        type:[String],
        required: false
    },
    image: {
        type: String,
        required: true
    },
    isPublic:{
        type: Boolean,
        default: false
    },
    souvenirs: [{type: Schema.Types.ObjectId, ref: "Souvenir"}],
    dateCreated:{
        type: String,
        default: Date
    }
},
{
    timestamps:true
}

)

module.exports = model('Album', albumSchema)