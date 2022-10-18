import mongoose, {Schema} from "mongoose";


const SongSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            trim: true,
            required: [true, "Title is required"]
        },
        artist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "artist"
        },
        fileUrl: {
            type:String,
            required: [true,"Url is required"],
            // unique: true
        },
        imageUrl: {
            type: String
        },
        released: {
            type: Date,
        },
        duration: {
            type:Number
        },
        album: [{
            type: mongoose.Schema.ObjectId,
            ref: "album" 
        }],
        genre: {
            type: mongoose.Schema.ObjectId,
            ref: "genre" 
        },
        user: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "user" 
        }],
    },
    {timestamps: true},
)

const SongModel = new mongoose.model("song", SongSchema)

export default SongModel

